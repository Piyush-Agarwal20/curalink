import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const { Pool } = pg;

// Use session mode pooler (port 5432) for DDL operations like CREATE TABLE
const password = process.env.DATABASE_PASSWORD || 'Piyush*20*';
const dbUrl = `postgresql://postgres:${password}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres`;

console.log('Connecting to Supabase (session mode)...');

const pool = new Pool({
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false
  }
});

const createTablesSQL = `
-- Drop existing tables if they exist
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
`;

async function createTables() {
  console.log('🚀 Creating tables in Supabase database...\n');

  try {
    console.log('📍 Connecting to database...');
    const client = await pool.connect();
    console.log('✅ Connected!\n');

    console.log('📝 Running SQL migrations...');
    await client.query(createTablesSQL);
    console.log('✅ Tables created successfully!\n');

    console.log('📋 Verifying tables...');
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('\n✅ Tables in database:');
    result.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });

    client.release();

    console.log('\n🎉 SUCCESS! Database setup complete!\n');
    console.log('📍 Next steps:');
    console.log('   1. Backend is already running on port 8000');
    console.log('   2. Test signup: curl -X POST http://localhost:8000/api/auth/signup/patient \\');
    console.log('      -H "Content-Type: application/json" \\');
    console.log('      -d \'{"email":"test@example.com","password":"password123","firstName":"John","lastName":"Doe"}\'');
    console.log('   3. Start frontend: cd frontend && npm run dev\n');

  } catch (err) {
    console.error('\n❌ Error creating tables:', err.message);
    console.error('\nFull error:', err);
  } finally {
    await pool.end();
  }
}

createTables();
