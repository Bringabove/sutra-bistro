import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { X, Utensils } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Hero = ({ data = [], settings = {}, branches = [], onOrderClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scrollYProgress = useSpring(rawScrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map settings data to slides, falling back to premium local assets
  const slides = [
    {
      id: 1,
      title: settings.Slide1_Line1 || "Crave Worthy",
      accent: settings.Slide1_Line2 || "Sutra Signature",
      subtitle: settings.Slide1_Tagline || "Mysuru's Ultimate Pure Veg Experience.",
      url: "/images/hero/carousel/slide-1.webp"
    },
    {
      id: 2,
      title: settings.Slide2_Line1 || "Hand Tossed",
      accent: settings.Slide2_Line2 || "Artisan Woodfired",
      subtitle: settings.Slide2_Tagline || "Authentic Wood-fired Pizzas.",
      url: "/images/hero/carousel/slide-2.webp"
    },
    {
      id: 3,
      title: settings.Slide3_Line1 || "Brewed Bold",
      accent: settings.Slide3_Line2 || "Filter Coffee",
      subtitle: settings.Slide3_Tagline || "The Soul of Morning Rituals.",
      url: "/images/hero/carousel/slide-3.webp"
    },
    {
      id: 4,
      title: settings.Slide4_Line1 || "Vibrant Vibes",
      accent: settings.Slide4_Line2 || "Heart Of Mysuru",
      subtitle: settings.Slide4_Tagline || "Where Every Meal Tells a Story.",
      url: "/images/hero/carousel/slide-4.webp"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Exit Animation Transforms (Optimized for smoothness)
  const exitScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const exitY = useTransform(scrollYProgress, [0, 0.4], [0, -200]);
  const exitBlur = useTransform(scrollYProgress, [0, 0.4], [0, 10]);
  // Parallax transforms for images
  const assetY1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const assetX1 = useTransform(scrollYProgress, [0, 0.4], [0, 1500]); // Fly right
  const assetRotate1 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  
  const assetY2 = useTransform(scrollYProgress, [0, 0.4], [0, 1500]); // Fly down
  const assetRotate2 = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const assetExitScale = useTransform(scrollYProgress, [0, 0.4], [1, 5]);
  const assetExitBlur = useTransform(scrollYProgress, [0, 0.4], [0, 5]);
  const assetExitOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 1]); // No opacity loss

  const assetBlurString = useTransform(assetExitBlur, (v) => `blur(${v}px)`);
  const blurString = useTransform(exitBlur, (v) => `blur(${v}px)`);

  // Text parallax
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const titleAnim = {
    initial: { y: "110%", skewY: 10 },
    animate: { y: 0, skewY: 0 },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <section 
      id="top"
      ref={containerRef}
      className="relative h-[110vh] bg-sutra-base overflow-hidden flex flex-col"
      data-testid="hero-section"
    >
      {/* Background Carousel (Cross-fade Optimized) */}
      <div className="absolute inset-0 z-0 bg-sutra-deep">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0 bg-sutra-deep"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sutra-deep/70 via-sutra-deep/30 to-sutra-deep/70 z-10" />
            <picture className="w-full h-full">
              <source srcSet={slides[currentSlide].url} type="image/webp" />
              <img 
                src={slides[currentSlide].url} 
                alt="Bistro Background" 
                className="w-full h-full object-cover"
                fetchPriority="high"
                loading="eager"
                width={1920}
                height={1080}
              />
            </picture>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative flex-1 flex flex-col z-10">
        {/* Top Mini-Bar */}
        <div className="px-6 md:px-12 pt-8 flex justify-between items-start z-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-32 md:w-40" 
            data-testid="hero-logo"
          >
            <picture className="w-full h-auto">
              <source srcSet="/images/global/sutra-logo.webp" type="image/webp" />
              <img 
                src="/images/global/sutra-logo.png" 
                alt="Sutra Bistro Logo" 
                className="w-full h-auto object-contain" 
                fetchPriority="high" 
                loading="eager" 
                width={160}
                height={44}
              />
            </picture>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-heading text-[10px] md:text-xs uppercase tracking-[0.3em] text-sutra-base/80 pt-2"
          >
            MYSURU {"·"} EST. 2016
          </motion.div>
        </div>

        {/* Hero Body */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 relative -mt-8 md:-mt-12">
          <motion.div style={{ y: titleY }} className="mb-8">
            <div className="overflow-hidden mb-4">
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-heading uppercase tracking-[0.5em] text-[10px] md:text-xs text-sutra-accent" 
                data-testid="hero-eyebrow"
              >
                Pure Veg {"·"} 100% Crave-Worthy
              </motion.div>
            </div>
            
            <h1 className="font-display text-[16vw] md:text-[9.5vw] leading-[0.78] text-sutra-base uppercase" data-testid="hero-title">
              <div className="overflow-hidden">
                <motion.span 
                  key={`title-${currentSlide}`}
                  {...titleAnim} 
                  className="block"
                >
                  {slides[currentSlide].title}
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  key={`sub-${currentSlide}`}
                  {...titleAnim} 
                  transition={{ ...titleAnim.transition, delay: 0.18 }}
                  className="block text-sutra-accent"
                >
                  {slides[currentSlide].accent}
                </motion.span>
              </div>
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between">
            <div className="max-w-xl">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="font-heading font-bold text-xl md:text-2xl mb-4 leading-tight text-sutra-base" 
                data-testid="hero-tagline"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              
              {/* Refined Buttons */}
              <div className="flex flex-wrap gap-4 mt-4">
                <a 
                  href="#menu"
                  className="group relative px-8 py-3.5 bg-sutra-accent text-sutra-deep font-heading font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                >
                  <Utensils size={14} className="relative z-10" />
                  <span className="relative z-10">View Menu</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
                <button 
                  onClick={onOrderClick}
                  className="group relative px-8 py-3.5 border border-sutra-base/30 text-sutra-base font-heading font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full overflow-hidden transition-all hover:scale-105 hover:bg-sutra-base hover:text-sutra-deep active:scale-95 flex items-center justify-center gap-3"
                >
                  <span className="relative z-10">Order Online</span>
                  <div className="flex -space-x-3 group-hover:-space-x-1 transition-all duration-500 relative z-10">
                    <img src="/images/hero/icons/swiggy.png" className="w-6 h-6 md:w-7 md:h-7 object-contain rounded-full bg-white p-1 ring-2 ring-sutra-deep/10" alt="Swiggy" width={28} height={28} />
                    <img src="/images/hero/icons/zomato.png" className="w-6 h-6 md:w-7 md:h-7 object-contain rounded-full bg-white p-1 ring-2 ring-sutra-deep/10" alt="Zomato" width={28} height={28} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repositioned Navigation (Compact Bottom Right) */}
      <motion.div 
        style={{ opacity: exitOpacity, y: useTransform(scrollYProgress, [0, 0.5], [0, 50]) }}
        className="absolute right-6 md:right-12 bottom-24 flex flex-col items-end gap-4 z-30"
      >
        <div className="w-[1px] h-8 bg-sutra-accent/30 mb-1 origin-bottom" />
        <div className="flex flex-col gap-3">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex items-center gap-3 group cursor-pointer justify-end" onClick={() => setCurrentSlide(index)}>
              <span className={`font-heading text-[9px] tracking-[0.2em] transition-all duration-500 ${currentSlide === index ? 'text-sutra-accent opacity-100 translate-x-0' : 'text-sutra-base/20 opacity-0 translate-x-4 group-hover:opacity-40'}`}>
                0{index + 1}
              </span>
              <div className={`transition-all duration-700 overflow-hidden rounded-theme border ${currentSlide === index ? 'border-sutra-accent w-16 h-10 scale-110 shadow-2xl' : 'border-white/10 w-10 h-7 opacity-30 group-hover:opacity-100'}`}>
                <picture className="w-full h-full">
                  <source srcSet={slide.url} type="image/webp" />
                  <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" width={64} height={40} />
                </picture>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Images (Optimized Exit + Continuous Hover) */}
      <motion.div 
        style={{ 
          x: assetX1,
          y: assetY1, 
          rotate: assetRotate1,
          scale: assetExitScale,
          opacity: assetExitOpacity,
          filter: assetBlurString
        }}
        className="absolute top-[18%] right-[5%] w-[28vw] md:w-[18vw] aspect-square pointer-events-none select-none z-10"
        data-testid="floating-png-pizza-slice"
      >
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-full h-full"
        >
          <picture className="w-full h-full">
            <source srcSet="/images/hero/—Pngtree—mouth-watering pepperoni pizza slice_20340457 (1).webp" type="image/webp" />
            <img 
              src="/images/hero/—Pngtree—mouth-watering pepperoni pizza slice_20340457 (1).png" 
              alt="Pizza Slice" 
              className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]" 
              fetchPriority="high" 
              loading="eager" 
              width={500}
              height={500}
            />
          </picture>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ 
          y: assetY2, 
          rotate: assetRotate2,
          scale: assetExitScale,
          opacity: assetExitOpacity,
          filter: assetBlurString
        }}
        className="absolute top-[35%] right-[35%] md:right-[45%] w-[40vw] md:w-[30vw] aspect-square pointer-events-none select-none z-10"
        data-testid="floating-png-mojito"
      >
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="w-full h-full"
        >
          <picture className="w-full h-full">
            <source srcSet="/images/hero/—Pngtree—classic mojito cocktail with rum_19931748 (1).webp" type="image/webp" />
            <img 
              src="/images/hero/—Pngtree—classic mojito cocktail with rum_19931748 (1).png" 
              alt="Mojito Cocktail" 
              className="w-full h-full object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.7)]" 
              fetchPriority="high" 
              loading="eager" 
              width={500}
              height={500}
            />
          </picture>
        </motion.div>
      </motion.div>

      {/* Scroll Cue */}
      <motion.div 
        style={{ opacity: exitOpacity, y: useTransform(scrollYProgress, [0, 0.2], [0, 50]) }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <span className="font-heading uppercase tracking-[0.4em] text-[10px] text-sutra-base/40">EXPLORE SUTRA</span>
        <div className="w-[1px] h-12 bg-sutra-base/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-0 bg-sutra-accent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
