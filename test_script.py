import requests

API_URL = "http://localhost:8001/analyze"

sample_text = """
This Agreement shall remain in effect for a period of one (1) year.
The Company may terminate this Agreement at any time without cause and without notice.
All Intellectual Property Rights generated during the term shall belong solely to the Company.
The Contractor agrees to indemnify the Company against all losses and liabilities.
Payment shall be made within 60 days of invoice receipt.
"""

def test_api():
    print("Testing NLP Risk Classifier API...")
    try:
        # Send as a file to force multipart/form-data and test the file handling logic
        files = {"file": ("contract.txt", sample_text, "text/plain")}
        response = requests.post(API_URL, files=files) 
        if response.status_code == 200:
            data = response.json()
            print(f"Risk Score: {data['riskScore']}")
            print("Score Breakdown:")
            for item in data.get('scoreBreakdown', []):
                print(f"  - {item['reason']} ({item['penalty']} pts)")
            print(f"Risks Found: {len(data['risks'])}")
            for risk in data['risks']:
                print(f"- {risk['category']} ({risk['confidence']}): {risk['clause'][:50]}...")
        else:
            print(f"Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Failed to connect: {e}")
        print("Make sure the uvicorn server is running!")

if __name__ == "__main__":
    test_api()
