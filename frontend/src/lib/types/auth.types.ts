import { User, UserType } from './user.types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupPatientRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  condition?: string;
}

export interface SignupResearcherRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  institution?: string;
  specialization?: string;
  bio?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  userType: UserType;
  iat: number;
  exp: number;
}
