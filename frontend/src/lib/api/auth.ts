import apiClient, { handleApiResponse, handleApiError } from './client';
import {
  LoginRequest,
  SignupPatientRequest,
  SignupResearcherRequest,
  AuthResponse,
  ApiResponse,
  ApiError,
  User,
} from '../types';

/**
 * Login user
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/api/auth/login',
      data
    );
    const result = handleApiResponse<AuthResponse>(response);
    return result.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Signup patient
 */
export const signupPatient = async (
  data: SignupPatientRequest
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/api/auth/signup/patient',
      data
    );
    const result = handleApiResponse<AuthResponse>(response);
    return result.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Signup researcher
 */
export const signupResearcher = async (
  data: SignupResearcherRequest
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/api/auth/signup/researcher',
      data
    );
    const result = handleApiResponse<AuthResponse>(response);
    return result.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get<ApiResponse<User>>('/api/auth/me');
    const result = handleApiResponse<User>(response);
    return result.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/api/auth/logout');
  } catch (error) {
    // Ignore logout errors, clear local storage anyway
    console.error('Logout error:', error);
  }
};

/**
 * Refresh token (if backend supports it)
 */
export const refreshToken = async (): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/api/auth/refresh'
    );
    const result = handleApiResponse<AuthResponse>(response);
    return result.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
