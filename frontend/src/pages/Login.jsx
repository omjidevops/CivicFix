// ============================================================================
// PAGE: Login.jsx (Route: "/login")
// UI learning page for citizen and municipal officer authentication.
// Note: Authentication backend and JWT will be built in later phases.
// ============================================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [role, setRole] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`[Demo Mode] Login attempted as ${role}: ${email}`);
  };

  return (
    <div className="page-container">
      <div className="form-wrapper" style={{ maxWidth: '460px' }}>
        <div className="form-header">
          <h1 className="form-title">Portal Access</h1>
          <p className="form-subtitle">
            Sign in to manage and track municipal grievances.
          </p>
        </div>

        {/* Role Switcher */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button
            type="button"
            className={`btn ${role === 'citizen' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1, padding: '8px' }}
            onClick={() => setRole('citizen')}
          >
            Citizen
          </button>
          <button
            type="button"
            className={`btn ${role === 'officer' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1, padding: '8px' }}
            onClick={() => setRole('officer')}
          >
            Ward Officer
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email or Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-actions" style={{ marginTop: '20px' }}>
            <button type="submit" className="btn btn-primary btn-submit">
              Sign In as {role === 'citizen' ? 'Citizen' : 'Officer'}
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>Return Home</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
