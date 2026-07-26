import React, { useState } from 'react';
import Navbar from '../components/home/Navbar';
import Landing from '../components/home/Landing';
import FeaturedSection from '../components/home/featuredSection';
import UpcomingSection from '../components/home/upcomingSection';
import TrailersSection from '../components/home/TrailersSection';
import ExperienceSection from '../components/home/experienceSection';
import Footer from '../components/common/Footer';
import TrailerModal from '../components/common/TrailerModal';

export default function Home() {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [activeTrailerUrl, setActiveTrailerUrl] = useState('');

  const handleOpenTrailer = (url) => {
    setActiveTrailerUrl(url);
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
    setActiveTrailerUrl('');
  };

  return (
    <div className="home-page">
      <Navbar activePage="home" />
      <main>
        <Landing onOpenTrailer={handleOpenTrailer} />
        <FeaturedSection onOpenTrailer={handleOpenTrailer} />
        <UpcomingSection onOpenTrailer={handleOpenTrailer} />
        <TrailersSection />
        <ExperienceSection />
      </main>

      {/* Common Reusable Footer */}
      <Footer />

      {/* Reusable Trailer Modal */}
      <TrailerModal 
        isOpen={isTrailerOpen} 
        trailerUrl={activeTrailerUrl} 
        onClose={handleCloseTrailer} 
      />
    </div>
  );
}
