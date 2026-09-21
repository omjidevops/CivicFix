// ============================================================================
// CIVICFIX — DAY 48: REPUTATION & RESOLUTION CONFIRMATION AXIOS SERVICE
// File: src/services/reputationService.js
//
// Communicates with backend endpoints:
// - getMyReputation()          : GET /api/reputation/me
// - confirmResolution(id)      : POST /api/complaints/${id}/confirm-resolution
// ============================================================================

import api from './api';

export const getMyReputation = async () => {
  const response = await api.get('/reputation/me');
  return response.data;
};

export const confirmResolution = async (complaintId) => {
  const response = await api.post(`/complaints/${complaintId}/confirm-resolution`);
  return response.data;
};
