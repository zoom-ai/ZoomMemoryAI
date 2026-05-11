# ZoomMemoryAI 🌌

ZoomMemoryAI는 사용자의 다양한 디지털 기록(사진, 동영상, 문서 등)을 영구적으로 아카이빙하고, **AI 큐레이션**을 통해 의미 있는 요약 및 전시(Exhibition)를 제공하는 풀스택 서비스입니다. '생전 기록'과 '사후 보존'이라는 특별한 개념을 담아, 언제 어디서든 소중한 기억을 되돌아볼 수 있는 디지털 기념관을 지향합니다.

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
- **Vector DB**: `pgvector` 확장 (AI 큐레이션 및 시맨틱 검색용)
- **Data Validation**: Pydantic

---

## 📁 Project Structure

본 프로젝트는 프론트엔드와 백엔드를 통합 관리하는 Monorepo 형태로 구성되어 있습니다.

```text
ZoomMemoryAI/
├── frontend/               # Next.js 프론트엔드 애플리케이션
│   ├── src/app/            # App Router 페이지 (e.g., /upload)
│   ├── public/             # 정적 에셋
│   └── next.config.ts      # Next.js 설정 (백엔드 이미지 로딩 허용 등)
│
├── backend/                # FastAPI 백엔드 애플리케이션
│   ├── app/
│   │   ├── api/            # API 라우터 (e.g., /api/memories/upload)
│   │   ├── core/           # DB 연결 및 코어 설정
│   │   ├── models/         # SQLAlchemy 데이터베이스 스키마
│   │   ├── schemas/        # Pydantic 검증 모델
│   │   └── main.py         # FastAPI 진입점
│   ├── uploads/            # 로컬 파일 스토리지 (images, videos, docs)
│   └── requirements.txt    # 백엔드 의존성
```

---

## 🚀 Getting Started

로컬 환경에서 프로젝트를 실행하는 방법입니다.

### 1. Backend Setup (FastAPI)

```bash
cd backend

# 가상환경 생성 및 활성화 (권장)
python -m venv venv
source venv/bin/activate  # Mac/Linux
# venv\Scripts\activate   # Windows

# 의존성 설치
pip install -r requirements.txt

# 서버 실행 (http://localhost:8000)
uvicorn app.main:app --reload
```
> **Note**: 데이터베이스를 연결하려면 `app/core/database.py` 내의 PostgreSQL URL을 본인의 환경에 맞게 수정해야 합니다. 또한 PostgreSQL에 `pgvector` 익스텐션이 설치되어 있어야 합니다.

### 2. Frontend Setup (Next.js)

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev
```

### 3. File Upload Test
브라우저에서 `http://localhost:3000/upload` 에 접속하여 파일을 업로드하면, 백엔드(`backend/uploads/`)에 파일이 저장되고 성공 시 화면에 미리보기가 렌더링됩니다.

---

## 🧠 Key Features (Planned)
- **메타데이터 추출**: 업로드 시 사진의 EXIF(위치/날짜) 및 문서 정보를 자동 추출.
- **비동기 AI 요약**: 백그라운드 태스크를 통해 이미지/문서를 LLM으로 분석하고 요약.
- **임베딩 및 큐레이션**: `pgvector`를 활용해 기록물의 벡터값을 DB에 저장하고, 유사도 기반 자동 전시회 구성.
- **공개 상태 설정**: `is_public` 및 `scheduled_release_date` 등을 통해 생전/사후 기록물 제어 기능.
