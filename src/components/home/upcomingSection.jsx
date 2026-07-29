import React, { useState, useRef } from 'react';
import { upcomingMovieDataSet } from '../../data/upcomingMovieDataSet';
import '../../styles/upcomingSection.css';

// Dynamic Month Generator: Calculates consecutive months starting from the current date
function getDynamicMonthTabs(numMonths = 6) {
  const months = [];
  const now = new Date();
  
  for (let i = 0; i < numMonths; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const monthName = d.toLocaleString('en-US', { month: 'long' });
    const year = d.getFullYear();
    months.push(`${monthName} ${year}`);
  }
  return months;
}

export default function UpcomingSection({ onOpenTrailer }) {
  const trackRef = useRef(null);
  const dynamicMonthTabs = getDynamicMonthTabs(6);
  const [activeMonth, setActiveMonth] = useState(dynamicMonthTabs[0]);
  const [activeCardId, setActiveCardId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter movies for selected month
  const filteredMovies = upcomingMovieDataSet.filter(
    (movie) => movie.month === activeMonth
  );

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
    const firstCard = trackRef.current.querySelector('.upcoming-card, .empty-month-card');
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 20;
    const index = Math.round(scrollPosition / cardWidth);
    setActiveIndex(index);
  };

  // Mobile card tap overlay toggle
  const handleCardClick = (id) => {
    setActiveCardId(prev => (prev === id ? null : id));
  };

  // Total items including empty month card
  const totalItemsCount = filteredMovies.length + 1;

  return (
    <section className="upcoming-shows-section" id="upcoming">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header-upcoming">
          <div className="header-text-group">
            <span className="pill-badge">
              <span className="badge-dot"></span> COMING SOON
            </span>
            <h2 className="section-title">Upcoming Shows</h2>
            <p className="section-subtitle">
              Get an exclusive sneak peek of the biggest upcoming blockbusters arriving soon at BMX Cinemas.
            </p>
          </div>

          {/* Controls Row: Month Filters & Nav Arrows */}
          <div className="upcoming-controls-row">
            
            {/* Month Filter Tabs */}
            <div className="month-filter-wrapper">
              {dynamicMonthTabs.map((month) => (
                <button
                  key={month}
                  className={`month-btn ${month === activeMonth ? 'active' : ''}`}
                  onClick={() => {
                    setActiveMonth(month);
                    setActiveIndex(0);
                    if (trackRef.current) {
                      trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {month}
                </button>
              ))}
            </div>

            {/* Carousel Navigation Arrows */}
            <div className="carousel-nav-arrows">
              <button 
                className="arrow-btn" 
                onClick={handlePrev}
                aria-label="Previous Upcoming Movie"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button 
                className="arrow-btn" 
                onClick={handleNext}
                aria-label="Next Upcoming Movie"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>

          </div>
        </div>

        {/* Upcoming Cards Scroll Track */}
        <div 
          className="upcoming-cards-track"
          ref={trackRef}
          onScroll={handleScroll}
        >
          {filteredMovies.map((movie) => {
            const isActive = activeCardId === movie.id;

            return (
              <div 
                className={`upcoming-card ${isActive ? 'info-active' : ''}`}
                key={movie.id}
                onClick={() => handleCardClick(movie.id)}
              >
                <span className="coming-soon-badge">COMING SOON</span>

                <div className="card-poster-wrapper">
                  <img 
                    src={`/${movie.posterImage || movie.bgImage}`}
                    alt={movie.title}
                    className="card-poster-img"
                    loading="lazy"
                    onError={(e) => { e.target.src = `/${movie.bgImage}`; }}
                  />
                  <span className="poster-cert-badge">{movie.cert}</span>
                </div>

                <div className="card-info-bottom">
                  <h3 className="card-title">{movie.title}</h3>
                  <span className="card-subtitle">{movie.subtitle}</span>
                  <div className="release-date-tag">
                    <i className="fa-regular fa-calendar-days"></i> {movie.releaseDate}
                  </div>
                  <div className="card-meta">
                    {movie.genre} • {movie.duration}
                  </div>
                  <div className="card-actions">
                    <button 
                      className="btn-card-trailer"
                      style={{ width: '100%' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenTrailer) onOpenTrailer(movie.trailerUrl);
                      }}
                    >
                      <i className="fa-solid fa-play"></i> Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Always Append Empty Month Card */}
          <div className="empty-month-card">
            <div className="empty-card-icon">
              <i className="fa-solid fa-film"></i>
            </div>
            <h3 className="empty-card-title">More Films Dropping Soon</h3>
            <p className="empty-card-text">
              We are adding more blockbuster titles for {activeMonth}. Stay tuned for release dates!
            </p>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="carousel-pagination-dots">
          {Array.from({ length: totalItemsCount }).map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => {
                if (trackRef.current) {
                  const firstCard = trackRef.current.querySelector('.upcoming-card, .empty-month-card');
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

        {/* Bottom Notification Banner */}
        <div class="prebooking-banner reveal-on-scroll">
            <div class="banner-info">
                <span class="pulse-dot"></span>
                <span>Pre-booking opens 2 weeks before global release at all BMX Cinemas outlets (Koparkhairane • Kharghar • Ambernath).</span>
            </div>
        </div>

      </div>
    </section>
  );
}
