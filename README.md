markdown# 🏥 CuraLink

### AI-Powered Healthcare Connection Platform

> Bridging the gap between patients seeking treatment and researchers advancing medical science

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000)](https://expressjs.com/)
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
Runtime:       Node.js 18+
Framework:     Express.js
Language:      TypeScript
ORM:           Prisma
Database:      PostgreSQL 15
Auth:          JWT (JSON Web Tokens)
Validation:    express-validator / Zod
Security:      Helmet, bcryptjs
```

### AI & External Services
```
NLP Engine:           OpenAI GPT-4 API
Medical NER:          Natural Language API
Embeddings:           OpenAI Embeddings
Clinical Trials:      ClinicalTrials.gov API
Publications:         PubMed E-utilities API
Researcher Data:      ORCID API, ResearchGate
Academic Search:      Semantic Scholar API
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
│         (Node.js + Express Backend Services)             │
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
│   (Prisma)   │  │             │  │  • PubMed        │
│              │  │  • GPT-4    │  │  • Clinical.gov  │
│  • Users     │  │  • NLP      │  │  • ORCID         │
│  • Profiles  │  │  • Summary  │  │  • ResearchGate  │
│  • Trials    │  │  • Embed    │  │  • Semantic      │
│  • Forums    │  │             │  │    Scholar       │
└──────────────┘  └─────────────┘  └──────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
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

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your credentials:
# DATABASE_URL=postgresql://user:password@localhost:5432/curalink
# JWT_SECRET=your-super-secret-jwt-key
# JWT_EXPIRES_IN=7d
# OPENAI_API_KEY=your-openai-api-key
# NODE_ENV=development
# PORT=8000

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
npm run seed

# Start backend server
npm run dev
```

**Backend will run at:** `http://localhost:8000`
**API Docs:** `http://localhost:8000/api-docs`

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
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            # Landing page
│   │   │   ├── (auth)/
│   │   │   │   ├── login/          # Login page
│   │   │   │   └── signup/
│   │   │   │       ├── patient/
│   │   │   │       └── researcher/
│   │   │   ├── (patient)/
│   │   │   │   ├── dashboard/      # Patient dashboard
│   │   │   │   ├── trials/         # Clinical trials search
│   │   │   │   ├── experts/        # Health experts
│   │   │   │   ├── publications/   # Medical publications
│   │   │   │   └── favorites/      # Saved items
│   │   │   ├── (researcher)/
│   │   │   │   ├── researcher-dashboard/
│   │   │   │   ├── collaborators/
│   │   │   │   └── my-trials/
│   │   │   └── (shared)/
│   │   │       ├── forums/         # Community forums
│   │   │       └── profile/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── layout/
│   │   │   ├── patient/
│   │   │   ├── researcher/
│   │   │   └── shared/
│   │   └── lib/                    # Utilities & API client
│   │       ├── api/
│   │       ├── store/              # Zustand stores
│   │       ├── hooks/
│   │       └── types/
│   └── public/                     # Static assets
│
├── backend/                        # Node.js + Express Application
│   ├── src/
│   │   ├── server.ts               # Entry point
│   │   ├── app.ts                  # Express app setup
│   │   ├── config/                 # Configuration
│   │   │   ├── database.ts
│   │   │   └── env.ts
│   │   ├── controllers/            # Request handlers
│   │   │   ├── auth.controller.ts
│   │   │   ├── patient.controller.ts
│   │   │   ├── researcher.controller.ts
│   │   │   ├── trial.controller.ts
│   │   │   └── forum.controller.ts
│   │   ├── routes/                 # API routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── patient.routes.ts
│   │   │   ├── researcher.routes.ts
│   │   │   └── trial.routes.ts
│   │   ├── services/               # Business logic
│   │   │   ├── auth.service.ts
│   │   │   ├── matching.service.ts # AI matching
│   │   │   ├── nlp.service.ts      # NLP processing
│   │   │   └── summarization.service.ts
│   │   ├── integrations/           # External API clients
│   │   │   ├── openai.client.ts
│   │   │   ├── pubmed.client.ts
│   │   │   ├── clinicaltrials.client.ts
│   │   │   └── orcid.client.ts
│   │   ├── middleware/             # Express middleware
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── types/                  # TypeScript types
│   │   └── utils/                  # Utility functions
│   ├── prisma/
│   │   ├── schema.prisma           # Database schema
│   │   └── migrations/             # Database migrations
│   └── tests/                      # Unit & integration tests
│
└── docs/                           # Documentation
    ├── API.md
    └── ARCHITECTURE.md
```

---

## 🔐 Environment Variables

### Backend `.env`
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/curalink

# Server
NODE_ENV=development
PORT=8000

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# OpenAI API
OPENAI_API_KEY=sk-...

# External APIs (Optional)
PUBMED_API_KEY=optional
ORCID_CLIENT_ID=optional
ORCID_CLIENT_SECRET=optional

# CORS
CORS_ORIGIN=http://localhost:3000
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

**Full API documentation:** `http://localhost:8000/api-docs` (Swagger UI)

---

## 🎨 Key Features Explained

### 1. AI-Powered Matching

Our matching algorithm uses a combination of:
- **Natural Language Processing** to extract medical entities from user input
- **Vector Embeddings** to find semantic similarity between profiles
- **Weighted Scoring** considering multiple factors (specialty, location, publications)
```typescript
// Simplified matching logic
const patientConditions = ["brain cancer", "glioma"];
const researcherSpecialties = ["neuro-oncology", "brain tumors"];

// Calculate similarity score
const matchScore = await calculateSimilarity(
    patientVector,
    researcherVector,
    {
        specialty: 0.4,
        publications: 0.3,
        location: 0.2,
        availability: 0.1
    }
);
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
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report

# Frontend tests
cd frontend
npm test                   # Run all tests
npm run test:e2e          # End-to-end tests
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
