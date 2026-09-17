// ============================================================================
// STEP 5: Stats Component (Stats.jsx)
// A 4-column metric bar displaying public resolution statistics.
// ============================================================================

function Stats() {
  const resolvedCount = "1,280+";
  const activeCount = "45";
  const avgResponse = "48 hrs";
  const satisfactionRate = "96%";

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{resolvedCount}</div>
            <div className="stat-label">Issues Resolved</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{activeCount}</div>
            <div className="stat-label">Active Grievances</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{avgResponse}</div>
            <div className="stat-label">Avg. Response Time</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{satisfactionRate}</div>
            <div className="stat-label">Citizen Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
