// ============================================================================
// CIVICFIX — DAY 46: ENTERPRISE ADMIN DASHBOARD & CONTROL CONSOLE
// Page: pages/AdminDashboard.jsx (Route: "/admin" & "/admin/dashboard")
//
// Features:
// 1. Header with Admin ID chip & Logout
// 2. Tab Navigation: Dashboard Overview, Complaints Queue, Departments, Analytics
// 3. Real Backend KPIs: Total, Pending, Verified, Assigned, In Progress, Resolved, Critical
// 4. Complaint Management with multi-faceted filtering & search
// 5. 360° Complaint Inspection Modal with Status History timeline, media & comments
// 6. Action: Verify Complaint (SUBMITTED -> VERIFIED)
// 7. Action: Assign Department & Officer (VERIFIED -> ASSIGNED)
// 8. Visual Real-time Analytics (Category, Status, Priority distributions)
// ============================================================================

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getAdminStats,
  getAdminComplaints,
  getAdminComplaintDetails,
  verifyComplaint,
  assignComplaint,
  getDepartments,
  getEmployees,
  getAdminAnalytics
} from '../services/adminService';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Active View Tab: 'dashboard' | 'complaints' | 'departments' | 'analytics'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Core Data States
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [detailComplaint, setDetailComplaint] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Verification Modal
  const [verifyingComplaint, setVerifyingComplaint] = useState(null);
  const [verificationRemarks, setVerificationRemarks] = useState('');
  const [verifySubmitting, setVerifySubmitting] = useState(false);

  // Assignment Modal
  const [assigningComplaint, setAssigningComplaint] = useState(null);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedEmp, setSelectedEmp] = useState('');
  const [assignmentDeadline, setAssignmentDeadline] = useState('');
  const [assignmentInstructions, setAssignmentInstructions] = useState('');
  const [assignSubmitting, setAssignSubmitting] = useState(false);

  // Toast alert
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // Initial Load
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, complaintsData, deptsData, empsData, analyticsData] = await Promise.all([
        getAdminStats(),
        getAdminComplaints(),
        getDepartments(),
        getEmployees(),
        getAdminAnalytics()
      ]);

      setStats(statsData);
      setComplaints(complaintsData);
      setDepartments(deptsData);
      setEmployees(empsData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Failed to load Admin Dashboard data:', err);
      setError('Failed to synchronize with municipal administration backend. Verify admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Filter complaints
  const filteredComplaints = complaints.filter((c) => {
    const rawStatus = (c.status || '').toUpperCase();
    const matchesStatus =
      statusFilter === 'ALL' || rawStatus === statusFilter;

    const matchesCategory =
      categoryFilter === 'ALL' || c.category === categoryFilter;

    const matchesPriority =
      priorityFilter === 'ALL' || (c.priorityLevel || '').toUpperCase() === priorityFilter;

    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      String(c.id).toLowerCase().includes(q) ||
      c.title?.toLowerCase().includes(q) ||
      c.address?.toLowerCase().includes(q) ||
      c.category?.toLowerCase().includes(q);

    return matchesStatus && matchesCategory && matchesPriority && matchesQuery;
  });

  // Open 360-degree Detail Modal
  const handleOpenDetail = async (complaintId) => {
    setDetailLoading(true);
    setDetailComplaint(null);
    try {
      const data = await getAdminComplaintDetails(complaintId);
      setDetailComplaint(data);
    } catch (err) {
      console.error('Failed to fetch details:', err);
      showToast('Could not load full grievance details.');
    } finally {
      setDetailLoading(false);
    }
  };

  // Trigger Verify Action
  const handleConfirmVerify = async (e) => {
    e.preventDefault();
    if (!verifyingComplaint) return;
    setVerifySubmitting(true);
    try {
      const updated = await verifyComplaint(verifyingComplaint.id, verificationRemarks);
      showToast(`Grievance #${updated.id} successfully verified! Notification sent to citizen.`);
      setVerifyingComplaint(null);
      setVerificationRemarks('');
      fetchAllData();
    } catch (err) {
      console.error('Verification failed:', err);
      showToast('Failed to verify complaint.');
    } finally {
      setVerifySubmitting(false);
    }
  };

  // Trigger Assignment Action
  const handleConfirmAssign = async (e) => {
    e.preventDefault();
    if (!assigningComplaint || !selectedDept || !selectedEmp) {
      showToast('Please select both a department and field employee.');
      return;
    }
    setAssignSubmitting(true);
    try {
      const updated = await assignComplaint(assigningComplaint.id, {
        departmentId: selectedDept,
        employeeId: selectedEmp,
        deadline: assignmentDeadline,
        instructions: assignmentInstructions
      });
      showToast(`Grievance #${updated.id} assigned successfully! Dispatched to field officer.`);
      setAssigningComplaint(null);
      setSelectedDept('');
      setSelectedEmp('');
      setAssignmentDeadline('');
      setAssignmentInstructions('');
      fetchAllData();
    } catch (err) {
      console.error('Assignment failed:', err);
      showToast('Failed to assign grievance.');
    } finally {
      setAssignSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = String(status || '').toUpperCase();
    if (s === 'RESOLVED') return { label: 'Resolved', className: 'status-resolved' };
    if (s === 'IN_PROGRESS') return { label: 'In Progress', className: 'status-progress' };
    if (s === 'ASSIGNED') return { label: 'Assigned', className: 'status-assigned' };
    if (s === 'VERIFIED') return { label: 'Verified', className: 'status-verified' };
    if (s === 'REJECTED') return { label: 'Rejected', className: 'status-rejected' };
    return { label: 'Submitted', className: 'status-pending' };
  };

  return (
    <div className="admin-console-wrapper">
      {/* Toast Notification */}
      {toast && (
        <div className="admin-toast-alert" role="status">
          <span>✓</span> {toast}
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="admin-topbar">
        <div className="admin-brand-cluster">
          <div className="admin-brand-seal">🏛️</div>
          <div>
            <h1 className="admin-brand-heading">CivicFix Municipal Admin Console</h1>
            <p className="admin-brand-sub">Central Redressal & Public Works Directorate</p>
          </div>
        </div>

        <div className="admin-user-cluster">
          <div className="admin-badge-chip">
            <span className="admin-avatar-seal">{(user?.name || 'A').charAt(0).toUpperCase()}</span>
            <div className="admin-user-info">
              <strong>{user?.name || 'Municipal Commissioner'}</strong>
              <small>ROLE_ADMIN • System Controller</small>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Admin Navigation Ribbon */}
      <nav className="admin-nav-ribbon">
        <button
          type="button"
          className={`ribbon-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard Overview
        </button>
        <button
          type="button"
          className={`ribbon-tab ${activeTab === 'complaints' ? 'active' : ''}`}
          onClick={() => setActiveTab('complaints')}
        >
          📋 Complaints Queue ({complaints.length})
        </button>
        <button
          type="button"
          className={`ribbon-tab ${activeTab === 'departments' ? 'active' : ''}`}
          onClick={() => setActiveTab('departments')}
        >
          🏢 Departments ({departments.length})
        </button>
        <button
          type="button"
          className={`ribbon-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Real-Time Analytics
        </button>
        <button
          type="button"
          className="ribbon-tab ribbon-refresh-btn"
          onClick={fetchAllData}
          title="Reload Data"
        >
          🔄 Refresh
        </button>
      </nav>

      {/* Tab 1: Dashboard Overview */}
      {activeTab === 'dashboard' && (
        <section className="admin-section-fade">
          {/* KPI Cards Row */}
          <div className="admin-kpi-grid">
            <div className="kpi-card kpi-total">
              <div className="kpi-icon">📋</div>
              <div className="kpi-meta">
                <span className="kpi-val">{stats?.totalComplaints ?? complaints.length}</span>
                <span className="kpi-title">Total Complaints</span>
              </div>
            </div>

            <div className="kpi-card kpi-pending">
              <div className="kpi-icon">⏳</div>
              <div className="kpi-meta">
                <span className="kpi-val">{stats?.pendingVerification ?? 0}</span>
                <span className="kpi-title">Pending Verification</span>
              </div>
            </div>

            <div className="kpi-card kpi-verified">
              <div className="kpi-icon">🔍</div>
              <div className="kpi-meta">
                <span className="kpi-val">{stats?.verified ?? 0}</span>
                <span className="kpi-title">Verified (Awaiting Dispatch)</span>
              </div>
            </div>

            <div className="kpi-card kpi-assigned">
              <div className="kpi-icon">👷</div>
              <div className="kpi-meta">
                <span className="kpi-val">{stats?.assigned ?? 0}</span>
                <span className="kpi-title">Assigned to Field Teams</span>
              </div>
            </div>

            <div className="kpi-card kpi-progress">
              <div className="kpi-icon">🚜</div>
              <div className="kpi-meta">
                <span className="kpi-val">{stats?.inProgress ?? 0}</span>
                <span className="kpi-title">In Active Repair</span>
              </div>
            </div>

            <div className="kpi-card kpi-resolved">
              <div className="kpi-icon">✅</div>
              <div className="kpi-meta">
                <span className="kpi-val">{stats?.resolved ?? 0}</span>
                <span className="kpi-title">Resolved Grievances</span>
              </div>
            </div>

            <div className="kpi-card kpi-critical">
              <div className="kpi-icon">🚨</div>
              <div className="kpi-meta">
                <span className="kpi-val">{stats?.critical ?? 0}</span>
                <span className="kpi-title">Critical Urgency</span>
              </div>
            </div>

            <div className="kpi-card kpi-rate">
              <div className="kpi-icon">📈</div>
              <div className="kpi-meta">
                <span className="kpi-val">{stats?.resolutionRate ?? '0%'}</span>
                <span className="kpi-title">SLA Resolution Rate</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Triage Banner */}
          <div className="admin-quick-split">
            <div className="quick-box">
              <h3>⚡ Urgent Attention Required</h3>
              <p>Grievances flagged as Critical priority or pending initial verification:</p>
              <div className="urgent-list">
                {complaints
                  .filter((c) => c.status === 'SUBMITTED' || c.severity >= 4)
                  .slice(0, 4)
                  .map((c) => (
                    <div key={c.id} className="urgent-row">
                      <span className="badge-category">{c.category}</span>
                      <strong>{c.title}</strong>
                      <span className="col-coords">📍 {c.address}</span>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleOpenDetail(c.numericId || c.id)}
                      >
                        Inspect →
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="quick-box">
              <h3>🏢 Municipal Operating Staff</h3>
              <p>Registered field engineers available for assignment across wards:</p>
              <div className="officer-list-preview">
                {employees.map((emp) => (
                  <div key={emp.id} className="officer-chip">
                    <span className="officer-dot">●</span>
                    <strong>{emp.name}</strong> ({emp.email})
                    <span className="badge-role badge-official">EMPLOYEE</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab 2: Complaints Queue */}
      {(activeTab === 'complaints' || activeTab === 'dashboard') && (
        <section className="admin-section-fade" style={{ marginTop: activeTab === 'dashboard' ? '32px' : '0' }}>
          <div className="section-title-bar">
            <h2>Municipal Grievance Work Queue</h2>
            <p>Full centralized directory of citizen grievances with verification and department delegation controls.</p>
          </div>

          {/* Filter Bar */}
          <div className="admin-filter-bar">
            <div className="admin-search-wrapper">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Title, ID, Address, or Ward..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="admin-select-filters">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="SUBMITTED">SUBMITTED (Pending Review)</option>
                <option value="VERIFIED">VERIFIED (Ready for Dispatch)</option>
                <option value="ASSIGNED">ASSIGNED (With Field Officer)</option>
                <option value="IN_PROGRESS">IN_PROGRESS (Operations Active)</option>
                <option value="RESOLVED">RESOLVED (Closed)</option>
                <option value="REJECTED">REJECTED</option>
              </select>

              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="ALL">All Categories</option>
                <option value="Road Damage">Road Damage</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Street Lighting">Street Lighting</option>
                <option value="Water Supply">Water Supply</option>
                <option value="Drainage">Drainage</option>
                <option value="Public Safety">Public Safety</option>
              </select>

              <select
                className="form-select"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="ALL">All Priorities</option>
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
          </div>

          {/* Complaints Table */}
          <div className="admin-table-container">
            {loading ? (
              <div className="admin-table-loading">
                <div className="spinner-sm"></div>
                <span>Synchronizing municipal work queue...</span>
              </div>
            ) : filteredComplaints.length === 0 ? (
              <div className="admin-empty-state">
                <span>🔍</span>
                <h4>No complaints match the filter criteria</h4>
                <p>Try clearing filters or changing ward categories.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Grievance Summary</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Ward / Location</th>
                    <th>Status</th>
                    <th>Upvotes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((c) => {
                    const statusBadge = getStatusBadge(c.status);
                    const isSubmitted = (c.status || '').toUpperCase() === 'SUBMITTED';
                    const isVerified = (c.status || '').toUpperCase() === 'VERIFIED';

                    return (
                      <tr key={c.id}>
                        <td className="col-id">
                          <code>{c.id}</code>
                        </td>
                        <td className="col-title">
                          <strong>{c.title}</strong>
                          <p className="col-desc-snippet">{c.description?.substring(0, 60)}...</p>
                        </td>
                        <td>
                          <span className="badge-category">{c.category}</span>
                        </td>
                        <td>
                          <span className={`priority-badge priority-badge-${String(c.priorityLevel || c.priority || '').toLowerCase()}`}>
                            {c.priorityLevel || c.priority || 'NORMAL'}
                          </span>
                        </td>
                        <td className="col-location">
                          <span>📍 {c.address}</span>
                          {c.latitude && c.longitude && (
                            <small className="col-coords">
                              ({Number(c.latitude).toFixed(3)}, {Number(c.longitude).toFixed(3)})
                            </small>
                          )}
                        </td>
                        <td>
                          <span className={`status-badge ${statusBadge.className}`}>
                            ● {statusBadge.label}
                          </span>
                        </td>
                        <td className="col-votes">
                          ▲ {c.upvotes || 0}
                        </td>
                        <td className="col-action">
                          <div className="action-button-stack">
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => handleOpenDetail(c.numericId || c.id)}
                            >
                              Inspect Details
                            </button>

                            {isSubmitted && (
                              <button
                                type="button"
                                className="btn btn-primary btn-sm btn-verify"
                                onClick={() => setVerifyingComplaint(c)}
                              >
                                ✓ Verify
                              </button>
                            )}

                            {(isVerified || isSubmitted) && (
                              <button
                                type="button"
                                className="btn btn-primary btn-sm btn-assign"
                                onClick={() => setAssigningComplaint(c)}
                              >
                                👷 Delegate
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      {/* Tab 3: Departments Management */}
      {activeTab === 'departments' && (
        <section className="admin-section-fade">
          <div className="section-title-bar">
            <h2>Municipal Public Works Departments</h2>
            <p>Official municipal bodies responsible for infrastructure triage and crew dispatch.</p>
          </div>

          <div className="depts-grid">
            {departments.map((dept) => (
              <div key={dept.id} className="dept-card">
                <div className="dept-card-header">
                  <span className="dept-icon">🏢</span>
                  <h3>{dept.name}</h3>
                </div>
                <p>{dept.description || 'Public service infrastructure wing.'}</p>
                <div className="dept-card-footer">
                  <span className="dept-id-tag">Dept ID: #{dept.id}</span>
                  <span className="dept-status-live">● Operational</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 4: Real Analytics */}
      {activeTab === 'analytics' && (
        <section className="admin-section-fade">
          <div className="section-title-bar">
            <h2>Municipal Redressal Analytics</h2>
            <p>Live data aggregated directly from the CivicFix MySQL relational engine.</p>
          </div>

          <div className="analytics-grid">
            {/* 1. Category Distribution */}
            <div className="analytics-card">
              <h3>Complaints by Civic Category</h3>
              <div className="chart-bar-list">
                {analytics?.complaintsByCategory &&
                  Object.entries(analytics.complaintsByCategory).map(([cat, count]) => {
                    const pct = analytics.totalGrievances > 0 ? (count / analytics.totalGrievances) * 100 : 0;
                    return (
                      <div key={cat} className="chart-bar-item">
                        <div className="chart-bar-header">
                          <span>{cat}</span>
                          <strong>{count} ({Math.round(pct)}%)</strong>
                        </div>
                        <div className="chart-bar-track">
                          <div className="chart-bar-fill fill-category" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* 2. Status Distribution */}
            <div className="analytics-card">
              <h3>Workflow Status Distribution</h3>
              <div className="chart-bar-list">
                {analytics?.complaintsByStatus &&
                  Object.entries(analytics.complaintsByStatus).map(([status, count]) => {
                    const pct = analytics.totalGrievances > 0 ? (count / analytics.totalGrievances) * 100 : 0;
                    return (
                      <div key={status} className="chart-bar-item">
                        <div className="chart-bar-header">
                          <span>{status}</span>
                          <strong>{count} ({Math.round(pct)}%)</strong>
                        </div>
                        <div className="chart-bar-track">
                          <div className="chart-bar-fill fill-status" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* 3. Priority Breakdown */}
            <div className="analytics-card">
              <h3>Priority & Urgency Breakdown</h3>
              <div className="chart-bar-list">
                {analytics?.complaintsByPriority &&
                  Object.entries(analytics.complaintsByPriority).map(([pri, count]) => {
                    const pct = analytics.totalGrievances > 0 ? (count / analytics.totalGrievances) * 100 : 0;
                    return (
                      <div key={pri} className="chart-bar-item">
                        <div className="chart-bar-header">
                          <span>{pri} Priority</span>
                          <strong>{count} ({Math.round(pct)}%)</strong>
                        </div>
                        <div className="chart-bar-track">
                          <div className="chart-bar-fill fill-priority" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MODAL 1: 360° Complaint Detail View */}
      {detailComplaint && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-header">
              <div>
                <span className="complaint-id-chip">{detailComplaint.complaint?.id}</span>
                <h3 className="modal-title">{detailComplaint.complaint?.title}</h3>
              </div>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setDetailComplaint(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-meta-grid">
                <div>
                  <span className="meta-label">Citizen Reporter</span>
                  <span className="meta-value">
                    👤 {detailComplaint.citizenName || 'Verified Citizen'} ({detailComplaint.citizenEmail})
                  </span>
                </div>
                <div>
                  <span className="meta-label">Current Status</span>
                  <span className={`status-badge ${getStatusBadge(detailComplaint.complaint?.status).className}`}>
                    ● {detailComplaint.complaint?.status}
                  </span>
                </div>
                <div>
                  <span className="meta-label">Category & Severity</span>
                  <span className="meta-value">
                    {detailComplaint.complaint?.category} • Level {detailComplaint.complaint?.severity}/5
                  </span>
                </div>
                <div>
                  <span className="meta-label">Assigned Body</span>
                  <span className="meta-value">
                    {detailComplaint.departmentName || 'Not yet assigned'}
                    {detailComplaint.assignedEmployeeName && ` (Officer: ${detailComplaint.assignedEmployeeName})`}
                  </span>
                </div>
              </div>

              <div className="detail-desc-box">
                <h4>Narrative Description</h4>
                <p>{detailComplaint.complaint?.description}</p>
                <p className="detail-loc">📍 {detailComplaint.complaint?.address}</p>
              </div>

              {/* Status History Timeline */}
              <div className="detail-history-box">
                <h4>Status Audit Trail ({detailComplaint.statusHistory?.length || 0})</h4>
                {(!detailComplaint.statusHistory || detailComplaint.statusHistory.length === 0) ? (
                  <p className="empty-sub">No transitions recorded yet.</p>
                ) : (
                  <div className="history-timeline">
                    {detailComplaint.statusHistory.map((h) => (
                      <div key={h.id} className="history-node">
                        <div className="history-marker"></div>
                        <div className="history-content">
                          <div className="history-title">
                            <strong>{h.oldStatus} → {h.newStatus}</strong>
                            <small>{new Date(h.createdAt).toLocaleString()}</small>
                          </div>
                          <p className="history-remarks">"{h.remarks}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Attached Comments */}
              <div className="detail-comments-box">
                <h4>Public Discussion Thread ({detailComplaint.comments?.length || 0})</h4>
                <div className="comments-mini-list">
                  {detailComplaint.comments?.map((cm) => (
                    <div key={cm.id} className="comment-mini-card">
                      <strong>{cm.userName}</strong>: {cm.commentText}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <Link
                to={`/track?id=${detailComplaint.complaint?.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Open Public Tracking Page ↗
              </Link>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setDetailComplaint(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Verify Complaint */}
      {verifyingComplaint && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-header">
              <div>
                <span className="complaint-id-chip">{verifyingComplaint.id}</span>
                <h3 className="modal-title">Verify Grievance Validity</h3>
              </div>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setVerifyingComplaint(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmVerify}>
              <div className="modal-body">
                <p>
                  Confirm that this grievance has been reviewed, contains genuine photographic evidence or location coordinates, and is eligible for municipal departmental assignment.
                </p>
                <div className="form-group">
                  <label htmlFor="verify-remarks" className="form-label">
                    Inspection Remarks (Recorded in Audit Trail):
                  </label>
                  <textarea
                    id="verify-remarks"
                    className="form-control"
                    rows="3"
                    placeholder="Enter official triage notes..."
                    value={verificationRemarks}
                    onChange={(e) => setVerificationRemarks(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setVerifyingComplaint(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={verifySubmitting}
                >
                  {verifySubmitting ? 'Verifying...' : 'Confirm Verification (SUBMITTED → VERIFIED)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Assign Department & Officer */}
      {assigningComplaint && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-header">
              <div>
                <span className="complaint-id-chip">{assigningComplaint.id}</span>
                <h3 className="modal-title">Delegate to Municipal Agency</h3>
              </div>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setAssigningComplaint(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmAssign}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="assign-dept-select" className="form-label">
                    Target Department: *
                  </label>
                  <select
                    id="assign-dept-select"
                    className="form-select"
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    required
                  >
                    <option value="">-- Choose Municipal Department --</option>
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="assign-emp-select" className="form-label">
                    Field Officer / Lead Engineer: *
                  </label>
                  <select
                    id="assign-emp-select"
                    className="form-select"
                    value={selectedEmp}
                    onChange={(e) => setSelectedEmp(e.target.value)}
                    required
                  >
                    <option value="">-- Choose Field Officer --</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="assign-deadline" className="form-label">
                    Target Resolution Deadline:
                  </label>
                  <input
                    type="date"
                    id="assign-deadline"
                    className="form-control"
                    value={assignmentDeadline}
                    onChange={(e) => setAssignmentDeadline(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="assign-instructions" className="form-label">
                    Work Order Instructions:
                  </label>
                  <textarea
                    id="assign-instructions"
                    className="form-control"
                    rows="2"
                    placeholder="Provide specific instructions or priority dispatch notes..."
                    value={assignmentInstructions}
                    onChange={(e) => setAssignmentInstructions(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setAssigningComplaint(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={assignSubmitting}
                >
                  {assignSubmitting ? 'Delegating...' : 'Assign & Notify Field Team'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
