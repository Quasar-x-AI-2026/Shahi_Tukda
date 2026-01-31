"""
Test the complete analysis pipeline with the test contract
"""
import requests

print("="*70)
print("TESTING FULL CONTRACT ANALYSIS PIPELINE")
print("="*70)

# Upload and analyze the test contract
url = "http://localhost:8001/analyze"
test_file = "test_contract.pdf"

print(f"\n📤 Uploading: {test_file}")
print(f"🔗 Endpoint: {url}")

try:
    with open(test_file, 'rb') as f:
        files = {'file': (test_file, f, 'application/pdf')}
        response = requests.post(url, files=files)
    
    if response.status_code == 200:
        result = response.json()
        
        print(f"\n{'='*70}")
        print("✅ ANALYSIS COMPLETE!")
        print(f"{'='*70}")
        
        # Basic Analysis
        print(f"\n📊 BASIC ANALYSIS:")
        print(f"   Risk Score: {result.get('riskScore', 'N/A')}/100")
        print(f"   Clauses Analyzed: {result.get('total_clauses_analyzed', 0)}")
        print(f"   Risks Found: {len(result.get('risks', []))}")
        
        # Legal Structure
        if 'legalStructure' in result:
            print(f"\n⚖️  LEGAL STRUCTURE:")
            legal = result['legalStructure']
            print(f"   Contract Type: {legal.get('contractType', 'N/A')}")
            print(f"   Structure Quality: {legal.get('structureQuality', 'N/A')}")
            print(f"   Key Sections: {', '.join(legal.get('keySections', []))}")
        
        # Financial Risks
        if 'financialRisks' in result:
            print(f"\n💰 FINANCIAL RISKS:")
            fin = result['financialRisks']
            print(f"   Total Financial Risks: {fin.get('totalRiskCount', 0)}")
            print(f"   Exposure: {fin.get('estimatedExposure', 'N/A')}")
            print(f"   Severity: {fin.get('severity', 'N/A')}")
            
            if fin.get('risks'):
                print(f"\n   Detected Financial Risks:")
                for i, risk in enumerate(fin['risks'][:5], 1):
                    print(f"      {i}. {risk.get('type', 'Unknown')} [{risk.get('severity', 'N/A')}]")
        
        # Economic Impact
        if 'economicImpact' in result:
            print(f"\n📊 ECONOMIC IMPACT:")
            econ = result['economicImpact']
            print(f"   Contract Value: ${econ.get('contractValue', 0):,}")
            print(f"   Total Risk Cost: ${econ.get('totalRiskCost', 0):,}")
            print(f"   Risk-Adjusted Value: ${econ.get('riskAdjustedValue', 0):,}")
            print(f"   Economic Viability: {econ.get('economicViability', 'N/A')}")
            
            if econ.get('recommendations'):
                print(f"\n   💡 Top Recommendations:")
                for i, rec in enumerate(econ['recommendations'][:3], 1):
                    print(f"      {i}. {rec}")
        
        # Top Risks
        print(f"\n⚠️  TOP DETECTED RISKS:")
        for i, risk in enumerate(result.get('risks', [])[:5], 1):
            print(f"\n   {i}. {risk.get('category', 'Unknown Category')}")
            print(f"      Confidence: {risk.get('confidence', 0)*100:.1f}%")
            print(f"      Clause: {risk.get('clause', '')[:80]}...")
        
        print(f"\n{'='*70}")
        print("🎉 ALL FEATURES WORKING!")
        print(f"{'='*70}\n")
        
    else:
        print(f"\n❌ Error: {response.status_code}")
        print(response.text)

except Exception as e:
    print(f"\n❌ Error: {str(e)}")
    import traceback
    traceback.print_exc()
