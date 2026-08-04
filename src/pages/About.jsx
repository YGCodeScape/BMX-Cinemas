import React from 'react';
import Navbar from '../components/home/Navbar';
import Footer from '../components/common/Footer';
import { aboutHistoryData, companyUSPs, brandData } from '../data/aboutDataSet';
import '../styles/about.css';

export default function About() {
  return (
    <div className="about-page-container">
      {/* Shared Header Navigation */}
      <Navbar activePage="about" />

      <main>
        {/* ==========================================================================
           1. HERO & OUR HISTORY SECTION
           ========================================================================== */}
        <section className="about-hero-section">
          <div className="section-container">
            
            {/* Page Header */}
            <div className="about-header-text">
              <span className="about-badge-gold">
                <i className="fa-solid fa-crown"></i> SINCE 2013 • NAVI MUMBAI & BEYOND
              </span>
              <h1 className="about-title">OUR STORY & VISION</h1>
              <p className="about-subtitle">
                Redefining the art of movie-watching through luxury ambience, cutting-edge cinematic technology, and premium culinary experiences.
              </p>
            </div>

            {/* History 50/50 Dual Column Grid */}
            <div className="history-grid">
              
              {/* Left Column: Story & Narrative */}
              <div className="history-card-glass">
                {aboutHistoryData.paragraphs.map((para, idx) => (
                  <p key={idx} className="history-paragraph">
                    {para}
                  </p>
                ))}

                {/* Location Chips */}
                <div className="history-locations-row">
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                    LOCATIONS:
                  </span>
                  {aboutHistoryData.locations.map((loc, idx) => (
                    <span key={idx} className="location-chip">
                      <i className="fa-solid fa-location-dot"></i> {loc.name} ({loc.tag})
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Framed Media Feature */}
              <div className="history-media-frame">
                <img 
                  src="/img/inside5.jpg" 
                  alt="Balaji Movieplex Theater Interior" 
                  width="580"
                  height="380"
                  loading="lazy"
                />
                <div className="history-media-overlay">
                  <div className="history-stat-badge">
                    <i className="fa-solid fa-award"></i>
                    <span>10+ Years of Cinematic Excellence</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==========================================================================
           2. COMPANY STRENGTHS & USPs (6-TILE BENTO GRID)
           ========================================================================== */}
        <section className="usps-section">
          <div className="section-container">
            
            <div className="section-header" style={{ marginBottom: '10px' }}>
              <div className="header-text-group">
                <span className="pill-badge">
                  <span className="badge-dot"></span> WHY CHOOSE US
                </span>
                <h2 className="section-title">Company Strengths & USPs</h2>
                <p className="section-subtitle">
                  Discover what makes Balaji Movieplex the preferred cinema destination for thousands of movie lovers every week.
                </p>
              </div>
            </div>

            {/* 6-Tile Bento Grid */}
            <div className="usps-bento-grid">
              {companyUSPs.map((usp) => (
                <div key={usp.id} className="bento-tile">
                  <div className="bento-icon-wrapper">
                    <i className={usp.icon}></i>
                  </div>
                  <span className="bento-chip">{usp.highlight}</span>
                  <h3 className="bento-title">{usp.title}</h3>
                  <p className="bento-desc">{usp.description}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==========================================================================
           3. OUR BRANDS SPOTLIGHT (9/12 NAU SE BARAH THE MOVIE BAR)
           ========================================================================== */}
        <section className="brand-spotlight-section">
          <div className="section-container">
            
            <div className="section-header" style={{ marginBottom: '30px' }}>
              <div className="header-text-group">
                <span className="pill-badge">
                  <span className="badge-dot"></span> OUR BRANDS & CONCEPTS
                </span>
                <h2 className="section-title">Culinary & Lounge Venture</h2>
              </div>
            </div>

            {/* 9/12 Nau Se Barah Feature Card */}
            <div className="nausebarah-card">
              
              {/* Brand Logo */}
              <div className="nausebarah-logo-wrapper">
                <img 
                  src={brandData.logo} 
                  alt="9/12 Nau Se Barah - The Movie Bar Logo" 
                  className="nausebarah-logo-img" 
                  width="140"
                  height="50"
                  loading="lazy"
                />
              </div>

              {/* Brand Description & Highlights */}
              <div className="brand-info-block">
                <span className="brand-badge">
                  <i className="fa-solid fa-martini-glass"></i> RESTAURANT & BAR
                </span>
                <h3 className="brand-title">{brandData.name}</h3>
                <p className="brand-desc">{brandData.description}</p>

                {/* Highlights Grid */}
                <div className="brand-highlights-grid">
                  {brandData.highlights.map((h, idx) => (
                    <div key={idx} className="highlight-tile">
                      <i className={h.icon}></i>
                      <span>{h.label}</span>
                    </div>
                  ))}
                </div>
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
