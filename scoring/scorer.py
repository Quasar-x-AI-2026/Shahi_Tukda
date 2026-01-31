
class RiskScorer:
    def __init__(self):
        self.base_score = 100
        # Define penalties for each risk category
        self.penalties = {
            "Financial Liability": 15,
            "Termination and Cancellation": 20, # High risk
            "Intellectual Property Ownership": 15,
            "Indemnification": 10,
            "Confidentiality": 5,
            "Payment Terms": 5
        }

    def calculate_score(self, risks: list) -> dict:
        """
        Calculates the final score based on a list of identified risks.
        Returns the score and a breakdown of deductions.
        """
        current_score = self.base_score
        breakdown = []

        for risk in risks:
            category = risk.get("category")
            confidence = risk.get("confidence", 0.0)
            
            # Skip low confidence risks (threshold customizable)
            if confidence < 0.5:
                continue

            penalty = self.penalties.get(category, 5) # Default 5 if unknown
            
            # Adjust penalty by confidence? Optional. For now, flat penalty.
            
            current_score -= penalty
            breakdown.append({
                "category": category,
                "clause": risk.get("clause", "")[:50] + "...",
                "penalty": -penalty,
                "reason": f"Detected {category}"
            })

        # Cap score between 0 and 100
        final_score = max(0, min(current_score, 100))

        return {
            "total_score": final_score,
            "breakdown": breakdown
        }

risk_scorer = RiskScorer()
