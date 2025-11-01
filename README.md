# 🏥 CuraLink

> AI-powered platform connecting patients and researchers for better health outcomes

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)](https://www.postgresql.org/)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [API Integrations](#api-integrations)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**CuraLink** is an innovative healthcare platform that bridges the gap between patients seeking treatment options and researchers advancing medical science. Using AI-powered matching algorithms, CuraLink personalizes the discovery of clinical trials, medical publications, and health experts.

### The Problem

- Patients struggle to find relevant clinical trials and specialists
- Researchers find it difficult to connect with potential collaborators and participants
- Medical information is scattered across multiple platforms
- Complex medical terminology makes research inaccessible to patients

### The Solution

CuraLink provides a unified platform where:
- **Patients** can discover personalized clinical trials, connect with health experts, and understand medical research
- **Researchers** can find collaborators, manage trials, and engage with the patient community
- **AI** simplifies medical information and matches users with relevant resources

---

## ✨ Features

### For Patients & Caregivers

#### 🔍 **Personalized Clinical Trials**
- Search clinical trials by condition using natural language
- AI-powered matching based on eligibility criteria
- Filter by location, phase, and recruitment status
- AI-generated summaries of complex trial information
- Direct contact with trial administrators

#### 👨‍⚕️ **Health Experts Discovery**
- Find specialists based on your medical condition
- View expert profiles with research interests and publications
- Request meetings with available experts
- Filter by location and specialty

#### 📚 **Medical Publications**
- Access latest research from top journals (NEJM, Nature Medicine, The Lancet)
- AI-generated summaries in simple language
- Personalized recommendations based on your conditions
- Direct links to full papers

#### 💬 **Community Forums**
- Ask questions in specialized categories
- Get answers from verified researchers
- Browse discussions by medical topic
- Reddit-style interface for easy navigation

#### ⭐ **Favorites & Tracking**
- Save interesting trials, experts, and publications
- Track your saved items in a dedicated dashboard
- Get notifications on updates (future feature)

### For Researchers

#### 🤝 **Collaborator Network**
- Discover researchers by specialty and interests
- View profiles with publication history
- Send connection requests and chat
- Build your professional network

#### 🧪 **Clinical Trial Management**
- Post and manage clinical trials
- Update recruitment status
- Track participant numbers
- Auto-generate trial summaries with AI

#### 📄 **Publication Showcase**
- Auto-import from ORCID and ResearchGate
- Display your research contributions
- AI-generated summaries of your work
- Link to full publications

#### 💬 **Patient Engagement**
- Create and moderate forum communities
- Answer patient questions
- Share expertise and insights
- Build trust with the patient community

#### ⭐ **Favorites & Opportunities**
- Save potential collaborators
- Track interesting trials
- Bookmark relevant publications

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **ORM**: SQLAlchemy
- **Database**: PostgreSQL 15
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Migration**: Alembic
- **CORS**: FastAPI CORS middleware

### AI & ML
- **NLP**: OpenAI GPT-4 API
- **Entity Extraction**: BioBERT / spaCy
- **Embeddings**: Sentence Transformers
- **Matching Algorithm**: Cosine similarity with weighted scoring

### External APIs
- **PubMed E-utilities**: Medical publication search
- **ClinicalTrials.gov**: Clinical trials database
- **ORCID API**: Researcher credentials and publications
- **ResearchGate**: Academic profiles (web scraping)
- **Google Scholar**: Citation data via SerpAPI

### DevOps & Deployment
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render / Railway
- **Database Hosting**: Supabase / Railway
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry (error tracking)

---

## 🏗️ System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                                │
│                  (Patients & Researchers)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   NEXT.JS FRONTEND                           │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │ Landing  │ Signup   │Dashboard │ Trials   │ Forums   │  │
│  │  Page    │  Pages   │  Pages   │  Search  │  & Chat  │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   FASTAPI BACKEND                            │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │   Auth   │ Patients │Research. │ Matching │  Forums  │  │
│  │  Routes  │  Routes  │  Routes  │  Engine  │  Routes  │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
└────────┬────────────────┬────────────────┬──────────────────┘
         │                │                │
         ▼                ▼                ▼
┌────────────────┐ ┌──────────────┐ ┌──────────────────────┐
│   PostgreSQL   │ │   OpenAI     │ │  External APIs       │
│   Database     │ │   API        │ │  • PubMed            │
│                │ │  (NLP & AI)  │ │  • ClinicalTrials.gov│
│  • Users       │ │              │ │  • ORCID             │
│  • Profiles    │ │              │ │  • ResearchGate      │
│  • Trials      │ │              │ │                      │
│  • Publications│ │              │ │                      │
│  • Forums      │ │              │ │                      │
└────────────────┘ └──────────────┘ └──────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **Python** 3.11+
- **PostgreSQL** 15+ (or Supabase account)
- **OpenAI API Key**
- **Git**

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/curalink.git
cd curalink
```

#### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your credentials:
# DATABASE_URL=postgresql://user:password@localhost:5432/curalink
# SECRET_KEY=your-secret-key-here
# OPENAI_API_KEY=your-openai-api-key
# PUBMED_API_KEY=your-pubmed-api-key (optional)

# Run database migrations
alembic upgrade head

# Start the backend server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at: `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

#### 3. Frontend Setup
```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8000
# NEXT_PUBLIC_OPENAI_API_KEY=your-key (if using client-side AI)

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

#### 4. Database Setup (Supabase)

**Option A: Using Supabase (Recommended)**

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings → Database → Connection String
4. Copy the connection string
5. Update `DATABASE_URL` in backend `.env` file

**Option B: Local PostgreSQL**
```bash
# Create database
createdb curalink

# Update DATABASE_URL in .env
DATABASE_URL=postgresql://localhost:5432/curalink
```

---

## 🔌 API Integrations

### PubMed E-utilities
```python
# app/integrations/pubmed.py
import httpx

PUBMED_BASE_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"

async def search_publications(query: str, max_results: int = 10):
    async with httpx.AsyncClient() as client:
        # Search for articles
        response = await client.get(
            f"{PUBMED_BASE_URL}/esearch.fcgi",
            params={
                "db": "pubmed",
                "term": query,
                "retmax": max_results,
                "retmode": "json"
            }
        )
        # Fetch article details
        # ... implementation
```

### ClinicalTrials.gov API
```python
# app/integrations/clinicaltrials.py
import httpx

CLINICAL_TRIALS_API = "https://clinicaltrials.gov/api/v2/studies"

async def search_trials(condition: str, location: str = None):
    params = {
        "query.cond": condition,
        "filter.overallStatus": "RECRUITING",
        "pageSize": 20
    }
    if location:
        params["filter.geo"] = f"distance({location},50mi)"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(CLINICAL_TRIALS_API, params=params)
        # ... implementation
```

### OpenAI Integration
```python
# app/integrations/openai_helper.py
from openai import OpenAI

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def extract_medical_entities(text: str):
    """Extract medical conditions from natural language"""
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Extract medical conditions..."},
            {"role": "user", "content": text}
        ]
    )
    return response.choices[0].message.content

