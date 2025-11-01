markdown# 🏥 CuraLink

### AI-Powered Healthcare Connection Platform

> Bridging the gap between patients seeking treatment and researchers advancing medical science

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 What is CuraLink?

CuraLink is a comprehensive healthcare platform that solves a critical problem in medical research and patient care: **the disconnect between patients looking for treatment options and researchers conducting groundbreaking clinical trials.**

### The Problem We're Solving

- 📊 **86% of clinical trials fail to meet enrollment deadlines** due to difficulty finding eligible participants
- 🔍 Patients struggle to discover relevant clinical trials and expert specialists
- 🤝 Researchers find it challenging to connect with potential collaborators and patients
- 📚 Medical information is scattered across multiple platforms and difficult to understand

### Our Solution

CuraLink provides a **unified, AI-powered platform** where:

✅ **Patients** can discover clinical trials, connect with health experts, and understand complex medical research  
✅ **Researchers** can find collaborators, manage trials, and engage with the patient community  
✅ **AI** simplifies medical jargon and intelligently matches users with relevant resources

---

## ✨ Key Features

### 👥 For Patients & Caregivers

| Feature | Description |
|---------|-------------|
| **🔍 Smart Clinical Trial Discovery** | Natural language search powered by AI to find relevant trials based on your condition |
| **👨‍⚕️ Expert Matching** | Connect with health specialists who focus on your specific medical needs |
| **📚 Simplified Medical Research** | Access publications from top journals with AI-generated summaries in plain language |
| **💬 Community Forums** | Ask questions and get answers from verified researchers |
| **⭐ Personalized Dashboard** | Track saved trials, experts, and publications in one place |

### 🔬 For Researchers

| Feature | Description |
|---------|-------------|
| **🤝 Collaborator Network** | Find and connect with researchers in complementary fields |
| **🧪 Trial Management** | Post, manage, and track your clinical trials |
| **📄 Publication Showcase** | Auto-import from ORCID/ResearchGate and display your work |
| **💬 Patient Engagement** | Answer questions and build trust with the patient community |
| **📊 Smart Recommendations** | AI-powered suggestions for potential collaborations |

---

## 🛠️ Tech Stack

### Frontend
```
Framework:     Next.js 14 (React 18)
Language:      TypeScript
Styling:       Tailwind CSS
UI Components: shadcn/ui
State:         Zustand
HTTP Client:   Axios
Icons:         Lucide React
```

### Backend
```
Framework:     FastAPI (Python 3.11+)
ORM:           SQLAlchemy
Database:      PostgreSQL 15
Auth:          JWT (JSON Web Tokens)
Validation:    Pydantic
Migrations:    Alembic
```

### AI & External Services
```
NLP Engine:           OpenAI GPT-4
Medical NER:          BioBERT / spaCy
Embeddings:           Sentence Transformers
Clinical Trials:      ClinicalTrials.gov API
Publications:         PubMed E-utilities API
Researcher Data:      ORCID API, ResearchGate
Academic Search:      Google Scholar (SerpAPI)
```

### Infrastructure
```
Frontend Hosting:     Vercel
Backend Hosting:      Render / Railway
Database:             Supabase
Version Control:      Git & GitHub
CI/CD:                GitHub Actions
```

---

## 🏗️ System Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                          │
│         (Next.js - Responsive Web Application)           │
└──────────────────────┬──────────────────────────────────┘
                       │ REST API (HTTPS)
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                       │
│              (FastAPI Backend Services)                  │
│                                                          │
│  ┌──────────┬──────────┬──────────┬──────────┐         │
│  │   Auth   │ Matching │   NLP    │  Forums  │         │
│  │  Service │  Engine  │ Service  │  Service │         │
│  └──────────┴──────────┴──────────┴──────────┘         │
└───────┬─────────────────┬────────────────┬──────────────┘
        │                 │                │
        ▼                 ▼                ▼
┌──────────────┐  ┌─────────────┐  ┌──────────────────┐
│  PostgreSQL  │  │   OpenAI    │  │  External APIs   │
│   Database   │  │     API     │  │                  │
│              │  │             │  │  • PubMed        │
│  • Users     │  │  • GPT-4    │  │  • Clinical.gov  │
│  • Profiles  │  │  • NLP      │  │  • ORCID         │
│  • Trials    │  │  • Summary  │  │  • ResearchGate  │
│  • Forums    │  │             │  │                  │
└──────────────┘  └─────────────┘  └──────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18.x or higher
- **Python** 3.11 or higher  
- **PostgreSQL** 15+ (or Supabase account)
- **Git**

