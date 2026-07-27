import React from 'react';
import Navbar from '../components/home/Navbar';
import Footer from '../components/common/Footer';
import { corporateHeaderData, corporateServices } from '../data/corporateDataSet';
import '../styles/corporate.css';

export default function Corporate() {
  return (
    <div className="corporate-page-container">
      {/* Shared Header Navigation */}
      <Navbar activePage="corporate" />

      <main>
        <section className="corp-hero-section">
          <div className="section-container">
            
            {/* Page Header */}
            <div className="corp-header-text">
              <span className="corp-badge">
                <i className="fa-solid fa-crown"></i> {corporateHeaderData.badge}
              </span>
              <h1 className="corp-title">{corporateHeaderData.title}</h1>
              <p className="corp-subtitle">{corporateHeaderData.subtitle}</p>
            </div>

            {/* Top Featured Contact Chips Bar */}
            <div className="corp-contact-bar">
              {corporateHeaderData.contactChips.map((chip, idx) => (
                <a key={idx} href={chip.href} className="corp-contact-btn">
                  <i className={chip.icon}></i>
                  <span>{chip.label}: {chip.value}</span>
                </a>
              ))}
            </div>

            {/* 3 Corporate Services Cards Grid */}
            <div className="corp-services-grid">
              {corporateServices.map((service) => (
                <div key={service.id} className="corp-card">
                  <span className="corp-card-badge">{service.badge}</span>

                  <div className="corp-card-icon">
                    <i className={service.icon}></i>
                  </div>

                  <h3 className="corp-card-title">{service.title}</h3>
                  <p className="corp-card-desc">{service.description}</p>

                  <div className="corp-card-features">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="feature-point">
                        <i className="fa-solid fa-check"></i>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Call-to-Action Card */}
            <div className="corp-cta-card">
              <h2 className="cta-title">Ready To Plan Your Corporate Event?</h2>
              <p className="cta-subtitle">
                Contact our corporate sales desk today for custom hall rentals, bulk ticket pricing, and special auditorium arrangements across Kopar Khairane, Kharghar, and Ambernath.
              </p>

              <div className="cta-buttons-row">
                <a href="tel:+917977508036" className="btn-cta-call">
                  <i className="fa-solid fa-phone"></i> Call +91 79775 08036
                </a>
                <a href="mailto:marketing@purpleparrots.in" className="btn-cta-email">
                  <i className="fa-solid fa-envelope"></i> Email Marketing Desk
                </a>
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
