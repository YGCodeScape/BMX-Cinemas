import React, { useState } from 'react';
import { movieDataSet } from '../../data/movieDataSet';
import '../../styles/trailersSection.css';

export default function TrailersSection() {
  const [activeTrailerIndex, setActiveTrailerIndex] = useState(0);
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  const currentMovie = movieDataSet[activeTrailerIndex] || movieDataSet[0];

  const handleSelectTrailer = (index) => {
    setActiveTrailerIndex(index);
  };

  const handlePlayInline = () => {
    setIsPlayingInline(true);
  };

  const handleCloseInline = () => {
    setIsPlayingInline(false);
  };

  return (
    <section className="cinematic-trailers-section" id="trailers">
      <div className="section-container">
        
        {/* Header Row */}
        <div className="trailers-header-row">
          <div className="header-text-group">
            <span className="section-label-pink">OFFICIAL TRAILERS</span>
            <h2 className="section-title">CINEMATIC EXPERIENCE</h2>
            <div className="trailers-sub-badges">
              <span className="pill-badge">
                <i className="fa-solid fa-volume-high"></i> Dolby Atmos Preview
              </span>
              <span className="sub-text-muted">• BMX Cinemas Exclusive Showcase</span>
            </div>
          </div>
        </div>

        {/* Showcase Grid (Left: Main Player, Right: Playlist Sidebar) */}
        <div className="trailers-showcase-grid">
          
          {/* Main Video Player Card */}
          <div className="main-trailer-player-card" id="mainTrailerPlayerCard">
            
            {/* Background Image & Overlay */}
            <div 
              className="player-bg-image" 
              id="playerBgImage"
              style={{ backgroundImage: `url('/${currentMovie.bgImage}')` }}
            ></div>
            <div className="player-overlay-vignette"></div>

            {/* Giant Circular Play Button */}
            {!isPlayingInline && (
              <button 
                className="player-play-btn" 
                id="mainPlayerPlayBtn"
                onClick={handlePlayInline}
                aria-label="Play Trailer"
              >
                <i className="fa-solid fa-play"></i>
              </button>
            )}

            {/* Inline Video Player Iframe */}
            {isPlayingInline && (
              <div className="player-iframe-wrapper" id="playerIframeWrapper">
                <button 
                  className="close-inline-player-btn" 
                  id="closeInlinePlayerBtn"
                  onClick={handleCloseInline}
                  aria-label="Close Video Player"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <iframe
                  id="mainPlayerIframe"
                  src={`${currentMovie.trailerUrl}?autoplay=1`}
                  title={`${currentMovie.title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Bottom Badges */}
            <div className="player-bottom-badges">
              <span className="badge-now-showing">NOW SHOWING</span>
              <span className="badge-cert-chip" id="playerCertChip">{currentMovie.cert}</span>
            </div>

          </div>

          {/* Playlist Sidebar */}
          <aside className="trailers-playlist-sidebar">
            <div className="playlist-header">
              <i className="fa-solid fa-bars-staggered"></i> SELECT MOVIE TRAILER
            </div>

            <div className="playlist-cards-wrapper" id="playlistCardsWrapper">
              {movieDataSet.map((movie, idx) => {
                const isActive = idx === activeTrailerIndex;

                return (
                  <div 
                    key={movie.id || idx}
                    className={`playlist-mini-card ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectTrailer(idx)}
                  >
                    <div className="mini-thumb-wrapper">
                      <img 
                        src={`/${movie.bgImage}`} 
                        alt={movie.title} 
                        className="mini-thumb-img"
                        width="120"
                        height="70"
                        loading="lazy"
                        onError={(e) => { e.target.src = `/${movie.bgImage}`; }}
                      />
                      <div className="mini-play-icon">
                        <i className="fa-solid fa-play"></i>
                      </div>
                    </div>

                    <div className="mini-card-info">
                      <h4 className="mini-title">{movie.title}</h4>
                      <span className="mini-genre">{movie.genre.split(' / ')[0]}</span>
                      <span className="mini-runtime">
                        <i className="fa-regular fa-clock"></i> {movie.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

        </div>

      </div>
    </section>
  );
}
