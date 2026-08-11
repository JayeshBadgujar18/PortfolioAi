import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from './Reveal';
import './Skills.css';

const categories = {
  Languages: ["Java", "C++", "JavaScript", "TypeScript", "HTML5", "CSS3"],
  Frontend: ["React.js", "Redux Toolkit", "Vite", "Tailwind CSS", "Responsive UI Design"],
  "Backend & Systems": ["Spring Boot", "RESTful API Design", "H2/SQL Databases", "Multithreading & Concurrency", "Idempotent System Design", "Distributed Mesh Networking"],
  "AI & ML": ["Data Structures & Algorithms (HNSW, KD-Tree)", "Retrieval-Augmented Generation (RAG)", "Vector Databases", "Ollama (Local LLMs)", "Text Embeddings", "Similarity Search (Cosine, Euclidean, Manhattan)", "PCA Visualization"],
  Security: ["RSA-OAEP", "AES-256-GCM", "Hybrid Encryption", "Secure Distributed Messaging"],
  Tools: ["Git & GitHub", "Vercel", "REST API Testing", "Maven", "npm"]
};

const SkillItem = ({ skill }) => {
  // Simple 3D tilt effect on hover via framer-motion (without complex mouse tracking for performance)
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ 
        scale: 1.05, 
        rotateX: 5, 
        rotateY: 5,
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--accent-1)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="skill-item glass-card"
    >
      <span className="skill-text">{skill}</span>
    </motion.div>
  );
};

export const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <section id="skills" className="skills-section container">
      <Reveal>
        <div className="section-header">
          <span className="section-number">01 —</span>
          <h2 className="section-title">Technical Arsenal</h2>
        </div>
      </Reveal>
      
      <div className="skills-grid">
        {Object.entries(categories).map(([category, items], i) => (
          <Reveal key={category} delay={i * 0.1}>
            <div className="skill-category glass-card">
              <h3 className="category-title">{category}</h3>
              <motion.div 
                className="skill-items"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {items.map(skill => (
                  <SkillItem key={skill} skill={skill} />
                ))}
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
