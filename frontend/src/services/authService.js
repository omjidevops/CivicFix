// ============================================================================
// CIVICFIX — DAY 40: AUTHENTICATION SERVICE (authService.js)
// Package: services/authService.js
//
// Communicates with Spring Boot /api/auth endpoints:
// - registerUser(data) -> POST /api/auth/register
// - loginUser(credentials) -> POST /api/auth/login
// - logoutUser() -> Cleans client authentication tokens
// ============================================================================

import api from './api';

export const authService = {
  /**
   * Register a new citizen account
   * @param {Object} userData - { name, email, password, phone }
   */
  async registerUser(userData) {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  /**
   * Login with email and password, receives signed JWT
   * @param {Object} credentials - { email, password }
   */
  async loginUser(credentials) {
    const response = await api.post('/api/auth/login', credentials);
    const { token, user } = response.data;

    // Store in localStorage for persistence across browser page reloads
    if (token) {
      localStorage.setItem('civicfix_token', token);
      localStorage.setItem('civicfix_user', JSON.stringify(user));
    }

    return response.data;
  },

  /**
   * Client-side logout: clears token & cached profile
   */
  logoutUser() {
    localStorage.removeItem('civicfix_token');
    localStorage.removeItem('civicfix_user');
  },

  /**
   * Retrieve active stored JWT token
   */
  getStoredToken() {
    return localStorage.getItem('civicfix_token');
  },

  /**
   * Retrieve active stored user profile
   */
  getStoredUser() {
    const raw = localStorage.getItem('civicfix_user');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
};

export default authService;
