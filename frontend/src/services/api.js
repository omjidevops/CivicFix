// ============================================================================
// DAY 18 — API SERVICE LAYER (api.js)
// Creates a centralized Axios instance configured with base settings.
//
// Why a service layer?
// 1. Centralizes baseURL, headers, and timeouts in one file.
// 2. Separates HTTP networking logic from React UI components.
// 3. When we connect Spring Boot on Day 30+, we ONLY change baseURL here,
//    and every component in CivicFix automatically communicates with the new backend!
// ============================================================================

import axios from 'axios';

// Base Axios instance
// Currently configured with safe defaults for learning.
// In Phase 6 (Spring Boot integration), baseURL will switch to: "http://localhost:8080/api/v1"
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Safe public REST practice endpoint
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 8000 // Timeout after 8 seconds if server doesn't respond
});

export default api;
