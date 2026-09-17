// ============================================================================
// FOOTER COMPONENT (Footer.jsx)
// Clean municipal footer component with React Router internal links.
// ============================================================================

import { Link } from 'react-router-dom';

function Footer() {
  const brandName = "CivicFix";
  const copyrightYear = 2026;
  const platformSubtitle = "Smart Civic Issue Reporting & Resolution Platform";

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">{brandName}</div>
            <p className="footer-tagline">{platformSubtitle}</p>
          </div>

          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/report">Report Issue</Link></li>
            <li><Link to="/track">Track</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>{brandName} © {copyrightYear} — {platformSubtitle}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
