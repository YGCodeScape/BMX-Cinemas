import React, { useState, useRef } from 'react';
import { cineCafeDataSet, insideTheatreDataSet } from '../../data/experienceDataSet';
import '../../styles/experienceSection.css';

// Helper to clean image paths (removes leading ./ if present)
const formatImgUrl = (imgPath) => {
  if (!imgPath) return '';
  const cleanPath = imgPath.replace(/^\.\//, '');
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
};

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState('cafe');
  const [activeCardId, setActiveCardId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const handleCardClick = (id) => {
    setActiveCardId(prev => (prev === id ? null : id));
  };

  // Sync active dot on scroll
  const handleScroll = () => {
    if (!trackRef.current) return;
    const scrollPosition = trackRef.current.scrollLeft;
    const firstCard = trackRef.current.querySelector('.exp-card-cafe, .exp-card-theatre');
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 20;
    const index = Math.round(scrollPosition / cardWidth);
    setActiveIndex(index);
  };

  const cafeList = cineCafeDataSet || [];
  const theaterList = insideTheatreDataSet || [];
  const activeList = activeTab === 'cafe' ? cafeList : theaterList;

  return (
    <section className="bmx-experience-section" id="experience">
      <div className="section-container">
        
        {/* Section Header & Tab Navigation Bar */}
        <div className="experience-header-block">
          <div className="header-top-row">
            <div className="header-text-group">
              <span className="pill-badge">
                <span className="badge-dot"></span> VISUAL & TASTE JOURNEY
              </span>
              <h2 className="section-title">BMX Experience</h2>
              <p className="section-subtitle">
                Explore the premium ambiance of our Cine Cafe and state-of-the-art theater interiors.
              </p>
            </div>

            {/* Single Page 2-Tab Navigation Bar */}
            <div className="experience-tabs-bar">
              <button
                className={`exp-tab-btn ${activeTab === 'cafe' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('cafe');
                  setActiveCardId(null);
                  setActiveIndex(0);
                  if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }}
              >
                ☕ BMX CINE CAFE
              </button>
              <button
                className={`exp-tab-btn ${activeTab === 'theater' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('theater');
                  setActiveCardId(null);
                  setActiveIndex(0);
                  if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }}
              >
                🍿 INSIDE THEATER
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Cine Cafe Cards Track */}
        {activeTab === 'cafe' && (
          <div 
            className="experience-cards-track" 
            ref={trackRef}
            onScroll={handleScroll}
          >
            {cafeList.map((card) => {
              const isActive = activeCardId === card.id;

              return (
                <div 
                  key={card.id}
                  className={`exp-card-cafe ${isActive ? 'info-active' : ''}`}
                  onClick={() => handleCardClick(card.id)}
                >
                  {/* Background Image */}
                  <div 
                    className="exp-card-bg-image" 
                    style={{ backgroundImage: `url('${formatImgUrl(card.image)}')` }}
                  ></div>

                  {/* Top Badge */}
                  <span className={`exp-top-badge ${card.badgeGold ? 'exp-top-badge-gold' : ''}`}>
                    {card.badge}
                  </span>

                  {/* Bottom Info Card Overlay */}
                  <div className="exp-card-info-bottom">
                    <h3 className="exp-card-title">{card.title}</h3>
                    <p className="exp-card-desc">{card.description || card.desc}</p>
                    <div className="exp-feature-chips">
                      {(card.chips || card.features)?.map((chip, idx) => (
                        <span key={idx} className="exp-chip">{chip}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Inside Theater Cards Track */}
        {activeTab === 'theater' && (
          <div 
            className="experience-cards-track" 
            ref={trackRef}
            onScroll={handleScroll}
          >
            {theaterList.map((card) => (
              <div key={card.id} className="exp-card-theatre">
                
                {/* 70% Height Image Section */}
                <div className="exp-theatre-img-wrapper">
                  <div 
                    className="exp-card-bg-image" 
                    style={{ backgroundImage: `url('${formatImgUrl(card.image)}')` }}
                  ></div>
                  <span className={`exp-top-badge ${card.badgeGold ? 'exp-top-badge-gold' : ''}`}>
                    {card.badge}
                  </span>
                </div>

                {/* 30% Height Fixed Bottom Info Section */}
                <div className="exp-theatre-info-bottom">
                  <h3 className="exp-card-title">{card.title}</h3>
                  <p className="exp-card-desc">{card.description || card.desc}</p>
                  <div className="exp-feature-chips">
                    {(card.chips || card.features)?.map((chip, idx) => (
                      <span key={idx} className="exp-chip">{chip}</span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Pagination Dots */}
        <div className="carousel-pagination-dots">
          {activeList.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => {
                if (trackRef.current) {
                  const firstCard = trackRef.current.querySelector('.exp-card-cafe, .exp-card-theatre');
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
