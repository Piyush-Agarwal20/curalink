import { readFileSync, writeFileSync } from 'fs';
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

async function createEnvFile() {
  console.log('🔧 CuraLink Backend Environment Setup\n');
  console.log('Please provide your Supabase credentials:');
  console.log('(Get these from: https://supabase.com/dashboard → Settings → API)\n');

  const supabaseUrl = await question('SUPABASE_URL (e.g., https://xxxxx.supabase.co): ');
  const supabaseAnonKey = await question('SUPABASE_ANON_KEY (starts with eyJ...): ');
  const supabaseServiceKey = await question('SUPABASE_SERVICE_KEY (starts with eyJ...): ');

  console.log('\nOptional - Database connection string:');
  console.log('(Get from: Settings → Database → Connection string → URI)');
  const databaseUrl = await question('DATABASE_URL (press Enter to skip): ');

  console.log('\nJWT Configuration:');
  const jwtSecret = await question('JWT_SECRET (press Enter for auto-generated): ') ||
    'curalink-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const envContent = `# CuraLink Backend Environment Configuration
# Generated: ${new Date().toISOString()}

# Server Configuration
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

# Database (optional)
${databaseUrl ? `DATABASE_URL=${databaseUrl}` : '# DATABASE_URL=postgresql://postgres:[password]@db.xxxxx.supabase.co:5432/postgres'}
`;

  const envPath = join(__dirname, '..', '.env');
  writeFileSync(envPath, envContent);

  console.log('\n✅ .env file created successfully!');
  console.log(`   Location: ${envPath}`);
  console.log('\n🚀 Next steps:');
  console.log('   1. Run: npm run setup:db');
  console.log('   2. Run: npm run dev');
  console.log('   3. Test: curl http://localhost:8000/health\n');

  rl.close();
}

createEnvFile().catch(err => {
  console.error('❌ Error:', err.message);
  rl.close();
  process.exit(1);
});
