// ============================================================================
// PART 8 — REUSABLE INTERACTIVE UPVOTE BUTTON (UpvoteButton.jsx)
// Demonstrates:
// 1. Component with its own local state
// 2. Event handler function
// 3. Preventing double support using a boolean state
// ============================================================================

import { useState } from 'react';

function UpvoteButton({ initialUpvotes = 0 }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [supported, setSupported] = useState(false);

  // Event handler function
  const handleSupport = () => {
    if (!supported) {
      setUpvotes(upvotes + 1);
      setSupported(true);
    }
  };

  return (
    <button
      type="button"
      className={`btn-support ${supported ? 'btn-supported' : ''}`}
      onClick={handleSupport}
    >
      {supported ? `✓ Supported (${upvotes})` : `▲ Support Issue (${upvotes})`}
    </button>
  );
}

export default UpvoteButton;
