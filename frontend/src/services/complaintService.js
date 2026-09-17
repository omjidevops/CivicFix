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
    verified: false
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
 * 1. GET ALL COMPLAINTS
 * Uses Axios to test HTTP connectivity to public practice endpoint,
 * then returns the structured CivicFix complaint records.
 */
export const getComplaints = async () => {
  // Test real HTTP GET communication with Axios
  // (In Spring Boot Phase: const response = await api.get('/complaints'); return response.data;)
  await api.get('/posts/1'); // Real network request verifying Axios HTTP cycle

  // Return realistic CivicFix complaints data
  return [...practiceComplaints];
};

/**
 * 2. GET COMPLAINT BY ID
 */
export const getComplaintById = async (id) => {
  await api.get('/posts/1');
  const complaint = practiceComplaints.find((c) => c.id === id);
  if (!complaint) {
    throw new Error(`Grievance with ID ${id} not found.`);
  }
  return complaint;
};

/**
 * 3. CREATE NEW COMPLAINT (POST)
 */
export const createComplaint = async (complaintData) => {
  // Real Axios HTTP POST call to practice endpoint
  const response = await api.post('/posts', complaintData);

  // Generate ID and prepend to practice store
  const newComplaint = {
    id: `CF-${1000 + practiceComplaints.length + 1}`,
    ...complaintData,
    status: "Pending",
    priority: complaintData.priority || "Medium",
    submittedDate: new Date().toISOString().split('T')[0],
    upvotes: 1,
    verified: false
  };

  practiceComplaints = [newComplaint, ...practiceComplaints];
  return newComplaint;
};
