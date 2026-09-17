// ============================================================================
// DAY 16 — REPORT ISSUE COMPONENT (ReportIssue.jsx)
// Demonstrates:
// 1. Controlled Form with a single state object
// 2. Dynamic handleChange using event.target.name & event.target.value
// 3. Client-side form validation and field-level error messages
// 4. Form submission handling with event.preventDefault()
// 5. Success state feedback and programmatic navigation using useNavigate()
// ============================================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReportIssue() {
  // Day 17: Hook for programmatic navigation
  const navigate = useNavigate();

  // 1. Single form state object managing all inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    title: "",
    description: "",
    location: ""
  });

  // 2. State to hold validation error messages for each field
  const [errors, setErrors] = useState({});

  // 3. State to track successful submission
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

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

  // Submit handler intercepting form submission
  const handleSubmit = (event) => {
    // 1. Prevent default browser page reload
    event.preventDefault();

    // 2. Validate input fields
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
      return;
    }

    // 3. Success: save submitted data for feedback display
    setSubmittedData(formData);
    setIsSubmitted(true);
    setErrors({});

    // 4. Reset form fields
    setFormData({
      name: "",
      email: "",
      category: "",
      title: "",
      description: "",
      location: ""
    });
  };

  // Reset to submit another report
  const handleReportAnother = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div className="page-container">
      {/* View A: Success Confirmation Card */}
      {isSubmitted && submittedData ? (
        <div className="form-success-card">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Grievance Filed Successfully!</h2>
          <p className="success-desc">
            Your complaint has been logged and assigned a tracking ID: <strong>CF-2026-REG-982</strong>.
          </p>

          <div className="submitted-summary-box">
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
            <div className="summary-row">
              <span className="summary-label">Description:</span>
              <span className="summary-val">{submittedData.description}</span>
            </div>
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

            {/* Submit Action */}
            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-submit">
                Submit Civic Grievance
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ReportIssue;
