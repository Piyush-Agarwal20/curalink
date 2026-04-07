# 🔗 CuraLink Full-Stack Integration Guide

## Quick Start - Get Everything Running

### Prerequisites Checklist

- [x] Frontend implemented (Phase 1 complete)
- [x] Backend implemented (Authentication complete)
- [x] Backend dependencies installed
- [ ] Supabase project created
- [ ] Supabase credentials obtained
- [ ] Database migrations run
- [ ] Environment files configured

---

## Step-by-Step Setup

### 1. Set Up Supabase Database

#### Create/Access Supabase Project

**If you have a Supabase project:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Continue to credentials step below

**If you need a new project:**
1. Go to https://supabase.com
2. Click "New Project"
3. Fill in:
   - Name: `curalink`
   - Database Password: **[SAVE THIS!]**
   - Region: Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes

#### Get Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) ⚠️ Keep secret!

3. Go to **Settings** → **Database**
4. Scroll to **Connection string**
5. Select **URI** tab
6. Copy the connection string
7. Replace `[YOUR-PASSWORD]` with your actual database password

---

### 2. Run Database Migrations

1. In Supabase Dashboard, click **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

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

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

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

CREATE INDEX idx_patient_profiles_user_id ON patient_profiles(user_id);

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

CREATE INDEX idx_researcher_profiles_user_id ON researcher_profiles(user_id);
CREATE INDEX idx_researcher_profiles_specialization ON researcher_profiles(specialization);

CREATE TRIGGER update_researcher_profiles_updated_at
  BEFORE UPDATE ON researcher_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click **Run**
5. Verify in **Table Editor** that you see 3 tables:
   - `users`
   - `patient_profiles`
   - `researcher_profiles`

---

### 3. Configure Backend Environment

Create `backend/.env` file:

```env
NODE_ENV=development
PORT=8000

# Supabase Configuration (from Settings → API)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_KEY=eyJ...your-service-role-key

# JWT Configuration (generate random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Database Connection (from Settings → Database)
DATABASE_URL=postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres
```

**Replace:**
- `xxxxx` with your actual Supabase project ID
- `eyJ...` with your actual keys
- `[password]` with your database password
- `JWT_SECRET` with a random string (or generate with: `openssl rand -base64 32`)

---

### 4. Verify Frontend Environment

Check that `frontend/.env.local` exists with:

```env
VITE_API_URL=http://localhost:8000
```

If not, create it now.

---

### 5. Start Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
🚀 CuraLink Backend running on port 8000
📍 Environment: development
🔗 Health check: http://localhost:8000/health
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 🧪 Testing Full Authentication Flow

### Test 1: Patient Signup & Login

1. **Go to Patient Signup:**
   - Open http://localhost:5173/signup/patient

2. **Fill in the form:**
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@test.com
   - Password: password123
   - Condition: Type 2 Diabetes

3. **Submit:**
   - Click "Create Account"
   - ✅ Should redirect to http://localhost:5173/patient/dashboard
   - ✅ Should see "Welcome, John!"

4. **Verify in Supabase:**
   - Go to Supabase **Table Editor**
   - Check `users` table → should have 1 row
   - Check `patient_profiles` table → should have 1 row

5. **Test Logout:**
   - Click "Logout" button in dashboard
   - ✅ Should redirect to login page

6. **Test Login:**
   - Go to http://localhost:5173/login
   - Enter: john.doe@test.com / password123
   - Click "Sign In"
   - ✅ Should redirect back to patient dashboard

### Test 2: Researcher Signup & Login

1. **Go to Researcher Signup:**
   - Open http://localhost:5173/signup/researcher

2. **Fill in the form:**
   - First Name: Jane
   - Last Name: Smith
   - Email: jane.smith@university.edu
   - Institution: Stanford University
   - Specialization: Oncology
   - Password: password123
   - Bio: (optional)

3. **Submit:**
   - Click "Create Account"
   - ✅ Should redirect to http://localhost:5173/researcher/dashboard
   - ✅ Should see "Welcome, Dr. Smith!"

4. **Test Login:**
   - Logout and login again
   - ✅ Should redirect to researcher dashboard

### Test 3: Protected Routes

1. **Logout from dashboard**

2. **Try accessing protected route directly:**
   - Go to http://localhost:5173/patient/dashboard
   - ✅ Should redirect to http://localhost:5173/login

3. **After login:**
   - ✅ Should redirect back to /patient/dashboard

### Test 4: User Type Protection

1. **Login as PATIENT**

2. **Try accessing researcher dashboard:**
   - Go to http://localhost:5173/researcher/dashboard
   - ✅ Should redirect to /patient/dashboard (wrong user type)

3. **Logout and login as RESEARCHER**

4. **Try accessing patient dashboard:**
   - Go to http://localhost:5173/patient/dashboard
   - ✅ Should redirect to /researcher/dashboard

---

## 🔍 Debugging & Verification

### Check Backend Health

```bash
curl http://localhost:8000/health
```

Expected:
```json
{
  "success": true,
  "message": "CuraLink Backend API is running",
  "timestamp": "2024-..."
}
```

### Test API Directly (cURL)

**Patient Signup:**
```bash
curl -X POST http://localhost:8000/api/auth/signup/patient \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "condition": "Testing"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Current User (replace TOKEN):**
```bash
curl http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Browser DevTools Checks

**Network Tab:**
1. Open DevTools (F12)
2. Go to Network tab
3. Signup/Login
4. Check API calls:
   - ✅ POST to `http://localhost:8000/api/auth/signup/patient` returns 201
   - ✅ Response has `user` and `token` fields

**Application Tab → localStorage:**
After login, check:
```javascript
Key: auth-storage
Value: {
  "state": {
    "user": { ... },
    "token": "eyJ...",
    "isAuthenticated": true
  }
}
```

