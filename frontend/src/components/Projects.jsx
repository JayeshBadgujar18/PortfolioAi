import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { Reveal } from './Reveal';
import resumeData from '../data/resume.json';
import './Projects.css';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      className="project-card glass-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        
        <div className="project-links">
          <motion.a 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href={project.github || "#"} 
            className="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon size={20} />
          </motion.a>
          {project.live && (
            <motion.a 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={project.live} 
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={20} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="projects-section container">
      <Reveal>
        <div className="section-header">
          <span className="section-number">02 —</span>
          <h2 className="section-title">Featured Work</h2>
        </div>
      </Reveal>

      <div className="projects-grid">
        {resumeData.projects.map((project, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};
