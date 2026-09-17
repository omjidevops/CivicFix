// ============================================================================
// DAY 40 — NAVBAR COMPONENT WITH AUTHENTICATION INTEGRATION (Navbar.jsx)
// Dynamically adjusts navigation links based on user authentication state:
// - Logged Out: Home, About, Register, Sign In
// - Logged In : Home, Dashboard, Report Issue, Track Complaint, User Badge, Logout
// ============================================================================

import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const brandName = "CivicFix";
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

              {isAuthenticated && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    >
                      Dashboard
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
                </>
              )}

              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  About
                </NavLink>
              </li>

              {!isAuthenticated ? (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="btn btn-secondary nav-btn"
                    >
                      Sign In
                    </NavLink>
                  </li>
                </>
              ) : (
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-main, #333)',
                    background: 'rgba(59, 130, 246, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span>👤 {user?.name || 'User'}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      background: 'var(--primary, #2563eb)',
                      color: '#fff',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      textTransform: 'uppercase'
                    }}>
                      {user?.role || 'CITIZEN'}
                    </span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary nav-btn"
                    style={{ padding: '6px 14px', fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
