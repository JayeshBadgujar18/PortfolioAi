import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import './Navbar.css';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
  ];

  const scrollTo = (id) => {
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'glass-nav' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-content container">
        <div className="logo text-gradient">JB.</div>
        
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button 
                onClick={() => scrollTo(item.id)}
                className={`nav-btn ${active === item.id ? 'active' : ''}`}
              >
                {item.label}
                {active === item.id && (
                  <motion.div 
                    layoutId="nav-indicator" 
                    className="nav-indicator" 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="social-links">
          <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="social-btn">
            <GithubIcon size={20} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.1, y: -2 }} href="#" className="social-btn">
            <LinkedinIcon size={20} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.1, y: -2 }} href="/Jayesh_Resume.pdf" className="social-btn" download>
            <FileText size={20} />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};
