import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/footer.css';

export default function Footer({ onNavigate }) {
  const navigate = useNavigate();

  const handleLinkClick = (e, target) => {
    if (e) e.preventDefault();
    
    if (onNavigate) {
      onNavigate(target);
    }

    if (target === 'home') {
      if (window.location.pathname !== '/') {
        navigate('/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'about') {
      if (window.location.pathname !== '/about') {
        navigate('/about');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'contact') {
      if (window.location.pathname !== '/contact') {
        navigate('/contact');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'career') {
      if (window.location.pathname !== '/career') {
        navigate('/career');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'advertise') {
      if (window.location.pathname !== '/advertise') {
        navigate('/advertise');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'corporate') {
      if (window.location.pathname !== '/corporate') {
        navigate('/corporate');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 150);
      } else {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-glass-container">
        
        {/* Floating 3D Mascot Avatar Props */}
        <div className="footer-avatar-prop avatar-seat">
          <img src="/img/bmx avtar seat.png" alt="BMX Seat Avatar" className="avatar-img" />
        </div>
        <div className="footer-avatar-prop avatar-car">
          <img src="/img/avatar2.png" alt="BMX Car Avatar" className="avatar-img" />
        </div>

        <div className="section-container">
          
          {/* 4-Column Location & Links Grid */}
          <div className="footer-main-grid">
            
            {/* Column 1: Head Office */}
            <div className="footer-col">
              <h4 className="footer-col-title">
                <i className="fa-solid fa-location-dot"></i> Navi Mumbai Head office
              </h4>
              <div className="footer-info-block">
                <p className="footer-address">
                  Plot No 90, Sector 8, Kopar Khairane, Navi Mumbai, Maharashtra, 400709
                </p>
                <a href="tel:+918879855831" className="footer-phone">
                  <i className="fa-solid fa-phone"></i> +91 88798 55831
                </a>
              </div>
            </div>

            {/* Column 2: Ambernath Office */}
            <div className="footer-col">
              <h4 className="footer-col-title">
                <i className="fa-solid fa-building"></i> Ambernath Office
              </h4>
              <div className="footer-info-block">
                <p className="footer-address">
                  GALAXY Mall, Vadol Gaon, Waldhuni, Ambernath, Ulhasnagar, Maharashtra 421501
                </p>
                <a href="tel:+917208680250" className="footer-phone">
                  <i className="fa-solid fa-phone"></i> +91 72086 80250
                </a>
              </div>
            </div>

            {/* Column 3: Kharghar Office */}
            <div className="footer-col">
              <h4 className="footer-col-title">
                <i className="fa-solid fa-city"></i> Kharghar Office
              </h4>
              <div className="footer-info-block">
                <p className="footer-address">
                  Little World Mall, Plot No 21, Sector 2, Kharghar, Navi Mumbai, Maharashtra 410210
                </p>
                <div className="phone-group">
                  <a href="tel:+918779857813" className="footer-phone">
                    <i className="fa-solid fa-phone"></i> +91 87798 57813
                  </a>
                  <a href="tel:+918655255606" className="footer-phone">
                    <i className="fa-solid fa-phone"></i> +91 86552 55606
                  </a>
                </div>
              </div>
            </div>

            {/* Column 4: Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">
                <i className="fa-solid fa-link"></i> Quick Links
              </h4>
              <ul className="footer-links-list">
                <li>
                  <a href="#trailers" className="footer-link" onClick={(e) => handleLinkClick(e, 'trailers')}>
                    <i className="fa-solid fa-chevron-right"></i> Trailers
                  </a>
                </li>
                <li>
                  <a href="#career" className="footer-link" onClick={(e) => handleLinkClick(e, 'career')}>
                    <i className="fa-solid fa-chevron-right"></i> Career
                  </a>
                </li>
                <li>
                  <a href="#advertise" className="footer-link" onClick={(e) => handleLinkClick(e, 'advertise')}>
                    <i className="fa-solid fa-chevron-right"></i> Advertise with us
                  </a>
                </li>
                <li>
                  <a href="#corporate" className="footer-link" onClick={(e) => handleLinkClick(e, 'corporate')}>
                    <i className="fa-solid fa-chevron-right"></i> Corporate Booking
                  </a>
                </li>
                <li>
                  <a href="#contact" className="footer-link" onClick={(e) => handleLinkClick(e, 'contact')}>
                    <i className="fa-solid fa-chevron-right"></i> Contact us
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="footer-divider"></div>

          {/* Lower Bottom Center Row */}
          <div className="footer-bottom-row">
            
            {/* Logo */}
            <div className="footer-logo-block" onClick={(e) => handleLinkClick(e, 'home')} style={{ cursor: 'pointer' }}>
              <img src="/img/bmx logo.png" alt="BMX Cinemas Logo" className="footer-logo-img" />
              <span className="footer-logo-sub">ASSOCIATED WITH PURPLE PARROTS ENTERTAINMENT</span>
            </div>

            {/* Socials */}
            <div className="footer-social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </div>

            {/* Legal / Copyright Note */}
            <div className="footer-legal-note">
              <p>
                <a href="#privacy" className="privacy-link">Privacy Policy</a> © 2025 BMX Cinemas Is Associated With Purple Parrots Entertainment And Hospitality Private Limited, ALL RIGHTS RESERVED.
              </p>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