def generate_summary(text: str):
    """Generate patient-friendly summary"""
    # ... implementation
```

---

## 📁 Project Structure
```
curalink/
├── frontend/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── login/
│   │   │   └── page.tsx                # Login page
│   │   ├── signup/
│   │   │   ├── patient/page.tsx        # Patient signup
│   │   │   └── researcher/page.tsx     # Researcher signup
│   │   ├── onboarding/
│   │   │   ├── patient/page.tsx        # Patient onboarding
│   │   │   └── researcher/page.tsx     # Researcher onboarding
│   │   ├── dashboard/
│   │   │   ├── patient/page.tsx        # Patient dashboard
│   │   │   └── researcher/page.tsx     # Researcher dashboard
│   │   ├── trials/
│   │   │   ├── page.tsx                # Trials search
│   │   │   └── [id]/page.tsx           # Trial details
│   │   ├── publications/
│   │   │   └── page.tsx                # Publications list
│   │   ├── experts/
│   │   │   ├── page.tsx                # Experts list
│   │   │   └── [id]/page.tsx           # Expert profile
│   │   ├── forums/
│   │   │   ├── page.tsx                # Forums list
│   │   │   └── [id]/page.tsx           # Forum thread
│   │   └── favorites/
│   │       └── page.tsx                # Favorites page
│   ├── components/
│   │   ├── ui/                         # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── patient/
│   │   │   ├── TrialCard.tsx
│   │   │   ├── ExpertCard.tsx
│   │   │   └── PublicationCard.tsx
│   │   └── researcher/
│   │       ├── CollaboratorCard.tsx
│   │       └── TrialForm.tsx
│   ├── lib/
│   │   ├── api.ts                      # API client
│   │   ├── auth.ts                     # Auth utilities
│   │   └── utils.ts                    # Helper functions
│   ├── store/
│   │   ├── authStore.ts                # Auth state
│   │   └── userStore.ts                # User state
│   ├── styles/
│   │   └── globals.css
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── tailwind.config.ts
│
├── backend/
│   ├── app/
│   │   ├── main.py                     # FastAPI app
│   │   ├── config.py                   # Configuration
│   │   ├── database.py                 # Database connection
│   │   ├── models/
│   │   │   ├── user.py                 # User models
│   │   │   ├── patient.py              # Patient models
│   │   │   ├── researcher.py           # Researcher models
│   │   │   ├── trial.py                # Trial models
│   │   │   ├── publication.py          # Publication models
│   │   │   └── forum.py                # Forum models
│   │   ├── schemas/
│   │   │   ├── user.py                 # Pydantic schemas
│   │   │   ├── patient.py
│   │   │   ├── researcher.py
│   │   │   └── trial.py
│   │   ├── routers/
│   │   │   ├── auth.py                 # Auth endpoints
│   │   │   ├── patients.py             # Patient endpoints
│   │   │   ├── researchers.py          # Researcher endpoints
│   │   │   ├── trials.py               # Trials endpoints
│   │   │   ├── publications.py         # Publications endpoints
│   │   │   ├── forums.py               # Forums endpoints
│   │   │   └── favorites.py            # Favorites endpoints
│   │   ├── services/
│   │   │   ├── matching.py             # Matching algorithm
│   │   │   ├── nlp.py                  # NLP processing
│   │   │   └── ai_summary.py           # AI summaries
│   │   ├── integrations/
│   │   │   ├── pubmed.py               # PubMed API
│   │   │   ├── clinicaltrials.py       # ClinicalTrials.gov
│   │   │   ├── orcid.py                # ORCID API
│   │   │   └── openai_helper.py        # OpenAI integration
│   │   └── utils/
│   │       ├── auth.py                 # JWT utilities
│   │       └── helpers.py              # Helper functions
│   ├── alembic/
│   │   ├── versions/                   # Database migrations
│   │   └── env.py
│   ├── tests/
│   │   ├── test_auth.py
│   │   ├── test_patients.py
│   │   └── test_matching.py
│   ├── requirements.txt
│   ├── .env.example
│   └── alembic.ini
│
├── docs/
│   ├── API.md                          # API documentation
│   ├── ARCHITECTURE.md                 # System architecture
│   └── DEPLOYMENT.md                   # Deployment guide
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🗄️ Database Schema

