import React, { useState } from 'react';
import Navbar from '../components/home/Navbar';
import Footer from '../components/common/Footer';
import { faqCategories, faqDataSet } from '../data/faqsDataSet';
import '../styles/faqs.css';

export default function Faqs() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaqId(prevId => (prevId === id ? null : id));
  };

  const filteredFaqs = activeCategory === 'all'
    ? faqDataSet
    : faqDataSet.filter(item => item.category === activeCategory);

  return (
    <div className="faqs-page-container">
      {/* Shared Header Navigation */}
      <Navbar activePage="faqs" />

      <main>
        <section className="faqs-hero-section">
          <div className="section-container">
            
            {/* Page Header */}
            <div className="faqs-header-text">
              <span className="faqs-badge">
                <i className="fa-solid fa-circle-question"></i> GOT QUESTIONS?
              </span>
              <h1 className="faqs-title">Frequently Asked Questions</h1>
              <p className="faqs-subtitle">
                Find quick answers to common questions about ticket bookings, cinema amenities, outlets, and corporate events.
              </p>
            </div>

            {/* Category Filter Pills Bar */}
            <div className="faqs-filter-bar">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`faq-cat-btn ${cat.id === activeCategory ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenFaqId(null);
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* FAQ Interactive Accordion List */}
            <div className="faqs-accordion-list">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <div 
                    key={faq.id} 
                    className={`faq-card ${isOpen ? 'open' : ''}`}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    {/* Question Row */}
                    <div className="faq-question-row">
                      <h3 className="faq-question-text">{faq.question}</h3>
                      <i className="fa-solid fa-chevron-down faq-chevron"></i>
                    </div>

                    {/* Sliding Answer Content Box */}
                    <div className="faq-answer-wrapper">
                      <div className="faq-answer-content">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Help Card Banner */}
            <div className="faqs-help-card">
              <div className="help-text-block">
                <h3 className="help-title">Still Have Questions?</h3>
                <p className="help-desc">
                  Can't find the answer you're looking for? Reach out to our customer support team directly.
                </p>
              </div>

              <a href="/contact" className="btn-help-contact">
                <i className="fa-solid fa-headset"></i> Contact Support
              </a>
            </div>

          </div>
        </section>
      </main>

      {/* Shared Reusable Footer */}
      <Footer />
    </div>
  );
}
