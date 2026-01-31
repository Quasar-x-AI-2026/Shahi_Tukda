import os
import uvicorn
import google.generativeai as genai
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import shutil
from typing import List

# Import OCR
# Assumes 'ocr' module exists and works (from previous steps)
from ocr import extract_text

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
GEMINI_API_KEY = "AIzaSyDoCnp7ORmVhutZsaMlwUdA8jMzPMOFHUw"

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Data Models
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    fullName: str
    email: str
    mobile: str
    password: str

# In-memory user store
users_db = {}

@app.post("/register")
async def register(request: RegisterRequest):
    if request.email in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    users_db[request.email] = request.dict()
    return {"message": "User registered successfully"}

@app.post("/login")
async def login(request: LoginRequest):
    user = users_db.get(request.email)
    if not user or user["password"] != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {
        "token": "mock-jwt-token-gemini",
        "user": {"name": user["fullName"], "email": request.email}
    }

@app.post("/analyze")
async def analyze_contract(file: UploadFile = File(...)):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured. Please check server logs.")

    # 1. Save and OCR
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    print(f"Running OCR on {file_path}...")
    try:
        contract_text = extract_text(file_path)
    except Exception as e:
        print(f"OCR Failed: {e}")
        # Fallback for demo if OCR fails (e.g. if doctr not perfect)
        contract_text = "Contract text could not be extracted. Analyze based on file name: " + file.filename

    # 2. Call Gemini
    print("Sending text to Gemini...")
    # Configure model with JSON generation config
    generation_config = {
        "temperature": 0.5,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "application/json",
    }
    
    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash",
        generation_config=generation_config,
    )
    
    prompt = f"""
    You are a legal AI expert. Analyze the following contract text.
    You MUST return a JSON object. Do not include markdown formatting like ```json ... ```. 
    The JSON structure must match this schema exactly:
    {{
        "riskScore": (integer 0-100),
        "scoreBreakdown": {{ "legal": int, "financial": int, "structure": int }},
        "risks": [
            {{ "clause": "text snippet", "category": "Risk Category", "risk_level": "High/Medium/Low", "explanation": "Why it is a risk" }}
        ],
        "legalStructure": {{ "contractType": "Type", "structureQuality": "High/Medium/Low", "keySections": ["List", "Of", "Sections"], "term": {{ "duration": "string" }} }},
        "financialRisks": {{ "totalRiskCount": int, "estimatedExposure": "High/Medium/Low", "severity": "High/Medium/Low", "risks": [ {{ "type": "string", "severity": "string", "description": "string" }} ] }},
        "economicImpact": {{ "contractValue": int (estimate), "totalRiskCost": int, "riskAdjustedValue": int, "riskPercentage": int, "economicViability": "Viable/Caution", "recommendations": ["rec1", "rec2"] }}
    }}

    Contract Text:
    {contract_text[:30000]} 
    """

    try:
        response = model.generate_content(prompt)
        text_response = response.text.strip()
        print("Gemini Response received.")
        
        # Clean up if model still adds markdown despite instruction (failsafe)
        if text_response.startswith("```json"):
            text_response = text_response.split("```json")[1]
        if text_response.endswith("```"):
            text_response = text_response.rsplit("```", 1)[0]
            
        analysis_json = json.loads(text_response)
        return analysis_json

    except Exception as e:
        print(f"Gemini Analysis Failed: {e}")
        raise HTTPException(status_code=500, detail=f"Gemini Analysis Failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
