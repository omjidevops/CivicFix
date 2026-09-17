// ============================================================================
// PART 11 — ISSUE CARD COMPONENT (IssueCard.jsx)
// A reusable card component displaying one civic grievance.
// Static data only — no props, no useState, no API calls.
// ============================================================================

function IssueCard() {
  const title = "Road Damage";
  const description = "Large pothole reported near the main road.";
  const category = "Roads";
  const status = "Pending";

  return (
    <article className="issue-card">
      <div className="card-header-bar">
        <span className="badge-category">{category}</span>
        <span className="status-badge status-pending">● {status}</span>
      </div>

      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>

      <div className="card-footer-bar">
        <span className="issue-category-label">Category: <strong>{category}</strong></span>
        <span className="issue-status-label">Status: <strong>{status}</strong></span>
      </div>
    </article>
  );
}

export default IssueCard;
