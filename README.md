# ZoomMemoryAI 🌌

ZoomMemoryAI is a full-stack digital memorial service designed to permanently archive various digital records (photos, videos, documents, etc.) and provide meaningful summaries and curated exhibitions using **AI curation**. Embracing the unique concepts of "lifetime records" and "afterlife preservation," it aims to be a digital sanctuary where you can reflect on precious memories anytime, anywhere.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide-react

### Backend
- **Framework**: FastAPI (Python)
- **ORM**: SQLAlchemy
- **Database**: PostgreSQL
- **Vector DB**: `pgvector` extension (for AI curation & semantic search)
- **Data Validation**: Pydantic

---

## 📁 Project Structure

This project is structured as a Monorepo, integrating both the frontend and backend in a single repository for easier management.

```text
ZoomMemoryAI/
├── frontend/               # Next.js Frontend Application
│   ├── src/app/            # App Router pages (e.g., /upload)
│   ├── public/             # Static assets
│   └── next.config.ts      # Next.js config (e.g., allow backend image loading)
│
├── backend/                # FastAPI Backend Application
│   ├── app/
│   │   ├── api/            # API routers (e.g., /api/memories/upload)
│   │   ├── core/           # DB connection & core configs
│   │   ├── models/         # SQLAlchemy database models
│   │   ├── schemas/        # Pydantic validation schemas
│   │   └── main.py         # FastAPI entry point
│   ├── uploads/            # Local file storage (images, videos, docs)
│   └── requirements.txt    # Backend dependencies
```

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### 1. Backend Setup (FastAPI)

```bash
cd backend

# Create and activate a virtual environment (Recommended)
python -m venv venv
source venv/bin/activate  # Mac/Linux
# venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Run the server (http://localhost:8000)
uvicorn app.main:app --reload
```
> **Note**: To connect to the database, you must update the PostgreSQL URL in `app/core/database.py` according to your local setup. Ensure the `pgvector` extension is installed in your PostgreSQL database.

### 2. Frontend Setup (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Run the development server (http://localhost:3000)
npm run dev
```

### 3. File Upload Test
Open your browser and navigate to `http://localhost:3000/upload`. Try uploading a file; it will be saved in the backend (`backend/uploads/`), and upon success, an image preview will be rendered on the screen.

---

## 🧠 Key Features (Planned)
- **Metadata Extraction**: Automatically extract EXIF data (location/date) from photos and properties from documents upon upload.
- **Asynchronous AI Summarization**: Analyze and summarize images/documents using LLMs via background tasks.
- **Embedding & Curation**: Leverage `pgvector` to store vector values of records in the DB, enabling similarity-based automatic exhibition generation.
- **Privacy Controls**: Manage the visibility of lifetime and afterlife records through `is_public` and `scheduled_release_date` flags.
