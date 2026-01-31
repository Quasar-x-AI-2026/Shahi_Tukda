import requests
import json
import os

url = "http://localhost:8001/analyze"
file_path = "test_contract.pdf"

if not os.path.exists(file_path):
    print(f"Error: {file_path} not found.")
    exit(1)

print(f"Sending {file_path} to {url}...")

try:
    with open(file_path, "rb") as f:
        files = {"file": (file_path, f, "application/pdf")}
        response = requests.post(url, files=files)

    if response.status_code == 200:
        data = response.json()
        print("\n===== REMOTE ANALYSIS RESULT =====")
        print(f"Risk Score: {data.get('riskScore')}")
        # Print minimal details to avoid structure errors
        print(json.dumps(data, indent=2))
        print("\n" + "="*30)
        print(f"FINAL RISK SCORE: {data.get('riskScore')}")
        print("="*30 + "\n")
            
    else:
        print(f"Error: API returned status code {response.status_code}")
        print(response.text)

except Exception as e:
    import traceback
    traceback.print_exc()
