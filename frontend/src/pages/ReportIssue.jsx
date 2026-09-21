// ============================================================================
// DAY 16 — REPORT ISSUE COMPONENT (ReportIssue.jsx)
// Demonstrates:
// 1. Controlled Form with a single state object
// 2. Dynamic handleChange using event.target.name & event.target.value
// 3. Client-side form validation and field-level error messages
// 4. Form submission handling with event.preventDefault()
// 5. Success state feedback and programmatic navigation using useNavigate()
// ============================================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { createComplaint, uploadComplaintMedia, checkDuplicateComplaint } from '../services/complaintService.js';
import LocationPicker from '../components/LocationPicker.jsx';

function ReportIssue() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // 1. Single form state object managing all inputs
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    category: "",
    title: "",
    severity: 3,
    description: "",
    location: "",
    latitude: null,
    longitude: null
  });

  // Day 43: Callback when citizen selects or drags marker on interactive Leaflet map
  const handleLocationSelect = ({ latitude, longitude }) => {
    setFormData((prev) => ({
      ...prev,
      latitude,
      longitude
    }));
  };

  // Automatically sync logged-in user credentials if available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || ""
      }));
    }
  }, [user]);

  // 2. State to hold validation error messages for each field
  const [errors, setErrors] = useState({});

  // 3. States for API submission lifecycle
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // 4. Day 42: Media Upload States
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  // Day 49: Smart Duplicate Detection State
  const [duplicateWarning, setDuplicateWarning] = useState(null);

  useEffect(() => {
    if (!formData.category || !formData.latitude || !formData.longitude) {
      setDuplicateWarning(null);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await checkDuplicateComplaint({
          category: formData.category,
          latitude: formData.latitude,
          longitude: formData.longitude,
          title: formData.title || ""
        });
        if (res && res.duplicateFound) {
          setDuplicateWarning(res);
        } else {
          setDuplicateWarning(null);
        }
      } catch (err) {
        // Silently skip check error
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [formData.category, formData.latitude, formData.longitude, formData.title]);

  // Reusable change handler for all form fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update the specific property using computed property name [name]
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear field error as user types to provide immediate positive feedback
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Validation function enforcing business rules
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Citizen name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    if (!formData.category) {
      newErrors.category = "Please select an issue category.";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Issue title is required.";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters long.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Issue description is required.";
    } else if (formData.description.trim().length < 15) {
      newErrors.description = "Description must be at least 15 characters long.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Ward or street location is required.";
    }

    return newErrors;
  };

  // Day 42: File selection handler with size and type validation
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileError(null);

    if (!file) {
      setSelectedFile(null);
      setFilePreview(null);
      return;
    }

    // 1. Enforce 5MB limit
    const maxBytes = 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      setFileError("File exceeds 5MB limit. Please choose an optimized photo.");
      event.target.value = "";
      setSelectedFile(null);
      setFilePreview(null);
      return;
    }

    // 2. Enforce MIME type allowlist
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Invalid file type. Only JPG, PNG, and WebP images are permitted.");
      event.target.value = "";
      setSelectedFile(null);
      setFilePreview(null);
      return;
    }

    setSelectedFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setFileError(null);
  };

  // Submit handler intercepting form submission
  const handleSubmit = async (event) => {
    // 1. Prevent default browser page reload
    event.preventDefault();
    setSubmitError(null);

    // 2. Validate input fields
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
      return;
    }

    setIsSubmitting(true);
    try {
      // 3. Send payload to Spring Boot backend via Axios
      const created = await createComplaint({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        severity: Number(formData.severity) || 3,
        location: formData.location.trim(),
        latitude: formData.latitude,
        longitude: formData.longitude
      });

      // 4. Day 42: Upload media evidence if attached
      let uploadedMediaUrl = null;
      if (selectedFile) {
        setUploadingMedia(true);
        try {
          const mediaRes = await uploadComplaintMedia(created.rawId || created.numericId, selectedFile);
          uploadedMediaUrl = mediaRes.fileUrl;
        } catch (mediaErr) {
          console.warn("Media attachment warning:", mediaErr);
        } finally {
          setUploadingMedia(false);
        }
      }

      // 5. Success: store real backend response with server-generated ID
      setSubmittedData({
        ...formData,
        id: created.id,
        rawId: created.numericId,
        status: created.status || "SUBMITTED",
        priorityLevel: created.priorityLevel || created.priority,
        mediaUrl: uploadedMediaUrl || filePreview,
        latitude: created.latitude !== undefined && created.latitude !== null ? created.latitude : formData.latitude,
        longitude: created.longitude !== undefined && created.longitude !== null ? created.longitude : formData.longitude
      });
      setIsSubmitted(true);
      setErrors({});

      // 6. Reset form fields
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        category: "",
        title: "",
        severity: 3,
        description: "",
        location: "",
        latitude: null,
        longitude: null
      });
      setSelectedFile(null);
      setFilePreview(null);
    } catch (err) {
      console.error("Complaint Submission Failed:", err);
      const serverMessage = err.response?.data?.message || err.message || "Failed to submit grievance to municipal portal.";
      setSubmitError(serverMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset to submit another report
  const handleReportAnother = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setSubmitError(null);
    setSelectedFile(null);
    setFilePreview(null);
    setFileError(null);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      category: "",
      title: "",
      severity: 3,
      description: "",
      location: "",
      latitude: null,
      longitude: null
    });
  };

  return (
    <div className="page-container">
      {/* View A: Success Confirmation Card */}
      {isSubmitted && submittedData ? (
        <div className="form-success-card">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Grievance Filed Successfully!</h2>
          <p className="success-desc">
            Your complaint has been logged and assigned a tracking ID: <strong>{submittedData.id}</strong>.
          </p>

          <div className="submitted-summary-box">
            <div className="summary-row">
              <span className="summary-label">Tracking ID:</span>
              <span className="summary-val" style={{ fontWeight: 700, color: '#2563eb' }}>{submittedData.id}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Initial Status:</span>
              <span className="summary-val" style={{ fontWeight: 600, color: '#059669' }}>{submittedData.status}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Priority Level:</span>
              <span className="summary-val" style={{ fontWeight: 600, color: '#d97706' }}>{submittedData.priorityLevel}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Reporting Citizen:</span>
              <span className="summary-val">{submittedData.name} ({submittedData.email})</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Category:</span>
              <span className="summary-val">{submittedData.category}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Title:</span>
              <span className="summary-val">{submittedData.title}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Location:</span>
              <span className="summary-val">{submittedData.location}</span>
            </div>
            {submittedData.latitude && submittedData.longitude && (
              <div className="summary-row">
                <span className="summary-label">Map Coordinates:</span>
                <span className="summary-val" style={{ fontFamily: 'monospace', color: '#0f766e', fontWeight: 600 }}>
                  📍 {submittedData.latitude}° N, {submittedData.longitude}° E
                </span>
              </div>
            )}
            <div className="summary-row">
              <span className="summary-label">Description:</span>
              <span className="summary-val">{submittedData.description}</span>
            </div>
            {submittedData.mediaUrl && (
              <div className="summary-row" style={{ alignItems: 'flex-start' }}>
                <span className="summary-label">Attached Evidence:</span>
                <div className="summary-val">
                  <img
                    src={submittedData.mediaUrl.startsWith('blob:') ? submittedData.mediaUrl : `http://localhost:8081${submittedData.mediaUrl}`}
                    alt="Uploaded Evidence"
                    style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReportAnother}
            >
              Report Another Issue
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/track')}
            >
              Track This Complaint →
            </button>
          </div>
        </div>
      ) : (
        /* View B: Controlled Reporting Form */
        <div className="form-wrapper">
          <div className="form-header">
            <h1 className="form-title">Report a Civic Issue</h1>
            <p className="form-subtitle">
              Submit your localized infrastructure grievance directly to municipal officers.
            </p>
          </div>

          {submitError && (
            <div className="dash-error-box" style={{ marginBottom: '20px', padding: '12px 16px', background: '#fef2f2', border: '1px solid #f87171', borderRadius: '8px', color: '#b91c1c' }}>
              <strong>⚠️ Submission Failed:</strong> {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Field 1: Citizen Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${errors.name ? 'input-error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
              />
              {errors.name && <span className="error-message">⚠️ {errors.name}</span>}
            </div>

            {/* Field 2: Citizen Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required-star">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? 'input-error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. ramesh@example.com"
              />
              {errors.email && <span className="error-message">⚠️ {errors.email}</span>}
            </div>

            {/* Field 3: Issue Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Civic Category <span className="required-star">*</span>
              </label>
              <select
                id="category"
                name="category"
                className={`form-control ${errors.category ? 'input-error' : ''}`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">-- Select Civic Category --</option>
                <option value="Road Damage">Roads & Pavements (Potholes, Cracks)</option>
                <option value="Sanitation">Sanitation & Garbage Disposal</option>
                <option value="Street Lighting">Street Lighting & Electrical</option>
                <option value="Water Supply">Water Pipeline & Leakage</option>
                <option value="Drainage">Drainage & Sewage Overflow</option>
                <option value="Public Safety">Public Safety & Obstructions</option>
              </select>
              {errors.category && <span className="error-message">⚠️ {errors.category}</span>}
            </div>

            {/* Field 3b: Severity Level */}
            <div className="form-group">
              <label htmlFor="severity" className="form-label">
                Urgency / Severity Level <span className="required-star">*</span>
              </label>
              <select
                id="severity"
                name="severity"
                className="form-control"
                value={formData.severity}
                onChange={handleChange}
              >
                <option value={1}>1 - Low (Minor cosmetic defect or minor nuisance)</option>
                <option value={2}>2 - Minor (Non-urgent maintenance)</option>
                <option value={3}>3 - Medium (Standard public disruption)</option>
                <option value={4}>4 - High (Safety hazard or major road/utility disruption)</option>
                <option value={5}>5 - Critical (Immediate emergency / life threatening hazard)</option>
              </select>
              <small style={{ display: 'block', marginTop: '4px', color: '#64748b', fontSize: '0.85rem' }}>
                Helps municipal officers prioritize emergency dispatch.
              </small>
            </div>

            {/* Field 4: Issue Title */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Issue Title <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`form-control ${errors.title ? 'input-error' : ''}`}
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Broken Water Main on 4th Cross"
              />
              {errors.title && <span className="error-message">⚠️ {errors.title}</span>}
            </div>

            {/* Field 5: Location / Ward */}
            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Location & Ward <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className={`form-control ${errors.location ? 'input-error' : ''}`}
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Ward 12, Near Metro Pillar 140"
              />
              {errors.location && <span className="error-message">⚠️ {errors.location}</span>}

              {/* Day 43: Interactive Map Location Picker (Leaflet + OpenStreetMap) */}
              <LocationPicker
                latitude={formData.latitude}
                longitude={formData.longitude}
                onLocationSelect={handleLocationSelect}
              />
            </div>

            {/* Field 6: Issue Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Detailed Description <span className="required-star">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className={`form-control ${errors.description ? 'input-error' : ''}`}
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe the infrastructure problem in detail (minimum 15 characters)..."
              ></textarea>
              {errors.description && <span className="error-message">⚠️ {errors.description}</span>}
            </div>

            {/* Field 7: Day 42 Photo Proof Evidence (Multipart Upload) */}
            <div className="form-group">
              <label htmlFor="mediaFile" className="form-label">
                Upload Photo Proof <span style={{ color: '#64748b', fontWeight: 'normal' }}>(Optional)</span>
              </label>
              <input
                type="file"
                id="mediaFile"
                name="mediaFile"
                accept="image/jpeg,image/png,image/webp"
                className="form-control"
                onChange={handleFileChange}
                style={{ padding: '8px' }}
              />
              <small style={{ display: 'block', marginTop: '4px', color: '#64748b', fontSize: '0.85rem' }}>
                Supports JPG, PNG, or WebP. Maximum file size: 5MB.
              </small>

              {fileError && (
                <span className="error-message" style={{ display: 'block', marginTop: '6px' }}>
                  ⚠️ {fileError}
                </span>
              )}

              {/* Live Image Preview */}
              {filePreview && (
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px' }}>
                  <img
                    src={filePreview}
                    alt="Preview"
                    style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #94a3b8' }}
                  />
                  <div style={{ flex: 1, fontSize: '0.9rem' }}>
                    <strong style={{ color: '#0f172a' }}>{selectedFile?.name}</strong>
                    <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '2px' }}>
                      {(selectedFile?.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
            </div>

            {/* Day 49: Smart Duplicate Detection Warning Banner */}
            {duplicateWarning && (
              <div style={{
                marginBottom: '18px',
                padding: '14px 16px',
                background: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>⚠️</span>
                <div style={{ flex: 1, fontSize: '0.88rem', color: '#92400e' }}>
                  <strong style={{ display: 'block', marginBottom: '3px', color: '#78350f' }}>
                    Potential Duplicate Issue Detected Nearby
                  </strong>
                  {duplicateWarning.advisoryMessage}
                  <div style={{ marginTop: '5px', fontSize: '0.8rem', color: '#b45309' }}>
                    If this is the same problem, you can upvote Grievance #{duplicateWarning.matchedComplaintId} instead. If this is a separate incident, feel free to proceed with your submission.
                  </div>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-submit"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {uploadingMedia ? "Uploading Photo Evidence..." : isSubmitting ? "Submitting to Municipal Portal..." : "Submit Civic Grievance"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ReportIssue;
