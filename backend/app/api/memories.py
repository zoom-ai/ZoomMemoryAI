from fastapi import APIRouter, File, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.utils.file_handler import save_upload_file
from app.schemas.schemas import MemoryResponse
from app.models.models import Memory
from datetime import datetime

router = APIRouter()

@router.post("/upload", response_model=MemoryResponse)
async def upload_memory(
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
    
    return new_memory

@router.get("", response_model=list[MemoryResponse])
def get_memories(db: Session = Depends(get_db)):
    memories = db.query(Memory).order_by(Memory.created_at.desc()).all()
    return memories
