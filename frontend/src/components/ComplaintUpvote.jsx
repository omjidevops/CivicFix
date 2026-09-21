// ============================================================================
// CIVICFIX — DAY 44: REAL COMPLAINT UPVOTE COMPONENT (ComplaintUpvote.jsx)
// Package: components/ComplaintUpvote.jsx
//
// Features:
// 1. Fetches real vote total & authenticated citizen's vote status from backend
// 2. Toggle vote: POST /api/complaints/{id}/vote or DELETE /api/complaints/{id}/vote
// 3. Debounced/disabled state during in-flight network requests
// 4. Prompts unauthenticated citizens to log in to support issues
// ============================================================================

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getComplaintVotes, voteComplaint, removeComplaintVote } from '../services/complaintService';
import { useNavigate } from 'react-router-dom';

export default function ComplaintUpvote({ complaintId, initialVotes = 0, compact = false, onVoteChange }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [votes, setVotes] = useState(Number(initialVotes) || 0);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authNotice, setAuthNotice] = useState(false);

  // Fetch initial vote state from backend
  useEffect(() => {
    if (!complaintId) return;

    let isMounted = true;
    const fetchStatus = async () => {
      try {
        const data = await getComplaintVotes(complaintId);
        if (isMounted && data) {
          setVotes(typeof data.totalVotes === 'number' ? data.totalVotes : votes);
          setHasVoted(Boolean(data.hasVoted));
        }
      } catch (err) {
        // Fallback gracefully without breaking UI
        console.debug('Could not load vote status:', err.message);
      }
    };

    fetchStatus();
    return () => {
      isMounted = false;
    };
  }, [complaintId, isAuthenticated]);

  const handleVoteToggle = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      setAuthNotice(true);
      setTimeout(() => setAuthNotice(false), 3500);
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      if (hasVoted) {
        // Remove vote
        const res = await removeComplaintVote(complaintId);
        const newTotal = res.totalVotes !== undefined ? res.totalVotes : Math.max(0, votes - 1);
        setVotes(newTotal);
        setHasVoted(false);
        if (onVoteChange) onVoteChange(newTotal, false);
      } else {
        // Cast upvote
        const res = await voteComplaint(complaintId);
        const newTotal = res.totalVotes !== undefined ? res.totalVotes : votes + 1;
        setVotes(newTotal);
        setHasVoted(true);
        if (onVoteChange) onVoteChange(newTotal, true);
      }
    } catch (err) {
      console.error('Failed to toggle upvote:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`complaint-upvote-wrapper ${compact ? 'compact' : ''}`}>
      <button
        type="button"
        id={`upvote-btn-${complaintId}`}
        className={`btn-upvote ${hasVoted ? 'active' : ''} ${loading ? 'loading' : ''}`}
        onClick={handleVoteToggle}
        disabled={loading}
        title={hasVoted ? 'Click to remove your upvote' : 'Click to support this grievance'}
        aria-label={hasVoted ? `Upvoted. Total ${votes} votes. Click to remove.` : `Upvote this complaint. Current votes: ${votes}`}
      >
        <span className="upvote-icon" aria-hidden="true">
          {hasVoted ? '▲' : '△'}
        </span>
        <span className="upvote-text">
          {hasVoted ? 'Upvoted' : 'Upvote'}
        </span>
        <span className="upvote-count-pill" id={`upvote-count-${complaintId}`}>
          {votes}
        </span>
      </button>

      {authNotice && (
        <div className="upvote-auth-notice" role="alert">
          <span>Please </span>
          <button
            type="button"
            className="link-login-notice"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/login');
            }}
          >
            login
          </button>
          <span> to upvote this issue.</span>
        </div>
      )}
    </div>
  );
}
