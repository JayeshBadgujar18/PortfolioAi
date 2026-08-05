import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import resumeData from '../data/resume.json';
import './Hero.css';

export const Hero = () => {
  const roles = ["Full-Stack Developer", "Backend Engineer", "Software Engineer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="home" className="hero-section container">
      <div className="hero-content">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="blob-container"
        >
          <div className="hero-blob" />
        </motion.div>
        
        <motion.h4 
          className="greeting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Hello, I'm
        </motion.h4>
        
        <motion.h1 
          className="name text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {resumeData.name}
        </motion.h1>

        <div className="role-container">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentRoleIndex}
              className="role"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {roles[currentRoleIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.p 
          className="bio"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          I specialize in building scalable, secure backend systems and dynamic frontend applications. Let's build something extraordinary together.
        </motion.p>

        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.button 
            whileHover={{ scale: 1.04, filter: "brightness(1.2)" }}
            whileTap={{ scale: 0.96 }}
            className="cta-primary"
          >
            Explore My Work
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
