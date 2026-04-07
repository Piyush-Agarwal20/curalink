# 🚀 CuraLink Backend - Quick Start Guide

## Option 1: Automated Setup (Recommended)

### Step 1: Create Environment File

Run the interactive setup to create your `.env` file:

```bash
cd backend
npm run setup:env
```

This will prompt you for:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_KEY
- DATABASE_URL (optional)
- JWT_SECRET (auto-generated if not provided)

**Where to get Supabase credentials:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy the values

### Step 2: Setup Database Tables

Run the database setup script:

```bash
npm run setup:db
```

This will:
- Connect to your Supabase database
- Create the `users` table
- Create the `patient_profiles` table
- Create the `researcher_profiles` table
- Verify tables were created successfully

### Step 3: Start the Server

```bash
npm run dev
```

You should see:
```
🚀 CuraLink Backend running on port 8000
📍 Environment: development
🔗 Health check: http://localhost:8000/health
```

### Step 4: Test the API

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "success": true,
  "message": "CuraLink Backend API is running",
  "timestamp": "2024-..."
}
```

---

## Option 2: Manual Setup

### Step 1: Create .env File Manually

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
NODE_ENV=development
PORT=8000

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...

JWT_SECRET=your-random-secret-string
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:5173

DATABASE_URL=postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres
```

### Step 2: Setup Database Manually

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor**
4. Click **New Query**
5. Copy and paste this SQL:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('PATIENT', 'RESEARCHER')),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create patient_profiles table
CREATE TABLE IF NOT EXISTS patient_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  condition TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_patient_profiles_user_id ON patient_profiles(user_id);

DROP TRIGGER IF EXISTS update_patient_profiles_updated_at ON patient_profiles;
CREATE TRIGGER update_patient_profiles_updated_at
  BEFORE UPDATE ON patient_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create researcher_profiles table
CREATE TABLE IF NOT EXISTS researcher_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  institution VARCHAR(255) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_researcher_profiles_user_id ON researcher_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_researcher_profiles_specialization ON researcher_profiles(specialization);

DROP TRIGGER IF EXISTS update_researcher_profiles_updated_at ON researcher_profiles;
CREATE TRIGGER update_researcher_profiles_updated_at
  BEFORE UPDATE ON researcher_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

6. Click **Run**
7. Verify in **Table Editor** that 3 tables exist

### Step 3: Start the Server

```bash
npm run dev
```

---

## Option 3: All-in-One Setup

Run everything in one command:

```bash
npm run setup
```

This will:
1. Prompt for environment variables
2. Create `.env` file
3. Set up database tables
4. Verify setup

Then just run:
```bash
npm run dev
```

---

## Verify Setup

### Check Tables in Supabase

1. Go to Supabase Dashboard
2. Click **Table Editor**
3. You should see:
   - ✅ users
   - ✅ patient_profiles
   - ✅ researcher_profiles

### Test Patient Signup

```bash
curl -X POST http://localhost:8000/api/auth/signup/patient \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.patient@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "Patient",
    "condition": "Testing"
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "test.patient@example.com",
      "userType": "PATIENT",
      "firstName": "Test",
      "lastName": "Patient",
      "patient": {
        "condition": "Testing"
      }
    },
    "token": "eyJ...",
    "expiresIn": "7d"
  }
}
```

### Test Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.patient@example.com",
    "password": "password123"
  }'
```

---

## Troubleshooting

### Issue: "Missing Supabase credentials"

**Fix:** Ensure `.env` file exists with valid credentials.

```bash
# Check if .env exists
ls -la .env

# If not, run:
npm run setup:env
```

### Issue: "Table already exists"

This is fine! It means tables are already created. Just start the server:
```bash
npm run dev
```

### Issue: Setup script fails

**Fix:** Use manual setup (Option 2) and run SQL directly in Supabase SQL Editor.

### Issue: CORS errors

**Fix:** Ensure `CORS_ORIGIN=http://localhost:5173` in `.env` file.

---

## Next Steps

Once backend is running:

1. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Test Full Flow:**
   - Go to http://localhost:5173/signup/patient
   - Create account
   - Should redirect to dashboard
   - ✅ Authentication working!

3. **Check Integration Guide:**
   - See `../INTEGRATION_GUIDE.md` for full testing checklist

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm start` | Start production server |
| `npm run setup:env` | Interactive .env creation |
| `npm run setup:db` | Create database tables |
| `npm run setup` | Complete automated setup |

---

**You're ready to go! 🎉**

Choose your preferred setup method and get started in minutes.
