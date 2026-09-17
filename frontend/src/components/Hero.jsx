// ============================================================================
// PART 9 — HERO COMPONENT (Hero.jsx)
// A high-impact banner communicating CivicFix's civic mission and primary actions.
// Visual buttons only — static, no routing.
// ============================================================================

function Hero() {
  const heading = "Make Your City Better";
  const subtext1 = "Report civic problems.";
  const subtext2 = "Track their progress.";
  const subtext3 = "Help build a better community.";

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-pill">
          <span>🏛️</span> CivicFix • Citizen Action Platform
        </div>

        <h1 className="hero-title">
          {heading}
        </h1>

        <p className="hero-subtitle">
          {subtext1} {subtext2} {subtext3}
        </p>

        <div className="hero-actions">
          <button type="button" className="btn btn-primary">
            Report an Issue
          </button>
          <button type="button" className="btn btn-secondary">
            Track Complaint
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
