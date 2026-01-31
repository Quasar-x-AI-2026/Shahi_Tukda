"""
Test the full contract analysis pipeline
"""
import requests

# Sample contract text
contract_text = """
CONTRACTOR AGREEMENT

Payment Terms: Company shall pay Contractor within sixty (60) days of invoice receipt.

Non-Compete: Contractor shall not engage in competing business for 24 months after termination within 100-mile radius.

Termination: Either party may terminate with seven (7) days notice.
"""

print("="*60)
print("TESTING FULL ANALYSIS PIPELINE")
print("="*60)

# Send to backend
url = "http://localhost:8001/analyze"
response = requests.post(url, data={"text": contract_text})

if response.status_code == 200:
    result = response.json()
    print(f"\n✅ Analysis Complete!")
    print(f"\n📊 Risk Score: {result['riskScore']}/100")
    print(f"\n📝 Total Clauses Analyzed: {result['total_clauses_analyzed']}")
    print(f"\n⚠️  Risks Found: {len(result['risks'])}\n")
    
    for i, risk in enumerate(result['risks'], 1):
        print(f"Risk {i}:")
        print(f"  Category: {risk['category']}")
        print(f"  Confidence: {risk['confidence']*100:.1f}%")
        print(f"  Clause: {risk['clause'][:80]}...")
        print()
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)
