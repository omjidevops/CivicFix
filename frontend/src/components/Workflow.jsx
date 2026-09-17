// ============================================================================
// STEP 7: Workflow Component (Workflow.jsx)
// A 4-step guide explaining the transparent resolution cycle of CivicFix.
// ============================================================================

function Workflow() {
  return (
    <section className="workflow-section" id="workflow">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">How It Works</span>
          <h2 className="section-heading">Transparent Resolution in 4 Simple Steps</h2>
          <p className="section-description">
            From citizen notification to verified municipal repair — tracked at every milestone.
          </p>
        </div>

        <div className="workflow-grid">
          <div className="workflow-step">
            <span className="step-number">1</span>
            <h3 className="step-title">Report Issue</h3>
            <p className="step-text">
              Spot a civic issue, snap a photo, add the location, and submit via the citizen portal.
            </p>
          </div>

          <div className="workflow-step">
            <span className="step-number">2</span>
            <h3 className="step-title">Authority Review</h3>
            <p className="step-text">
              Ward officers review the complaint, assess severity, and assign the appropriate department.
            </p>
          </div>

          <div className="workflow-step">
            <span className="step-number">3</span>
            <h3 className="step-title">On-Ground Action</h3>
            <p className="step-text">
              Municipal maintenance crew arrives on-site to inspect, repair, and upload resolution proof.
            </p>
          </div>

          <div className="workflow-step">
            <span className="step-number">4</span>
            <h3 className="step-title">Citizen Verification</h3>
            <p className="step-text">
              The reporting citizen inspects the repair, submits feedback, and marks the grievance closed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Workflow;
