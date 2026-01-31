from segmentation.segmenter import segment_text

# Sample contract text (realistic)
contract_text = """
INDEPENDENT CONTRACTOR AGREEMENT

This Agreement is entered into as of January 1, 2024.

1. Services. Contractor shall provide software development services as described in Exhibit A.

2. Payment Terms. Company shall pay Contractor within sixty (60) days of receipt of invoice. All payments are subject to approval.

3. Intellectual Property. All work product created by Contractor shall be the exclusive property of Company, including any pre-existing materials.

4. Non-Compete. During the term and for twenty-four (24) months following termination, Contractor shall not provide similar services to any competitor within a 100-mile radius.

5. Termination. Either party may terminate this Agreement with seven (7) days written notice. Contractor shall only be compensated for completed work.

6. Confidentiality. Contractor agrees to maintain strict confidentiality regarding all Company information, including but not limited to trade secrets, client lists, and business strategies.
"""

print("="*60)
print("TESTING CLAUSE EXTRACTION")
print("="*60)

clauses = segment_text(contract_text)

print(f"\n✅ Total Clauses Extracted: {len(clauses)}\n")

for i, clause in enumerate(clauses, 1):
    print(f"Clause {i}:")
    print(f"  {clause}")
    print()

print("="*60)
print(f"SUCCESS! Extracted {len(clauses)} clauses from contract")
print("="*60)
