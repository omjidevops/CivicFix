// ============================================================================
// CIVICFIX — DAY 47: EMPLOYEE FIELD OPERATIONS AXIOS SERVICE
// File: src/services/employeeService.js
//
// Communicates with backend /api/employee/* endpoints:
// - getEmployeeStats()                : 4 field KPI counts & department metadata
// - getMyAssignments(status)         : Filtered list of assigned grievance tasks
// - getAssignmentDetails(complaintId) : 360° task inspection with citizen contact & audit timeline
// - startWork(complaintId, remarks)   : Updates status ASSIGNED -> IN_PROGRESS
// - resolveWork(complaintId, data)    : Updates status IN_PROGRESS -> RESOLVED with notes
// ============================================================================

import api from './api';

export const getEmployeeStats = async () => {
  const response = await api.get('/employee/dashboard/stats');
  return response.data;
};

export const getMyAssignments = async (status = 'ALL') => {
  const params = {};
  if (status && status !== 'ALL') {
    params.status = status;
  }
  const response = await api.get('/employee/assignments', { params });
  return response.data;
};

export const getAssignmentDetails = async (complaintId) => {
  const response = await api.get(`/employee/assignments/${complaintId}`);
  return response.data;
};

export const startWork = async (complaintId, remarks = '') => {
  const response = await api.put(`/employee/assignments/${complaintId}/start`, { remarks });
  return response.data;
};

export const resolveWork = async (complaintId, resolutionData) => {
  const response = await api.put(`/employee/assignments/${complaintId}/resolve`, resolutionData);
  return response.data;
};
