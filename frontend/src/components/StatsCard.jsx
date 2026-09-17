// ============================================================================
// PART 8 — STATS CARD COMPONENT (StatsCard.jsx)
// A reusable component for individual metric cards.
// Receives: number, label, description (optional) via Props.
// ============================================================================

function StatsCard({ number, label, description }) {
  return (
    <div className="stat-card">
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
      {description && <p className="stat-description">{description}</p>}
    </div>
  );
}

export default StatsCard;
