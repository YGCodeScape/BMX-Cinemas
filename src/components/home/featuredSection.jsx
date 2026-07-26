import React, { useState, useRef } from 'react';
import { movieDataSet } from '../../data/movieDataSet';
import '../../styles/featuredSection.css';

export default function FeaturedSection({ onOpenTrailer, onSelectMovie }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCardId, setActiveCardId] = useState(null);

  // Scroll left handler
  const handlePrev = () => {
    if (trackRef.current) {
      const scrollAmount = trackRef.current.offsetWidth * 0.75;
      trackRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  // Scroll right handler
  const handleNext = () => {
    if (trackRef.current) {
      const scrollAmount = trackRef.current.offsetWidth * 0.75;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Sync active dot on scroll
  const handleScroll = () => {
    if (!trackRef.current) return;
    const scrollPosition = trackRef.current.scrollLeft;
    const firstCard = trackRef.current.querySelector('.featured-card');
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 20;
    const index = Math.round(scrollPosition / cardWidth);
    setActiveIndex(index);
  };

  // Mobile tap/click overlay toggle
  const handleCardClick = (id) => {
    setActiveCardId(prev => (prev === id ? null : id));
  };

  const handleBookNow = (e, idx) => {
    e.stopPropagation();
    if (onSelectMovie) {
      onSelectMovie(idx);
    }
    const bookingCard = document.getElementById('quickBookingCard');
    if (bookingCard) {
      bookingCard.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrailerClick = (e, trailerUrl) => {
    e.stopPropagation();
    if (onOpenTrailer) {
      onOpenTrailer(trailerUrl);
    }
  };

  return (
    <section className="featured-shows-section" id="shows">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="header-text-group">
            <span className="pill-badge">
              <span className="badge-dot"></span> NOW PLAYING
            </span>
            <h2 className="section-title">Featured Shows</h2>
            <p className="section-subtitle">
              Handpicked blockbusters playing live across our BMX Cinema screens today.
            </p>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="carousel-nav-arrows">
            <button 
              className="arrow-btn" 
              onClick={handlePrev} 
              aria-label="Previous Featured Movie"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button 
              className="arrow-btn" 
              onClick={handleNext} 
              aria-label="Next Featured Movie"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Featured Movie Cards Scroll Track */}
        <div 
          className="featured-cards-track" 
          ref={trackRef}
          onScroll={handleScroll}
        >
          {movieDataSet.map((movie, idx) => {
            const isActive = activeCardId === movie.id;

            return (
              <div 
                className={`featured-card ${isActive ? 'info-active' : ''}`} 
                key={movie.id || idx}
                onClick={() => handleCardClick(movie.id)}
              >
                <div className="card-poster-wrapper">
                  <img 
                    src={`/${movie.posterImage || movie.bgImage}`} 
                    alt={movie.title} 
                    className="card-poster-img"
                    onError={(e) => { e.target.src = `/${movie.bgImage}`; }}
                  />
                  <span className="poster-cert-badge">{movie.cert}</span>
                </div>

                <div className="card-info-bottom">
                  <h3 className="card-title">{movie.title}</h3>
                  <span className="card-subtitle">{movie.subtitle}</span>
                  <div className="card-meta">
                    {movie.genre} • {movie.duration}
                  </div>
                  <div className="card-actions">
                    <button 
                      className="btn-card-book" 
                      onClick={(e) => handleBookNow(e, idx)}
                    >
                      <i className="fa-solid fa-ticket"></i> Book Now
                    </button>
                    <button 
                      className="btn-card-trailer"
                      onClick={(e) => handleTrailerClick(e, movie.trailerUrl)}
                    >
                      <i className="fa-solid fa-play"></i> Trailer
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="carousel-pagination-dots">
          {movieDataSet.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => {
                if (trackRef.current) {
                  const firstCard = trackRef.current.querySelector('.featured-card');
                  if (firstCard) {
                    const cardWidth = firstCard.offsetWidth + 20;
                    trackRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
                  }
                }
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
