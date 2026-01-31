from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch

def create_test_contract():
    """Create a realistic test contract PDF for OCR testing"""
    
    filename = "test_contract.pdf"
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter
    
    # Title
    c.setFont("Helvetica-Bold", 16)
    c.drawString(1*inch, height - 1*inch, "INDEPENDENT CONTRACTOR AGREEMENT")
    
    # Contract content
    c.setFont("Helvetica", 11)
    y = height - 1.5*inch
    
    contract_text = [
        "This Agreement is entered into as of January 15, 2024 between",
        "TechCorp Inc. (Company) and John Smith (Contractor).",
        "",
        "1. Services. Contractor shall provide software development services",
        "as described in Exhibit A attached hereto.",
        "",
        "2. Payment Terms. Company shall pay Contractor within sixty (60)",
        "days of receipt of invoice. All payments are subject to Company's",
        "approval and may be withheld at Company's sole discretion.",
        "",
        "3. Intellectual Property. All work product, inventions, and",
        "materials created by Contractor shall be the exclusive property",
        "of Company, including any pre-existing materials incorporated.",
        "",
        "4. Liability and Indemnification. Contractor agrees to indemnify",
        "and hold Company harmless from any and all claims, demands, losses,",
        "causes of action, damage, lawsuits with unlimited liability for",
        "any damages arising from Contractor's performance under this Agreement.",
        "",
        "5. Non-Compete Clause. During the term of this Agreement and for",
        "a period of twenty-four (24) months following termination, Contractor",
        "shall not engage in any business competing with Company within a",
        "radius of one hundred (100) miles from Company's principal place",
        "of business.",
        "",
        "6. Termination. Either party may terminate this Agreement with",
        "seven (7) days written notice. Upon termination, Contractor shall",
        "only be compensated for work completed and accepted by Company.",
        "",
        "7. Late Delivery Penalty. Contractor agrees to pay liquidated",
        "damages of $500 per day for each day of delay beyond the agreed",
        "delivery date.",
        "",
        "8. Confidentiality. Contractor shall maintain strict confidentiality",
        "regarding all Company information, trade secrets, client lists,",
        "and business strategies in perpetuity.",
    ]
    
    line_height = 0.2*inch
    for line in contract_text:
        if y < 1*inch:  # New page if needed
            c.showPage()
            c.setFont("Helvetica", 11)
            y = height - 1*inch
        
        c.drawString(1*inch, y, line)
        y -= line_height
    
    # Signature section
    y -= 0.5*inch
    if y < 2*inch:
        c.showPage()
        y = height - 1*inch
    
    c.setFont("Helvetica-Bold", 11)
    c.drawString(1*inch, y, "AGREED AND ACCEPTED:")
    y -= 0.5*inch
    
    c.setFont("Helvetica", 10)
    c.drawString(1*inch, y, "Company: ________________")
    c.drawString(4*inch, y, "Date: ________________")
    y -= 0.5*inch
    c.drawString(1*inch, y, "Contractor: ________________")
    c.drawString(4*inch, y, "Date: ________________")
    
    c.save()
    return filename

if __name__ == "__main__":
    filename = create_test_contract()
    print(f"✅ Test contract created: {filename}")
    print(f"📄 This contract contains multiple risky clauses for testing:")
    print("   - Net-60 payment terms")
    print("   - Unlimited liability")
    print("   - 24-month non-compete")
    print("   - IP ownership issues")
    print("   - Penalty clauses")
