"""
Intelligence Report Generator
Creates comprehensive PDF reports for contract analysis
"""
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from datetime import datetime
import os

class IntelligenceReportGenerator:
    
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
    
    def _setup_custom_styles(self):
        """Setup custom paragraph styles for the report"""
        # Title style
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#1e40af'),
            spaceAfter=30,
            alignment=TA_CENTER
        ))
        
        # Section header
        self.styles.add(ParagraphStyle(
            name='SectionHeader',
            parent=self.styles['Heading2'],
            fontSize=16,
            textColor=colors.HexColor('#3b82f6'),
            spaceAfter=12,
            spaceBefore=20
        ))
        
        # Score style
        self.styles.add(ParagraphStyle(
            name='ScoreStyle',
            parent=self.styles['Normal'],
            fontSize=48,
            textColor=colors.HexColor('#ef4444'),
            alignment=TA_CENTER,
            spaceAfter=10
        ))
    
    def generate_report(self, analysis_data: dict, output_path: str = "contract_intelligence_report.pdf"):
        """
        Generate a comprehensive intelligence report PDF
        
        Args:
            analysis_data: Complete analysis data from backend
            output_path: Path where PDF will be saved
        """
        doc = SimpleDocTemplate(output_path, pagesize=letter,
                                rightMargin=72, leftMargin=72,
                                topMargin=72, bottomMargin=18)
        
        story = []
        
        # Title Page
        story.append(Spacer(1, 2*inch))
        story.append(Paragraph("CONTRACT INTELLIGENCE REPORT", self.styles['CustomTitle']))
        story.append(Spacer(1, 0.3*inch))
        story.append(Paragraph(f"Generated: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}", 
                              self.styles['Normal']))
        story.append(Spacer(1, 0.5*inch))
        
        # Executive Summary - Risk Score
        story.append(Paragraph("RISK ASSESSMENT", self.styles['SectionHeader']))
        risk_score = analysis_data.get('riskScore', 0)
        story.append(Paragraph(f"{risk_score}", self.styles['ScoreStyle']))
        story.append(Paragraph("Overall Risk Score (0-100)", self.styles['Normal']))
        story.append(Spacer(1, 0.3*inch))
        
        # Risk interpretation
        risk_level = "HIGH RISK" if risk_score >= 70 else "MEDIUM RISK" if risk_score >= 40 else "LOW RISK"
        risk_color = colors.red if risk_score >= 70 else colors.orange if risk_score >= 40 else colors.green
        
        interpretation_data = [[risk_level]]
        interpretation_table = Table(interpretation_data, colWidths=[6*inch])
        interpretation_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), risk_color),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.white),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 18),
            ('PADDING', (0, 0), (-1, -1), 12),
        ]))
        story.append(interpretation_table)
        story.append(Spacer(1, 0.5*inch))
        
        # Legal Structure
        if 'legalStructure' in analysis_data:
            story.append(PageBreak())
            story.append(Paragraph("⚖️ LEGAL STRUCTURE ANALYSIS", self.styles['SectionHeader']))
            
            legal = analysis_data['legalStructure']
            legal_data = [
                ['Contract Type:', legal.get('contractType', 'N/A')],
                ['Structure Quality:', legal.get('structureQuality', 'N/A')],
                ['Term:', legal.get('term', {}).get('duration', 'Undefined')],
                ['Key Sections:', ', '.join(legal.get('keySections', []))[:100]]
            ]
            
            legal_table = Table(legal_data, colWidths=[2*inch, 4.5*inch])
            legal_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#e0e7ff')),
                ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
                ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
                ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
                ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
                ('FONTSIZE', (0, 0), (-1, -1), 10),
                ('PADDING', (0, 0), (-1, -1), 8),
                ('GRID', (0, 0), (-1, -1), 1, colors.grey),
            ]))
            story.append(legal_table)
            story.append(Spacer(1, 0.3*inch))
        
        # Financial Risks
        if 'financialRisks' in analysis_data and analysis_data['financialRisks'].get('totalRiskCount', 0) > 0:
            story.append(PageBreak())
            story.append(Paragraph("💰 FINANCIAL RISK DETECTION", self.styles['SectionHeader']))
            
            fin = analysis_data['financialRisks']
            fin_summary = [
                ['Total Financial Risks:', str(fin.get('totalRiskCount', 0))],
                ['Estimated Exposure:', fin.get('estimatedExposure', 'N/A')],
                ['Severity:', fin.get('severity', 'N/A')]
            ]
            
            fin_table = Table(fin_summary, colWidths=[2.5*inch, 4*inch])
            fin_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#fef3c7')),
                ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
                ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
                ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 11),
                ('PADDING', (0, 0), (-1, -1), 10),
                ('GRID', (0, 0), (-1, -1), 1, colors.grey),
            ]))
            story.append(fin_table)
            story.append(Spacer(1, 0.2*inch))
            
            # Detailed risks
            story.append(Paragraph("Detected Risks:", self.styles['Heading3']))
            for idx, risk in enumerate(fin.get('risks', [])[:10], 1):  # Limit to top 10
                risk_text = f"{idx}. <b>{risk.get('type', 'Unknown')}</b> [{risk.get('severity', 'N/A')}]<br/>"
                risk_text += f"   {risk.get('description', 'No description')}"
                story.append(Paragraph(risk_text, self.styles['Normal']))
                story.append(Spacer(1, 0.1*inch))
        
        # Economic Impact
        if 'economicImpact' in analysis_data:
            story.append(PageBreak())
            story.append(Paragraph("📊 ECONOMIC IMPACT ANALYSIS", self.styles['SectionHeader']))
            
            econ = analysis_data['economicImpact']
            econ_data = [
                ['Contract Value:', f"${econ.get('contractValue', 0):,}"],
                ['Total Risk Cost:', f"${econ.get('totalRiskCost', 0):,}"],
                ['Risk-Adjusted Value:', f"${econ.get('riskAdjustedValue', 0):,}"],
                ['Risk Percentage:', f"{econ.get('riskPercentage', 0)}%"],
                ['Economic Viability:', econ.get('economicViability', 'N/A')]
            ]
            
            econ_table = Table(econ_data, colWidths=[2.5*inch, 4*inch])
            econ_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#dbeafe')),
                ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
                ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
                ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 11),
                ('PADDING', (0, 0), (-1, -1), 10),
                ('GRID', (0, 0), (-1, -1), 1, colors.grey),
            ]))
            story.append(econ_table)
            story.append(Spacer(1, 0.3*inch))
            
            # Recommendations
            if econ.get('recommendations'):
                story.append(Paragraph("💡 RECOMMENDATIONS", self.styles['Heading3']))
                for idx, rec in enumerate(econ['recommendations'], 1):
                    story.append(Paragraph(f"{idx}. {rec}", self.styles['Normal']))
                    story.append(Spacer(1, 0.1*inch))
        
        # Identified Risks (Detailed)
        if 'risks' in analysis_data and len(analysis_data['risks']) > 0:
            story.append(PageBreak())
            story.append(Paragraph("⚠️ IDENTIFIED RISKS (DETAILED)", self.styles['SectionHeader']))
            
            for idx, risk in enumerate(analysis_data['risks'][:15], 1):  # Top 15 risks
                risk_header = f"{idx}. {risk.get('category', 'Unknown Category')} - Confidence: {risk.get('confidence', 0)*100:.1f}%"
                story.append(Paragraph(f"<b>{risk_header}</b>", self.styles['Normal']))
                
                clause_text = risk.get('clause', 'No clause text available')[:200] + "..."
                story.append(Paragraph(f"<i>Clause: {clause_text}</i>", self.styles['Normal']))
                story.append(Paragraph(risk.get('explanation', ''), self.styles['Normal']))
                story.append(Spacer(1, 0.15*inch))
        
        # Build PDF
        doc.build(story)
        return output_path

# Singleton instance
intelligence_report_generator = IntelligenceReportGenerator()
