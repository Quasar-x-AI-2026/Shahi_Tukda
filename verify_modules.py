import sys
sys.path.insert(0, '.')

print("Testing module imports...")

try:
    from reasoning.legal_structure_analyzer import legal_structure_analyzer
    print("✅ Legal Structure Analyzer loaded")
except Exception as e:
    print(f"❌ Legal Structure Analyzer failed: {e}")

try:
    from insights.financial_risk_detector import financial_risk_detector
    print("✅ Financial Risk Detector loaded")
except Exception as e:
    print(f"❌ Financial Risk Detector failed: {e}")

try:
    from insights.economic_impact_model import economic_impact_model
    print("✅ Economic Impact Model loaded")
except Exception as e:
    print(f"❌ Economic Impact Model failed: {e}")

# Quick test
contract = "Payment within 60 days. Unlimited liability. Non-compete for 24 months."
from segmentation.segmenter import segment_text
clauses = segment_text(contract)

result = legal_structure_analyzer.analyze_structure(contract, clauses)
print(f"\n✅ Legal Analysis: Contract Type = {result['contract_type']}")

mock_risks = [{'category': 'Financial Liability', 'clause': 'test', 'confidence': 0.8}]
fin_result = financial_risk_detector.detect_financial_risks(mock_risks, contract)
print(f"✅ Financial Analysis: {fin_result['total_risk_count']} risks detected")

econ_result = economic_impact_model.calculate_economic_impact(fin_result['financial_risks'])
print(f"✅ Economic Analysis: Risk cost = ${econ_result['total_risk_cost']:.2f}")

print("\n🎉 ALL MODULES WORKING!")
