"""
Financial Risk Detector
Identifies and quantifies financial risks in contracts
"""
import re
from typing import Dict, List, Any

class FinancialRiskDetector:
    
    def __init__(self):
        self.financial_keywords = {
            'payment_delay': ['net-60', 'net-90', 'within 60 days', 'within 90 days'],
            'penalties': ['penalty', 'liquidated damages', 'fine', 'forfeit'],
            'unlimited_liability': ['unlimited liability', 'any and all damages', 'no cap'],
            'payment_conditions': ['subject to approval', 'at discretion', 'may withhold'],
            'late_payment': ['interest', 'late fee', 'overdue'],
            'price_changes': ['adjust pricing', 'price increase', 'cost escalation']
        }
    
    def detect_financial_risks(self, clauses: List[Dict], full_text: str) -> Dict[str, Any]:
        """
        Detects financial risks across the contract
        Returns categorized financial risks with severity
        """
        
        financial_risks = []
        
        # Analyze payment terms
        payment_risks = self._analyze_payment_terms(full_text, clauses)
        financial_risks.extend(payment_risks)
        
        # Detect liability exposures
        liability_risks = self._detect_liability_risks(clauses)
        financial_risks.extend(liability_risks)
        
        # Find penalty clauses
        penalty_risks = self._find_penalties(full_text)
        financial_risks.extend(penalty_risks)
        
        # Calculate total financial exposure
        total_exposure = self._calculate_exposure(financial_risks)
        
        return {
            "financial_risks": financial_risks,
            "total_risk_count": len(financial_risks),
            "estimated_exposure": total_exposure,
            "severity": self._determine_severity(len(financial_risks), total_exposure)
        }
    
    def _analyze_payment_terms(self, text: str, clauses: List[Dict]) -> List[Dict]:
        """Analyze payment-related risks"""
        risks = []
        text_lower = text.lower()
        
        # Check for extended payment terms (Net-60, Net-90)
        if any(term in text_lower for term in ['net-60', 'net 60', '60 days', 'sixty days']):
            risks.append({
                "type": "Extended Payment Terms",
                "description": "Net-60 payment terms create cash flow risk",
                "severity": "Medium",
                "financial_impact": "moderate"
            })
        
        if any(term in text_lower for term in ['net-90', 'net 90', '90 days', 'ninety days']):
            risks.append({
                "type": "Extended Payment Terms",
                "description": "Net-90 payment terms create significant cash flow risk",
                "severity": "High",
                "financial_impact": "high"
            })
        
        # Check for conditional payment
        if 'subject to approval' in text_lower or 'may withhold' in text_lower:
            risks.append({
                "type": "Conditional Payment",
                "description": "Payments subject to discretionary approval",
                "severity": "High",
                "financial_impact": "high"
            })
        
        return risks
    
    def _detect_liability_risks(self, clauses: List[Dict]) -> List[Dict]:
        """Detect liability-related financial risks"""
        risks = []
        
        for clause_data in clauses:
            if clause_data.get('category') == 'Financial Liability':
                clause_text = clause_data.get('clause', '').lower()
                
                # Check for unlimited liability
                if 'unlimited' in clause_text or 'all damages' in clause_text:
                    risks.append({
                        "type": "Unlimited Liability",
                        "description": "No cap on financial liability exposure",
                        "severity": "Critical",
                        "financial_impact": "critical"
                    })
                
                # Check for indemnification
                if 'indemnify' in clause_text or 'hold harmless' in clause_text:
                    risks.append({
                        "type": "Indemnification Obligation",
                        "description": "Broad indemnification may lead to unexpected costs",
                        "severity": "High",
                        "financial_impact": "high"
                    })
        
        return risks
    
    def _find_penalties(self, text: str) -> List[Dict]:
        """Find penalty and fine clauses"""
        risks = []
        text_lower = text.lower()
        
        # Look for penalty amounts
        penalty_pattern = r'\$\s*([0-9,]+(?:\.\d{2})?)\s*(?:penalty|fine|liquidated damages)'
        matches = re.findall(penalty_pattern, text_lower)
        
        if matches:
            risks.append({
                "type": "Penalty Clause",
                "description": f"Contract includes penalty provisions",
                "severity": "Medium",
                "financial_impact": "moderate"
            })
        
        # General penalty language
        if any(word in text_lower for word in ['penalty', 'liquidated damages', 'forfeit']):
            if not matches:  # Don't duplicate if already found above
                risks.append({
                    "type": "Penalty Provisions",
                    "description": "Contract contains penalty language",
                    "severity": "Medium",
                    "financial_impact": "moderate"
                })
        
        return risks
    
    def _calculate_exposure(self, risks: List[Dict]) -> str:
        """Calculate estimated financial exposure"""
        severity_weights = {
            "Critical": 4,
            "High": 3,
            "Medium": 2,
            "Low": 1
        }
        
        total_weight = sum(severity_weights.get(r.get('severity', 'Low'), 1) for r in risks)
        
        if total_weight >= 10:
            return "Very High"
        elif total_weight >= 7:
            return "High"
        elif total_weight >= 4:
            return "Moderate"
        else:
            return "Low"
    
    def _determine_severity(self, risk_count: int, exposure: str) -> str:
        """Determine overall financial risk severity"""
        if exposure == "Very High" or risk_count >= 5:
            return "Critical"
        elif exposure == "High" or risk_count >= 3:
            return "High"
        elif risk_count >= 1:
            return "Medium"
        else:
            return "Low"

# Singleton instance
financial_risk_detector = FinancialRiskDetector()
