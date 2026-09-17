// ============================================================================
// PART 8 — NAVBAR COMPONENT (Navbar.jsx)
// A functional component representing the top navigation bar of CivicFix.
// Static links only — no routing.
// ============================================================================

function Navbar() {
  const brandName = "CivicFix";

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <a href="#home" className="brand-badge">
            <div className="brand-icon">CF</div>
            <span className="brand-text">{brandName}</span>
          </a>

          <nav>
            <ul className="nav-links">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#report" className="nav-link">Report Issue</a></li>
              <li><a href="#track" className="nav-link">Track Complaint</a></li>
              <li><a href="#login" className="btn btn-secondary nav-btn">Login</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
