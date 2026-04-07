import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from backend/.env
dotenv.config({ path: join(__dirname, '..', '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase credentials!');
  console.error('Please create backend/.env file with:');
  console.error('  SUPABASE_URL=your-url');
  console.error('  SUPABASE_SERVICE_KEY=your-service-key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const migrations = [
  {
    name: '001_create_users_table',
    sql: `
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

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create index on user_type for filtering
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
    `
  },
  {
    name: '002_create_patient_profiles_table',
    sql: `
-- Create patient_profiles table
CREATE TABLE IF NOT EXISTS patient_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  condition TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for faster joins
CREATE INDEX IF NOT EXISTS idx_patient_profiles_user_id ON patient_profiles(user_id);

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS update_patient_profiles_updated_at ON patient_profiles;
CREATE TRIGGER update_patient_profiles_updated_at
  BEFORE UPDATE ON patient_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
    `
  },
  {
    name: '003_create_researcher_profiles_table',
    sql: `
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

-- Create index on user_id for faster joins
CREATE INDEX IF NOT EXISTS idx_researcher_profiles_user_id ON researcher_profiles(user_id);

-- Create index on specialization for search
CREATE INDEX IF NOT EXISTS idx_researcher_profiles_specialization ON researcher_profiles(specialization);

-- Drop trigger if exists and create new one
DROP TRIGGER IF EXISTS update_researcher_profiles_updated_at ON researcher_profiles;
CREATE TRIGGER update_researcher_profiles_updated_at
  BEFORE UPDATE ON researcher_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
    `
  }
];

async function runMigrations() {
  console.log('🚀 Starting Supabase database setup...\n');

  for (const migration of migrations) {
    console.log(`📝 Running migration: ${migration.name}...`);

    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql: migration.sql });

      // Try alternative method if rpc doesn't work
      if (error) {
        console.log(`   Trying alternative method...`);
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`
          },
          body: JSON.stringify({ query: migration.sql })
        });

        if (!response.ok) {
          console.log(`⚠️  Note: Cannot execute SQL via API. Please use Supabase SQL Editor.`);
          console.log(`   Migration SQL available in: backend/supabase/migrations/${migration.name}.sql`);
        } else {
          console.log(`✅ ${migration.name} - Success`);
        }
      } else {
        console.log(`✅ ${migration.name} - Success`);
      }
    } catch (err) {
      console.log(`⚠️  ${migration.name} - Manual execution needed`);
      console.log(`   Error: ${err.message}`);
    }
    console.log('');
  }

  console.log('📋 Verifying tables...\n');

  try {
    // Check if tables exist
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    const { data: patients, error: patientsError } = await supabase
      .from('patient_profiles')
      .select('count')
      .limit(1);

    const { data: researchers, error: researchersError } = await supabase
      .from('researcher_profiles')
      .select('count')
      .limit(1);

    if (!usersError) console.log('✅ users table exists');
    else console.log('❌ users table missing');

    if (!patientsError) console.log('✅ patient_profiles table exists');
    else console.log('❌ patient_profiles table missing');

    if (!researchersError) console.log('✅ researcher_profiles table exists');
    else console.log('❌ researcher_profiles table missing');

    console.log('\n🎉 Database setup complete!');
    console.log('\nNext steps:');
    console.log('  1. Start backend: npm run dev');
    console.log('  2. Test signup endpoint');
    console.log('  3. Start frontend and test full authentication flow');

  } catch (err) {
    console.log('\n⚠️  Could not verify tables automatically.');
    console.log('Please check Supabase Dashboard → Table Editor to verify tables exist.');
  }
}

// Alternative: Print SQL for manual execution
function printManualInstructions() {
  console.log('\n📋 MANUAL SETUP INSTRUCTIONS');
  console.log('================================\n');
  console.log('If automatic setup fails, manually run these migrations in Supabase SQL Editor:\n');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Select your project');
  console.log('3. Click "SQL Editor"');
  console.log('4. Click "New Query"');
  console.log('5. Copy and paste ALL the SQL below:\n');
  console.log('--- START SQL ---\n');
  migrations.forEach(m => {
    console.log(`-- ${m.name}`);
    console.log(m.sql);
    console.log('');
  });
  console.log('--- END SQL ---\n');
  console.log('6. Click "Run"');
  console.log('7. Verify tables in "Table Editor"\n');
}

runMigrations().catch(err => {
  console.error('❌ Setup failed:', err.message);
  printManualInstructions();
  process.exit(1);
});