### Core Tables

**users**
```sql
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- password_hash (VARCHAR)
- user_type (ENUM: 'patient', 'researcher')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**patient_profiles**
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- conditions (TEXT[])
- location_city (VARCHAR)
- location_country (VARCHAR)
- location_lat/lng (DECIMAL)
- raw_input (TEXT)
```

**researcher_profiles**
```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- specialties (TEXT[])
- research_interests (TEXT[])
- orcid_id (VARCHAR)
- researchgate_id (VARCHAR)
- available_for_meetings (BOOLEAN)
- bio (TEXT)
```

**clinical_trials**
```sql
- id (UUID, PK)
- nct_id (VARCHAR, UNIQUE)
- title (TEXT)
- description (TEXT)
- conditions (TEXT[])
- phase (VARCHAR)
- status (VARCHAR)
- eligibility_criteria (TEXT)
- ai_summary (TEXT)
```

**publications**
```sql
- id (UUID, PK)
- pubmed_id (VARCHAR)
- title (TEXT)
- abstract (TEXT)
- authors (TEXT[])
- journal (VARCHAR)
- publication_date (DATE)
- keywords (TEXT[])
- ai_summary (TEXT)
```

**forums**
```sql
- forum_categories
- forum_posts
- forum_replies
```

**favorites**
```sql
- id (UUID, PK)
- user_id (UUID, FK)
- favorite_type (VARCHAR)
- favorite_id (UUID)
```

[Full schema in `docs/DATABASE_SCHEMA.md`]

---

## 🌐 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### Backend (Render)

1. Create account on [render.com](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Settings:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables
6. Deploy

### Database (Supabase)

Already configured! Just use the connection string in your environment variables.

---

## 🎥 Demo

**Live Demo**: [https://curalink.vercel.app](https://curalink.vercel.app)  
**Demo Video**: [Watch on YouTube](https://youtube.com/...)  
**API Documentation**: [https://curalink-api.render.com/docs](https://curalink-api.render.com/docs)

### Demo Credentials

**Patient Account:**
- Email: patient@demo.com
- Password: demo123

**Researcher Account:**
- Email: researcher@demo.com
- Password: demo123

---

## 🤝 Contributing

This project was built as part of a hackathon. While not currently accepting contributions, feel free to fork and build upon it!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Built with ❤️ by [Your Name]**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **Anthropic Claude** for AI assistance
- **OpenAI GPT-4** for NLP capabilities
- **PubMed** for medical publication data
- **ClinicalTrials.gov** for clinical trial information
- **Hackathon Organizers** for the opportunity

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: support@curalink.com
- Telegram: [Join our group](https://t.me/+R-WNywM9ZOdhYmM1)

---

## 🎯 Future Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced ML matching algorithm
- [ ] Real-time chat system
- [ ] Video consultation integration
- [ ] Payment gateway for premium features
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Calendar integration for appointments
- [ ] Admin dashboard for moderation

---

**Made with 💙 for a healthier tomorrow**