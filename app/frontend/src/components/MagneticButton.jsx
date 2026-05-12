import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MagneticButton = ({ children, className = "", as: Component = "button", ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 15, mass: 0.4 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    
    x.set((clientX - cx) * 0.35);
    y.set((clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Component 
        className={`relative overflow-hidden ${className}`} 
        {...props}
      >
        <motion.span 
          className="relative z-10 block"
          style={{ x: springX, y: springY }}
        >
          {children}
        </motion.span>
      </Component>
    </motion.div>
  );
};

export default MagneticButton;
