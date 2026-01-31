from ocr import extract_text

file_path = "sample.pdf"

print("Running OCR...")
text = extract_text(file_path)

print("\n===== OCR OUTPUT =====\n")
print(text[:2000])  # print first 2000 characters

