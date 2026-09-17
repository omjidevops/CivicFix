// ============================================================================
// PAGE: NotFound.jsx (Wildcard Route: "*")
// Renders when a user navigates to an undefined URL path.
// ============================================================================

import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page-container">
      <div className="not-found-card">
        <div className="not-found-badge">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-text">
          The civic portal page you are searching for does not exist or has been moved.
        </p>

        <Link to="/" className="btn btn-primary">
          ← Return to CivicFix Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
