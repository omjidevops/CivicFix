// ============================================================================
// PART 8 — STATS COMPONENT (Stats.jsx)
// Parent component that renders reusable StatsCard children with distinct Props.
// ============================================================================

import StatsCard from './StatsCard.jsx';

function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <StatsCard number="1,250+" label="Issues Reported" />
          <StatsCard number="850+" label="Issues Resolved" />
          <StatsCard number="24" label="Active Departments" />
          <StatsCard number="92%" label="Resolution Rate" />
        </div>
      </div>
    </section>
  );
}

export default Stats;
