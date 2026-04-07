import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase credentials in .env file!');
  process.exit(1);
}

console.log('🚀 CuraLink Database Setup\n');
console.log('📍 Supabase URL:', supabaseUrl);
console.log('🔗 Connecting to Supabase...\n');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Read the complete SQL setup file
const sqlFile = join(__dirname, 'COMPLETE_SETUP.sql');
const completeSql = readFileSync(sqlFile, 'utf8');

// Split into individual statements for better error handling
const migrations = [
  {
    name: 'Create users table',
    sql: `
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
    `
  },
  {
    name: 'Create timestamp function',
    sql: `
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';
    `
  },
  {
    name: 'Create users trigger',
    sql: `
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
    `
  },
  {
    name: 'Create patient_profiles table',
    sql: `
CREATE TABLE IF NOT EXISTS patient_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  condition TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_patient_profiles_user_id ON patient_profiles(user_id);
    `
  },
  {
    name: 'Create patient_profiles trigger',
    sql: `
DROP TRIGGER IF EXISTS update_patient_profiles_updated_at ON patient_profiles;
CREATE TRIGGER update_patient_profiles_updated_at
  BEFORE UPDATE ON patient_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
    `
  },
  {
    name: 'Create researcher_profiles table',
    sql: `
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
    `
  },
  {
    name: 'Create researcher_profiles trigger',
    sql: `
DROP TRIGGER IF EXISTS update_researcher_profiles_updated_at ON researcher_profiles;
CREATE TRIGGER update_researcher_profiles_updated_at
  BEFORE UPDATE ON researcher_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
    `
  }
];

async function createTables() {
  console.log('📝 Creating database tables...\n');

  for (const migration of migrations) {
    try {
      console.log(`   Creating ${migration.name}...`);

      // Execute raw SQL using Supabase REST API
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          query: migration.sql
        })
      });

      // Note: Supabase doesn't expose direct SQL execution via REST API
      // We need to use the SQL Editor or Supabase CLI
      console.log(`   ℹ️  ${migration.name} - SQL ready (needs manual execution)`);

    } catch (err) {
      console.log(`   ⚠️  ${migration.name}:`, err.message);
    }
  }

  // Try to verify tables exist using Supabase client
  console.log('\n📋 Verifying tables...\n');

  try {
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });

    const { data: patients, error: patientsError } = await supabase
      .from('patient_profiles')
      .select('count', { count: 'exact', head: true });

    const { data: researchers, error: researchersError } = await supabase
      .from('researcher_profiles')
      .select('count', { count: 'exact', head: true });

    if (!usersError) {
      console.log('   ✅ users table exists');
    } else if (usersError.code === 'PGRST116') {
      console.log('   ❌ users table NOT FOUND');
    } else {
      console.log('   ⚠️  users table check failed:', usersError.message);
    }

    if (!patientsError) {
      console.log('   ✅ patient_profiles table exists');
    } else if (patientsError.code === 'PGRST116') {
      console.log('   ❌ patient_profiles table NOT FOUND');
    } else {
      console.log('   ⚠️  patient_profiles table check failed');
    }

    if (!researchersError) {
      console.log('   ✅ researcher_profiles table exists');
    } else if (researchersError.code === 'PGRST116') {
      console.log('   ❌ researcher_profiles table NOT FOUND');
    } else {
      console.log('   ⚠️  researcher_profiles table check failed');
    }

    const allTablesExist = !usersError && !patientsError && !researchersError;

    if (allTablesExist) {
      console.log('\n🎉 SUCCESS! All tables exist!\n');
      console.log('✅ Database setup complete!');
      console.log('\n📍 Next steps:');
      console.log('   1. Start backend: npm run dev');
      console.log('   2. Test: curl http://localhost:8000/health');
      console.log('   3. Start frontend: cd frontend && npm run dev\n');
    } else {
      console.log('\n⚠️  Tables not found. Creating them now...\n');
      console.log('📋 Please run this SQL in Supabase SQL Editor:');
      console.log('   1. Go to: https://supabase.com/dashboard');
      console.log('   2. Select your project');
      console.log('   3. Click "SQL Editor" → "New Query"');
      console.log('   4. Copy the content from: backend/COMPLETE_SETUP.sql');
      console.log('   5. Paste and click "Run"\n');
      console.log('Or copy this SQL:\n');
      console.log('---START SQL---');
      console.log(completeSql);
      console.log('---END SQL---\n');
    }

  } catch (err) {
    console.error('\n❌ Error verifying tables:', err.message);
    console.log('\n📋 Please manually create tables using Supabase SQL Editor');
    console.log('   SQL file: backend/COMPLETE_SETUP.sql\n');
  }
}

createTables().catch(err => {
  console.error('\n❌ Setup failed:', err.message);
  process.exit(1);
});
