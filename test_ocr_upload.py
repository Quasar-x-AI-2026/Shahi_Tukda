import requests
import os

API_URL = "http://localhost:8001/analyze"

def test_ocr(pdf_path):
    if not os.path.exists(pdf_path):
        print(f"Error: File not found at {pdf_path}")
        return

    print(f"Uploading {pdf_path} for OCR analysis...")
    print("This might take a while as the OCR model processes the PDF...")
    
    try:
        with open(pdf_path, "rb") as f:
            files = {"file": (os.path.basename(pdf_path), f, "application/pdf")}
            # Send file. Note: 'text' field is NOT sent, so API will use file path.
            response = requests.post(API_URL, files=files)
        
        if response.status_code == 200:
            data = response.json()
            print("\n--- Analysis Result ---")
            print(f"Risk Score: {data.get('riskScore')}")
            print(f"Total Clauses: {data.get('total_clauses_analyzed')}")
            
            print("\nScore Breakdown:")
            for item in data.get('scoreBreakdown', []):
                print(f"  - {item['reason']} ({item['penalty']} pts)")
                
            print(f"\nRisks Found: {len(data.get('risks', []))}")
            for risk in data.get('risks', [])[:3]: # Show top 3
                print(f"- {risk['category']} ({risk['confidence']:.2f}): {risk['clause'][:60]}...")
        else:
            print(f"Error: {response.status_code} - {response.text}")
            
    except Exception as e:
        print(f"Failed to connect: {e}")

if __name__ == "__main__":
    import sys
    print("--- PDF OCR Tester ---")
    
    if len(sys.argv) > 1:
        pdf_path = sys.argv[1]
    else:
        # Default to sample.pdf if it exists, otherwise ask (or just error out/default)
        if os.path.exists("sample.pdf"):
            pdf_path = "sample.pdf"
        else:
            pdf_path = input("Enter the full path to a PDF file to test: ").strip()

    # Remove quotes if user added them
    if pdf_path.startswith('"') and pdf_path.endswith('"'):
        pdf_path = pdf_path[1:-1]
        
    test_ocr(pdf_path)
