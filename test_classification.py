from classification.risk_classifier import risk_classifier

def test_classifier():
    print("\n--- Testing Risk Classifier ---\n")

    test_cases = [
        # 1. Termination (High Risk)
        {
            "text": "The Company may terminate this Agreement at any time without cause and without notice.",
            "expected_category": "Termination and Cancellation"
        },
        # 2. Indemnification (High Risk)
        {
            "text": "The Contractor agrees to indemnify, defend, and hold harmless the Company from any claims.",
            "expected_category": "Indemnification"
        },
        # 3. Liability (High Risk)
        {
            "text": "In no event shall the Company be liable for any indirect, incidental, or consequential damages.",
            "expected_category": "Financial Liability"
        },
        # 4. Payment (Medium/Low Risk)
        {
            "text": "Payment shall be made within 30 days of receipt of a valid invoice.",
            "expected_category": "Payment Terms"
        },
        # 5. IP Ownership (High Risk)
        {
            "text": "All Intellectual Property Rights generated during the term shall belong solely to the Company.",
            "expected_category": "Intellectual Property Ownership"
        },
        # 6. Confidentiality (Medium Risk)
        {
            "text": "Each party agrees to keep confidential all non-public information disclosed by the other party.",
            "expected_category": "Confidentiality"
        },
        # 7. Safe / General (No Risk)
        {
            "text": "This Agreement constitutes the entire agreement between the parties.",
            "expected_category": "Safe Clause"
        },
        # 8. Ambiguous / Mixed
        {
             "text": "The project timeline typically spans 3 months, unless delayed by force majeure.",
             # Could be Safe or maybe Termination/Liability if force majeure is strict. 
             # Let's see what it predicts.
             "expected_category": "Safe Clause" 
        }
    ]

    passed = 0
    for case in test_cases:
        print(f"\nAnalyzing: {case['text'][:60]}...")
        result = risk_classifier.classify_clause(case['text'])
        
        category = result['category']
        confidence = result['confidence']
        risk_level = result['risk_level']
        
        print(f"  -> Prediction: {category} ({confidence:.2f}) - Risk: {risk_level}")
        print(f"  -> Expected:   {case['expected_category']}")
        
        if category == case['expected_category']:
            print("  [PASS]")
            passed += 1
        else:
            print("  [FAIL] - Prediction mismatch")

    print(f"\nTotal Passed: {passed}/{len(test_cases)}")

if __name__ == "__main__":
    test_classifier()
