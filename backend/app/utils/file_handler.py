import os
import uuid
import shutil
from fastapi import UploadFile

UPLOAD_DIR = "uploads"
IMAGE_DIR = os.path.join(UPLOAD_DIR, "images")
VIDEO_DIR = os.path.join(UPLOAD_DIR, "videos")
DOC_DIR = os.path.join(UPLOAD_DIR, "docs")

def get_file_type(content_type: str) -> str:
    if content_type.startswith("image/"):
        return "image"
    elif content_type.startswith("video/"):
        return "video"
    else:
        return "document"

def get_target_dir(file_type: str) -> str:
    if file_type == "image":
        return IMAGE_DIR
    elif file_type == "video":
        return VIDEO_DIR
    else:
        return DOC_DIR

def save_upload_file(upload_file: UploadFile) -> tuple[str, str]:
    """
    Saves the uploaded file to the local directory with a UUID name.
    Returns (local_path, file_type)
    """
    file_type = get_file_type(upload_file.content_type)
    target_dir = get_target_dir(file_type)
    
    # Extract extension
    ext = os.path.splitext(upload_file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{ext}"
    
    file_path = os.path.join(target_dir, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
        
    static_url = f"/static/{target_dir}/{unique_filename}"
    return static_url, file_type
