import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ApiError, ApiResponse } from '../types';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        success: false,
        error: 'Network Error',
        message: 'Unable to connect to the server. Please check your internet connection.',
        statusCode: 0,
      } as ApiError);
    }

    const { response } = error;
    const apiError: ApiError = {
      success: false,
      error: response.data?.error || 'Error',
      message: response.data?.message || 'An unexpected error occurred',
      statusCode: response.status,
      details: response.data?.details,
    };

    // Handle 401 Unauthorized - Clear auth and redirect to login
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');

      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // Handle 403 Forbidden
    if (response.status === 403) {
      apiError.message = 'You do not have permission to perform this action.';
    }

    // Handle 404 Not Found
    if (response.status === 404) {
      apiError.message = 'The requested resource was not found.';
    }

    // Handle 500 Internal Server Error
    if (response.status === 500) {
      apiError.message = 'A server error occurred. Please try again later.';
    }

    return Promise.reject(apiError);
  }
);

// Helper function to handle API responses
export const handleApiResponse = <T>(response: any): ApiResponse<T> => {
  return response.data;
};

// Helper function to handle API errors
export const handleApiError = (error: any): ApiError => {
  if (error.success === false) {
    return error as ApiError;
  }

  return {
    success: false,
    error: 'Unknown Error',
    message: error.message || 'An unexpected error occurred',
    statusCode: 500,
  };
};

export default apiClient;
