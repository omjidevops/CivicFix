// ============================================================================
// CIVICFIX — DAYS 38 & 40: CENTRALIZED AXIOS INSTANCE (api.js)
// Package: services/api.js
//
// Features:
// 1. Configures Spring Boot backend target (http://localhost:8081)
// 2. Request Interceptor: Automatically inspects localStorage for 'civicfix_token'
//    and attaches "Authorization: Bearer <token>" to every outgoing HTTP request.
// 3. Response Interceptor: Catches 401 Unauthorized responses to handle expired tokens.
// ============================================================================

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Request Interceptor: Injects Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('civicfix_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Catches 401 token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token expired, clear invalid auth state
      if (localStorage.getItem('civicfix_token')) {
        localStorage.removeItem('civicfix_token');
        localStorage.removeItem('civicfix_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