### Environment Setup

You'll need API keys for:
- OpenAI API (for AI/NLP features)
- PubMed API (optional, but recommended)
- ORCID API (optional)

---

### Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/curalink.git
cd curalink
```

#### 2️⃣ Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env with your credentials:
# DATABASE_URL=postgresql://user:password@localhost:5432/curalink
# SECRET_KEY=your-secret-key-here
# OPENAI_API_KEY=your-openai-api-key
# ALGORITHM=HS256
# ACCESS_TOKEN_EXPIRE_MINUTES=30

# Run database migrations
alembic upgrade head

# Start backend server
uvicorn app.main:app --reload --port 8000
```

**Backend will run at:** `http://localhost:8000`  
**API Docs:** `http://localhost:8000/docs`

#### 3️⃣ Frontend Setup
```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8000

# Start development server
npm run dev
```

**Frontend will run at:** `http://localhost:3000`

---

## 📁 Project Structure
```
curalink/
│
├── frontend/                        # Next.js Application
│   ├── app/
│   │   ├── page.tsx                # Landing page
│   │   ├── login/                  # Authentication
│   │   ├── signup/
│   │   │   ├── patient/
│   │   │   └── researcher/
│   │   ├── dashboard/
│   │   │   ├── patient/           # Patient dashboard
│   │   │   └── researcher/        # Researcher dashboard
│   │   ├── trials/                # Clinical trials search
│   │   ├── publications/          # Medical publications
│   │   ├── experts/               # Health experts directory
│   │   ├── forums/                # Community forums
│   │   └── favorites/             # Saved items
│   ├── components/                # Reusable UI components
│   ├── lib/                       # Utilities & API client
│   └── styles/                    # Global styles
│
├── backend/                        # FastAPI Application
│   ├── app/
│   │   ├── main.py                # FastAPI entry point
│   │   ├── models/                # Database models
│   │   ├── schemas/               # Pydantic validation schemas
│   │   ├── routers/               # API endpoints
│   │   │   ├── auth.py
│   │   │   ├── patients.py
│   │   │   ├── researchers.py
│   │   │   ├── trials.py
│   │   │   ├── publications.py
│   │   │   └── forums.py
│   │   ├── services/              # Business logic
│   │   │   ├── matching.py        # AI matching algorithm
│   │   │   └── nlp.py             # NLP processing
│   │   └── integrations/          # External API clients
│   │       ├── pubmed.py
│   │       ├── clinicaltrials.py
│   │       └── openai_helper.py
│   └── tests/                     # Unit tests
│
└── docs/                          # Documentation
    ├── API.md
    └── ARCHITECTURE.md
```

---

## 🔐 Environment Variables

### Backend `.env`
```env
DATABASE_URL=postgresql://user:password@localhost:5432/curalink
SECRET_KEY=your-super-secret-key-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

OPENAI_API_KEY=sk-...
PUBMED_API_KEY=optional
ORCID_CLIENT_ID=optional
ORCID_CLIENT_SECRET=optional
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🧪 API Endpoints

### Authentication
```
POST   /api/auth/signup          Create new user account
POST   /api/auth/login           Authenticate user
GET    /api/auth/me              Get current user info
```

### Patients
```
POST   /api/patients/profile     Create patient profile
GET    /api/patients/dashboard   Get personalized dashboard
GET    /api/patients/trials      Search clinical trials
GET    /api/patients/experts     Find health experts
```

### Researchers
```
POST   /api/researchers/profile  Create researcher profile
GET    /api/researchers/dashboard  Get researcher dashboard
GET    /api/researchers/collaborators  Find collaborators
POST   /api/researchers/trials   Add new clinical trial
```

### Shared
```
GET    /api/publications         Search medical publications
GET    /api/forums               List forum categories
POST   /api/forums/posts         Create forum post
POST   /api/favorites            Save favorite item
```

**Full API documentation:** `http://localhost:8000/docs`

---

## 🎨 Key Features Explained

### 1. AI-Powered Matching