**Console Tab:**
- Should be clean (no errors)

---

## ⚠️ Common Issues & Fixes

### Issue: Backend won't start - "Missing Supabase credentials"

**Fix:**
- Ensure `backend/.env` file exists
- Check `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are set correctly
- No quotes needed around values

### Issue: Frontend shows "Unable to connect to server"

**Fix:**
- Check backend is running on http://localhost:8000
- Check `frontend/.env.local` has `VITE_API_URL=http://localhost:8000`
- Restart frontend dev server after changing .env

### Issue: "User already exists" error

**Fix:**
- Email must be unique
- Use different email OR
- Delete user from Supabase Table Editor

### Issue: "Table does not exist"

**Fix:**
- Run database migrations in Supabase SQL Editor
- Verify tables exist in Table Editor

### Issue: CORS error in browser

**Fix:**
- Check `backend/.env` has `CORS_ORIGIN=http://localhost:5173`
- Restart backend server after changing .env

### Issue: "Invalid or expired token"

**Fix:**
- Tokens expire after 7 days (default)
- Login again to get fresh token
- Check JWT_SECRET is same value backend used to create token

### Issue: Signup succeeds but doesn't redirect

**Fix:**
- Check browser console for errors
- Verify token is being stored in localStorage
- Check Network tab for API response

---

## 📊 What Should Be Working

### ✅ Working Features

**Authentication:**
- [x] Patient signup creates user + profile
- [x] Researcher signup creates user + profile
- [x] Email/password login
- [x] JWT token generation
- [x] Token persistence (localStorage)
- [x] Auto-login on page refresh
- [x] Logout clears token

**Authorization:**
- [x] Protected routes redirect to login
- [x] User type checking (Patient vs Researcher)
- [x] Intelligent redirect after login

**UI/UX:**
- [x] Form validation with error messages
- [x] Loading states during API calls
- [x] Toast notifications
- [x] Smooth transitions

**Backend:**
- [x] RESTful API endpoints
- [x] Input validation
- [x] Error handling
- [x] CORS and security headers
- [x] Password hashing

**Database:**
- [x] User storage
- [x] Profile creation
- [x] Timestamp tracking
- [x] Foreign key relationships

### 🚧 Not Yet Implemented (Future Phases)

- [ ] Password reset
- [ ] Email verification
- [ ] Clinical trial search
- [ ] Expert directory
- [ ] Publications library
- [ ] Community forum
- [ ] Profile editing
- [ ] Trial posting (researchers)

---

## 📁 Project Structure Overview

```
curalink/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── auth/ProtectedRoute.tsx
│   │   ├── lib/
│   │   │   ├── api/          # API client & auth API
│   │   │   ├── hooks/        # useAuth hook
│   │   │   ├── store/        # Zustand auth store
│   │   │   ├── types/        # TypeScript types
│   │   │   └── validations/  # Zod schemas
│   │   └── pages/            # All page components
│   ├── .env.local            # Frontend environment
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/           # Supabase configuration
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Auth & error handling
│   │   ├── routes/           # API routes
│   │   └── server.js         # Express app
│   ├── supabase/
│   │   └── migrations/       # Database schema
│   ├── .env                  # Backend environment
│   └── package.json
│
├── README.md                 # Project overview
└── INTEGRATION_GUIDE.md      # This file
```

---

## 🎯 Next Steps After Setup

Once authentication is working:

### Phase 2: State Management Expansion
- Additional Zustand stores (user profile, search, favorites)
- More custom hooks (useUser, useTrials, useDebounce)
- Complete type system for trials, publications, experts

### Phase 3: Patient Features
- Clinical trial search with filters
- Trial details page
- Bookmark trials
- Expert directory
- Expert profile pages

### Phase 4: Researcher Features
- Post clinical trials
- Manage trials
- Collaborator search
- Publications showcase

### Phase 5: Community Features
- Discussion forums
- Q&A system
- User messaging

### Phase 6: AI Integration
- NLP trial search
- AI recommendations
- Chatbot assistance

---

## 📚 Documentation Reference

- **Frontend:**
  - [frontend/PHASE1_COMPLETE.md](frontend/PHASE1_COMPLETE.md) - Frontend features
  - [frontend/TESTING_GUIDE.md](frontend/TESTING_GUIDE.md) - Frontend testing

- **Backend:**
  - [backend/README.md](backend/README.md) - API documentation
  - [backend/SUPABASE_SETUP.md](backend/SUPABASE_SETUP.md) - Supabase credentials
  - [backend/BACKEND_COMPLETE.md](backend/BACKEND_COMPLETE.md) - Backend features
  - [backend/scripts/setup-database.md](backend/scripts/setup-database.md) - Database setup

---

## ✅ Success Criteria

You know everything is working when:

1. ✅ Both servers start without errors
2. ✅ Can create patient account
3. ✅ Can create researcher account
4. ✅ Can login with created accounts
5. ✅ Dashboard shows user's name
6. ✅ Logout works and clears authentication
7. ✅ Can't access dashboard without logging in
8. ✅ Patient can't access researcher dashboard (and vice versa)
9. ✅ Page refresh keeps user logged in
10. ✅ No console errors during any operation

---

## 🎉 You're All Set!

Once you complete the setup steps above, you'll have a fully functional authentication system with:

- 🔐 Secure user registration and login
- 👥 Separate patient and researcher accounts
- 🛡️ Protected routes with JWT authentication
- 💾 Persistent sessions across page reloads
- 🎨 Beautiful UI with loading states and error handling

**Ready to provide your Supabase credentials and get this running!**

---

**Last Updated:** January 2025
**Status:** Backend Complete, Ready for Integration Testing
