import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { supabaseAdmin } from '../config/supabase.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Helper: Generate JWT token
const generateToken = (userId, email, userType) => {
  return jwt.sign(
    { userId, email, userType },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Helper: Format user response
const formatUserResponse = (user, patient = null, researcher = null) => {
  return {
    id: user.id,
    email: user.email,
    userType: user.user_type,
    firstName: user.first_name,
    lastName: user.last_name,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    ...(patient && { patient }),
    ...(researcher && { researcher }),
  };
};

// POST /api/auth/signup/patient
export const signupPatient = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: errors.array()[0].msg,
        statusCode: 400,
      });
    }

    const { email, password, firstName, lastName, condition } = req.body;

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User Exists',
        message: 'An account with this email already exists',
        statusCode: 400,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        email,
        password_hash: hashedPassword,
        user_type: 'PATIENT',
        first_name: firstName,
        last_name: lastName,
      })
      .select()
      .single();

    if (userError) throw userError;

    // Create patient profile
    const { data: patient, error: patientError } = await supabaseAdmin
      .from('patient_profiles')
      .insert({
        user_id: user.id,
        condition: condition || null,
      })
      .select()
      .single();

    if (patientError) throw patientError;

    // Generate token
    const token = generateToken(user.id, user.email, 'PATIENT');

    res.status(201).json({
      success: true,
      data: {
        user: formatUserResponse(user, {
          userId: patient.user_id,
          condition: patient.condition,
          createdAt: patient.created_at,
          updatedAt: patient.updated_at,
        }),
        token,
        expiresIn: JWT_EXPIRES_IN,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/signup/researcher
export const signupResearcher = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: errors.array()[0].msg,
        statusCode: 400,
      });
    }

    const { email, password, firstName, lastName, institution, specialization, bio } = req.body;

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User Exists',
        message: 'An account with this email already exists',
        statusCode: 400,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        email,
        password_hash: hashedPassword,
        user_type: 'RESEARCHER',
        first_name: firstName,
        last_name: lastName,
      })
      .select()
      .single();

    if (userError) throw userError;

    // Create researcher profile
    const { data: researcher, error: researcherError } = await supabaseAdmin
      .from('researcher_profiles')
      .insert({
        user_id: user.id,
        institution,
        specialization,
        bio: bio || null,
      })
      .select()
      .single();

    if (researcherError) throw researcherError;

    // Generate token
    const token = generateToken(user.id, user.email, 'RESEARCHER');

    res.status(201).json({
      success: true,
      data: {
        user: formatUserResponse(user, null, {
          userId: researcher.user_id,
          institution: researcher.institution,
          specialization: researcher.specialization,
          bio: researcher.bio,
          createdAt: researcher.created_at,
          updatedAt: researcher.updated_at,
        }),
        token,
        expiresIn: JWT_EXPIRES_IN,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: errors.array()[0].msg,
        statusCode: 400,
      });
    }

    const { email, password } = req.body;

    // Find user
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError || !user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication Failed',
        message: 'Invalid email or password',
        statusCode: 401,
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Authentication Failed',
        message: 'Invalid email or password',
        statusCode: 401,
      });
    }

    // Get profile based on user type
    let profileData = null;
    if (user.user_type === 'PATIENT') {
      const { data: patient } = await supabaseAdmin
        .from('patient_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      profileData = patient ? {
        userId: patient.user_id,
        condition: patient.condition,
        createdAt: patient.created_at,
        updatedAt: patient.updated_at,
      } : null;
    } else if (user.user_type === 'RESEARCHER') {
      const { data: researcher } = await supabaseAdmin
        .from('researcher_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      profileData = researcher ? {
        userId: researcher.user_id,
        institution: researcher.institution,
        specialization: researcher.specialization,
        bio: researcher.bio,
        createdAt: researcher.created_at,
        updatedAt: researcher.updated_at,
      } : null;
    }

    // Generate token
    const token = generateToken(user.id, user.email, user.user_type);

    res.json({
      success: true,
      data: {
        user: formatUserResponse(
          user,
          user.user_type === 'PATIENT' ? profileData : null,
          user.user_type === 'RESEARCHER' ? profileData : null
        ),
        token,
        expiresIn: JWT_EXPIRES_IN,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        error: 'User Not Found',
        message: 'User account not found',
        statusCode: 404,
      });
    }

    // Get profile based on user type
    let profileData = null;
    if (user.user_type === 'PATIENT') {
      const { data: patient } = await supabaseAdmin
        .from('patient_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      profileData = patient ? {
        userId: patient.user_id,
        condition: patient.condition,
        createdAt: patient.created_at,
        updatedAt: patient.updated_at,
      } : null;
    } else if (user.user_type === 'RESEARCHER') {
      const { data: researcher } = await supabaseAdmin
        .from('researcher_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      profileData = researcher ? {
        userId: researcher.user_id,
        institution: researcher.institution,
        specialization: researcher.specialization,
        bio: researcher.bio,
        createdAt: researcher.created_at,
        updatedAt: researcher.updated_at,
      } : null;
    }

    res.json({
      success: true,
      data: formatUserResponse(
        user,
        user.user_type === 'PATIENT' ? profileData : null,
        user.user_type === 'RESEARCHER' ? profileData : null
      ),
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout
export const logout = async (req, res, next) => {
  try {
    // In a JWT-based system, logout is handled client-side by removing the token
    // However, you could implement token blacklisting here if needed
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};
