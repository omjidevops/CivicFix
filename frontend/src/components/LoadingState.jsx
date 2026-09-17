// ============================================================================
// COMPONENT: LoadingState.jsx
// Displays a professional loading indicator while API requests are pending.
// ============================================================================

function LoadingState({ message = "Loading your civic complaints..." }) {
  return (
    <div className="dash-loading-box">
      <div className="dash-spinner" aria-hidden="true">⏳</div>
      <p className="dash-loading-text">{message}</p>
    </div>
  );
}

export default LoadingState;
