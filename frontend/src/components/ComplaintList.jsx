// ============================================================================
// COMPONENT: ComplaintList.jsx
// Manages the complaints list view, status filtering, and empty state.
// Props:
// - complaints (Array): Full list of complaints loaded from API
// - statusFilter (String): Current active filter ("All", "Pending", etc.)
// - onFilterChange (Function): Callback to update filter state in parent
// ============================================================================

import { Link } from 'react-router-dom';
import ComplaintItem from './ComplaintItem.jsx';

function ComplaintList({ complaints, statusFilter, onFilterChange }) {
  // Apply filtering
  const filteredComplaints = statusFilter === "All"
    ? complaints
    : complaints.filter((item) => item.status === statusFilter);

  const filterOptions = ["All", "Pending", "In Progress", "Resolved"];

  return (
    <div className="dash-complaints-section">
      <div className="dash-section-header">
        <div>
          <h2 className="dash-section-title">My Filed Complaints</h2>
          <p className="dash-section-subtitle">
            Showing {filteredComplaints.length} {filteredComplaints.length === 1 ? 'record' : 'records'}
          </p>
        </div>

        {/* Status Filter Tab Buttons */}
        <div className="dash-filter-tabs">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`filter-tab-btn ${statusFilter === opt ? 'active' : ''}`}
              onClick={() => onFilterChange(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Render Complaint Items OR Empty State */}
      {filteredComplaints.length > 0 ? (
        <div className="dash-items-grid">
          {filteredComplaints.map((complaint) => (
            <ComplaintItem key={complaint.id} complaint={complaint} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="dash-empty-state">
          <div className="empty-state-icon">📭</div>
          <h3 className="empty-state-title">No complaints found</h3>
          <p className="empty-state-desc">
            {statusFilter === "All"
              ? "You have not reported any civic issues yet."
              : `No grievances currently matching status "${statusFilter}".`}
          </p>
          <Link to="/report" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Report New Issue
          </Link>
        </div>
      )}
    </div>
  );
}

export default ComplaintList;
