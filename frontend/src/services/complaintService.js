// ============================================================================
// DAY 18 — COMPLAINT SERVICE (complaintService.js)
// Encapsulates all complaint data retrieval and mutation operations.
//
// Uses Axios for real HTTP requests while providing realistic CivicFix data.
// Ready to seamlessly transition to Spring Boot on Day 30+.
// ============================================================================

import api from './api.js';

// Realistic temporary learning data model (clearly labeled demo data)
const initialComplaints = [
  {
    id: "CF-1001",
    title: "Severe Potholes on 4th Main Avenue",
    category: "Road Damage",
    status: "Pending",
    priority: "High",
    location: "Central Ward 12 • Near Metro Pillar 42",
    submittedDate: "2026-09-15",
    description: "Deep asphalt craters creating severe traffic bottleneck and hazard for two-wheelers.",
    upvotes: 34,
    verified: true
  },
  {
    id: "CF-1002",
    title: "Overflowing Community Garbage Dumpster",
    category: "Sanitation",
    status: "In Progress",
    priority: "High",
    location: "Ward 8 • Central Market Crossing",
    submittedDate: "2026-09-16",
    description: "Municipal waste bin has exceeded capacity for 4 days. Waste spilling onto pedestrian walkway.",
    upvotes: 48,
    verified: true
  },
  {
    id: "CF-1003",
    title: "Non-Functional Street Lights on Ring Road",
    category: "Street Lighting",
    status: "Resolved",
    priority: "Medium",
    location: "North Ward 4 • Sector 9",
    submittedDate: "2026-09-12",
    description: "Three consecutive street lamps non-functional, creating unsafe dark stretch at night.",
    upvotes: 19,
    verified: true
  },
  {
    id: "CF-1004",
    title: "Drinking Water Pipeline Leakage",
    category: "Water Supply",
    status: "Pending",
    priority: "High",
    location: "South Ward 15 • Near Primary Health Center",
    submittedDate: "2026-09-17",
    description: "Clean drinking water bursting from underground main pipeline, causing flooding.",
    upvotes: 56,
    verified: true
  },
  {
    id: "CF-1005",
    title: "Clogged Stormwater Drain",
    category: "Drainage",
    status: "In Progress",
    priority: "Medium",
    location: "East Ward 6 • Subhash Nagar Lane 3",
    submittedDate: "2026-09-14",
    description: "Drainage canal blocked with silt and plastic waste. Risk of waterlogging during rain.",
    upvotes: 22,
    verified: true
  },
  {
    id: "CF-1006",
    title: "Dangerous Fallen Tree Branch on Road",
    category: "Public Safety",
    status: "Resolved",
    priority: "Low",
    location: "Ward 12 • City Park Perimeter",
    submittedDate: "2026-09-10",
    description: "Heavy eucalyptus branch hanging precariously over vehicular road.",
    upvotes: 12,
    verified: true
  }
];

// In-memory collection for practice sessions
let practiceComplaints = [...initialComplaints];

/**
 * Helper to adapt Spring Boot ComplaintResponseDto to CivicFix UI views
 */
const adaptComplaint = (item) => {
  if (!item) return null;
  return {
    ...item,
    id: `CF-${item.id}`,
    numericId: item.id,
    location: item.address || "Unspecified Location",
    priority: item.priorityLevel || (item.severity >= 4 ? "High" : item.severity === 3 ? "Medium" : "Low"),
    submittedDate: item.createdAt ? item.createdAt.substring(0, 10) : new Date().toISOString().substring(0, 10),
    upvotes: item.upvotes || 0,
    verified: item.status !== "SUBMITTED",
    resolutionNotes: item.resolutionNotes || null,
    resolvedAt: item.resolvedAt || null
  };
};

/**
 * 1. GET ALL COMPLAINTS
 * Real HTTP GET /api/complaints via Axios
 */
export const getComplaints = async () => {
  const response = await api.get('/api/complaints');
  return Array.isArray(response.data) ? response.data.map(adaptComplaint) : [];
};

/**
 * 2. GET COMPLAINT BY ID
 * Real HTTP GET /api/complaints/{id}
 */
