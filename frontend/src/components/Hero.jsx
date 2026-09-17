// ============================================================================
// HERO COMPONENT (Hero.jsx)
// Uses React Router Link for fast internal navigation without page reload.
// ============================================================================

import { Link } from 'react-router-dom';

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
          <Link to="/report" className="btn btn-primary">
            Report an Issue
          </Link>
          <Link to="/track" className="btn btn-secondary">
            Track Complaint
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
