import React, { useState, useEffect } from 'react';
import { movieDataSet } from '../../data/movieDataSet';
import '../../styles/landing.css';

export default function Landing({ onOpenTrailer }) {
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  const [selectedOutlet, setSelectedOutlet] = useState('koparkhairane');
  const [isPaused, setIsPaused] = useState(false);

  const currentMovie = movieDataSet[activeMovieIndex] || movieDataSet[0];

  // 4-Second Auto Scroll Carousel Engine
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveMovieIndex((prevIndex) => (prevIndex + 1) % movieDataSet.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Handle movie selection from dropdown or pill
  const selectMovie = (index) => {
    setActiveMovieIndex(index);
  };

  // Scroll to Quick Booking Card
  const scrollToQuickBooking = () => {
    const card = document.getElementById('quickBookingCard');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // BookMyShow Redirect Handler
  const handleBmsRedirect = (e) => {
    e.preventDefault();
    const bmsUrl = currentMovie.bmsUrls?.[selectedOutlet] || 
      `https://in.bookmyshow.com/explore/movies?q=${encodeURIComponent(currentMovie.title)}`;
    window.open(bmsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      className="hero-section" 
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image & Vignette Overlays */}
      <div className="hero-bg-wrapper">
        <div 
          className="hero-bg-image" 
          style={{ backgroundImage: `url('/${currentMovie.bgImage}')` }}
        ></div>
        <div className="hero-bg-overlay"></div>
      </div>

      {/* Main Landing Container */}
      <div className="hero-container">
        
        {/* Left Column: Movie Meta & Information */}
        <div className="hero-movie-info" key={currentMovie.id}>
          
          {/* Now Showing Tag Row */}
          <div className="tag-row">
            <div className="tag-line"></div>
            <div className="tag-label">Now showing</div>
          </div>

          {/* Title */}
          <h1 className="movie-title">{currentMovie.title}</h1>

          {/* Metadata Chips */}
          <div className="movie-meta-chips">
            <span className="chip chip-rating">
              <i className="fa-solid fa-star"></i> {currentMovie.rating}
            </span>
            <span className="chip chip-genre">{currentMovie.genre}</span>
            <span className="chip chip-duration">
              <i className="fa-regular fa-clock"></i> {currentMovie.duration}
            </span>
            <span className="chip chip-cert">{currentMovie.cert}</span>
          </div>

          {/* Description */}
          <p className="movie-description">{currentMovie.description}</p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={scrollToQuickBooking}>
              <i className="fa-solid fa-ticket"></i> Book Now
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => onOpenTrailer && onOpenTrailer(currentMovie.trailerUrl)}
            >
              <i className="fa-solid fa-circle-play"></i> Watch Trailer
            </button>
          </div>
        </div>

        {/* Right Column: Quick Booking Form Card */}
        <div className="quick-booking-card" id="quickBookingCard">
          <div className="card-header">
            <div className="accent-bar"></div>
            <h3>Quick Booking</h3>
          </div>

          <form className="quick-booking-form" onSubmit={handleBmsRedirect}>
            
            {/* Outlet Selector Dropdown */}
            <div className="form-group">
              <label htmlFor="outletSelect">SELECT BMX OUTLET</label>
              <div className="custom-select-wrapper">
                <i className="fa-solid fa-location-dot select-icon"></i>
                <select 
                  id="outletSelect" 
                  className="custom-select"
                  value={selectedOutlet}
                  onChange={(e) => setSelectedOutlet(e.target.value)}
                >
                  <option value="koparkhairane">Kopar Khairane (Head Office)</option>
                  <option value="kharghar">Kharghar (Little World Mall)</option>
                  <option value="ambernath">Ambernath (GALAXY Mall)</option>
                </select>
                <i className="fa-solid fa-chevron-down arrow-icon"></i>
              </div>
            </div>

            {/* Movie Selector Dropdown */}
            <div className="form-group">
              <label htmlFor="movieSelect">SELECT MOVIE</label>
              <div className="custom-select-wrapper">
                <i className="fa-solid fa-film select-icon"></i>
                <select 
                  id="movieSelect" 
                  className="custom-select"
                  value={activeMovieIndex}
                  onChange={(e) => selectMovie(Number(e.target.value))}
                >
                  {movieDataSet.map((movie, idx) => (
                    <option key={movie.id} value={idx}>
                      {movie.title}
                    </option>
                  ))}
                </select>
                <i className="fa-solid fa-chevron-down arrow-icon"></i>
              </div>
            </div>

            {/* BookMyShow Redirect CTA */}
            <button type="submit" className="btn-bms-redirect">
              <span>Continue to BookMyShow</span>
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </button>

            <span className="bms-helper-text">
              <i className="fa-solid fa-shield-halved"></i> Official Ticket Partner Redirection
            </span>
          </form>
        </div>

      </div>

      {/* Bottom Now Playing Movie Selector Pills Bar */}
      <div className="bottom-carousel-bar">
        <div className="movie-pills-wrapper">
          {movieDataSet.map((movie, idx) => (
            <button 
              key={movie.id}
              className={`movie-pill ${idx === activeMovieIndex ? 'active' : ''}`}
              onClick={() => selectMovie(idx)}
            >
              {movie.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
