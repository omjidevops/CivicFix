// ============================================================================
// DAY 17 — NAVBAR COMPONENT WITH REACT ROUTER (Navbar.jsx)
// Uses NavLink for client-side routing without full page reload.
// Applies active CSS indicator automatically when route matches.
// ============================================================================

import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  const brandName = "CivicFix";

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="brand-badge">
            <div className="brand-icon">CF</div>
            <span className="brand-text">{brandName}</span>
          </Link>

          <nav>
            <ul className="nav-links">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/report"
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  Report Issue
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/track"
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  Track Complaint
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="btn btn-secondary nav-btn"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
