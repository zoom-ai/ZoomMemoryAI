from fastapi import APIRouter, File, UploadFile, Depends, Form
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.utils.file_handler import save_upload_file
from app.schemas.schemas import MemoryResponse
from app.models.models import Memory
from datetime import datetime

router = APIRouter()

@router.post("/upload")
async def upload_memory(
    title: str = Form(...),
    file: UploadFile = File(...),
    is_public: bool = Form(False),
    # db: Session = Depends(get_db)  # Uncomment when DB is ready
):
    # Save file locally
    file_url, file_type = save_upload_file(file)
    
    # Normally user_id would come from auth token
    user_id = 1 

    # Return mock response until auth/DB is fully set up
    return {
        "message": "File uploaded successfully",
        "file_url": file_url,
        "file_type": file_type,
        "title": title
    }
