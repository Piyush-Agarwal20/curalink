import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    signupPatient,
    signupResearcher,
    logout,
    checkAuth,
    clearError,
  } = useAuthStore();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    signupPatient,
    signupResearcher,
    logout,
    checkAuth,
    clearError,
  };
};
