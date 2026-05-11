import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY and GEMINI_API_KEY != "your_gemini_api_key_here":
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
else:
    model = None

def summarize_text(text: str):
    """
    Summarizes the text using Gemini API and extracts 3 keywords.
    Returns a dict: {"summary": str, "tags": list[str]}
    """
    if not text:
        return {"summary": "No text content found in the document.", "tags": []}
        
    if not model:
        # Fallback if no API key is provided
        words = text.split()
        summary = " ".join(words[:30]) + "..." if len(words) > 30 else text
        return {
            "summary": f"[MOCK SUMMARY] {summary}",
            "tags": ["mock", "document", "test"]
        }
        
    prompt = f"""
You are an expert archivist. Please read the following document text and provide:
1. A concise summary of its main points (in the language of the document, 2-3 sentences).
2. Up to 3 relevant tags/keywords (in the language of the document).

Return ONLY a valid JSON object exactly like this format (no markdown blocks):
{{
  "summary": "...",
  "tags": ["tag1", "tag2", "tag3"]
}}

Document Text:
{text[:15000]}
"""
    
    try:
        response = model.generate_content(prompt)
        result_text = response.text.strip()
        # Strip markdown json blocks if gemini returns them
        if result_text.startswith("```json"):
            result_text = result_text[7:-3].strip()
        elif result_text.startswith("```"):
            result_text = result_text[3:-3].strip()
            
        data = json.loads(result_text)
        return {
            "summary": data.get("summary", "Summary generation failed."),
            "tags": data.get("tags", [])
        }
    except Exception as e:
        print(f"Gemini API error: {e}")
        return {"summary": "Failed to generate summary.", "tags": ["error"]}
