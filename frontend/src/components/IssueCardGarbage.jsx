// ============================================================================
// IssueCardGarbage Component (IssueCardGarbage.jsx)
// Second static issue card demonstrating component composition without props.
// ============================================================================

function IssueCardGarbage() {
  const category = "Garbage & Waste";
  const priority = "Medium Priority";
  const title = "Overflowing Community Dumpster";
  const description = "Municipal waste bin has not been cleared for 4 days. Waste spilling onto the pedestrian pathway.";
  const location = "Ward 8 • Central Market";
  const status = "In Progress";

  return (
    <article className="issue-card">
      <div className="card-header-bar">
        <span className="badge-category">{category}</span>
        <span className="badge-priority badge-medium">{priority}</span>
      </div>

      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>

      <div className="card-footer-bar">
        <span className="issue-location">📍 {location}</span>
        <span className="status-badge status-progress">● {status}</span>
      </div>
    </article>
  );
}

export default IssueCardGarbage;
