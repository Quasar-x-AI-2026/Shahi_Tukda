from reportlab.pdfgen import canvas

def create_sample_pdf(filename):
    c = canvas.Canvas(filename)
    c.drawString(100, 750, "Hello World!")
    c.drawString(100, 730, "This is a test for OCR.")
    c.drawString(100, 710, "1234567890")
    c.save()

if __name__ == "__main__":
    create_sample_pdf("sample.pdf")
    print("sample.pdf created.")
