import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  FolderKanban,
  Mail,
  MapPin,
  Sparkles,
  FileText,
  UserRound,
} from 'lucide-react';
import resumeData from '../data/resume.json';
import './Hero.css';

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const sections = {
    me: () => scrollToId('home'),
    projects: () => scrollToId('projects'),
    skills: () => scrollToId('skills'),
    contact: () => scrollToId('contact'),
    location: () => window.open('https://www.google.com/maps/search/Pune,+Maharashtra', '_blank', 'noopener,noreferrer'),
    resume: () => window.open('http://127.0.0.1:8000/Jayesh_Resume.pdf', '_blank', 'noopener,noreferrer'),
  };

  const quickButtons = [
    { label: 'Me', icon: UserRound, action: sections.me },
    { label: 'Projects', icon: FolderKanban, action: sections.projects },
    { label: 'Skills', icon: Code2, action: sections.skills },
    { label: 'Contact', icon: Mail, action: sections.contact },
    { label: 'Location', icon: MapPin, action: sections.location },
    { label: 'Resume', icon: FileText, action: sections.resume },
  ];

  function scrollToId(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      scrollToId('projects');
      return;
    }

    if (query.includes('me') || query.includes('about') || query.includes('profile')) {
      sections.me();
      return;
    }

    if (query.includes('project')) {
      sections.projects();
      return;
    }

    if (query.includes('skill') || query.includes('stack') || query.includes('tech')) {
      sections.skills();
      return;
    }

    if (query.includes('contact') || query.includes('email') || query.includes('hire')) {
      sections.contact();
      return;
    }

    if (query.includes('location') || query.includes('where')) {
      sections.location();
      return;
    }

    if (query.includes('resume') || query.includes('cv')) {
      sections.resume();
      return;
    }

    sections.projects();
  }

  return (
    <section id="home" className="hero-section container">
      <div className="hero-shell">
        <motion.div 
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hero-copy"
        >
         

          <h1 className="hero-title">{resumeData.name}</h1>
          <p className="hero-body">
            Clean systems, responsive interfaces, and practical AI workflows built with a calm, professional finish.
          </p>

          <div className="avatar-stage" aria-label="Cartoon avatar illustration">
            <div className="avatar-orbit orbit-pink" />
            <div className="avatar-orbit orbit-purple" />
            <div className="avatar-orbit orbit-orange" />
            <motion.div
              className="avatar-card"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg viewBox="0 0 320 320" className="avatar-svg" role="img" aria-hidden="true">
                <defs>
                  <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f8ef7" />
                    <stop offset="55%" stopColor="#b9a7ff" />
                    <stop offset="100%" stopColor="#f6a7c1" />
                  </linearGradient>
                  <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#312e81" />
                    <stop offset="100%" stopColor="#111827" />
                  </linearGradient>
                </defs>
                <rect x="44" y="42" width="232" height="236" rx="116" fill="rgba(255,255,255,0.92)" />
                <path d="M96 132c10-39 35-63 64-63s54 22 65 58c2 8-1 17-8 21l-10 6c-8 5-13 13-14 23l-2 19H108l-2-20c-1-10-6-18-14-22l-10-5c-7-4-10-13-6-21z" fill="url(#hairGradient)" />
                <circle cx="160" cy="158" r="56" fill="#f5d2bd" />
                <path d="M111 155c12-3 26-6 49-6s38 2 49 6c0 26-18 56-49 56s-49-30-49-56z" fill="#f6d4c0" opacity="0.6" />
                <circle cx="140" cy="158" r="5.5" fill="#0f172a" />
                <circle cx="180" cy="158" r="5.5" fill="#0f172a" />
                <path d="M150 174c4 5 16 5 20 0" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M102 231c11-30 36-46 58-46s46 16 58 46" fill="url(#shirtGradient)" />
                <path d="M124 200c11 11 28 17 36 17s25-6 36-17" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.7" fill="none" />
                <path d="M128 112c14-14 39-22 69-18" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" opacity="0.18" fill="none" />
                <circle cx="117" cy="173" r="8" fill="#f7b37d" opacity="0.28" />
                <circle cx="203" cy="173" r="8" fill="#f7b37d" opacity="0.28" />
              </svg>
            </motion.div>
          </div>

          <form className="search-shell" onSubmit={handleSearchSubmit}>
            <div className="search-label">Ask the portfolio</div>
            <div className="search-bar">
              <input
                className="search-input"
                type="text"
                placeholder="Ask me anything..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Ask me anything search"
              />
              <button className="search-button" type="submit" aria-label="Search portfolio">
                <ArrowRight size={20} />
              </button>
            </div>
          </form>

          <div className="button-grid" aria-label="Portfolio navigation buttons">
            {quickButtons.map((button) => {
              const ButtonIcon = button.icon;

              return (
                <motion.button
                  key={button.label}
                  type="button"
                  className="nav-tile"
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={button.action}
                >
                  <span className="nav-tile-label">{button.label}</span>
                  <ButtonIcon size={18} className="nav-tile-icon" />
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