export const getComplaintById = async (id) => {
  const numericId = String(id).replace(/^CF-?/i, '');
  const response = await api.get(`/api/complaints/${numericId || id}`);
  return adaptComplaint(response.data);
};

/**
 * 3. CREATE NEW COMPLAINT (POST)
 * Real HTTP POST /api/complaints with DTO validation and JWT bearer authorization
 */
export const createComplaint = async (complaintData) => {
  const payload = {
    title: complaintData.title,
    description: complaintData.description,
    category: complaintData.category,
    severity: Number(complaintData.severity) || 3,
    address: complaintData.location || complaintData.address,
    latitude: complaintData.latitude || null,
    longitude: complaintData.longitude || null
  };

  const response = await api.post('/api/complaints', payload);
  return adaptComplaint(response.data);
};

/**
 * 4. UPLOAD COMPLAINT MEDIA (POST multipart/form-data)
 */
export const uploadComplaintMedia = async (complaintId, file) => {
  const numericId = String(complaintId).replace(/^CF-?/i, '');
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post(`/api/complaints/${numericId}/media`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

/**
 * 5. GET COMPLAINT MEDIA
 */
export const getComplaintMedia = async (complaintId) => {
  const numericId = String(complaintId).replace(/^CF-?/i, '');
  const response = await api.get(`/api/complaints/${numericId}/media`);
  return response.data;
};

/**
 * 6. GET COMPLAINT COMMENTS
 */
export const getComplaintComments = async (complaintId) => {
  const numericId = String(complaintId).replace(/^CF-?/i, '');
  const response = await api.get(`/api/complaints/${numericId}/comments`);
  return Array.isArray(response.data) ? response.data : [];
};

/**
 * 7. ADD COMPLAINT COMMENT
 */
export const addComplaintComment = async (complaintId, commentText) => {
  const numericId = String(complaintId).replace(/^CF-?/i, '');
  const response = await api.post(`/api/complaints/${numericId}/comments`, { commentText });
  return response.data;
};

/**
 * 8. GET COMPLAINT VOTES & USER VOTE STATUS
 */
export const getComplaintVotes = async (complaintId) => {
  const numericId = String(complaintId).replace(/^CF-?/i, '');
  const response = await api.get(`/api/complaints/${numericId}/votes`);
  return response.data;
};

/**
 * 9. CAST UPVOTE (POST /api/complaints/{id}/vote)
 */
export const voteComplaint = async (complaintId) => {
  const numericId = String(complaintId).replace(/^CF-?/i, '');
  const response = await api.post(`/api/complaints/${numericId}/vote`);
  return response.data;
};

/**
 * 10. REMOVE UPVOTE (DELETE /api/complaints/{id}/vote)
 */
export const removeComplaintVote = async (complaintId) => {
  const numericId = String(complaintId).replace(/^CF-?/i, '');
  const response = await api.delete(`/api/complaints/${numericId}/vote`);
  return response.data;
};

/**
 * 11. UPDATE COMPLAINT STATUS (Officer / Admin Only)
 * Real HTTP PATCH /api/complaints/{id}/status
 */
export const updateComplaintStatus = async (complaintId, statusData) => {
  const numericId = String(complaintId).replace(/^CF-?/i, '');
  const payload = {
    status: statusData.status,
    resolutionNotes: statusData.resolutionNotes || ''
  };
  const response = await api.patch(`/api/complaints/${numericId}/status`, payload);
  return adaptComplaint(response.data);
};

/**
 * 12. GET ADMIN METRICS (Officer / Admin Only)
 * Real HTTP GET /api/admin/metrics
 */
export const getAdminMetrics = async () => {
  const response = await api.get('/api/admin/metrics');
  return response.data;
};

/**
 * 13. CHECK POTENTIAL DUPLICATE GRIEVANCE
 * Real HTTP GET /api/complaints/check-duplicate
 */
export const checkDuplicateComplaint = async ({ category, latitude, longitude, title }) => {
  const response = await api.get('/api/complaints/check-duplicate', {
    params: { category, latitude, longitude, title }
  });
  return response.data;
};



