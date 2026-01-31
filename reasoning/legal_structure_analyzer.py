"""
Legal Structure Analyzer
Understands the overall structure and key components of legal contracts
"""
import re
from typing import Dict, List, Any

class LegalStructureAnalyzer:
    
    def __init__(self):
        self.contract_types = [
            "Employment Agreement",
            "Independent Contractor Agreement",
            "Non-Disclosure Agreement",
            "Service Agreement",
            "Partnership Agreement",
            "License Agreement"
        ]
        
    def analyze_structure(self, full_text: str, clauses: List[str]) -> Dict[str, Any]:
        """
        Analyzes the legal structure of the contract
        Returns insights about contract type, key sections, and parties
        """
        
        # Detect contract type
        contract_type = self._detect_contract_type(full_text)
        
        # Extract parties (simplified - looks for common patterns)
        parties = self._extract_parties(full_text)
        
        # Identify key sections
        sections = self._identify_sections(full_text, clauses)
        
        # Analyze contract duration/term
        term_info = self._analyze_term(full_text)
        
        return {
            "contract_type": contract_type,
            "parties": parties,
            "key_sections": sections,
            "term": term_info,
            "total_obligations": len(clauses),
            "structure_quality": self._assess_structure_quality(sections)
        }
    
    def _detect_contract_type(self, text: str) -> str:
        """Detect type of contract based on keywords"""
        text_lower = text.lower()
        
        for contract_type in self.contract_types:
            if contract_type.lower() in text_lower:
                return contract_type
                
        # Fallback detection based on keywords
        if "employment" in text_lower or "employee" in text_lower:
            return "Employment Agreement"
        elif "contractor" in text_lower or "independent" in text_lower:
            return "Independent Contractor Agreement"
        elif "confidential" in text_lower and "nda" in text_lower:
            return "Non-Disclosure Agreement"
        else:
            return "General Agreement"
    
    def _extract_parties(self, text: str) -> Dict[str, str]:
        """Extract party information from contract"""
        parties = {}
        
        # Look for common party patterns
        company_match = re.search(r'Company[:\s]*([A-Z][a-z\s&]+(?:Inc\.|LLC|Corp\.|Ltd\.)?)', text)
        contractor_match = re.search(r'Contractor[:\s]*([A-Z][a-z\s]+)', text)
        
        if company_match:
            parties['company'] = company_match.group(1).strip()
        if contractor_match:
            parties['contractor'] = contractor_match.group(1).strip()
            
        # Generic party detection
        if not parties:
            parties = {
                'party_1': 'First Party',
                'party_2': 'Second Party'
            }
        
        return parties
    
    def _identify_sections(self, text: str, clauses: List[str]) -> List[str]:
        """Identify major sections in the contract"""
        sections = []
        
        # Common section keywords
        section_keywords = [
            "Payment", "Compensation", "Termination", "Confidentiality",
            "Intellectual Property", "Non-Compete", "Indemnification",
            "Liability", "Warranties", "Governing Law"
        ]
        
        text_lower = text.lower()
        for keyword in section_keywords:
            if keyword.lower() in text_lower:
                sections.append(keyword)
        
        return sections
    
    def _analyze_term(self, text: str) -> Dict[str, Any]:
        """Analyze contract term/duration"""
        # Look for duration patterns
        duration_pattern = r'(\d+)\s*(year|month|day)s?'
        matches = re.findall(duration_pattern, text.lower())
        
        if matches:
            # Take the first significant duration found
            num, unit = matches[0]
            return {
                "duration": f"{num} {unit}(s)",
                "has_fixed_term": True
            }
        else:
            return {
                "duration": "Undefined",
                "has_fixed_term": False
            }
    
    def _assess_structure_quality(self, sections: List[str]) -> str:
        """Assess the quality/completeness of contract structure"""
        critical_sections = {"Payment", "Termination", "Liability"}
        found_critical = sum(1 for s in sections if s in critical_sections)
        
        if found_critical >= 3 and len(sections) >= 5:
            return "Comprehensive"
        elif found_critical >= 2:
            return "Standard"
        else:
            return "Basic"

# Singleton instance
legal_structure_analyzer = LegalStructureAnalyzer()
