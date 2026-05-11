from fastapi import APIRouter, File, UploadFile, Depends, Form, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.utils.file_handler import save_upload_file
from app.schemas.schemas import MemoryResponse
from app.models.models import Memory, AISummary
from datetime import datetime
import os
from app.services.document_parser import extract_text_from_file
from app.services.ai_summarizer import summarize_text

router = APIRouter()

def process_document_background(memory_id: int, file_path: str, db: Session):
    try:
        # 1. Extract text
        text = extract_text_from_file(file_path)
        if not text:
            return
            
        # 2. Summarize
        result = summarize_text(text)
        
        # 3. Save to DB
        summary = AISummary(
            memory_id=memory_id,
            summary_text=result.get("summary", ""),
            tags=result.get("tags", []),
            created_at=datetime.utcnow()
        )
        db.add(summary)
        db.commit()
    except Exception as e:
        print(f"Background task error: {e}")
        db.rollback()
    finally:
        db.close()


@router.post("/upload", response_model=MemoryResponse)
async def upload_memory(
    background_tasks: BackgroundTasks,
    title: str = Form(...),
    file: UploadFile = File(...),
    is_public: bool = Form(False),
    db: Session = Depends(get_db)
):
    # Save file locally
    file_url, file_type = save_upload_file(file)
    
    # Normally user_id would come from auth token
    user_id = 1 

    # Save to DB
    new_memory = Memory(
        user_id=user_id,
        title=title,
        file_url=file_url,
        file_type=file_type,
        is_public=is_public,
        created_at=datetime.utcnow()
    )
    db.add(new_memory)
    db.commit()
    db.refresh(new_memory)
    
    # Trigger background task for document summarization
    if file_type.startswith("document") or file_type == "document":
        file_path = os.path.join(".", file_url.lstrip("/")) # e.g. ./static/uploads/docs/...
        # Note: We create a new session for the background task to avoid thread issues
        from app.core.database import SessionLocal
        bg_db = SessionLocal()
        background_tasks.add_task(process_document_background, new_memory.id, file_path, bg_db)
    
    return new_memory

from sqlalchemy.orm import joinedload

@router.get("", response_model=list[MemoryResponse])
def get_memories(db: Session = Depends(get_db)):
    memories = db.query(Memory).options(joinedload(Memory.ai_summary)).order_by(Memory.created_at.desc()).all()
    return memories
