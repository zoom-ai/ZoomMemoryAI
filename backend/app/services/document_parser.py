import pdfplumber
import os

def extract_text_from_file(file_path: str) -> str:
    """Extracts text from a given file path based on its extension."""
    if not os.path.exists(file_path):
        return ""
        
    ext = os.path.splitext(file_path)[1].lower()
    text = ""
    
    try:
        if ext == ".pdf":
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    extracted = page.extract_text()
                    if extracted:
                        text += extracted + "\n"
        elif ext == ".txt":
            with open(file_path, "r", encoding="utf-8") as f:
                text = f.read()
    except Exception as e:
        print(f"Error extracting text from {file_path}: {e}")
        
    return text.strip()
