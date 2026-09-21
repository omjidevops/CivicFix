// ============================================================================
// CIVICFIX — DAY 46: ADMIN SERVICE (adminService.js)
// Package: services/adminService.js
//
// Encapsulates all Administrative API calls to Spring Boot /api/admin/*
// Automatically attaches Bearer JWT token via api.js Axios interceptor.
// ============================================================================

import api from './api.js';

/**
 * 1. GET ADMIN DASHBOARD STATS
 * Aggregated KPIs (Total, Pending, Verified, Assigned, InProgress, Resolved, Critical, Rate)
 */
export const getAdminStats = async () => {
  const response = await api.get('/api/admin/dashboard/stats');
  return response.data;
};

/**
 * 2. GET ADMIN FILTERED COMPLAINTS
 */
export const getAdminComplaints = async (params = {}) => {
  const queryParams = new URLSearchParams();
  if (params.status && params.status !== 'ALL') queryParams.append('status', params.status);
  if (params.category && params.category !== 'ALL') queryParams.append('category', params.category);
  if (params.priority && params.priority !== 'ALL') queryParams.append('priority', params.priority);
  if (params.departmentId) queryParams.append('departmentId', params.departmentId);
  if (params.search && params.search.trim()) queryParams.append('search', params.search.trim());

  const url = `/api/admin/complaints${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await api.get(url);
  return Array.isArray(response.data) ? response.data : [];
};

/**
 * 3. GET 360-DEGREE COMPLAINT DETAILS
 */
export const getAdminComplaintDetails = async (id) => {
  const numericId = String(id).replace(/^CF-?/i, '');
  const response = await api.get(`/api/admin/complaints/${numericId}`);
  return response.data;
};

/**
 * 4. VERIFY COMPLAINT (Admin Triage)
 * Status: SUBMITTED -> VERIFIED
 */
export const verifyComplaint = async (id, remarks) => {
  const numericId = String(id).replace(/^CF-?/i, '');
  const response = await api.put(`/api/admin/complaints/${numericId}/verify`, { remarks });
  return response.data;
};

/**
 * 5. GET ALL MUNICIPAL DEPARTMENTS
 */
export const getDepartments = async () => {
  const response = await api.get('/api/admin/departments');
  return Array.isArray(response.data) ? response.data : [];
};

/**
 * 6. GET ALL MUNICIPAL FIELD EMPLOYEES
 */
export const getEmployees = async () => {
  const response = await api.get('/api/admin/employees');
  return Array.isArray(response.data) ? response.data : [];
};

/**
 * 7. ASSIGN DEPARTMENT & EMPLOYEE
 * Status: VERIFIED -> ASSIGNED
 */
export const assignComplaint = async (id, assignmentData) => {
  const numericId = String(id).replace(/^CF-?/i, '');
  const payload = {
    departmentId: Number(assignmentData.departmentId),
    employeeId: Number(assignmentData.employeeId),
    deadline: assignmentData.deadline ? `${assignmentData.deadline}T23:59:59` : null,
    instructions: assignmentData.instructions || ''
  };
  const response = await api.post(`/api/admin/complaints/${numericId}/assign`, payload);
  return response.data;
};

/**
 * 8. GET MUNICIPAL ANALYTICS
 */
export const getAdminAnalytics = async () => {
  const response = await api.get('/api/admin/analytics');
  return response.data;
};
