// ============================================================================
// CIVICFIX — DAY 44: REAL COMPLAINT COMMENTS COMPONENT (ComplaintComments.jsx)
// Package: components/ComplaintComments.jsx
//
// Features:
// 1. Fetches real comments thread from backend: GET /api/complaints/{id}/comments
// 2. Submits new verified comment: POST /api/complaints/{id}/comments
// 3. Formats relative timestamps and municipal role badges
// 4. Input validation (2 to 1000 characters) with live character counter
// 5. Unauthenticated guest prompt with link to login
// ============================================================================

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getComplaintComments, addComplaintComment } from '../services/complaintService';
import { useNavigate } from 'react-router-dom';

/**
 * Formats ISO timestamp to human-friendly local string
 */
function formatCommentDate(dateStr) {
  if (!dateStr) return 'Recently';
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffSecs = Math.floor((now - d) / 1000);

    if (diffSecs < 60) return 'Just now';
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
    if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)}h ago`;
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateStr;
  }
}

/**
 * Returns role badge styling and label
 */
function getRoleBadge(role) {
  if (!role) return { label: 'Citizen', className: 'badge-citizen' };
  const r = role.toUpperCase();
  if (r.includes('ADMIN')) return { label: 'Admin', className: 'badge-admin' };
  if (r.includes('EMPLOYEE') || r.includes('OFFICER')) return { label: 'Official', className: 'badge-official' };
  return { label: 'Citizen', className: 'badge-citizen' };
}

export default function ComplaintComments({ complaintId }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successNotice, setSuccessNotice] = useState(false);

  // Fetch comments on mount and when complaintId changes
  useEffect(() => {
    if (!complaintId) return;

    let isMounted = true;
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getComplaintComments(complaintId);
        if (isMounted) {
          setComments(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError('Could not load discussion comments. Please try again.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchComments();
    return () => {
      isMounted = false;
    };
  }, [complaintId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const trimmed = commentText.trim();
    if (trimmed.length < 2) {
      setError('Comment must contain at least 2 characters.');
      return;
    }
    if (trimmed.length > 1000) {
      setError('Comment cannot exceed 1,000 characters.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const newComment = await addComplaintComment(complaintId, trimmed);
      setComments((prev) => [...prev, newComment]);
      setCommentText('');
      setSuccessNotice(true);
      setTimeout(() => setSuccessNotice(false), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.details?.[0] || 'Failed to post comment.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="complaint-comments-container">
      <div className="comments-header">
        <h3 className="comments-title">
          <span className="comments-icon" aria-hidden="true">💬</span>
          Community Discussion
          <span className="comments-count-pill">{comments.length}</span>
        </h3>
        <p className="comments-subtitle">
          Public dialogue between residents and municipal ward engineers.
        </p>
      </div>

      {/* Comment Submission Form */}
      {isAuthenticated ? (
        <form className="comment-form" onSubmit={handleSubmitComment}>
          <div className="comment-form-header">
            <div className="comment-user-chip">
              <span className="comment-avatar-mini">
                {(user?.fullName || user?.name || user?.email || 'U').charAt(0).toUpperCase()}
              </span>
              <span className="comment-author-name">
                Posting as <strong>{user?.fullName || user?.name || user?.email}</strong>
              </span>
            </div>
            <span className={`char-counter ${commentText.length > 900 ? 'warning' : ''}`}>
              {commentText.length} / 1000
            </span>
          </div>

          <textarea
            id="comment-input"
            className="comment-textarea"
            rows="3"
            placeholder="Provide additional details, status updates, or observations about this issue..."
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
              if (error) setError(null);
            }}
            maxLength={1000}
            disabled={submitting}
            aria-label="Add a comment"
            required
          />

          {error && <div className="comment-error-alert" role="alert">{error}</div>}
          {successNotice && <div className="comment-success-alert" role="status">Comment posted successfully!</div>}

          <div className="comment-form-actions">
            <button
              type="submit"
              id="submit-comment-btn"
              className="btn btn-primary btn-submit-comment"
              disabled={submitting || commentText.trim().length < 2}
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="comment-login-prompt">
          <p>
            Join the municipal discussion to share updates or verify this issue.
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/login')}
          >
            Log In to Comment
          </button>
        </div>
      )}

      {/* Comments List */}
      <div className="comments-list">
        {loading ? (
          <div className="comments-loading">
            <div className="spinner-sm" aria-hidden="true"></div>
            <span>Loading community discussion...</span>
          </div>
        ) : comments.length === 0 ? (
          <div className="comments-empty-state">
            <span className="empty-icon" aria-hidden="true">🗨️</span>
            <h4>No comments yet</h4>
            <p>Are you experiencing this civic problem too? Share your observations above.</p>
          </div>
        ) : (
          comments.map((c) => {
            const roleInfo = getRoleBadge(c.userRole);
            const author = c.userName || 'Verified Citizen';
            const initial = author.charAt(0).toUpperCase();

            return (
              <div key={c.id || Math.random()} className="comment-card">
                <div className="comment-card-sidebar">
                  <div className="comment-avatar">{initial}</div>
                </div>
                <div className="comment-card-content">
                  <div className="comment-meta">
                    <span className="comment-author">{author}</span>
                    <span className={`badge-role ${roleInfo.className}`}>{roleInfo.label}</span>
                    <span className="comment-time">{formatCommentDate(c.createdAt)}</span>
                  </div>
                  <div className="comment-body">
                    {c.commentText}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
