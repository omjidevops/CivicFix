// ============================================================================
// CIVICFIX — DAY 40: REACT AUTHENTICATION CONTEXT (AuthContext.jsx)
// Package: context/AuthContext.jsx
//
// Concepts:
// 1. React Context API provides global state without external libraries like Redux.
// 2. Tracks: user, token, isAuthenticated, role, and loading state.
// 3. Exposes login, register, and logout actions to all components.
// ============================================================================

import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hydrate auth state from localStorage on initial load
  useEffect(() => {
    const savedToken = authService.getStoredToken();
    const savedUser = authService.getStoredUser();

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  /**
   * Performs user login
   */
  const login = async (email, password) => {
    const data = await authService.loginUser({ email, password });
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  /**
   * Performs citizen registration
   */
  const register = async (userData) => {
    return await authService.registerUser(userData);
  };

  /**
   * Performs client-side logout
   */
  const logout = () => {
    authService.logoutUser();
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    role: user?.role || null,
    isAuthenticated: !!token,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to consume AuthContext cleanly in components
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
