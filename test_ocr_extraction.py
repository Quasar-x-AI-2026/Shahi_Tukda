"""
Test OCR extraction on the test contract
"""
from ocr import extract_text
import os

print("="*70)
print("TESTING OCR EXTRACTION")
print("="*70)

# Test file
test_file = "test_contract.pdf"

if not os.path.exists(test_file):
    print(f"❌ Error: {test_file} not found!")
    exit(1)

print(f"\n📄 Extracting text from: {test_file}")
print("-"*70)

try:
    # Run OCR
    extracted_text = extract_text(test_file)
    
    print(f"\n✅ OCR Extraction Successful!")
    print(f"\n📊 Statistics:")
    print(f"   - Total characters: {len(extracted_text)}")
    print(f"   - Total lines: {len(extracted_text.splitlines())}")
    print(f"   - Total words: {len(extracted_text.split())}")
    
    print(f"\n📝 Extracted Text Preview (first 500 chars):")
    print("-"*70)
    print(extracted_text[:500])
    print("...")
    print("-"*70)
    
    print(f"\n📝 Full Extracted Text:")
    print("="*70)
    print(extracted_text)
    print("="*70)
    
    # Check for key phrases
    print(f"\n🔍 Checking for key contract phrases:")
    key_phrases = [
        "INDEPENDENT CONTRACTOR AGREEMENT",
        "sixty (60) days",
        "unlimited liability",
        "twenty-four (24) months",
        "Non-Compete",
        "liquidated damages"
    ]
    
    for phrase in key_phrases:
        if phrase.lower() in extracted_text.lower():
            print(f"   ✅ Found: '{phrase}'")
        else:
            print(f"   ⚠️  Missing: '{phrase}'")
    
except Exception as e:
    print(f"\n❌ OCR Failed: {str(e)}")
    import traceback
    traceback.print_exc()
