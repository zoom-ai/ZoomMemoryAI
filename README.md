# ZoomMemoryAI 🌌

ZoomMemoryAI is a full-stack digital memorial service designed to permanently archive various digital records (photos, videos, documents, etc.) and provide meaningful summaries and curated exhibitions using **AI curation**. Embracing the unique concepts of "lifetime records" and "afterlife preservation," it aims to be a digital sanctuary where you can reflect on precious memories anytime, anywhere.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Glassmorphism UI
- **Animations**: Framer Motion
- **i18n**: next-intl (English/Korean)
- **Icons**: Lucide-react

### Backend
- **Framework**: FastAPI (Python)
- **ORM**: SQLAlchemy
- **Database**: SQLite (Temporarily configured for local ease-of-use), PostgreSQL Ready
- **AI**: Google Gemini API (Document Summarization)
- **Text Extraction**: pdfplumber
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
> **Note**: You must provide a valid `GEMINI_API_KEY` in `backend/.env` for the AI summarization features to work. The system currently uses SQLite for local testing, so no database installation is required out-of-the-box.

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

## 🧠 Key Features
- **Premium UI & i18n**: Dark mode glassmorphism UI with fully integrated English and Korean support.
- **Asynchronous AI Summarization**: Automatically extracts text from uploaded PDF/TXT documents and generates a concise summary with relevant hashtags using the Gemini API via background tasks.
- **Dynamic Gallery Exhibition**: A Pinterest-style Bento Grid gallery that renders uploaded images, autoplaying videos, and AI-summarized document cards interactively.

## 🚀 Upcoming Features (Planned)
- **Metadata Extraction**: Automatically extract EXIF data (location/date) from photos.
- **Embedding & Curation**: Leverage `pgvector` (upon migration to PostgreSQL) to store vector values of records, enabling semantic search and similarity-based automatic exhibition generation.
- **Privacy Controls**: Manage the visibility of lifetime and afterlife records through `is_public` and `scheduled_release_date` flags.
