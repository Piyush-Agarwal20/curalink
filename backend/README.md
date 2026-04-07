# CuraLink Backend API

Express.js backend for CuraLink healthcare platform with Supabase PostgreSQL database.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT with bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── supabase.js          # Supabase client configuration
│   ├── controllers/
│   │   └── authController.js     # Authentication logic
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── errorHandler.js       # Global error handler
│   ├── routes/
│   │   └── auth.js               # Authentication routes
│   └── server.js                 # Express app entry point
├── supabase/
│   ├── migrations/               # Database migrations
│   │   ├── 001_create_users_table.sql
│   │   ├── 002_create_patient_profiles_table.sql
│   │   └── 003_create_researcher_profiles_table.sql
│   └── functions/                # Supabase Edge Functions (future)
├── .env                          # Environment variables (create from .env.example)
├── .env.example                  # Environment template
├── .gitignore
├── package.json
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
NODE_ENV=development
PORT=8000

# Supabase Configuration
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-role-key

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Database (optional - for direct PostgreSQL access)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

**See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed credential instructions.**

### 3. Run Database Migrations

Execute the SQL migrations in your Supabase SQL Editor in order:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run each migration file in order:
   - `supabase/migrations/001_create_users_table.sql`
   - `supabase/migrations/002_create_patient_profiles_table.sql`
   - `supabase/migrations/003_create_researcher_profiles_table.sql`

Alternatively, copy all migration content and run together.

### 4. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:8000`

### 5. Test the API

**Health Check:**
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "success": true,
  "message": "CuraLink Backend API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## API Endpoints

### Authentication Routes

#### POST /api/auth/signup/patient
Register a new patient account.

**Request Body:**
```json
{
  "email": "patient@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "condition": "Type 2 Diabetes"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "patient@example.com",
      "userType": "PATIENT",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "patient": {
        "userId": "uuid",
        "condition": "Type 2 Diabetes",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    },
    "token": "jwt-token-here",
    "expiresIn": "7d"
  }
}
```

#### POST /api/auth/signup/researcher
Register a new researcher account.

**Request Body:**
```json
{
  "email": "researcher@university.edu",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith",
  "institution": "Stanford University",
  "specialization": "Oncology",
  "bio": "Cancer researcher with 10 years experience"
}
```

**Response:** Similar to patient signup with researcher profile.

#### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt-token",
    "expiresIn": "7d"
  }
}
```

#### GET /api/auth/me
Get current authenticated user (requires JWT token).

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "userType": "PATIENT",
    "firstName": "John",
    "lastName": "Doe",
    "patient": { ... }
  }
}
```

#### POST /api/auth/logout
Logout current user (JWT invalidation handled client-side).

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Database Schema

### users
- `id` (UUID, primary key)
- `email` (VARCHAR, unique, not null)
- `password_hash` (VARCHAR, not null)
- `user_type` (VARCHAR, enum: PATIENT/RESEARCHER)
- `first_name` (VARCHAR, not null)
- `last_name` (VARCHAR, not null)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### patient_profiles
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key → users.id, unique)
- `condition` (TEXT, optional)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### researcher_profiles
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key → users.id, unique)
- `institution` (VARCHAR, not null)
- `specialization` (VARCHAR, not null)
- `bio` (TEXT, optional)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human-readable error message",
  "statusCode": 400
}
```

**Common Error Codes:**
- `400` - Validation error, bad request
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (valid token but insufficient permissions)
- `404` - Resource not found
- `500` - Internal server error

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **Input Validation**: express-validator on all inputs
- **SQL Injection Protection**: Supabase parameterized queries

## Development

### Scripts

```bash
npm run dev     # Start with nodemon (auto-reload)
npm start       # Start production server
```

### Testing with cURL

**Patient Signup:**
```bash
curl -X POST http://localhost:8000/api/auth/signup/patient \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.patient@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "Patient",
    "condition": "Testing"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test.patient@example.com",
    "password": "password123"
  }'
```

**Get Current User:**
```bash
curl -X GET http://localhost:8000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Issue: "Missing Supabase credentials"

**Solution**: Ensure `.env` file exists with valid `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`.

### Issue: "User already exists"

**Solution**: Email must be unique. Use different email or delete existing user from Supabase database.

### Issue: "Database error"

**Solution**: Ensure migrations have been run in Supabase SQL Editor.

### Issue: CORS errors

**Solution**: Verify `CORS_ORIGIN` in `.env` matches your frontend URL (default: `http://localhost:5173`).

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Use strong `JWT_SECRET` (generate with: `openssl rand -base64 32`)
3. Use HTTPS in production
4. Configure proper CORS origins
5. Enable Supabase Row Level Security (RLS) policies
6. Set up monitoring and logging

## Next Steps

- [ ] Implement password reset flow
- [ ] Add email verification
- [ ] Implement refresh token rotation
- [ ] Add rate limiting
- [ ] Set up Supabase RLS policies
- [ ] Add logging with Winston
- [ ] Implement patient and researcher features

## Support

For issues or questions, check:
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Supabase configuration guide
- Frontend repo - Integration documentation
- Supabase Docs: https://supabase.com/docs

---

**Backend Status**: ✅ Authentication Complete
**Next Phase**: Patient & Researcher Features
