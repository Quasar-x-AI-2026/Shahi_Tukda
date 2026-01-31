"""
Quick test to verify what the backend returns
"""
import requests

print("="*70)
print("TESTING BACKEND RESPONSE FORMAT")
print("="*70)

url = "http://localhost:8001/analyze"
test_file = "test_contract.pdf"

print(f"\n📤 Uploading: {test_file}")

try:
    with open(test_file, 'rb') as f:
        files = {'file': (test_file, f, 'application/pdf')}
        response = requests.post(url, files=files)
    
    if response.status_code == 200:
        result = response.json()
        
        print(f"\n✅ SUCCESS!")
        print(f"\n📊 KEY FIELDS:")
        print(f"   - riskScore: {result.get('riskScore', 'MISSING')}")
        print(f"   - total_score: {result.get('total_score', 'MISSING')}")
        print(f"   - risks count: {len(result.get('risks', []))}")
        print(f"   - legalStructure: {'Present' if 'legalStructure' in result else 'MISSING'}")
        print(f"   - financialRisks: {'Present' if 'financialRisks' in result else 'MISSING'}")
        print(f"   - economicImpact: {'Present' if 'economicImpact' in result else 'MISSING'}")
        
        print(f"\n📋 ALL TOP-LEVEL KEYS:")
        for key in result.keys():
            print(f"   - {key}")
        
        print(f"\n🎯 Expected by Frontend:")
        print(f"   ✓ riskScore: {result.get('riskScore')}")
        print(f"   ✓ risks: {len(result.get('risks', []))} items")
        
    else:
        print(f"\n❌ Error: {response.status_code}")
        print(response.text)

except Exception as e:
    print(f"\n❌ Error: {str(e)}")
