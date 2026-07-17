import React from 'react';
import { motion } from 'framer-motion';

export const FadeIn = ({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  y = 50, 
  x = 0,
  scale = 0.95, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay,
        duration
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
