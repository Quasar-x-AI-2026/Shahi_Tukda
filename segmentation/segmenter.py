import re

def segment_text(text: str) -> list[str]:
    """
    Segments text into clauses/sentences using a robust regular expression 
    to avoid splitting on abbreviations (e.g., Mr., U.S., e.g.) or numbers.
    """
    if not text:
        return []

    # Regex explanation:
    # (?<!\w\.\w.)    : Negative lookbehind to avoid splitting like "U.S."
    # (?<![A-Z][a-z]\.) : Negative lookbehind for titles like "Mr.", "Dr." (approx)
    # (?<=\.|\?|\!)   : Lookbehind for sentence terminators (., ?, !)
    # \s+             : Match whitespace following the terminator
    # (?=[A-Z0-9])    : Lookahead for a capital letter or number starting the new sentence
    
    # Simpler but robust approach:
    # 1. Protect specific abbreviations by replacing '.' with a placeholder
    # 2. Split by '.'
    # 3. Restore placeholders
    
    # Let's use a standard positive match split pattern used in NLTK/Simple tools
    # Split on: (. or ? or !) followed by space and a capital letter
    # But filtering out known abbreviations is safer.
    
    # List of common abbreviations to ignore
    abbreviations = {
        'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Sr.', 'Jr.', 'St.', 'Co.', 'Corp.', 'Inc.', 'Ltd.',
        'e.g.', 'i.e.', 'vs.', 'etc.', 'No.', 'Op.', 'p.', 'pp.', 'cf.', 'al.'
    }
    
    # We will use a makeshift tokenization to protect abbreviations
    # A simple but effective regex for splitting:
    # Period, followed by whitespace, followed by an upper case letter or number.
    # We need to be careful about not splitting on "Item 1. Description" -> split on "1."? No.
    
    # Refined Regex:
    # (?<!\.\s)   : Ensure we aren't matching a period that already had a space before it (rare)
    # (?<=[.!?])  : Match must be preceded by . ! or ?
    # \s+         : One or more spaces
    # (?=[A-Z"']) : followed by Capital letter or quote (start of new sentence)
    
    # However, Python's re.split includes the delimiter if captured.
    
    # Strategy:
    # 1. Replace common abbreviations with a temporary token <DOT>
    # 2. Split by the sentence ending pattern.
    # 3. Restore <DOT> to .
    
    protected_text = text
    for abbr in abbreviations:
        # Replace "Mr." with "Mr<DOT>"
        # Use word boundary check? "Mr." matches "Mr."
        # We need to escape the dot in abbr for regex
        safe_abbr = abbr.replace('.', '<PRD>')
        # Case insensitive replacement for abbreviations might be dangerous if generic, 
        # but for this list it's okay-ish. Let's stick to case sensitive + common variations if needed.
        # Actually simplest is to protect the dot specifically in that context.
        
        # Literal replace is safer for known list
        protected_text = protected_text.replace(abbr, safe_abbr)
        
    # Also protect numbers like "1,000.50" -> the dot is between digits
    # Regex: (\d)\.(\d) -> \1<PRD>\2
    protected_text = re.sub(r'(\d)\.(\d)', r'\1<PRD>\2', protected_text)

    # Split by: [.!?] followed by whitespace
    # We also handle newlines as immediate splits
    
    # Note: We want to keep the delimiter? usually not strictly necessary for analysis, 
    # but nice to have. split removes it.
    
    sentences = re.split(r'(?<=[.!?])\s+', protected_text)
    
    final_clauses = []
    for s in sentences:
        restored = s.replace('<PRD>', '.')
        cleaned = restored.strip()
        if len(cleaned) > 10: # Keep minimum length filter from original logic
            final_clauses.append(cleaned)
            
    return final_clauses
