import React, { useState } from 'react';
import Navbar from '../components/home/Navbar';
import Footer from '../components/common/Footer';
import { careerInfoData, openingCategories, departmentPosts } from '../data/careerDataSet';
import { useFormSubmit } from '../hooks/useFormSubmit';
import '../styles/career.css';

export default function Career() {
  const { isSubmitting, isSuccess, errorMessage, handleSubmit: sendForm } = useFormSubmit('career');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    category: '',
    applyPost: ''
  });

  const [resumeFile, setResumeFile] = useState(null);

  // Available posts depending on chosen category
  const availablePosts = formData.category ? departmentPosts[formData.category] || [] : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setFormData(prev => ({
        ...prev,
        category: value,
        applyPost: '' // reset post when category changes
      }));
    } else if (name === 'contactNo') {
      const cleanedValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, contactNo: cleanedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.contactNo || !formData.category || !formData.applyPost) {
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.contactNo)) {
      alert('Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.');
      return;
    }

    const fullPayload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.contactNo,
      department: formData.category,
      applied_position: formData.applyPost,
      subject: `[Career Application] ${formData.applyPost} - ${formData.firstName} ${formData.lastName}`
    };

    const res = await sendForm(fullPayload, resumeFile);
    if (res.success) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        contactNo: '',
        category: '',
        applyPost: ''
      });
      setResumeFile(null);
    }
  };

  return (
    <div className="career-page-container">
      {/* Shared Header Navigation */}
      <Navbar activePage="career" />

      <main>
        <section className="career-hero-section">
          <div className="section-container">
            
            {/* Page Header */}
            <div className="career-header-text">
              <span className="career-badge">
                <i className="fa-solid fa-briefcase"></i> JOIN OUR TEAM
              </span>
              <h1 className="career-title">Career Opportunities</h1>
              <p className="career-subtitle">
                Explore exciting roles, grow with an industry leader, and build your career in cinematic entertainment and hospitality.
              </p>
            </div>

            {/* 2-Column Main Career Grid */}
            <div className="career-main-grid">
              
              {/* Left Column: Why BMX Cinemas & HR Contact Info */}
              <div className="career-info-card">
                <div className="culture-title-block">
                  <h2 className="culture-title">{careerInfoData.title}</h2>
                  <p className="culture-desc">{careerInfoData.description}</p>
                </div>

                {/* HR Contact Chips */}
                <div className="career-contact-chips-block">
                  <span className="contact-chip-label">HR CONTACT & RECRUITMENT</span>
                  <div className="contact-chips-wrapper">
                    {careerInfoData.contactChips.map((chip, idx) => (
                      <a key={idx} href={chip.href} className="career-chip">
                        <i className={chip.icon}></i>
                        <span>{chip.label}: {chip.value}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Social Media Row */}
                <div>
                  <span className="contact-chip-label" style={{ display: 'block', marginBottom: '8px' }}>
                    CONNECT WITH US
                  </span>
                  <div className="career-socials-row">
                    {careerInfoData.socials.map((social, idx) => (
                      <a 
                        key={idx} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="career-social-btn" 
                        aria-label={social.label}
                      >
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Career Application Input Form */}
              <div className="career-form-card">
                <div>
                  <h3 className="form-header-title">Apply Now</h3>
                  <p className="form-header-subtitle">
                    Fill out your details, select your preferred opening, and attach your resume.
                  </p>
                </div>

                {isSuccess && (
                  <div className="form-success-banner">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Thank you! Your application has been submitted successfully to servicesreserves@gmail.com.</span>
                  </div>
                )}

                {errorMessage && (
                  <div className="form-error-banner" style={{ background: 'rgba(235, 87, 87, 0.15)', border: '1px solid #eb5757', color: '#ff6b6b', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form className="contact-form" onSubmit={handleFormSubmit}>
                  
                  {/* First Name & Last Name (2 Columns) */}
                  <div className="form-row-2col">
                    <div className="contact-form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        className="career-input"
                        placeholder="First name" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="contact-form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        className="career-input"
                        placeholder="Last name" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>

                  {/* Email & Contact No (2 Columns) */}
                  <div className="form-row-2col">
                    <div className="contact-form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="career-input"
                        placeholder="email@example.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="contact-form-group">
                      <label htmlFor="contactNo">Contact No (10 Digits) *</label>
                      <input 
                        type="tel" 
                        id="contactNo" 
                        name="contactNo" 
                        className="career-input"
                        placeholder="e.g. 9876543210" 
                        value={formData.contactNo}
                        onChange={handleInputChange}
                        maxLength={10}
                        pattern="[6-9][0-9]{9}"
                        title="Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9"
                        required 
                      />
                    </div>
                  </div>

                  {/* Category Selection Dropdown */}
                  <div className="contact-form-group">
                    <label htmlFor="category">Select Department / Category *</label>
                    <select 
                      id="category" 
                      name="category" 
                      className="career-select"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">-- Choose Opening Category --</option>
                      {openingCategories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Conditional Apply Post Dropdown */}
                  {formData.category && (
                    <div className="contact-form-group">
                      <label htmlFor="applyPost">Apply Post (Specific Position) *</label>
                      <select 
                        id="applyPost" 
                        name="applyPost" 
                        className="career-select"
                        value={formData.applyPost}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">-- Select Post --</option>
                        {availablePosts.map((post, idx) => (
                          <option key={idx} value={post}>
                            {post}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Resume Upload Field */}
                  <div className="contact-form-group">
                    <label>Upload Resume (PDF/DOCX) *</label>
                    <div className={`file-upload-box ${resumeFile ? 'has-file' : ''}`}>
                      <i className={`fa-solid ${resumeFile ? 'fa-file-pdf' : 'fa-cloud-arrow-up'} upload-icon`}></i>
                      <span className="upload-title">
                        {resumeFile ? resumeFile.name : 'Click or Drag Resume File to Upload'}
                      </span>
                      <span className="upload-hint">
                        {resumeFile ? `${(resumeFile.size / 1024 / 1024).toFixed(2)} MB` : 'Supports PDF, DOCX (Max size: 5MB)'}
                      </span>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        className="hidden-file-input"
                        onChange={handleFileChange}
                        required={!resumeFile}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn-submit-career" disabled={isSubmitting}>
                    <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
                    <i className={`fa-solid ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                  </button>

                </form>
              </div>

            </div>

          </div>
        </section>
      </main>

      {/* Shared Reusable Footer */}
      <Footer />
    </div>
  );
}
