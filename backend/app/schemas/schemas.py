from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

class MemoryBase(BaseModel):
    title: str
    is_public: bool = False
    scheduled_release_date: Optional[datetime] = None

class MemoryCreate(MemoryBase):
    pass

class MemoryResponse(MemoryBase):
    id: int
    user_id: int
    file_url: str
    file_type: str
    metadata_json: Optional[Dict[str, Any]] = None
    created_at: datetime

    class Config:
        from_attributes = True
