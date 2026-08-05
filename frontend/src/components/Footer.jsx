import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import resumeData from '../data/resume.json';

export const Footer = () => {
  return (
    <footer style={{ 
      padding: '2rem 0', 
      marginTop: '4rem',
      borderTop: '1px solid var(--border-glass)',
      background: 'rgba(0,0,0,0.2)'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" className="social-btn"><GithubIcon size={20} /></a>
          <a href="#" className="social-btn"><LinkedinIcon size={20} /></a>
          <a href={`mailto:${resumeData.email || 'badgujarjayesh2003@gmail.com'}`} className="social-btn"><Mail size={20} /></a>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Built with React & FastAPI • Designed with precision
        </p>
      </div>
    </footer>
  );
};
