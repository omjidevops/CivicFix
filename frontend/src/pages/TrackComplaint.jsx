// ============================================================================
// PAGE: TrackComplaint.jsx (Route: "/track")
// Allows citizens to check live municipal grievance status.
// ============================================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';

function TrackComplaint() {
  const [searchId, setSearchId] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="page-container">
      <div className="track-wrapper">
        <div className="form-header">
          <h1 className="form-title">Track Grievance Status</h1>
          <p className="form-subtitle">
            Enter your municipal tracking ID to view real-time resolution progress.
          </p>
        </div>

        <form onSubmit={handleSearch} className="search-bar-box">
          <input
            type="text"
            className="form-control"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Tracking ID (e.g. CF-2026-REG-982)..."
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {/* Demo Status Result Card */}
        <div className="track-result-card">
          <div className="card-header-bar">
            <span className="badge-category">Road Damage</span>
            <span className="status-badge status-progress">● In Progress</span>
          </div>

          <h3 className="card-title">CF-2026-REG-982 — Potholes on 4th Main Avenue</h3>
          <p className="card-description">
            Inspection team visited site. Asphalt patching crew assigned for Ward 12. Estimated completion: within 24 hours.
          </p>

          <div className="card-footer-bar">
            <span>Assigned Department: <strong>Public Works (PWD)</strong></span>
            <span>Target Date: <strong>Tomorrow, 5:00 PM</strong></span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' }}>
            Have a new civic issue in your neighborhood?
          </p>
          <Link to="/report" className="btn btn-secondary">
            File New Grievance
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TrackComplaint;
