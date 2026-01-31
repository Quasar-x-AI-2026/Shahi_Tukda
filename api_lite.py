from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import random

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory user store (for demo purposes)
users_db = {}

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    fullName: str
    email: str
    mobile: str
    password: str

@app.post("/register")
async def register(request: RegisterRequest):
    if request.email in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    
    users_db[request.email] = {
        "fullName": request.fullName,
        "password": request.password,
        "mobile": request.mobile
    }
    return {"message": "User registered successfully"}

@app.post("/login")
async def login(request: LoginRequest):
    user = users_db.get(request.email)
    if not user or user["password"] != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {
        "token": "mock-jwt-token-123",
        "user": {
            "name": user["fullName"],
            "email": request.email
        }
    }

@app.post("/analyze")
async def analyze_contract():
    return {
        "riskScore": 65,
        "scoreBreakdown": {"legal": 20, "financial": 15, "structure": 30},
        "risks": [
             {
                "clause": "The company may terminate the agreement at any time.",
                "category": "Unilateral Termination Risk",
                "confidence": 0.91,
                "risk_level": "High",
                "explanation": "Allows termination without compensation."
            }
        ],
        "total_clauses_analyzed": 12,
        "legalStructure": {
            "contractType": "Service Agreement",
            "parties": ["Company A", "Company B"],
            "keySections": ["Termination", "Liability"],
            "term": "12 months",
            "structureQuality": "Standard"
        },
        "financialRisks": {
            "risks": [],
            "totalRiskCount": 0,
            "estimatedExposure": "Low",
            "severity": "Low"
        },
        "economicImpact": {
            "contractValue": 10000,
            "totalRiskCost": 500,
            "riskAdjustedValue": 9500,
            "riskPercentage": 5,
            "economicViability": "Viable",
            "recommendations": ["Review termination clause"]
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
