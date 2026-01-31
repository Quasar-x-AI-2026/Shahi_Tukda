"""
Test the advanced analysis features:
- Legal Structure Understanding
- Financial Risk Detection  
- Economic Impact Modeling
"""
import requests
import json

contract_text = """
INDEPENDENT CONTRACTOR AGREEMENT

This Agreement is entered into between TechCorp Inc. ("Company") and John Smith ("Contractor").

1. Services. Contractor shall provide software development services.

2. Payment Terms. Company shall pay Contractor within sixty (60) days of receipt of invoice. 
All payments are subject to Company's approval and may be withheld at Company's discretion.

3. Intellectual Property. All work product shall be the exclusive property of Company.

4. Liability. Contractor agrees to indemnify and hold Company harmless from any and all claims, 
with unlimited liability for any damages arising from Contractor's performance.

5. Non-Compete. During the term and for twenty-four (24) months following termination, 
Contractor shall not provide similar services to any competitor within a 100-mile radius.

6. Termination. Either party may terminate with seven (7) days written notice. 
Contractor forfeits payment for incomplete work.

7. Penalties. Late delivery incurs a penalty of $500 per day.
"""

print("="*70)
print("TESTING ADVANCED CONTRACT ANALYSIS")
print("="*70)

# Send to backend
url = "http://localhost:8001/analyze"
response = requests.post(url, data={"text": contract_text})

if response.status_code == 200:
    result = response.json()
    
    print(f"\n{'='*70}")
    print("📋 BASIC ANALYSIS")
    print(f"{'='*70}")
    print(f"Risk Score: {result['riskScore']}/100")
    print(f"Clauses Analyzed: {result['total_clauses_analyzed']}")
    print(f"Risks Found: {len(result['risks'])}")
    
    print(f"\n{'='*70}")
    print("⚖️  LEGAL STRUCTURE UNDERSTANDING")
    print(f"{'='*70}")
    legal = result['legalStructure']
    print(f"Contract Type: {legal['contractType']}")
    print(f"Parties: {json.dumps(legal['parties'], indent=2)}")
    print(f"Key Sections: {', '.join(legal['keySections'])}")
    print(f"Term: {legal['term']}")
    print(f"Structure Quality: {legal['structureQuality']}")
    
    print(f"\n{'='*70}")
    print("💰 FINANCIAL RISK DETECTION")
    print(f"{'='*70}")
    fin = result['financialRisks']
    print(f"Total Financial Risks: {fin['totalRiskCount']}")
    print(f"Estimated Exposure: {fin['estimatedExposure']}")
    print(f"Severity: {fin['severity']}")
    print(f"\nDetected Risks:")
    for risk in fin['risks']:
        print(f"  • {risk['type']}: {risk['description']} [{risk['severity']}]")
    
    print(f"\n{'='*70}")
    print("📊 ECONOMIC IMPACT MODEL")
    print(f"{'='*70}")
    econ = result['economicImpact']
    print(f"Contract Value: ${econ['contractValue']:,.2f}")
    print(f"Total Risk Cost: ${econ['totalRiskCost']:,.2f}")
    print(f"Risk Adjusted Value: ${econ['riskAdjustedValue']:,.2f}")
    print(f"Risk Percentage: {econ['riskPercentage']}%")
    print(f"Economic Viability: {econ['economicViability']}")
    print(f"\nRecommendations:")
    for i, rec in enumerate(econ['recommendations'], 1):
        print(f"  {i}. {rec}")
    
    print(f"\n{'='*70}")
    print("✅ ALL ADVANCED FEATURES WORKING!")
    print(f"{'='*70}\n")
    
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)
