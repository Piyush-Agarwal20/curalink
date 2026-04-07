# Database Setup Guide

## Quick Setup (Copy-Paste Method)

### Option 1: Run All Migrations Together

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste ALL the SQL below:

```sql
-- ============================================
-- MIGRATION 001: Create users table
-- ============================================

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

-- ============================================
-- MIGRATION 002: Create patient_profiles table
-- ============================================

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

-- ============================================
-- MIGRATION 003: Create researcher_profiles table
-- ============================================

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

6. Click **Run** button
7. Verify success: You should see "Success. No rows returned"

### Option 2: Run Migrations One by One

If you prefer to run migrations individually:

1. Go to **SQL Editor**
2. Run migration 001 (users table) - from `../supabase/migrations/001_create_users_table.sql`
3. Run migration 002 (patient_profiles) - from `../supabase/migrations/002_create_patient_profiles_table.sql`
4. Run migration 003 (researcher_profiles) - from `../supabase/migrations/003_create_researcher_profiles_table.sql`

## Verify Database Setup

After running migrations, verify tables were created:

1. In Supabase Dashboard, go to **Table Editor**
2. You should see three tables:
   - `users`
   - `patient_profiles`
   - `researcher_profiles`

## Test Data (Optional)

Want to add test users? Run this in SQL Editor:

```sql
-- Test Patient
INSERT INTO users (email, password_hash, user_type, first_name, last_name)
VALUES (
  'test.patient@example.com',
  '$2a$10$YourHashedPasswordHere', -- Replace with actual bcrypt hash
  'PATIENT',
  'Test',
  'Patient'
) RETURNING id;

-- Use the returned ID in the patient_profiles insert
INSERT INTO patient_profiles (user_id, condition)
VALUES ('UUID_FROM_ABOVE', 'Test Condition');
```

Note: You'll need to generate proper password hashes using the API signup endpoint.

## Common Issues

### "relation already exists"

This means tables are already created. You can:
- Skip migration (tables exist)
- Drop and recreate: `DROP TABLE IF EXISTS users CASCADE;` then run migration

### "permission denied"

Make sure you're using the Supabase SQL Editor with admin access, not running SQL from your application.

## Next Steps

After database setup:

1. Verify `.env` file has correct credentials
2. Start backend server: `npm run dev`
3. Test signup endpoint with cURL or Postman
4. Connect frontend and test full authentication flow

---

Done! Your database is ready for CuraLink authentication.
