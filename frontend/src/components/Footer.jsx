// ============================================================================
// PART 13 — FOOTER COMPONENT (Footer.jsx)
// Clean municipal footer component for CivicFix.
// ============================================================================

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
            <li><a href="#home">Home</a></li>
            <li><a href="#issues">Issues</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#login">Login</a></li>
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
