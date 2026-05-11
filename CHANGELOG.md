# Changelog

All notable changes to the **ZoomMemoryAI** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-05-11

### Added
- **Premium Frontend UI/UX**: Completely revamped the UI with a Dark Mode space theme, Glassmorphism design, and Framer Motion animations.
- **Internationalization (i18n)**: Added English and Korean bilingual support using `next-intl` with a built-in Language Switcher.
- **Bento Grid Gallery**: Implemented a dynamic gallery view that gracefully handles and renders images, videos, and document summaries.
- **Real Database Integration**: Replaced the mock backend responses with an actual database. Temporarily utilizing SQLite for immediate local testing without PostgreSQL overhead.
- **AI Document Summarization**: Implemented a background task pipeline using the Gemini 1.5 Flash API to automatically extract text from PDFs/TXTs and generate a concise summary and hashtags for the gallery.

## [0.1.0] - 2026-05-11

### Added
- **Monorepo Structure**: Initialized a monorepo setup combining both frontend and backend directories.
- **Frontend Setup**: Scaffolded Next.js 15 (App Router) with TypeScript, Tailwind CSS, and Lucide-react icons.
- **Frontend Upload Page**: Added a simple file upload UI (`/upload`) with instant preview functionality using Next.js `<Image />` component.
- **Backend Setup**: Scaffolded FastAPI framework for the backend.
- **Database Schema**: Created initial SQLAlchemy models (`Users`, `Memories`, `Exhibitions`, `AI_Summaries`) supporting PostgreSQL.
- **pgvector Integration**: Added `embedding` column (1536 dimensions) to the `Memories` table to prepare for future AI semantic search and curation features.
- **Upload API**: Implemented a local file upload mechanism (`/api/memories/upload`) that stores files in `uploads/` directories (images, videos, docs) and generates unique UUID-based filenames.
- **Static File Serving**: Configured FastAPI `StaticFiles` to serve uploaded files and updated `next.config.ts` to allow fetching them from `localhost:8000`.
- **Documentation**: Added English `README.md` and this `CHANGELOG.md`.
