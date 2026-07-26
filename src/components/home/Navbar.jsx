import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/navigation.css';

export default function Navbar({ activePage = 'home', onNavigate }) {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll event handler for header shrink & backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleNavClick = (target) => {
    closeDrawer();
    if (onNavigate) {
      onNavigate(target);
    }

    if (target === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'about') {
      navigate('/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'contact') {
      navigate('/contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Main Glass Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="mainHeader">
        <div className="header-container">
          
          {/* Logo */}
          <div className="brand-logo" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
            <img src="/img/bmx logo.png" alt="BMX Cinemas Logo" className="logo-img" />
          </div>

          {/* Desktop Floating Pill Navigation */}
          <nav className="desktop-nav-pill">
            <a 
              href="#home" 
              className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            >
              HOME
            </a>
            <a 
              href="#about" 
              className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
            >
              ABOUT US
            </a>
            <a 
              href="#shows" 
              className={`nav-link ${activePage === 'shows' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('shows'); }}
            >
              SHOWS
            </a>
            <a 
              href="#contact" 
              className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            >
              CONTACT
            </a>
            {/* MORE Hover Dropdown */}
            <div className="nav-dropdown">
              <button 
                className={`nav-dropdown-btn ${['trailers', 'career', 'faqs', 'advertise', 'corporate'].includes(activePage) ? 'active' : ''}`}
              >
                MORE <i className="fa-solid fa-chevron-down dropdown-arrow"></i>
              </button>
              <div className="dropdown-menu">
                <a href="#trailers" onClick={(e) => { e.preventDefault(); handleNavClick('trailers'); }}>
                  <i className="fa-solid fa-circle-play"></i> Trailers
                </a>
                <a href="#career" onClick={(e) => { e.preventDefault(); handleNavClick('career'); }}>
                  <i className="fa-solid fa-briefcase"></i> Career
                </a>
                <a href="#faqs" onClick={(e) => { e.preventDefault(); handleNavClick('faqs'); }}>
                  <i className="fa-solid fa-circle-question"></i> FAQs
                </a>
                <a href="#advertise" onClick={(e) => { e.preventDefault(); handleNavClick('advertise'); }}>
                  <i className="fa-solid fa-rectangle-ad"></i> Advertise With Us
                </a>
                <a href="#corporate" onClick={(e) => { e.preventDefault(); handleNavClick('corporate'); }}>
                  <i className="fa-solid fa-users-gear"></i> Corporate Booking
                </a>
              </div>
            </div>
          </nav>

          {/* Header Right Social Actions */}
          <div className="header-social-actions">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button 
            className={`mobile-menu-toggle ${isDrawerOpen ? 'active' : ''}`} 
            id="mobileMenuToggle" 
            aria-label="Toggle Navigation Menu"
            onClick={toggleDrawer}
          >
            <i className={`fa-solid ${isDrawerOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>

        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <aside className={`mobile-drawer ${isDrawerOpen ? 'active' : ''}`} id="mobileNavDrawer">
        <div className="drawer-header">
          <img src="/img/bmx logo.png" alt="BMX Logo" className="drawer-logo" />
          <button className="drawer-close" id="drawerClose" aria-label="Close Drawer Menu" onClick={closeDrawer}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="drawer-nav">
          <a href="#home" className="drawer-link active" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
            <i className="fa-solid fa-house"></i> Home
          </a>
          <a href="#about" className="drawer-link" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>
            <i className="fa-solid fa-circle-info"></i> About Us
          </a>
          <a href="#shows" className="drawer-link" onClick={(e) => { e.preventDefault(); handleNavClick('shows'); }}>
            <i className="fa-solid fa-film"></i> Shows
          </a>
          <a href="#upcoming" className="drawer-link" onClick={(e) => { e.preventDefault(); handleNavClick('upcoming'); }}>
            <i className="fa-solid fa-calendar-days"></i> Upcoming
          </a>
          <a href="#trailers" className="drawer-link" onClick={(e) => { e.preventDefault(); handleNavClick('trailers'); }}>
            <i className="fa-solid fa-circle-play"></i> Trailers
          </a>
          <a href="#experience" className="drawer-link" onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }}>
            <i className="fa-solid fa-couch"></i> Experience
          </a>
          <a href="#contact" className="drawer-link" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>
            <i className="fa-solid fa-headset"></i> Contact Us
          </a>
        </nav>

        <div className="drawer-footer">
          <div className="drawer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn"><i className="fa-brands fa-facebook-f"></i></a>
          </div>
          <span className="drawer-copy">© 2025 BMX Cinemas</span>
        </div>
      </aside>

      {/* Drawer Background Overlay */}
      <div 
        className={`drawer-overlay ${isDrawerOpen ? 'active' : ''}`} 
        id="drawerOverlay"
        onClick={closeDrawer}
      ></div>
    </>
  );
}
