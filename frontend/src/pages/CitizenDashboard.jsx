// ============================================================================
// DAY 19 — CITIZEN DASHBOARD PAGE (CitizenDashboard.jsx)
// Route: "/dashboard"
//
// Demonstrates:
// 1. Fetching API data on mount with useEffect
// 2. Managing API loading, error, success, and empty states
// 3. Dynamic metrics calculation from loaded API records
// 4. Status filtering with React State
// 5. Componentization: DashboardStatCard, ComplaintList, LoadingState
// 6. Error retry mechanism
// ============================================================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getComplaints } from '../services/complaintService.js';
import DashboardStatCard from '../components/DashboardStatCard.jsx';
import ComplaintList from '../components/ComplaintList.jsx';
import LoadingState from '../components/LoadingState.jsx';

function CitizenDashboard() {
  // 1. React States for API Lifecycle
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  // 2. Fetch function calling the Axios service layer
  const fetchComplaintsData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Real network call via Axios service
      const data = await getComplaints();
      setComplaints(data);
    } catch (err) {
      console.error("Dashboard API Error:", err);
      setError("Unable to load complaints. Please verify network connection.");
    } finally {
      setLoading(false);
    }
  };

  // 3. useEffect hook to fetch data when component mounts (on page load)
  useEffect(() => {
    fetchComplaintsData();
  }, []);

  // 4. Dynamically calculate summary metrics from loaded complaints
  const totalCount = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === "Pending").length;
  const inProgressCount = complaints.filter((c) => c.status === "In Progress").length;
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;

  return (
    <div className="page-container">
      {/* 1. Dashboard Header */}
      <div className="dash-header">
        <div className="dash-header-text">
          <span className="section-tag">Citizen Portal</span>
          <h1 className="dash-title">Welcome to CivicFix</h1>
          <p className="dash-subtitle">
            Track and manage your civic complaints.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="dash-quick-actions">
          <Link to="/report" className="btn btn-primary">
            + Report New Issue
          </Link>
          <Link to="/track" className="btn btn-secondary">
            🔍 Track Complaint
          </Link>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={fetchComplaintsData}
            title="Reload from API"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* 2. Summary Metric Cards */}
      <div className="dash-stats-grid">
        <DashboardStatCard
          label="Total Complaints"
          count={loading ? "..." : totalCount}
          statusType="total"
          icon="📋"
        />
        <DashboardStatCard
          label="Pending"
          count={loading ? "..." : pendingCount}
          statusType="pending"
          icon="⏳"
        />
        <DashboardStatCard
          label="In Progress"
          count={loading ? "..." : inProgressCount}
          statusType="progress"
          icon="🔧"
        />
        <DashboardStatCard
          label="Resolved"
          count={loading ? "..." : resolvedCount}
          statusType="resolved"
          icon="✅"
        />
      </div>

      {/* 3. Main Data View (Loading / Error / Complaints List) */}
      {loading && (
        <LoadingState message="Fetching your civic complaints from server..." />
      )}

      {!loading && error && (
        <div className="dash-error-box">
          <div className="error-icon">⚠️</div>
          <h3 className="error-box-title">{error}</h3>
          <p className="error-box-desc">
            Failed to communicate with API service. Click retry to attempt loading again.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={fetchComplaintsData}
            style={{ marginTop: '12px' }}
          >
            Retry Request
          </button>
        </div>
      )}

      {!loading && !error && (
        <ComplaintList
          complaints={complaints}
          statusFilter={statusFilter}
          onFilterChange={setStatusFilter}
        />
      )}

      {/* 4. Recent Activity Log */}
      <div className="dash-activity-section">
        <h3 className="activity-section-title">Recent Administrative Activity</h3>
        <ul className="activity-timeline">
          <li className="activity-item">
            <span className="activity-dot dot-resolved"></span>
            <div className="activity-content">
              <strong>Street Light Repair Completed (CF-1003)</strong>
              <p>North Ward electricity team closed ticket with photo verification.</p>
              <span className="activity-time">Yesterday at 4:30 PM</span>
            </div>
          </li>
          <li className="activity-item">
            <span className="activity-dot dot-progress"></span>
            <div className="activity-content">
              <strong>Sanitation Crew Dispatched (CF-1002)</strong>
              <p>Solid Waste Management truck dispatched to Central Market crossing.</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </li>
          <li className="activity-item">
            <span className="activity-dot dot-pending"></span>
            <div className="activity-content">
              <strong>New Grievance Registered (CF-1004)</strong>
              <p>Water main leakage logged for South Ward 15. Assigned to Jal Sansthan.</p>
              <span className="activity-time">Today at 10:15 AM</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CitizenDashboard;
