"""
Economic Impact Model
Quantifies the economic impact of contract risks
"""
from typing import Dict, List, Any

class EconomicImpactModel:
    
    def __init__(self):
        # Base cost estimates for different risk types (in USD)
        self.risk_cost_estimates = {
            "Extended Payment Terms": {
                "Net-60": 500,  # Cost of capital for 60 days
                "Net-90": 1000  # Cost of capital for 90 days
            },
            "Conditional Payment": 2000,  # Risk of payment withholding
            "Unlimited Liability": 10000,  # Potential unlimited exposure
            "Indemnification Obligation": 5000,  # Legal defense costs
            "Penalty Clause": 1500,  # Average penalty exposure
            "Non-Compete": 3000,  # Opportunity cost
            "Termination Risk": 2500  # Revenue loss risk
        }
        
        self.severity_multipliers = {
            "Critical": 3.0,
            "High": 2.0,
            "Medium": 1.5,
            "Low": 1.0
        }
    
    def calculate_economic_impact(
        self, 
        financial_risks: List[Dict],
        contract_value: float = 10000  # Default contract value
    ) -> Dict[str, Any]:
        """
        Calculates the economic impact of identified risks
        Returns financial projections and cost breakdowns
        """
        
        # Calculate direct costs
        direct_costs = self._calculate_direct_costs(financial_risks)
        
        # Calculate opportunity costs
        opportunity_costs = self._calculate_opportunity_costs(financial_risks)
        
        # Calculate risk-adjusted value
        total_risk_cost = direct_costs + opportunity_costs
        risk_adjusted_value = contract_value - total_risk_cost
        risk_percentage = (total_risk_cost / contract_value * 100) if contract_value > 0 else 0
        
        # Generate recommendations
        recommendations = self._generate_recommendations(financial_risks, total_risk_cost)
        
        return {
            "contract_value": contract_value,
            "estimated_direct_costs": round(direct_costs, 2),
            "estimated_opportunity_costs": round(opportunity_costs, 2),
            "total_risk_cost": round(total_risk_cost, 2),
            "risk_adjusted_value": round(risk_adjusted_value, 2),
            "risk_percentage": round(risk_percentage, 2),
            "economic_viability": self._assess_viability(risk_percentage),
            "recommendations": recommendations
        }
    
    def _calculate_direct_costs(self, financial_risks: List[Dict]) -> float:
        """Calculate direct financial costs of risks"""
        total_cost = 0
        
        for risk in financial_risks:
            risk_type = risk.get('type', '')
            severity = risk.get('severity', 'Low')
            
            # Get base cost estimate
            base_cost = self.risk_cost_estimates.get(risk_type, 1000)
            
            # Handle nested dictionaries (like Extended Payment Terms)
            if isinstance(base_cost, dict):
                base_cost = list(base_cost.values())[0]  # Take first value
            
            # Apply severity multiplier
            multiplier = self.severity_multipliers.get(severity, 1.0)
            total_cost += base_cost * multiplier
        
        return total_cost
    
    def _calculate_opportunity_costs(self, financial_risks: List[Dict]) -> float:
        """Calculate opportunity costs (time, resources, alternatives)"""
        opportunity_cost = 0
        
        for risk in financial_risks:
            risk_type = risk.get('type', '')
            
            # Opportunity costs for specific risk types
            if 'Non-Compete' in risk_type:
                opportunity_cost += 3000  # Lost business opportunities
            
            if 'Extended Payment' in risk_type:
                opportunity_cost += 300  # Cash flow impact
            
            if 'Termination' in risk_type:
                opportunity_cost += 1500  # Contract uncertainty
        
        return opportunity_cost
    
    def _assess_viability(self, risk_percentage: float) -> str:
        """Assess economic viability based on risk percentage"""
        if risk_percentage >= 50:
            return "Not Recommended - High Risk to Value Ratio"
        elif risk_percentage >= 30:
            return "Caution Advised - Significant Risk Exposure"
        elif risk_percentage >= 15:
            return "Acceptable with Negotiations"
        else:
            return "Economically Viable"
    
    def _generate_recommendations(self, financial_risks: List[Dict], total_cost: float) -> List[str]:
        """Generate actionable recommendations"""
        recommendations = []
        
        # Check for specific risk patterns
        has_payment_risk = any('Payment' in r.get('type', '') for r in financial_risks)
        has_liability_risk = any('Liability' in r.get('type', '') for r in financial_risks)
        has_termination_risk = any('Termination' in r.get('type', '') for r in financial_risks)
        
        if has_payment_risk:
            recommendations.append("Negotiate for shorter payment terms (Net-30 instead of Net-60/90)")
        
        if has_liability_risk:
            recommendations.append("Request a liability cap or obtain insurance coverage")
        
        if has_termination_risk:
            recommendations.append("Seek longer notice period or termination fee provisions")
        
        if total_cost > 5000:
            recommendations.append("Consider requesting contract value increase to offset risks")
        
        if len(financial_risks) >= 4:
            recommendations.append("Comprehensive legal review recommended before signing")
        
        # Fallback recommendation
        if not recommendations:
            recommendations.append("Standard contract terms - minimal concerns")
        
        return recommendations

# Singleton instance
economic_impact_model = EconomicImpactModel()
