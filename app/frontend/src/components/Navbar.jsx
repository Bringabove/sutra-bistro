import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0.6 * window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#top' },
    { name: 'Our Story', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -80, x: '-50%' }}
          animate={{ y: 0, x: '-50%' }}
          exit={{ y: -80, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          className="fixed top-4 left-1/2 z-[90] w-[min(96vw,1100px)] backdrop-blur-xl bg-white/45 border border-white/40 rounded-full shadow-[0_8px_32px_rgba(48,35,0,0.12)] px-6 md:px-8 py-3 flex items-center justify-between"
          data-testid="sticky-navbar"
        >
          {/* Left: Logo */}
          <a href="#top" className="w-32 md:w-36 -ml-2 md:-ml-4" data-testid="nav-logo">
            <img 
              src="/images/global/sutra-logo.png" 
              alt="Sutra Bistro Logo" 
              className="w-full h-auto object-contain transition-all duration-300"
              style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(85%) saturate(3048%) hue-rotate(355deg) brightness(87%) contrast(114%)' }} 
              width="144"
              height="40"
              loading="lazy"
            />
          </a>

          {/* Center: Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-heading text-xs uppercase tracking-widest text-sutra-deep hover:text-sutra-accent transition-colors"
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right: CTA */}
          <a
            href="#reserve"
            className="bg-sutra-deep text-sutra-base px-6 py-2 rounded-full font-heading text-xs uppercase tracking-widest hover:bg-sutra-accent hover:text-sutra-deep transition-all duration-300"
            data-testid="nav-reserve-btn"
          >
            Reservation
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
