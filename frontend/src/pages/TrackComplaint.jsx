// ============================================================================
// CIVICFIX — DAY 44: REAL GRIEVANCE TRACKER & DISCUSSION (TrackComplaint.jsx)
// Route: "/track" or "/track?id=..."
//
// Features:
// 1. Search by Tracking ID (e.g., "CF-1" or "1") or read direct "?id=" query param
// 2. Fetches real complaint record from Spring Boot REST API: GET /api/complaints/{id}
// 3. Displays live status, severity, category, address & coordinates
// 4. Integrates ComplaintUpvote (Day 44) for civic corroboration
// 5. Integrates ComplaintComments (Day 44) for public ward discussion thread
// ============================================================================

import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getComplaintById } from '../services/complaintService';
import { confirmResolution } from '../services/reputationService';
import { useAuth } from '../context/AuthContext';
import ComplaintUpvote from '../components/ComplaintUpvote';
import ComplaintComments from '../components/ComplaintComments';

function TrackComplaint() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQueryId = searchParams.get('id') || '';

  const [searchId, setSearchId] = useState(initialQueryId);
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const [confirming, setConfirming] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState(null);

  const handleConfirmResolution = async () => {
    if (!complaint) return;
    setConfirming(true);
    setConfirmMsg(null);
    try {
      const updated = await confirmResolution(complaint.id);
      setComplaint((prev) => ({
        ...prev,
        status: 'RESOLUTION_CONFIRMED',
        resolutionConfirmed: true,
        resolutionConfirmedAt: new Date().toISOString()
      }));
      setConfirmMsg('Resolution verified! +5 Civic Reputation points awarded to your account.');
    } catch (err) {
      console.error('Confirmation error:', err);
      alert(err.response?.data?.message || 'Failed to confirm resolution.');
    } finally {
      setConfirming(false);
    }
  };

  const fetchComplaint = async (idToSearch) => {
    const query = String(idToSearch || '').trim();
    if (!query) return;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const data = await getComplaintById(query);
      if (data) {
        setComplaint(data);
      } else {
        setComplaint(null);
        setError(`No grievance record found for tracking ID "${query}".`);
      }
    } catch (err) {
      console.error('Track complaint error:', err);
      setComplaint(null);
      setError(`Unable to locate complaint "${query}". Please check the ID and try again.`);
    } finally {
      setLoading(false);
    }
  };

  // If page loads with a ?id= query param, immediately search
  useEffect(() => {
    if (initialQueryId) {
      setSearchId(initialQueryId);
      fetchComplaint(initialQueryId);
    }
  }, [initialQueryId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      setSearchParams({ id: searchId.trim() });
      fetchComplaint(searchId.trim());
    }
  };

  // Helper for status badge styling
  const getStatusBadge = (status) => {
    const s = String(status || '').toUpperCase();
    if (s.includes('RESOLVED')) return { label: 'Resolved', className: 'status-resolved' };
    if (s.includes('PROGRESS')) return { label: 'In Progress', className: 'status-progress' };
    if (s.includes('REJECTED')) return { label: 'Rejected', className: 'status-rejected' };
    return { label: 'Submitted / Pending', className: 'status-pending' };
  };

  return (
    <div className="page-container">
      <div className="track-wrapper">
        <div className="form-header">
          <span className="section-tag">Redressal Transparency</span>
          <h1 className="form-title">Track Grievance Status</h1>
          <p className="form-subtitle">
            Enter your municipal tracking ID to view live inspection progress, community upvotes, and public ward dialogue.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-bar-box">
          <input
            type="text"
            id="track-search-input"
            className="form-control"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Tracking ID (e.g. 1 or CF-1)..."
            aria-label="Complaint tracking ID"
            required
          />
          <button type="submit" id="track-search-btn" className="btn btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Loading Spinner */}
        {loading && (
          <div className="track-loading-state">
            <div className="spinner-sm"></div>
            <span>Fetching grievance record from municipal database...</span>
          </div>
        )}

        {/* Error / Not Found Alert */}
        {error && !loading && (
          <div className="track-error-card" role="alert">
            <span className="track-error-icon">⚠️</span>
            <div>
              <h4>Record Not Found</h4>
              <p>{error}</p>
              <p className="track-error-hint">
                Tip: Try searching for <strong>1</strong> or check your complaint confirmation receipt.
              </p>
            </div>
          </div>
        )}

        {/* Real Complaint Details Card */}
        {complaint && !loading && (
          <div className="track-result-card">
            <div className="card-header-bar">
              <div className="card-header-meta">
                <span className="badge-category">{complaint.category || 'Civic Issue'}</span>
                <span className="complaint-id-chip">{complaint.id}</span>
                {complaint.priority && (
                  <span className={`priority-badge priority-badge-${String(complaint.priority).toLowerCase()}`}>
                    {complaint.priority} Priority
                  </span>
                )}
              </div>
              <span className={`status-badge ${getStatusBadge(complaint.status).className}`}>
                ● {getStatusBadge(complaint.status).label}
              </span>
            </div>

            <h2 className="card-title">{complaint.title}</h2>
            
            <p className="card-description">
              {complaint.description || 'No additional narrative description provided.'}
            </p>

            <div className="card-meta-grid">
              <div className="meta-item">
                <span className="meta-label">Location</span>
                <span className="meta-value">📍 {complaint.location || complaint.address || 'Unspecified'}</span>
              </div>

              {complaint.latitude && complaint.longitude && (
                <div className="meta-item">
                  <span className="meta-label">GPS Coordinates</span>
                  <span className="meta-value coordinates-pill">
                    🌐 {Number(complaint.latitude).toFixed(5)}, {Number(complaint.longitude).toFixed(5)}
                  </span>
                </div>
              )}

              <div className="meta-item">
                <span className="meta-label">Filed On</span>
                <span className="meta-value">📅 {complaint.submittedDate || 'Recently'}</span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Community Support</span>
                <div className="meta-value">
                  <ComplaintUpvote
                    complaintId={complaint.numericId || complaint.id}
                    initialVotes={complaint.upvotes || 0}
                  />
                </div>
              </div>
            </div>

            {/* Official Municipal Action Report (Day 45) */}
            {complaint.resolutionNotes && (
              <div className="track-resolution-banner">
                <div className="resolution-banner-header">
                  <span className="banner-badge-title">🏛️ Official Ward Action Remarks</span>
                  {complaint.resolvedAt && (
                    <span className="banner-resolved-date">
                      Resolved on {new Date(complaint.resolvedAt).toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="banner-resolution-text">
                  "{complaint.resolutionNotes}"
                </p>
              </div>
            )}

            {/* Citizen Resolution Confirmation Card (Day 48) */}
            {(complaint.status === 'RESOLVED' || complaint.status === 'RESOLUTION_CONFIRMED' || complaint.resolutionConfirmed) && (
              <div className="track-confirmation-wrapper">
                {complaint.resolutionConfirmed ? (
                  <div className="confirmed-success-banner">
                    <span className="check-icon">✓</span>
                    <div>
                      <strong>Resolution Confirmed by Citizen</strong>
                      <p>You verified that the municipal repair was satisfactorily completed. +5 Reputation Points earned!</p>
                      {complaint.resolutionConfirmedAt && (
                        <small>Confirmed on: {new Date(complaint.resolutionConfirmedAt).toLocaleString()}</small>
                      )}
                    </div>
                  </div>
                ) : (
                  user && user.id === complaint.citizenId && (
                    <div className="pending-confirmation-box">
                      <div className="pending-confirmation-header">
                        <h4>Citizen Resolution Verification</h4>
                        <span className="points-award-chip">+5 Civic Reputation</span>
                      </div>
                      <p>
                        Field crew has marked this grievance resolved. Please inspect the site and confirm if the repair was completed satisfactorily.
                      </p>
                      {confirmMsg && <div className="alert alert-success" style={{ margin: '10px 0' }}>{confirmMsg}</div>}
                      <button
                        type="button"
                        className="btn btn-success btn-confirm-resolution"
                        onClick={handleConfirmResolution}
                        disabled={confirming}
                      >
                        {confirming ? 'Confirming...' : '✓ Confirm Resolution (+5 Points)'}
                      </button>
                    </div>
                  )
                )}
              </div>
            )}

            {/* Embedded Discussion Thread (Day 44) */}
            <div className="track-comments-section">
              <ComplaintComments complaintId={complaint.numericId || complaint.id} />
            </div>
          </div>
        )}

        {/* Guidance Prompt when nothing searched */}
        {!searched && !loading && (
          <div className="track-guide-card">
            <h3>How to Track Your Issue</h3>
            <p>
              When you report an issue, CivicFix assigns an official Tracking ID (e.g. <code>CF-1</code>).
              Use this identifier above to check whether municipal inspection teams have reviewed,
              dispatched, or resolved your grievance.
            </p>
          </div>
        )}

        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' }}>
            Encountered a new infrastructure issue in your locality?
          </p>
          <Link to="/report" className="btn btn-secondary">
            + File New Grievance
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TrackComplaint;
