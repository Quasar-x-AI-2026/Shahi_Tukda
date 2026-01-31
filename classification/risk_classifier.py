from transformers import pipeline

class RiskClassifier:
    def __init__(self):
        print("Loading Zero-Shot Classification Model... This may take a while.")
        # Using a smaller model for development if memory is tight, but plan specified huge one.
        # We'll stick to 'facebook/bart-large-mnli' as per plan, but warn user about download size on first run.
        self.classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
        self.candidate_labels = [
            "Financial Liability",
            "Termination and Cancellation",
            "Payment Terms",
            "Intellectual Property Ownership",
            "Confidentiality",
            "Indemnification",
            "Safe Clause" 
        ]

    def classify_clause(self, clause_text: str):
        """
        Classifies a single clause into one of the risk categories.
        Returns a dictionary with category and confidence.
        """
        # Run classification
        result = self.classifier(clause_text, self.candidate_labels)
        
        # Get top prediction
        top_label = result['labels'][0]
        top_score = result['scores'][0]

        # Basic logic: If "Safe Clause" is top pick but confidence is low, it might still be risky.
        # But for now, we trust the model's top pick.
        
        risk_level = "High" if top_label in ["Financial Liability", "Indemnification", "Termination and Cancellation"] else "Low"
        if top_label == "Safe Clause":
            risk_level = "Safe"

        return {
            "clause": clause_text,
            "category": top_label,
            "confidence": round(top_score, 4),
            "risk_level": risk_level
        }

# Singleton instance to avoid reloading model
risk_classifier = RiskClassifier()
