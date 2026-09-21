// ============================================================================
// PAGE: Login.jsx (Route: "/login")
// Real authentication page connected to Spring Boot POST /api/auth/login
// Receives JWT and redirects to Dashboard
// ============================================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      const role = data?.user?.role;
      if (role === 'ADMIN' || role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else if (role === 'EMPLOYEE' || role === 'ROLE_EMPLOYEE') {
        navigate('/employee');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Invalid email or password.');
      } else {
        setError('Cannot connect to backend server (http://localhost:8081).');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-wrapper" style={{ maxWidth: '460px' }}>
        <div className="form-header">
          <h1 className="form-title">Portal Sign In</h1>
          <p className="form-subtitle">
            Sign in with your verified credentials to report grievances and track resolutions.
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#b91c1c',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="citizen@example.com"
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

          <div className="form-actions" style={{ marginTop: '24px' }}>
            <button
              type="submit"
              className="btn btn-primary btn-submit"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Authenticating...' : 'Sign In with JWT'}
            </button>
          </div>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
