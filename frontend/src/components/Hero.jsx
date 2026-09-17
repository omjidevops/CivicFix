// ============================================================================
// STEP 4: Hero Component (Hero.jsx)
// A high-impact banner communicating CivicFix's civic mission and primary actions.
// ============================================================================

function Hero() {
  const platformName = "CivicFix";
  const missionStatement = "Transparent Municipal Grievance Redressal";

  return (
    <section className="hero-section" id="home">
      <div className="container">
        <div className="hero-pill">
          <span>🏛️</span> {platformName} • {missionStatement}
        </div>

        <h1 className="hero-title">
          Empowering Citizens for a <span>Cleaner, Safer</span> City
        </h1>

        <p className="hero-subtitle">
          Directly report potholes, waste, water leakages, and broken streetlights to your local municipal corporation. Track every resolution with complete transparency.
        </p>

        <div className="hero-actions">
          <a href="#report" className="btn btn-primary">Report an Issue</a>
          <a href="#issues" className="btn btn-secondary">Explore Live Issues</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