Our matching algorithm uses a combination of:
- **Natural Language Processing** to extract medical entities from user input
- **Vector Embeddings** to find semantic similarity between profiles
- **Weighted Scoring** considering multiple factors (specialty, location, publications)
```python
# Simplified matching logic
patient_conditions = ["brain cancer", "glioma"]
researcher_specialties = ["neuro-oncology", "brain tumors"]

# Calculate similarity score
match_score = calculate_similarity(
    patient_vector, 
    researcher_vector,
    weights={
        'specialty': 0.4,
        'publications': 0.3,
        'location': 0.2,
        'availability': 0.1
    }
)
```

### 2. Natural Language Understanding

Users can describe their condition naturally:
```
Input: "I was recently diagnosed with stage 2 lung cancer"
AI extracts: ["lung cancer", "stage 2", "NSCLC", "oncology"]
```

### 3. AI Summaries

Complex medical text is automatically simplified:
```
Original: "A randomized, double-blind, placebo-controlled trial..."
Summary: "This study tests a new drug for lung cancer. 
          Participants are randomly given either the drug or placebo..."
```

---

## 🌐 Deployment

### Deploy to Production

#### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

#### Backend (Render)
1. Push code to GitHub
2. Connect repo to Render
3. Set environment variables
4. Deploy

#### Database (Supabase)
- Already configured via connection string
- Automatic backups included

---

## 📊 Database Schema

### Core Tables

**users** - Authentication and user type  
**patient_profiles** - Patient-specific data and conditions  
**researcher_profiles** - Researcher specialties and interests  
**clinical_trials** - Cached trial data from ClinicalTrials.gov  
**publications** - Cached publications from PubMed  
**forums** - Community discussions  
**favorites** - User-saved items  
**connections** - Researcher-to-researcher connections  
**meeting_requests** - Patient-to-researcher meeting requests  

[Full schema available in `/docs/DATABASE_SCHEMA.md`]

---

## 🧪 Testing
```bash
# Backend tests
cd backend
pytest

# Frontend tests (if implemented)
cd frontend
npm test
```

---

## 🎯 Roadmap

### Current Version (v1.0 - MVP)
- ✅ User authentication for patients and researchers
- ✅ AI-powered condition extraction
- ✅ Clinical trials search integration
- ✅ PubMed publications search
- ✅ Basic matching algorithm
- ✅ Community forums
- ✅ Favorites system

### Future Enhancements (v2.0)
- 🔄 Real-time chat between users
- 📧 Email notifications for trial matches
- 📱 Mobile app (React Native)
- 🎥 Video consultation integration
- 🔔 Smart alerts for new matching opportunities
- 🌍 Multi-language support
- 📊 Analytics dashboard for researchers
- 💳 Premium features with payment gateway

---

## 🤝 Contributing

This project was built for a hackathon. If you'd like to contribute or build upon it:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Built as part of a healthcare innovation hackathon
- OpenAI for GPT-4 API enabling intelligent matching
- PubMed for providing access to medical publications
- ClinicalTrials.gov for clinical trial data
- All open-source libraries that made this possible

---

## 📞 Contact & Support

For questions, issues, or feedback:
- 📧 Email: support@curalink.com
- 💬 Telegram: [Join our group](https://t.me/+R-WNywM9ZOdhYmM1)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/curalink/issues)

---

## 🎥 Demo

**🔗 Live Demo:** [https://curalink.vercel.app](https://curalink.vercel.app)  
**📹 Demo Video:** [Watch on YouTube](https://youtube.com/...)  
**📚 API Docs:** [https://curalink-api.render.com/docs](https://curalink-api.render.com/docs)

---

<div align="center">

**Made with ❤️ for better healthcare outcomes**

⭐ Star this repo if you find it helpful!

</div>

💡 WHAT MAKES THIS README GREAT:
✅ Clear problem statement - Why CuraLink exists
✅ Professional presentation - Badges, formatting, structure
✅ Complete tech stack - Shows your technical decisions
✅ Easy setup instructions - Anyone can run it locally
✅ Project structure - Clear organization
✅ Future roadmap - Shows vision and planning
✅ Contact info - Professional touch

Want me to customize any section further? (e.g., add your name, GitHub username, specific features, etc.) 🚀RetryPAgive me single  Readme.md codeOrchestrated comprehensive README compilation for seamless copying.The user wants a single, complete README.md file that they can just copy and paste. Let me create one comprehensive README.md with all the sections in a single code block.markdown# 🏥 CuraLink
