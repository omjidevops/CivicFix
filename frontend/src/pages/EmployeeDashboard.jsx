// ============================================================================
// CIVICFIX — DAY 47: FIELD OPERATIONS EMPLOYEE PORTAL
// File: src/pages/EmployeeDashboard.jsx (Route: "/employee" & "/employee/dashboard")
//
// Features:
// 1. Officer Header with name, department tag, live shift status, and logout
// 2. 4 Field KPI Metric Cards (Total Assigned, Pending Start, In Progress, Resolved)
// 3. Status Filters (All, Assigned, In Progress, Resolved) & Quick Search
// 4. Detailed Grievance Task Cards with SLA deadlines, citizen address & admin instructions
// 5. Action: "Start Work" (ASSIGNED -> IN_PROGRESS) + Crew Remarks Modal
// 6. Action: "Complete Resolution" (IN_PROGRESS -> RESOLVED) + Resolution Notes Modal
// 7. 360° Field Inspection Modal with status history audit trail & citizen contact
// ============================================================================

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getEmployeeStats,
  getMyAssignments,
  getAssignmentDetails,
  startWork,
  resolveWork
} from '../services/employeeService';

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State
  const [stats, setStats] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Start Work Modal
  const [startingTask, setStartingTask] = useState(null);
  const [startRemarks, setStartRemarks] = useState('');
  const [startSubmitting, setStartSubmitting] = useState(false);

  // Resolve Modal
  const [resolvingTask, setResolvingTask] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [resolveSubmitting, setResolveSubmitting] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const fetchPortalData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, assignmentsData] = await Promise.all([
        getEmployeeStats(),
        getMyAssignments(statusFilter)
      ]);
      setStats(statsData);
      setAssignments(assignmentsData);
    } catch (err) {
      console.error('Failed to load Employee Portal data:', err);
      setError('Unable to fetch field operations data. Verify your officer credentials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortalData();
  }, [statusFilter]);

  // Open 360-degree Detail Modal
  const handleOpenDetail = async (complaintId) => {
    setDetailLoading(true);
    setSelectedTask(null);
    try {
      const data = await getAssignmentDetails(complaintId);
      setSelectedTask(data);
    } catch (err) {
      console.error('Failed to load task details:', err);
      showToast('Could not load detailed task information.');
    } finally {
      setDetailLoading(false);
    }
  };

  // Confirm Start Work Action
  const handleConfirmStartWork = async (e) => {
    e.preventDefault();
    if (!startingTask) return;
    setStartSubmitting(true);
    try {
      await startWork(startingTask.complaintId, startRemarks);
      showToast(`Work commenced on Grievance #${startingTask.complaintId}! Citizen notified.`);
      setStartingTask(null);
      setStartRemarks('');
      fetchPortalData();
    } catch (err) {
      console.error('Failed to start work:', err);
      showToast('Failed to update status to In Progress.');
    } finally {
      setStartSubmitting(false);
    }
  };

  // Confirm Resolution Action
  const handleConfirmResolve = async (e) => {
    e.preventDefault();
    if (!resolvingTask) return;
    if (!resolutionNotes || resolutionNotes.trim().length < 10) {
      showToast('Please provide at least 10 characters of official resolution notes.');
      return;
    }
    setResolveSubmitting(true);
    try {
      await resolveWork(resolvingTask.complaintId, { resolutionNotes });
      showToast(`Grievance #${resolvingTask.complaintId} marked as RESOLVED! Notification sent to citizen.`);
      setResolvingTask(null);
      setResolutionNotes('');
      fetchPortalData();
    } catch (err) {
      console.error('Failed to resolve complaint:', err);
      showToast('Failed to submit resolution.');
    } finally {
      setResolveSubmitting(false);
    }
  };

  const filteredTasks = assignments.filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      String(t.complaintId).includes(q) ||
      (t.title && t.title.toLowerCase().includes(q)) ||
      (t.address && t.address.toLowerCase().includes(q)) ||
      (t.category && t.category.toLowerCase().includes(q))
    );
  });

  const getStatusBadge = (status) => {
    const s = String(status || '').toUpperCase();
    if (s === 'RESOLVED') return { label: 'Resolved', className: 'status-resolved' };
    if (s === 'IN_PROGRESS') return { label: 'In Progress', className: 'status-progress' };
    if (s === 'ASSIGNED') return { label: 'New Order', className: 'status-assigned' };
    return { label: s, className: 'status-submitted' };
  };

  const getPriorityBadge = (priority) => {
    const p = String(priority || '').toUpperCase();
    if (p === 'CRITICAL') return { label: 'Critical Urgency', className: 'priority-critical' };
    if (p === 'HIGH') return { label: 'High Priority', className: 'priority-high' };
    if (p === 'MEDIUM') return { label: 'Medium Priority', className: 'priority-medium' };
    return { label: 'Low Priority', className: 'priority-low' };
  };

  return (
    <div className="employee-portal-root">
      {/* Toast Alert */}
      {toast && <div className="admin-toast-banner">{toast}</div>}

      {/* Header Banner */}
      <header className="employee-header">
        <div className="employee-header-content">
          <div className="officer-branding">
            <div className="officer-avatar">👷</div>
            <div>
              <div className="officer-title-row">
                <h1>{stats?.officerName || user?.name || 'Field Officer'}</h1>
                <span className="officer-shift-badge">● On Active Duty</span>
              </div>
              <p className="officer-sub-text">
                Department: <strong>{stats?.departmentName || 'Municipal Public Works'}</strong> | Role: Field Supervisor
              </p>
            </div>
          </div>

          <div className="officer-actions">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={fetchPortalData}
              title="Refresh Queue"
            >
              🔄 Refresh
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="container employee-main">
        {/* KPI Cards Grid */}
        <section className="employee-kpi-grid">
          <div className="emp-kpi-card kpi-total">
            <div className="emp-kpi-icon">📋</div>
            <div className="emp-kpi-info">
              <span className="emp-kpi-val">{stats?.totalAssigned ?? 0}</span>
              <span className="emp-kpi-label">Total Assigned</span>
            </div>
          </div>

          <div className="emp-kpi-card kpi-pending">
            <div className="emp-kpi-icon">⏳</div>
            <div className="emp-kpi-info">
              <span className="emp-kpi-val">{stats?.pendingStart ?? 0}</span>
              <span className="emp-kpi-label">Awaiting Dispatch</span>
            </div>
          </div>

          <div className="emp-kpi-card kpi-progress">
            <div className="emp-kpi-icon">🔨</div>
            <div className="emp-kpi-info">
              <span className="emp-kpi-val">{stats?.inProgress ?? 0}</span>
              <span className="emp-kpi-label">Active On-Site Work</span>
            </div>
          </div>

          <div className="emp-kpi-card kpi-resolved">
            <div className="emp-kpi-icon">✅</div>
            <div className="emp-kpi-info">
              <span className="emp-kpi-val">{stats?.resolved ?? 0}</span>
              <span className="emp-kpi-label">Tasks Completed</span>
            </div>
          </div>
        </section>

        {/* Task Queue Controls */}
        <section className="employee-queue-section">
          <div className="queue-controls-bar">
            <div className="queue-tabs">
              <button
                type="button"
                className={`queue-tab-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
                onClick={() => setStatusFilter('ALL')}
              >
                All Orders ({stats?.totalAssigned ?? 0})
              </button>
              <button
                type="button"
                className={`queue-tab-btn ${statusFilter === 'ASSIGNED' ? 'active' : ''}`}
                onClick={() => setStatusFilter('ASSIGNED')}
              >
                ⏳ New Orders ({stats?.pendingStart ?? 0})
              </button>
              <button
                type="button"
                className={`queue-tab-btn ${statusFilter === 'IN_PROGRESS' ? 'active' : ''}`}
                onClick={() => setStatusFilter('IN_PROGRESS')}
              >
                🔨 In Progress ({stats?.inProgress ?? 0})
              </button>
              <button
                type="button"
                className={`queue-tab-btn ${statusFilter === 'RESOLVED' ? 'active' : ''}`}
                onClick={() => setStatusFilter('RESOLVED')}
              >
                ✅ Completed ({stats?.resolved ?? 0})
              </button>
            </div>

            <div className="queue-search">
              <input
                type="text"
                placeholder="Search by ID, title, or address..."
                className="form-control queue-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Loading & Error States */}
          {loading && (
            <div className="empty-state">
              <div className="spinner"></div>
              <p>Synchronizing assigned field work orders...</p>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" style={{ margin: '20px 0' }}>
              {error}
            </div>
          )}

          {!loading && !error && filteredTasks.length === 0 && (
            <div className="empty-state">
              <span style={{ fontSize: '3rem' }}>🎉</span>
              <h3>No Assigned Work Orders</h3>
              <p>You have no active grievance tasks under the selected status filter.</p>
            </div>
          )}

          {/* Work Orders List */}
          {!loading && !error && filteredTasks.length > 0 && (
            <div className="emp-tasks-grid">
              {filteredTasks.map((task) => {
                const statusBadge = getStatusBadge(task.status);
                const priorityBadge = getPriorityBadge(task.priority);
                const isAssigned = String(task.status).toUpperCase() === 'ASSIGNED';
                const isInProgress = String(task.status).toUpperCase() === 'IN_PROGRESS';
                const isResolved = String(task.status).toUpperCase() === 'RESOLVED';

                return (
                  <div key={task.complaintId} className={`emp-task-card ${isInProgress ? 'task-card-active' : ''}`}>
                    {/* Top Row: Meta Badges */}
                    <div className="emp-task-top">
                      <div className="emp-task-id-group">
                        <span className="emp-task-id">Work Order #{task.complaintId}</span>
                        <span className={`badge ${statusBadge.className}`}>{statusBadge.label}</span>
                      </div>
                      <span className={`badge ${priorityBadge.className}`}>{priorityBadge.label}</span>
                    </div>

                    {/* Title & Category */}
                    <h3 className="emp-task-title">{task.title}</h3>
                    <div className="emp-task-category-tag">📁 {task.category}</div>

                    {/* Citizen & Location Box */}
                    <div className="emp-task-location-box">
                      <div className="loc-item">
                        <span className="loc-icon">📍</span>
                        <span className="loc-text">{task.address}</span>
                      </div>
                      {task.citizenName && (
                        <div className="loc-item">
                          <span className="loc-icon">👤</span>
                          <span className="loc-text">
                            Citizen: <strong>{task.citizenName}</strong>
                            {task.citizenPhone && ` | 📞 ${task.citizenPhone}`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Admin Instructions Banner */}
                    {task.instructions && (
                      <div className="emp-task-instructions">
                        <strong>Dispatch Instructions:</strong>
                        <p>{task.instructions}</p>
                      </div>
                    )}

                    {/* Resolution Notes Banner (if resolved) */}
                    {isResolved && task.resolutionNotes && (
                      <div className="emp-task-resolution-banner">
                        <strong>Resolution Summary:</strong>
                        <p>{task.resolutionNotes}</p>
                        {task.resolvedAt && (
                          <small>Completed on: {new Date(task.resolvedAt).toLocaleString()}</small>
                        )}
                      </div>
                    )}

                    {/* Action Footer */}
                    <div className="emp-task-actions">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleOpenDetail(task.complaintId)}
                      >
                        🔍 360° Inspect
                      </button>

                      {isAssigned && (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm btn-start-work"
                          onClick={() => {
                            setStartingTask(task);
                            setStartRemarks('');
                          }}
                        >
                          🚀 Start Work
                        </button>
                      )}

                      {isInProgress && (
                        <button
                          type="button"
                          className="btn btn-success btn-sm btn-resolve-work"
                          onClick={() => {
                            setResolvingTask(task);
                            setResolutionNotes('');
                          }}
                        >
                          ✅ Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* =========================================================================
          MODAL 1: START WORK CONFIRMATION
      ========================================================================= */}
      {startingTask && (
        <div className="modal-backdrop" onClick={() => setStartingTask(null)}>
          <div className="modal-container modal-medium" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Commence On-Site Operations</h2>
              <button type="button" className="btn-close" onClick={() => setStartingTask(null)}>✕</button>
            </div>
            <form onSubmit={handleConfirmStartWork}>
              <div className="modal-body">
                <p>
                  You are initiating repair operations for <strong>Work Order #{startingTask.complaintId}</strong> (
                  {startingTask.title}).
                </p>
                <div className="alert alert-info" style={{ fontSize: '0.88rem', margin: '12px 0' }}>
                  ℹ️ This will transition the status to <strong>IN_PROGRESS</strong>, set your start timestamp, and notify the citizen that crew is on-site.
                </div>
                <div className="form-group">
                  <label className="form-label">Initial Field Remarks (Optional):</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="e.g. Field repair crew deployed with materials and emergency vehicle."
                    value={startRemarks}
                    onChange={(e) => setStartRemarks(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setStartingTask(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={startSubmitting}>
                  {startSubmitting ? 'Starting...' : '🚀 Confirm & Start Work'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: COMPLETE RESOLUTION
      ========================================================================= */}
      {resolvingTask && (
        <div className="modal-backdrop" onClick={() => setResolvingTask(null)}>
          <div className="modal-container modal-medium" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Submit Field Resolution</h2>
              <button type="button" className="btn-close" onClick={() => setResolvingTask(null)}>✕</button>
            </div>
            <form onSubmit={handleConfirmResolve}>
              <div className="modal-body">
                <p>
                  Confirm completion of repairs for <strong>Work Order #{resolvingTask.complaintId}</strong> (
                  {resolvingTask.title}).
                </p>
                <div className="alert alert-success" style={{ fontSize: '0.88rem', margin: '12px 0' }}>
                  ✅ This will transition the complaint to <strong>RESOLVED</strong>, mark the SLA fulfilled, and dispatch a completion notice to the citizen.
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Official Resolution Notes <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <textarea
                    rows={4}
                    className="form-control"
                    placeholder="Describe specific actions taken (e.g. Broken pipe replaced with high-grade PVC, pressure tested, trench backfilled and road surface asphalted)."
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    required
                  />
                  <small style={{ color: '#64748b' }}>Minimum 10 characters required for municipal audit compliance.</small>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setResolvingTask(null)}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={resolveSubmitting || resolutionNotes.trim().length < 10}
                >
                  {resolveSubmitting ? 'Submitting...' : '✅ Confirm & Mark Resolved'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: 360° FIELD TASK INSPECTION
      ========================================================================= */}
      {(selectedTask || detailLoading) && (
        <div className="modal-backdrop" onClick={() => setSelectedTask(null)}>
          <div className="modal-container modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>360° Field Task Inspection {selectedTask && `— #${selectedTask.complaintId}`}</h2>
              <button type="button" className="btn-close" onClick={() => setSelectedTask(null)}>✕</button>
            </div>
            <div className="modal-body">
              {detailLoading && (
                <div className="empty-state">
                  <div className="spinner"></div>
                  <p>Loading full grievance profile...</p>
                </div>
              )}

              {selectedTask && (
                <div className="modal-360-grid">
                  {/* Left Column: Complaint & Citizen Data */}
                  <div className="modal-col">
                    <div className="modal-card-box">
                      <h3>Grievance Information</h3>
                      <p className="detail-title"><strong>Title:</strong> {selectedTask.title}</p>
                      <p><strong>Description:</strong> {selectedTask.description}</p>
                      <div className="detail-tags-row">
                        <span className="badge badge-info">{selectedTask.category}</span>
                        <span className="badge badge-warning">Severity: {selectedTask.severity}/5</span>
                        <span className="badge badge-primary">{selectedTask.priority} Priority</span>
                        <span className="badge status-badge">{selectedTask.status}</span>
                      </div>
                    </div>

                    <div className="modal-card-box">
                      <h3>Citizen & Location Coordinates</h3>
                      <p><strong>Reporting Citizen:</strong> {selectedTask.citizenName || 'Verified Citizen'}</p>
                      <p><strong>Phone:</strong> {selectedTask.citizenPhone || 'Not provided'}</p>
                      <p><strong>Email:</strong> {selectedTask.citizenEmail || 'Not provided'}</p>
                      <p><strong>Physical Address:</strong> {selectedTask.address}</p>
                      {selectedTask.latitude && selectedTask.longitude && (
                        <p><strong>GPS Coordinates:</strong> {selectedTask.latitude}, {selectedTask.longitude}</p>
                      )}
                    </div>

                    {selectedTask.instructions && (
                      <div className="modal-card-box instructions-highlight">
                        <h3>Municipal Dispatch Order</h3>
                        <p><strong>Department:</strong> {selectedTask.departmentName}</p>
                        <p><strong>Assigned Instructions:</strong> {selectedTask.instructions}</p>
                        {selectedTask.deadline && (
                          <p><strong>Target SLA Deadline:</strong> {new Date(selectedTask.deadline).toLocaleString()}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Status History Timeline */}
                  <div className="modal-col">
                    <div className="modal-card-box">
                      <h3>Status Transition Audit Trail</h3>
                      <div className="timeline-container">
                        {selectedTask.statusHistory && selectedTask.statusHistory.length > 0 ? (
                          selectedTask.statusHistory.map((sh, idx) => (
                            <div key={sh.id || idx} className="timeline-item">
                              <div className="timeline-dot"></div>
                              <div className="timeline-content">
                                <div className="timeline-header">
                                  <span className="timeline-status-step">
                                    {sh.oldStatus ? `${sh.oldStatus} ➔ ` : ''}{sh.newStatus}
                                  </span>
                                  <span className="timeline-time">
                                    {sh.createdAt ? new Date(sh.createdAt).toLocaleString() : 'Recent'}
                                  </span>
                                </div>
                                {sh.remarks && <p className="timeline-remarks">{sh.remarks}</p>}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p style={{ color: '#64748b' }}>No status history logged yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedTask(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
