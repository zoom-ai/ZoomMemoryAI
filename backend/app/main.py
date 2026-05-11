from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from app.api import memories
from app.core.database import engine, SessionLocal
from app.models import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="ZoomMemoryAI API")

@app.on_event("startup")
def create_dummy_user():
    db = SessionLocal()
    try:
        user = db.query(models.User).filter(models.User.id == 1).first()
        if not user:
            dummy_user = models.User(email="test@example.com", password_hash="dummy")
            db.add(dummy_user)
            db.commit()
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload directories exist
os.makedirs("uploads/images", exist_ok=True)
os.makedirs("uploads/videos", exist_ok=True)
os.makedirs("uploads/docs", exist_ok=True)

# Mount static files
app.mount("/static/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(memories.router, prefix="/api/memories", tags=["Memories"])

@app.get("/")
def read_root():
    return {"message": "Welcome to ZoomMemoryAI Backend"}
