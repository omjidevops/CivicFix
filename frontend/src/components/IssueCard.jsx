// ============================================================================
// STEP 6: IssueCard Component (IssueCard.jsx)
// A reusable card component displaying static issue information.
// Note: Props are intentionally NOT used today (Day 13). They arrive on Day 14!
// ============================================================================

function IssueCard() {
  const category = "Road Damage";
  const priority = "High Priority";
  const title = "Severe Potholes on 4th Main Avenue";
  const description = "Deep asphalt craters creating hazardous conditions for two-wheelers and pedestrians near the Metro Station.";
  const location = "Ward 12 • South Zone";
  const status = "Pending";

  return (
    <article className="issue-card">
      <div className="card-header-bar">
        <span className="badge-category">{category}</span>
        <span className="badge-priority badge-high">{priority}</span>
      </div>

      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>

      <div className="card-footer-bar">
        <span className="issue-location">📍 {location}</span>
        <span className="status-badge status-pending">● {status}</span>
      </div>
    </article>
  );
}

export default IssueCard;
