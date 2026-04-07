# ⚡ Setup CuraLink Backend RIGHT NOW

## 🎯 2-Minute Setup

### Step 1: Create Database Tables (1 minute)

1. **Open Supabase SQL Editor:**
   - Go to: https://supabase.com/dashboard
   - Select your CuraLink project
   - Click **"SQL Editor"** in the left sidebar
   - Click **"New Query"**

2. **Run the SQL:**
   - Open the file: `backend/COMPLETE_SETUP.sql`
   - Copy ALL the SQL (Ctrl+A, Ctrl+C)
   - Paste into Supabase SQL Editor
   - Click **"Run"** button

3. **Verify:**
   - Click **"Table Editor"** in left sidebar
   - You should see 3 tables:
     - ✅ users
     - ✅ patient_profiles
     - ✅ researcher_profiles

**✅ Database setup complete!**

---

### Step 2: Create .env File (30 seconds)

1. **Get your Supabase credentials:**
   - In Supabase Dashboard, go to: **Settings** → **API**
   - You'll need:
     - Project URL
     - anon public key
     - service_role key

2. **Create the file:**
   - In your code editor, create file: `backend/.env`
   - Copy this template and fill in YOUR values:

```env
NODE_ENV=development
PORT=8000

# Replace these with YOUR actual Supabase values
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...your-anon-key-here
SUPABASE_SERVICE_KEY=eyJ...your-service-key-here

# JWT Secret (can use this or generate your own)
JWT_SECRET=curalink-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# CORS (leave as is for development)
CORS_ORIGIN=http://localhost:5173

# Database URL (optional - get from Settings → Database)
DATABASE_URL=postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres
```

3. **Save the file**

**✅ Environment configured!**

---

### Step 3: Start the Backend (10 seconds)

Open terminal in the `backend` folder and run:

```bash
npm run dev
```

You should see:
```
🚀 CuraLink Backend running on port 8000
📍 Environment: development
🔗 Health check: http://localhost:8000/health
```

**✅ Backend running!**

---

### Step 4: Test It (10 seconds)

Open a new terminal and test:

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "success": true,
  "message": "CuraLink Backend API is running",
  "timestamp": "2025-..."
}
```

**✅ Backend working!**

---

## 🎉 You're Done!

Total time: **2 minutes**

### What you can do now:

1. **Test Patient Signup:**
```bash
curl -X POST http://localhost:8000/api/auth/signup/patient \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@test.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "condition": "Type 2 Diabetes"
  }'
```

2. **Start Frontend:**
```bash
cd frontend
npm run dev
```

3. **Test Full Flow:**
   - Go to: http://localhost:5173/signup/patient
   - Create account
   - Should redirect to dashboard
   - ✅ Authentication working end-to-end!

---

## 🔍 Quick Troubleshooting

**"Missing Supabase credentials"**
- Check your `backend/.env` file exists
- Verify SUPABASE_URL and SUPABASE_SERVICE_KEY are correct

**"Table does not exist"**
- Run the SQL in Supabase SQL Editor (Step 1)
- Verify tables in Table Editor

**"Port 8000 already in use"**
- Change PORT in `.env` to 8001 or another port
- Update frontend `.env.local` VITE_API_URL accordingly

**CORS errors in browser**
- Verify `CORS_ORIGIN=http://localhost:5173` in backend `.env`
- Restart backend server

---

## 📁 Files You Need

- ✅ `backend/COMPLETE_SETUP.sql` - Copy into Supabase SQL Editor
- ✅ `backend/.env` - Create with your credentials
- ✅ `frontend/.env.local` - Should have `VITE_API_URL=http://localhost:8000`

---

**That's it! Your backend is live and ready to authenticate users! 🚀**
