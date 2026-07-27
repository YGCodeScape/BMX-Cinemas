import React, { useState } from 'react';
import Navbar from '../components/home/Navbar';
import Footer from '../components/common/Footer';
import { contactOutletsData } from '../data/contactDataSet';
import { useFormSubmit } from '../hooks/useFormSubmit';
import '../styles/contact.css';

export default function Contact() {
  const { isSubmitting, isSuccess, handleSubmit: sendForm } = useFormSubmit('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject) return;

    const res = await sendForm(formData);
    if (res.success) {
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="contact-page-container">
      {/* Shared Header Navigation */}
      <Navbar activePage="contact" />

      <main>
        <section className="contact-hero-section">
          <div className="section-container">
            
            {/* Page Header */}
            <div className="contact-header-text">
              <span className="contact-badge">
                <i className="fa-solid fa-headset"></i> GET IN TOUCH
              </span>
              <h1 className="contact-title">Contact Us</h1>
              <p className="contact-subtitle">
                Have questions regarding movie showtimes, outlet locations, or special inquiries? We are here to help.
              </p>
            </div>

            {/* 2-Column Main Contact Grid */}
            <div className="contact-main-grid">
              
              {/* Left Column: 3 Outlets Showcase Cards + Google Maps Embed */}
              <div className="outlets-column">
                {contactOutletsData.map((outlet) => (
                  <div key={outlet.id} className="outlet-card">
                    <div className="outlet-card-header">
                      <h3 className="outlet-name">{outlet.name}</h3>
                      <span className="outlet-badge">{outlet.outlet}</span>
                    </div>

                    <p className="outlet-address">
                      <i className="fa-solid fa-location-dot" style={{ color: 'var(--pink)', marginRight: '6px' }}></i>
                      {outlet.address}
                    </p>

                    <div className="outlet-contacts-row">
                      {outlet.phones.map((phone, idx) => (
                        <a key={idx} href={`tel:${phone.replace(/\s+/g, '')}`} className="outlet-phone-link">
                          <i className="fa-solid fa-phone"></i> {phone}
                        </a>
                      ))}
                    </div>

                    {/* Google Maps Live Frame */}
                    <div className="outlet-map-frame">
                      <iframe 
                        src={outlet.mapEmbedUrl}
                        title={`${outlet.name} Location Map`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Contact Inquiry Form */}
              <div className="contact-form-card">
                <div>
                  <h3 className="form-header-title">Send Us a Message</h3>
                  <p className="form-header-subtitle">
                    Fill out the form below and our customer support team will get back to you.
                  </p>
                </div>

                {isSuccess && (
                  <div className="form-success-banner">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Thank you! Your message has been sent to servicesreserves@gmail.com. We will contact you soon.</span>
                  </div>
                )}

                <form className="contact-form" onSubmit={handleFormSubmit}>
                  
                  {/* Name Input */}
                  <div className="contact-form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="contact-input"
                      placeholder="Enter your full name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  {/* Email Input */}
                  <div className="contact-form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="contact-input"
                      placeholder="Enter your email address" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="contact-form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      className="contact-input"
                      placeholder="e.g. Booking Query, Feedback, General Inquiry" 
                      value={formData.subject}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  {/* Message Input (Optional) */}
                  <div className="contact-form-group">
                    <label htmlFor="message">Message (Optional)</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      className="contact-textarea"
                      placeholder="Write your message or inquiry here..." 
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn-submit-contact" disabled={isSubmitting}>
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
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
