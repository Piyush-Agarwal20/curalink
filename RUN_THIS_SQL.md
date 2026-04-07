# 🚨 IMPORTANT: Run This SQL in Supabase

## The backend detected tables exist BUT Supabase's schema cache needs to be updated.

### Here's what to do:

1. **Open Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: ahxvzjuybwcsorkknwsv
3. **Click "SQL Editor"** in the left sidebar
4. **Click "New Query"**
5. **Copy the SQL below** and paste it
6. **Click "Run"** button

---

## SQL TO RUN:

```sql
-- Drop existing tables if they exist (to ensure fresh creation)
DROP TABLE IF EXISTS researcher_profiles CASCADE;
DROP TABLE IF EXISTS patient_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Create users table
CREATE TABLE users (
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

-- Create timestamp update function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create patient_profiles table
CREATE TABLE patient_profiles (
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
CREATE TABLE researcher_profiles (
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

---

## After Running the SQL:

1. Go to **Table Editor** in Supabase sidebar
2. Verify you see 3 tables:
   - ✅ users
   - ✅ patient_profiles
   - ✅ researcher_profiles

3. Then test the backend again:

```bash
curl -X POST http://localhost:8000/api/auth/signup/patient \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"John","lastName":"Doe","condition":"Testing"}'
```

You should get a success response with a user and token!

---

**This will fix the "Could not find table" error!**
