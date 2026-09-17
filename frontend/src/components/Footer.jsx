// ============================================================================
// STEP 8: Footer Component (Footer.jsx)
// A responsive multi-column municipal footer component.
// ============================================================================

function Footer() {
  const currentYear = 2026;
  const platformTagline = "Smart Civic Issue Reporting & Resolution Platform";

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">CivicFix</div>
            <p style={{ marginTop: '6px', fontSize: '0.85rem' }}>{platformTagline}</p>
          </div>

          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#issues">Grievances</a></li>
            <li><a href="#workflow">Workflow</a></li>
            <li><a href="#privacy">Privacy</a></li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} CivicFix Municipal Initiative. Built for responsive civic transparency.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
