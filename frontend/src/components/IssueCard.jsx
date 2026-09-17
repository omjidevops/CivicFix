// ============================================================================
// PART 14 & 15 — INTERACTIVE ISSUE CARD COMPONENT (IssueCard.jsx)
// Combines PROPS (received from Parent) with LOCAL STATE (managed inside Child).
//
// Props (from Parent):
// - title, category, description, status, upvotes, isVerified
//
// Local State (managed here):
// - supportCount (Number): tracks interactive citizen support
// - supported (Boolean): prevents double voting
// - showDetails (Boolean): toggles extra complaint details
// ============================================================================

import { useState } from 'react';

function IssueCard({
  title,
  category,
  description,
  status,
  upvotes,
  isVerified
}) {
  // State 1: Local support count initialized from parent prop 'upvotes'
  const [supportCount, setSupportCount] = useState(upvotes);

  // State 2: Boolean state to track whether this user has supported
  const [supported, setSupported] = useState(false);

  // State 3: Boolean state to toggle expanded complaint details
  const [showDetails, setShowDetails] = useState(false);

  // Event Handler 1: Support grievance
  const handleSupportClick = () => {
    if (!supported) {
      setSupportCount(supportCount + 1);
      setSupported(true);
    }
  };

  // Event Handler 2: Toggle details visibility
  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Helper for dynamic status badge styling
  const getStatusClass = () => {
    if (status === "In Progress") return "status-progress";
    if (status === "Verified" || status === "Resolved") return "status-verified";
    return "status-pending";
  };

  return (
    <article className="issue-card">
      <div className="card-header-bar">
        <span className="badge-category">{category}</span>
        <span className={`status-badge ${getStatusClass()}`}>
          ● {status}
        </span>
      </div>

      <h3 className="card-title">
        {title}
        {isVerified && <span className="badge-verified">✓ Verified</span>}
      </h3>

      <p className="card-description">{description}</p>

      {/* Conditional Rendering: Only renders when showDetails is true */}
      {showDetails && (
        <div className="card-details-box">
          <p><strong>Municipal ID:</strong> CF-2026-{category.substring(0, 3).toUpperCase()}-409</p>
          <p><strong>Ward:</strong> Central Ward 12 • Zone 4</p>
          <p><strong>Assigned To:</strong> Department of Public Works</p>
          <p><strong>Verification:</strong> GPS Geotagged on submission</p>
        </div>
      )}

      <div className="card-footer-bar">
        <span className="issue-category-label">
          Category: <strong>{category}</strong>
        </span>
        <button
          type="button"
          className="btn-toggle-details"
          onClick={handleToggleDetails}
        >
          {showDetails ? "▲ Hide Details" : "▼ Show Details"}
        </button>
      </div>

      {/* Interactive Action Bar */}
      <div className="card-actions-bar">
        <span className="issue-upvotes-badge">
          ▲ {supportCount} Upvotes
        </span>

        <button
          type="button"
          className={`btn-support ${supported ? 'btn-supported' : ''}`}
          onClick={handleSupportClick}
        >
          {supported ? "✓ Supported" : "▲ Support Issue"}
        </button>
      </div>
    </article>
  );
}

export default IssueCard;
