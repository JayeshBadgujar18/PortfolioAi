import React from 'react';
import { motion, useInView } from 'framer-motion';

export const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], // --ease-premium
        delay: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
