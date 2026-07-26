import React, { useEffect } from 'react';
import '../../styles/trailerModal.css';

export default function TrailerModal({ isOpen, trailerUrl, onClose }) {
  // Listen for ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Format autoplay URL
  const formattedUrl = trailerUrl 
    ? (trailerUrl.includes('?') ? `${trailerUrl}&autoplay=1` : `${trailerUrl}?autoplay=1`)
    : '';

  return (
    <div 
      className={`modal-backdrop ${isOpen ? 'active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-content">
        <button 
          className="modal-close" 
          aria-label="Close Trailer Modal"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="video-container">
          <iframe
            src={formattedUrl}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
