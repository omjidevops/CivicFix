// ============================================================================
// COMPONENT: ComplaintItem.jsx
// Renders an individual grievance card in the Citizen Dashboard.
// Props:
// - complaint (Object): Contains id, title, category, status, priority, location, submittedDate
// ============================================================================

import { Link } from 'react-router-dom';
import ComplaintUpvote from './ComplaintUpvote';

function ComplaintItem({ complaint }) {
  const {
    id,
    title,
    category,
    status,
    priority,
    location,
    submittedDate,
    upvotes
  } = complaint;

  // Status class helper
  const getStatusClass = () => {
    if (status === "In Progress") return "status-progress";
    if (status === "Resolved") return "status-resolved";
    return "status-pending";
  };

  // Priority class helper
  const getPriorityClass = () => {
    if (priority === "High") return "priority-badge-high";
    if (priority === "Medium") return "priority-badge-med";
    return "priority-badge-low";
  };

  const complaintIdKey = complaint.numericId || id;

  return (
    <article className="dash-complaint-item">
      <div className="dash-item-header">
        <div className="dash-item-meta">
          <span className="dash-item-id">{id}</span>
          <span className="badge-category">{category}</span>
          <span className={`priority-badge ${getPriorityClass()}`}>
            {priority} Priority
          </span>
        </div>

        <span className={`status-badge ${getStatusClass()}`}>
          ● {status}
        </span>
      </div>

      <h3 className="dash-item-title">{title}</h3>

      <div className="dash-item-footer">
        <div className="dash-item-info">
          <span>📍 {location}</span>
          <span>📅 {submittedDate}</span>
        </div>

        <div className="dash-item-actions">
          <ComplaintUpvote
            complaintId={complaintIdKey}
            initialVotes={upvotes}
            compact={true}
          />
          <Link to={`/track?id=${complaintIdKey}`} className="btn-dash-track">
            Track & Discuss →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ComplaintItem;
