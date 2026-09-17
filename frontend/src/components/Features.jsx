// ============================================================================
// PART 12 — FEATURES COMPONENT (Features.jsx)
// Displays key static feature highlights of the CivicFix platform.
// Static UI elements only — no backend or dynamic state.
// ============================================================================

function Features() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Platform Features</span>
          <h2 className="section-heading">Why Choose CivicFix?</h2>
          <p className="section-description">
            Modern digital governance tools built for transparent citizen empowerment.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3 className="feature-title">Easy Reporting</h3>
            <p className="feature-description">
              Submit grievances in seconds with intuitive forms and photo uploads.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3 className="feature-title">Location Based Issues</h3>
            <p className="feature-description">
              Pinpoint infrastructure issues precisely by ward, landmark, and street.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3 className="feature-title">Complaint Tracking</h3>
            <p className="feature-description">
              Follow every status update from initial submission to final verification.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3 className="feature-title">Community Support</h3>
            <p className="feature-description">
              Citizens upvote community concerns to bring critical issues to priority.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3 className="feature-title">Transparent Resolution</h3>
            <p className="feature-description">
              Direct accountability with municipal photo evidence upon task completion.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Smart Prioritization</h3>
            <p className="feature-description">
              Urgent hazards are automatically prioritized for emergency municipal dispatch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
