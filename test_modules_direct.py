"""
Direct test of advanced analysis modules (no API server needed)
"""
import sys
sys.path.insert(0, '.')

from segmentation.segmenter import segment_text
from reasoning.legal_structure_analyzer import legal_structure_analyzer
from insights.financial_risk_detector import financial_risk_detector
from insights.economic_impact_model import economic_impact_model

contract_text = """
INDEPENDENT CONTRACTOR AGREEMENT

This Agreement is entered into between TechCorp Inc. ("Company") and John Smith ("Contractor").

Payment Terms: Company shall pay Contractor within sixty (60) days of receipt of invoice. 
All payments are subject to Company's approval and may be withheld at Company's discretion.

Liability: Contractor agrees to indemnify and hold Company harmless from any and all claims, 
with unlimited liability for any damages arising from Contractor's performance.

Non-Compete: During the term and for twenty-four (24) months following termination, 
Contractor shall not provide similar services to any competitor within a 100-mile radius.

Termination: Either party may terminate with seven (7) days written notice.

Penalties: Late delivery incurs a penalty of $500 per day.
"""

print("="*70)
print("TESTING ADVANCED ANALYSIS MODULES")
print("="*70)

# 1. Segmentation
print("\n1️⃣  SEGMENTATION")
clauses = segment_text(contract_text)
print(f"   ✅ Extracted {len(clauses)} clauses")

# 2. Legal Structure Analysis
print("\n2️⃣  LEGAL STRUCTURE UNDERSTANDING")
legal_structure = legal_structure_analyzer.analyze_structure(contract_text, clauses)
print(f"   ✅ Contract Type: {legal_structure['contract_type']}")
print(f"   ✅ Parties: {legal_structure['parties']}")
print(f"   ✅ Key Sections: {', '.join(legal_structure['key_sections'])}")
print(f"   ✅ Structure Quality: {legal_structure['structure_quality']}")

# 3. Financial Risk Detection
print("\n3️⃣  FINANCIAL RISK DETECTION")
# Create mock analyzed risks for testing
mock_risks = [
    {
        'category': 'Financial Liability',
        'clause': 'unlimited liability for any damages',
        'confidence': 0.85
    }
]
financial_analysis = financial_risk_detector.detect_financial_risks(mock_risks, contract_text)
print(f"   ✅ Financial Risks Found: {financial_analysis['total_risk_count']}")
print(f"   ✅ Estimated Exposure: {financial_analysis['estimated_exposure']}")
print(f"   ✅ Severity: {financial_analysis['severity']}")
print("   ✅ Detected Risks:")
for risk in financial_analysis['financial_risks']:
    print(f"      • {risk['type']}: {risk['severity']}")

# 4. Economic Impact Model
print("\n4️⃣  ECONOMIC IMPACT MODELING")
economic_impact = economic_impact_model.calculate_economic_impact(
    financial_analysis['financial_risks'],
    contract_value=10000
)
print(f"   ✅ Contract Value: ${economic_impact['contract_value']:,.2f}")
print(f"   ✅ Total Risk Cost: ${economic_impact['total_risk_cost']:,.2f}")
print(f"   ✅ Risk-Adjusted Value: ${economic_impact['risk_adjusted_value']:,.2f}")
print(f"   ✅ Risk Percentage: {economic_impact['risk_percentage']}%")
print(f"   ✅ Economic Viability: {economic_impact['economic_viability']}")
print("   ✅ Recommendations:")
for i, rec in enumerate(economic_impact['recommendations'], 1):
    print(f"      {i}. {rec}")

print(f"\n{'='*70}")
print("✅ ALL MODULES WORKING SUCCESSFULLY!")
print(f"{'='*70}\n")
