import React, { useState } from 'react';
import Navbar from '../components/home/Navbar';
import Footer from '../components/common/Footer';
import { advertiseInfoData, organizationTypes, advertiseTypes, locationOptions } from '../data/advertiseDataSet';
import { useFormSubmit } from '../hooks/useFormSubmit';
import '../styles/advertise.css';

export default function Advertise() {
  const { isSubmitting, isSuccess, handleSubmit: sendForm } = useFormSubmit('advertise');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organizationType: '',
    advertiseType: '',
    location: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email || !formData.organizationType || !formData.advertiseType || !formData.location) {
      return;
    }

    const fullPayload = {
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      email: formData.email,
      organization_type: formData.organizationType,
      advertise_type: formData.advertiseType,
      target_location: formData.location,
      message: formData.message,
      subject: `[Advertising Inquiry] ${formData.advertiseType} - ${formData.organizationType} (${formData.firstName} ${formData.lastName})`
    };

    const res = await sendForm(fullPayload);
    if (res.success) {
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        organizationType: '',
        advertiseType: '',
        location: '',
        message: ''
      });
    }
  };

  return (
    <div className="advertise-page-container">
      {/* Shared Header Navigation */}
      <Navbar activePage="advertise" />

      <main>
        <section className="advertise-hero-section">
          <div className="section-container">
            
            {/* Page Header */}
            <div className="advertise-header-text">
              <span className="advertise-badge">
                <i className="fa-solid fa-rectangle-ad"></i> MEDIA & BRANDING
              </span>
              <h1 className="advertise-title">Advertise With Us</h1>
              <p className="advertise-subtitle">
                Amplify your brand presence across premier 4K cinema screens, high-footfall lobbies, and targeted multiplex touchpoints.
              </p>
            </div>

            {/* 2-Column Main Advertise Grid */}
            <div className="advertise-main-grid">
              
              {/* Left Column: Why Advertise Note Box & Benefits */}
              <div className="advertise-info-card">
                <div className="info-title-block">
                  <h2 className="info-title">{advertiseInfoData.title}</h2>
                  <p className="info-desc">{advertiseInfoData.description}</p>
                </div>

                {/* Benefits List */}
                <div className="benefits-list">
                  {advertiseInfoData.benefits.map((b, idx) => (
                    <div key={idx} className="benefit-item">
                      <div className="benefit-icon">
                        <i className={b.icon}></i>
                      </div>
                      <div className="benefit-text-group">
                        <h4 className="benefit-title">{b.title}</h4>
                        <p className="benefit-desc">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ad Contact Chips */}
                <div className="ad-contact-chips-block">
                  <span className="contact-chip-label">DIRECT AD SALES DESK</span>
                  <div className="ad-chips-wrapper">
                    {advertiseInfoData.contactChips.map((chip, idx) => (
                      <a key={idx} href={chip.href} className="ad-chip">
                        <i className={chip.icon}></i>
                        <span>{chip.label}: {chip.value}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Advertising Inquiry Form Card */}
              <div className="advertise-form-card">
                <div>
                  <h3 className="form-header-title">Request Media Kit & Rates</h3>
                  <p className="form-header-subtitle">
                    Fill in your campaign details and our media sales team will connect with custom packages.
                  </p>
                </div>

                {isSuccess && (
                  <div className="form-success-banner">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Thank you! Your advertising inquiry has been submitted successfully to servicesreserves@gmail.com.</span>
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
                        className="ad-input"
                        placeholder="First name" 
                        value={formData.firstName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="contact-form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        className="ad-input"
                        placeholder="Last name" 
                        value={formData.lastName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>

                  {/* Phone & Email (2 Columns) */}
                  <div className="form-row-2col">
                    <div className="contact-form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        className="ad-input"
                        placeholder="+91 98765 43210" 
                        value={formData.phone}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    <div className="contact-form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="ad-input"
                        placeholder="email@company.com" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>

                  {/* Organization Type & Advertise Type (2 Columns) */}
                  <div className="form-row-2col">
                    <div className="contact-form-group">
                      <label htmlFor="organizationType">Organization Type *</label>
                      <select 
                        id="organizationType" 
                        name="organizationType" 
                        className="ad-select"
                        value={formData.organizationType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select Type --</option>
                        {organizationTypes.map((type, idx) => (
                          <option key={idx} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="advertiseType">Advertise Type *</label>
                      <select 
                        id="advertiseType" 
                        name="advertiseType" 
                        className="ad-select"
                        value={formData.advertiseType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">-- Select Option --</option>
                        {advertiseTypes.map((type, idx) => (
                          <option key={idx} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Location Dropdown */}
                  <div className="contact-form-group">
                    <label htmlFor="location">Target Outlet / Location *</label>
                    <select 
                      id="location" 
                      name="location" 
                      className="ad-select"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Choose Location --</option>
                      {locationOptions.map((loc, idx) => (
                        <option key={idx} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message (Optional) */}
                  <div className="contact-form-group">
                    <label htmlFor="message">Leave Message (Optional)</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      className="ad-textarea"
                      placeholder="Specify campaign duration, preferred screens, budget, or custom requirements..." 
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn-submit-advertise" disabled={isSubmitting}>
                    <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
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
