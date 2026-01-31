import sys
sys.path.insert(0, '.')

from segmentation.segmenter import segment_text

contract = """Payment shall be made within 60 days. The contractor agrees to non-compete terms. Either party may terminate with notice."""

print("Testing segmentation...")
clauses = segment_text(contract)
print(f"Found {len(clauses)} clauses:")
for i, c in enumerate(clauses, 1):
    print(f"{i}. {c}")
