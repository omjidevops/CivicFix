// ============================================================================
// COMPONENT: DashboardStatCard.jsx
// Displays an individual metric card on the Citizen Dashboard.
// Props:
// - label (String): "Total Filed", "Pending", etc.
// - count (Number/String): 6, 2, etc.
// - statusType (String): "total", "pending", "progress", "resolved"
// - icon (String): emoji icon
// ============================================================================

function DashboardStatCard({ label, count, statusType = "total", icon = "📊" }) {
  return (
    <div className={`dash-stat-card dash-stat-${statusType}`}>
      <div className="dash-stat-top">
        <span className="dash-stat-icon">{icon}</span>
        <span className="dash-stat-number">{count}</span>
      </div>
      <div className="dash-stat-label">{label}</div>
    </div>
  );
}

export default DashboardStatCard;
