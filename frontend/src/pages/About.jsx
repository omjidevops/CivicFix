// ============================================================================
// PAGE: About.jsx (Route: "/about")
// Explains the civic mission, transparency pledge, and municipal workflow.
// ============================================================================

import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="page-container">
      <div className="form-wrapper" style={{ maxWidth: '820px' }}>
        <div className="form-header">
          <span className="section-tag">About CivicFix</span>
          <h1 className="form-title">Bridging Citizens & Municipal Administration</h1>
          <p className="form-subtitle">
            A digital grievance redressal platform engineered for total public accountability.
          </p>
        </div>

        <div style={{ color: 'var(--text-main)', lineHeight: '1.7', fontSize: '1rem' }}>
          <p style={{ marginBottom: '16px' }}>
            <strong>CivicFix</strong> transforms traditional, opaque municipal bureaucracy into an agile, transparent digital workflow. Local civic infrastructure problems — such as open potholes, uncollected waste, non-functional streetlights, and leaking water mains — often go unresolved due to lack of reporting clarity and departmental silos.
          </p>

          <p style={{ marginBottom: '24px' }}>
            With CivicFix, citizens easily report issues with pinpoint geolocation, while local ward officers track, dispatch, verify, and resolve problems with complete public audit trails.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', margin: '28px 0' }}>
            <div style={{ padding: '16px', background: 'var(--bg-page)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '6px' }}>🏛️ Transparent</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Every complaint milestone is publicly viewable with timestamps.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-page)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '6px' }}>⚡ Responsive</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Automated ward routing directly to the responsible maintenance division.</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--bg-page)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '6px' }}>🤝 Community-Led</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Citizens upvote critical neighborhood issues to expedite emergency repairs.</p>
            </div>
          </div>
        </div>

        <div className="form-actions" style={{ justifyContent: 'center' }}>
          <Link to="/report" className="btn btn-primary">
            Report an Issue Now
          </Link>
          <Link to="/" className="btn btn-secondary">
            Explore Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
