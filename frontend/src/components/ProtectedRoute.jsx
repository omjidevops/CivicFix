// ============================================================================
// CIVICFIX — DAY 40: PROTECTED ROUTE GUARD (ProtectedRoute.jsx)
// Package: components/ProtectedRoute.jsx
//
// Concepts:
// 1. Intercepts navigation to private pages (e.g., /dashboard, /report).
// 2. Redirects unauthenticated users to /login immediately.
// 3. Optionally checks user roles for RBAC frontend gating.
// IMPORTANT: Frontend protection improves UX, but Spring Boot backend
// security remains the ultimate authoritative gate!
// ============================================================================

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useAuth();

  // 1. Redirect unauthenticated visitors to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Role-based check if allowedRoles prop is specified
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ color: 'var(--danger, #ef4444)' }}>403 — Access Restricted</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Your role ({role}) does not have permission to access this portal section.
        </p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
