# 🔧 Supabase Setup Guide for CuraLink Backend

## Prerequisites

Before setting up the backend, you need a Supabase project.

---

## Step 1: Get Your Supabase Credentials

### Option A: If You Already Have a Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - ⚠️ Keep this secret!

### Option B: Create a New Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Fill in:
   - **Name**: curalink
   - **Database Password**: [Choose a strong password - SAVE THIS!]
   - **Region**: Choose closest to you
6. Click "Create new project"
7. Wait 2-3 minutes for setup
8. Go to **Settings** → **API** and copy credentials

---

## Step 2: Get Database Connection String

1. In your Supabase project, go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Select **URI** tab
4. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

---

## Step 3: Create `.env` File

In the `backend` folder, create a `.env` file with these values:

```env
# Server Configuration
NODE_ENV=development
PORT=8000

# Supabase Configuration
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_KEY=eyJ...your-service-role-key

# JWT Configuration
JWT_SECRET=super-secret-key-change-this-to-something-random
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Database
DATABASE_URL=postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres
```

### Important:
- Replace `xxxxx` with your actual Supabase project ID
- Replace `[password]` with your database password
- Generate a random JWT_SECRET (you can use: https://randomkeygen.com/)

---

## Step 4: Provide Your Credentials

**Please provide me with:**

1. ✅ **SUPABASE_URL**: `https://xxxxx.supabase.co`
2. ✅ **SUPABASE_ANON_KEY**: `eyJ...`
3. ✅ **SUPABASE_SERVICE_KEY**: `eyJ...` (I'll keep this secure)
4. ✅ **DATABASE_URL**: Full connection string
5. ✅ **Database Password**: (if not in connection string)

**Once you provide these, I'll:**
- Create the `.env` file automatically
- Set up database tables (users, patients, researchers)
- Run migrations
- Start the backend server
- Test authentication endpoints

---

## Security Notes

⚠️ **Never commit these values to git!**
- The `.env` file is already in `.gitignore`
- Service role key has admin access - keep it secret
- In production, use environment variables, not `.env` files

---

## What Happens Next?

Once you provide the credentials, I will:

1. ✅ Create the `.env` file
2. ✅ Install all dependencies
3. ✅ Create database tables via Supabase migrations
4. ✅ Set up authentication system
5. ✅ Start the backend server
6. ✅ Test with the frontend

---

**Ready? Please provide your Supabase credentials!** 🚀
