// ============================================================================
// PART 3 — COUNTER COMPONENT (Counter.jsx)
// A foundational learning component demonstrating:
// 1. import { useState } from "react"
// 2. const [count, setCount] = useState(0)
// 3. Updating State via onClick event handler
// ============================================================================

import { useState } from 'react';

function Counter() {
  // count = current value, setCount = function to update count, 0 = initial value
  const [count, setCount] = useState(0);

  return (
    <div className="demo-card">
      <h3 className="demo-card-title">Interactive Click Counter</h3>
      <p className="demo-card-subtitle">
        Demonstrates React State and automatic UI re-rendering on click.
      </p>

      <div className="demo-counter-display">{count}</div>

      <div className="demo-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setCount(count + 1)}
        >
          Increase Count (+1)
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
