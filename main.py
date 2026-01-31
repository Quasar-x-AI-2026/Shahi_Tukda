from fastapi import FastAPI, UploadFile, File

app = FastAPI()

@app.post("/analyze")
async def analyze_contract(file: UploadFile = File(...)):
    return {
        "riskScore": 68,
        "risks": [
            {
                "clause": "The company may terminate the agreement at any time.",
                "category": "Unilateral Termination Risk",
                "confidence": 0.91,
                "explanation": "Allows termination without compensation."
            }
        ]
    }
