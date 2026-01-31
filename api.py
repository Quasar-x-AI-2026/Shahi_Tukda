from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from typing import List
import uvicorn
# Import our new classifier (ensure __init__.py exists in subfolders if needed, or adjust path)
# Assuming running from 'ai' folder:
from classification.risk_classifier import risk_classifier

# Import scorer
from scoring.scorer import risk_scorer

# Import segmentation
from segmentation.segmenter import segment_text

# Import advanced analysis modules
from reasoning.legal_structure_analyzer import legal_structure_analyzer
from insights.financial_risk_detector import financial_risk_detector
from insights.economic_impact_model import economic_impact_model

# Import report generator
from reporting.intelligence_report_generator import intelligence_report_generator

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev only, should be specific in prod
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
        "password": request.password, # In production, hash this!
        "mobile": request.mobile
    }
    return {"message": "User registered successfully"}

@app.post("/login")
async def login(request: LoginRequest):
    user = users_db.get(request.email)
    if not user or user["password"] != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials") # Changed to 401
    
    return {
        "token": "mock-jwt-token-123",
        "user": {
            "name": user["fullName"],
            "email": request.email
        }
    }

@app.post("/analyze")
async def analyze_contract(file: UploadFile = File(None), text: str = Form(None)):
    """
    Analyzes contract text to identify risks.
    Accepts either a file (TODO: implement OCR) or raw text.
    """
    if text:
        content = text
    elif file:
        try:
            # Check if file is text/plain or .txt
            if file.content_type == "text/plain" or file.filename.endswith(".txt"):
                content = (await file.read()).decode("utf-8")
            else:
                # We need to save the file temporarily because doctr works with paths
                import os
                import shutil
                from ocr import extract_text
                
                # Ensure uploads directory exists
                UPLOAD_DIR = "uploads"
                os.makedirs(UPLOAD_DIR, exist_ok=True)
                
                temp_file_path = os.path.join(UPLOAD_DIR, file.filename)
                
                with open(temp_file_path, "wb") as buffer:
                    shutil.copyfileobj(file.file, buffer)
                
                # Run OCR
                print(f"Running OCR on {temp_file_path}...") # Debug log
                content = extract_text(temp_file_path)
                
                # Cleanup (optional, keeping for now for debug, or delete)
                # os.remove(temp_file_path) # Uncomment to clean up
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"OCR Processing failed: {str(e)}")
    else:
        return {"error": "No text or file provided"}

    # 1. SEGMENTATION
    # ----------------------------------------------------------------
    clauses = segment_text(content)

    # 2. CLASSIFICATION
    # ----------------------------------------------------------------
    analyzed_risks = []
    
    for clause in clauses:
        analysis = risk_classifier.classify_clause(clause)
        
        if analysis['category'] != "Safe Clause" and analysis['risk_level'] != "Safe":
             analyzed_risks.append({
                "clause": analysis['clause'],
                "category": analysis['category'],
                "confidence": analysis['confidence'],
                "risk_level": analysis['risk_level'],
                "explanation": f"Identified as {analysis['category']} with {analysis['confidence']*100:.1f}% confidence."
            })
    
    # 3. SCORING
    # ----------------------------------------------------------------
    scoring_result = risk_scorer.calculate_score(analyzed_risks)

    # 4. LEGAL STRUCTURE ANALYSIS
    # ----------------------------------------------------------------
    print("Analyzing legal structure...")
    legal_structure = legal_structure_analyzer.analyze_structure(content, clauses)

    # 5. FINANCIAL RISK DETECTION
    # ----------------------------------------------------------------
    print("Detecting financial risks...")
    financial_analysis = financial_risk_detector.detect_financial_risks(analyzed_risks, content)

    # 6. ECONOMIC IMPACT MODELING
    # ----------------------------------------------------------------
    print("Calculating economic impact...")
    economic_impact = economic_impact_model.calculate_economic_impact(
        financial_analysis['financial_risks'],
        contract_value=10000  # Can be extracted from contract or passed as parameter
    )

    return {
        "riskScore": scoring_result['total_score'],
        "scoreBreakdown": scoring_result['breakdown'],
        "risks": analyzed_risks,
        "total_clauses_analyzed": len(clauses),
        
        # Advanced analysis
        "legalStructure": {
            "contractType": legal_structure['contract_type'],
            "parties": legal_structure['parties'],
            "keySections": legal_structure['key_sections'],
            "term": legal_structure['term'],
            "structureQuality": legal_structure['structure_quality']
        },
        "financialRisks": {
            "risks": financial_analysis['financial_risks'],
            "totalRiskCount": financial_analysis['total_risk_count'],
            "estimatedExposure": financial_analysis['estimated_exposure'],
            "severity": financial_analysis['severity']
        },
        "economicImpact": {
            "contractValue": economic_impact['contract_value'],
            "totalRiskCost": economic_impact['total_risk_cost'],
            "riskAdjustedValue": economic_impact['risk_adjusted_value'],
            "riskPercentage": economic_impact['risk_percentage'],
            "economicViability": economic_impact['economic_viability'],
            "recommendations": economic_impact['recommendations']
        }
    }

@app.post("/generate-report")
async def generate_report(analysis_data: dict):
    """
    Generate a downloadable PDF intelligence report from analysis data
    """
    try:
        import os
        from pathlib import Path
        
        # Create reports directory if it doesn't exist
        reports_dir = Path("reports")
        reports_dir.mkdir(exist_ok=True)
        
        # Generate unique filename
        from datetime import datetime
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        report_filename = f"contract_intelligence_report_{timestamp}.pdf"
        report_path = reports_dir / report_filename
        
        # Generate the report
        intelligence_report_generator.generate_report(analysis_data, str(report_path))
        
        # Return the file for download
        return FileResponse(
            path=str(report_path),
            filename=report_filename,
            media_type='application/pdf',
            headers={"Content-Disposition": f"attachment; filename={report_filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation failed: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
