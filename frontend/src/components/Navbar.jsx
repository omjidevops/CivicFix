// ============================================================================
// STEP 3: Navbar Component (Navbar.jsx)
// A functional component representing the sticky top navigation bar of CivicFix.
// ============================================================================

function Navbar() {
  const brandName = "CivicFix";
  const portalTag = "Citizen Portal";

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <a href="#home" className="brand-badge">
            <div className="brand-icon">CF</div>
            <span className="brand-text">{brandName}</span>
            <span className="brand-tag">{portalTag}</span>
          </a>

          <nav>
            <ul className="nav-links">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#issues" className="nav-link">Issues</a></li>
              <li><a href="#workflow" className="nav-link">How It Works</a></li>
              <li>
                <a href="#report" className="btn btn-primary">Report Issue</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
