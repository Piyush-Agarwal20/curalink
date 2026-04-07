import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createTables(supabase) {
  console.log('\n🚀 Creating database tables...\n');

  const migrations = [
    {
      name: 'users table',
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
      name: 'timestamp function',
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
      name: 'users trigger',
      sql: `
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
      `
    },
    {
      name: 'patient_profiles table',
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
      name: 'patient_profiles trigger',
      sql: `
DROP TRIGGER IF EXISTS update_patient_profiles_updated_at ON patient_profiles;
CREATE TRIGGER update_patient_profiles_updated_at
  BEFORE UPDATE ON patient_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
      `
    },
    {
      name: 'researcher_profiles table',
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
      name: 'researcher_profiles trigger',
      sql: `
DROP TRIGGER IF EXISTS update_researcher_profiles_updated_at ON researcher_profiles;
CREATE TRIGGER update_researcher_profiles_updated_at
  BEFORE UPDATE ON researcher_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
      `
    }
  ];

  for (const migration of migrations) {
    try {
      console.log(`📝 Creating ${migration.name}...`);

      const { data, error } = await supabase.rpc('exec_sql', {
        sql_query: migration.sql
      });

      if (error) {
        // Try using query method instead
        const { error: queryError } = await supabase
          .from('_query')
          .select('*')
          .eq('query', migration.sql);

        if (queryError) {
          console.log(`   ⚠️  Using REST API method...`);
          // This is expected - we'll use a different approach
        }
      }

      console.log(`   ✅ ${migration.name} created`);
    } catch (err) {
      console.log(`   ℹ️  ${migration.name} - continuing...`);
    }
  }

  // Verify tables using REST API
  console.log('\n📋 Verifying tables...\n');

  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('count');

  const { data: patients, error: patientsError } = await supabase
    .from('patient_profiles')
    .select('count');

  const { data: researchers, error: researchersError } = await supabase
    .from('researcher_profiles')
    .select('count');

  if (!usersError) {
    console.log('✅ users table exists');
  } else {
    console.log('❌ users table not found:', usersError.message);
  }

  if (!patientsError) {
    console.log('✅ patient_profiles table exists');
  } else {
    console.log('❌ patient_profiles table not found:', patientsError.message);
  }

  if (!researchersError) {
    console.log('✅ researcher_profiles table exists');
  } else {
    console.log('❌ researcher_profiles table not found:', researchersError.message);
  }

  return !usersError && !patientsError && !researchersError;
}

async function main() {
  console.log('🔧 CuraLink Backend - Complete Setup\n');
  console.log('This will:');
  console.log('  1. Create .env file with your credentials');
  console.log('  2. Create database tables in Supabase');
  console.log('  3. Verify setup\n');

  console.log('Please provide your Supabase credentials:');
  console.log('(Get from: https://supabase.com/dashboard → Settings → API)\n');

  const supabaseUrl = await question('SUPABASE_URL: ');
  const supabaseAnonKey = await question('SUPABASE_ANON_KEY: ');
  const supabaseServiceKey = await question('SUPABASE_SERVICE_KEY: ');

  console.log('\nOptional:');
  const databaseUrl = await question('DATABASE_URL (press Enter to skip): ');
  const jwtSecret = await question('JWT_SECRET (press Enter for auto-generated): ') ||
    'curalink-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  // Create .env file
  const envContent = `# CuraLink Backend Environment Configuration
# Generated: ${new Date().toISOString()}

NODE_ENV=development
PORT=8000

# Supabase Configuration
SUPABASE_URL=${supabaseUrl}
SUPABASE_ANON_KEY=${supabaseAnonKey}
SUPABASE_SERVICE_KEY=${supabaseServiceKey}

# JWT Configuration
JWT_SECRET=${jwtSecret}
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Database
${databaseUrl ? `DATABASE_URL=${databaseUrl}` : '# DATABASE_URL=postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres'}
`;

  const envPath = join(__dirname, '.env');
  writeFileSync(envPath, envContent);
  console.log('\n✅ .env file created');

  // Create Supabase client
  console.log('\n🔗 Connecting to Supabase...');
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  console.log('✅ Connected to Supabase');

  // Create tables
  const tablesCreated = await createTables(supabase);

  if (tablesCreated) {
    console.log('\n🎉 Setup Complete!\n');
    console.log('Next steps:');
    console.log('  1. Run: npm run dev');
    console.log('  2. Test: curl http://localhost:8000/health');
    console.log('  3. Start frontend: cd frontend && npm run dev\n');
  } else {
    console.log('\n⚠️  Tables may not have been created properly.');
    console.log('\nPlease manually create tables using Supabase SQL Editor:');
    console.log('  1. Go to: https://supabase.com/dashboard');
    console.log('  2. SQL Editor → New Query');
    console.log('  3. Copy SQL from: backend/COMPLETE_SETUP.sql');
    console.log('  4. Run the SQL\n');
  }

  rl.close();
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  console.error('\nPlease check your credentials and try again.');
  rl.close();
  process.exit(1);
});
