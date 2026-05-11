from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    memories = relationship("Memory", back_populates="owner")
    exhibitions = relationship("Exhibition", back_populates="owner")

class Memory(Base):
    __tablename__ = "memories"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    file_url = Column(String) # e.g., /static/uploads/images/uuid_filename.jpg
    file_type = Column(String) # image, video, document
    metadata_json = Column(JSON)
    is_public = Column(Boolean, default=False)
    scheduled_release_date = Column(DateTime, nullable=True)
    embedding = Column(Text, nullable=True) # SQLite 임시 호환용 (원래 Vector)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="memories")
    ai_summary = relationship("AISummary", back_populates="memory", uselist=False)

class AISummary(Base):
    __tablename__ = "ai_summaries"
    id = Column(Integer, primary_key=True, index=True)
    memory_id = Column(Integer, ForeignKey("memories.id"))
    summary_text = Column(Text)
    tags = Column(JSON)
    sentiment = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    memory = relationship("Memory", back_populates="ai_summary")

class Exhibition(Base):
    __tablename__ = "exhibitions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    theme = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="exhibitions")

class ExhibitionMemory(Base):
    __tablename__ = "exhibition_memories"
    exhibition_id = Column(Integer, ForeignKey("exhibitions.id"), primary_key=True)
    memory_id = Column(Integer, ForeignKey("memories.id"), primary_key=True)
    display_order = Column(Integer)
