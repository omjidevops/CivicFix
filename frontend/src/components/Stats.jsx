// ============================================================================
// PART 10 — STATS COMPONENT (Stats.jsx)
// A 4-column metric bar displaying public resolution statistics.
// Demo numbers only — no API, no backend, no database.
// ============================================================================

function Stats() {
  const reportedCount = "1,250+";
  const resolvedCount = "850+";
  const departmentsCount = "24";
  const resolutionRate = "92%";

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{reportedCount}</div>
            <div className="stat-label">Issues Reported</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{resolvedCount}</div>
            <div className="stat-label">Issues Resolved</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{departmentsCount}</div>
            <div className="stat-label">Active Departments</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{resolutionRate}</div>
            <div className="stat-label">Resolution Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
