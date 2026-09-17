// ============================================================================
// PART 6 & 9 — REUSABLE ISSUE CARD COMPONENT (IssueCard.jsx)
// Receives all complaint data via Props (destructured).
// Props:
// - title (String)
// - category (String)
// - description (String)
// - status (String)
// - upvotes (Number)
// - isVerified (Boolean — optional)
// ============================================================================

function IssueCard({
  title,
  category,
  description,
  status,
  upvotes,
  isVerified
}) {
  // Determine badge color class based on status prop
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
        {/* Part 9: Boolean Prop in action — renders only if isVerified is true */}
        {isVerified && <span className="badge-verified">✓ Verified</span>}
      </h3>

      <p className="card-description">{description}</p>

      <div className="card-footer-bar">
        <span className="issue-category-label">
          Category: <strong>{category}</strong>
        </span>
        <span className="issue-upvotes-badge">
          ▲ {upvotes} Upvotes
        </span>
      </div>
    </article>
  );
}

export default IssueCard;
