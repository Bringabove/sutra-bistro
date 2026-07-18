import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Star, Clock, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';
import FadeIn from './FadeIn';



const LocationCard = ({ loc, idx, onOrderClick }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const isTemporarilyClosed = loc?.status?.toUpperCase() === "CLOSED";

  const nextImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % loc.images.length);
  };

  const prevImg = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((prev) => (prev - 1 + loc.images.length) % loc.images.length);
  };

  return (
    <div
      style={{ borderRadius: 'var(--theme-radius)' }}
      className={`group flex flex-col bg-sutra-base/5 rounded-theme overflow-hidden border border-sutra-deep/5 hover:border-sutra-accent/30 transition-all duration-500 shadow-sm hover:shadow-2xl relative ${isTemporarilyClosed ? 'opacity-70 grayscale-[0.8]' : ''}`}
    >
      {/* Image Carousel Container */}
      <div className={`h-64 relative overflow-hidden ${isTemporarilyClosed ? '' : 'group-hover:opacity-100'}`}>
        <div className="w-full h-full overflow-hidden relative">
          <motion.img 
            key={currentImg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            src={loc.images[currentImg]} 
            alt={loc.name} 
            className="w-full h-full object-cover" 
            loading="lazy"
            width={600}
            height={256}
            onError={(e) => {
              console.error("Asset fallback resolution triggered for branch image:", loc.images[currentImg]);
            }}
          />
        </div>
        
        {/* Status Badge - Floating Top Right */}
        <div className="absolute top-6 right-6 z-30 pointer-events-none">
          {loc.status?.toUpperCase() === "OPEN" ? (
            <div className="bg-green-600 text-white px-3 py-1.5 rounded-xl font-heading text-[7px] uppercase tracking-widest shadow-2xl border border-white/20 flex items-center gap-1.5 backdrop-blur-md">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Open Now
            </div>
          ) : (
            <div className="bg-red-600 text-white px-3 py-1.5 rounded-xl font-heading text-[7px] uppercase tracking-widest shadow-2xl border border-white/20 flex items-center gap-1.5 backdrop-blur-md">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
              {loc.status || "Closed"}
            </div>
          )}
        </div>

        {/* Carousel Controls */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity z-40 pointer-events-none">
          <button onClick={prevImg} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-sutra-accent hover:text-sutra-deep transition-all pointer-events-auto">
            <ChevronUp className="-rotate-90" size={16} />
          </button>
          <button onClick={nextImg} className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-sutra-accent hover:text-sutra-deep transition-all pointer-events-auto">
            <ChevronDown className="-rotate-90" size={16} />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {loc.images.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === currentImg ? 'w-4 bg-sutra-accent' : 'w-1 bg-white/40'}`} />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-sutra-deep/60 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10 pointer-events-none">
          {loc.rating && (
            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
              <Star size={14} className="text-sutra-accent fill-current" />
              <span className="text-white font-heading font-bold text-sm">{loc.rating}</span>
              {loc.reviews && <span className="text-white/60 font-heading text-[10px]">({loc.reviews})</span>}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="font-display text-3xl uppercase text-sutra-deep mb-4 group-hover:text-sutra-accent transition-colors">
          {loc.name}
        </h3>
        <div className="space-y-4 mb-10 flex-1">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-sutra-accent mt-1 shrink-0" />
            <p className="font-heading text-sm text-sutra-deep/60 leading-relaxed">{loc.address}</p>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-sutra-accent shrink-0" />
            <p className="font-heading text-xs uppercase tracking-widest text-sutra-deep/85 font-semibold">{loc.time}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-sutra-deep/5">
          <button 
            onClick={onOrderClick}
            className="group/btn relative px-4 py-4 bg-sutra-deep text-sutra-base rounded-theme font-heading font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 hover:bg-sutra-accent hover:text-sutra-deep transition-all duration-500 shadow-lg active:scale-95"
          >
            <span>Order</span>
            <div className="flex -space-x-2 group-hover/btn:-space-x-1 transition-all duration-500">
              <img src="/images/hero/icons/swiggy.png" className="w-5 h-5 object-contain rounded-full bg-white p-0.5 ring-1 ring-sutra-deep/10" alt="Swiggy Icon" width="20" height="20" loading="lazy" />
              <img src="/images/hero/icons/zomato.png" className="w-5 h-5 object-contain rounded-full bg-white p-0.5 ring-1 ring-sutra-deep/10" alt="Zomato Icon" width="20" height="20" loading="lazy" />
            </div>
          </button>

          <a 
            href={loc.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-4 border-2 border-sutra-deep text-sutra-deep rounded-theme font-heading font-bold uppercase tracking-widest text-[9px] hover:bg-sutra-deep hover:text-sutra-base transition-all duration-500 active:scale-95"
          >
            <span>Directions</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};

const RollingDigit = ({ digit, delay }) => {
  return (
    <div className="relative h-[1em] overflow-hidden inline-block leading-none">
      <motion.div
        initial={{ y: 0 }}
        whileInView={{ y: `-${parseInt(digit) * 10}%` }}
        viewport={{ once: true }}
        transition={{ 
          duration: 2, 
          delay: delay, 
          ease: [0.45, 0.05, 0.55, 0.95] 
        }}
        className="flex flex-col"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[1em] flex items-center justify-center">
            {n}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const SlotCounter = ({ value, suffix = "" }) => {
  const digits = value.toString().split("");
  return (
    <span className="inline-flex items-baseline">
      {digits.map((d, i) => (
        <RollingDigit key={i} digit={d} delay={i * 0.1} />
      ))}
      {suffix && <span className="ml-1">{suffix}</span>}
    </span>
  );
};

const NumberCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = parseInt(value);
          const duration = 2000;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

const AboutUs = ({ branches = [], onOrderClick }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const friesY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const friesRotate = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  // Map spreadsheet data to UI components with fallbacks
  const defaultLocations = [
    { name: "Vijay Nagar", address: "Kalidasa Rd, Vijayanagar 1st Stage, Vijayanagar, Mysuru, Karnataka 570017", time: "11AM - 11PM", status: "OPEN" },
    { name: "Siddharthanagar", address: "geetha school, 174, moksha marga, road, Mysuru, Karnataka 570011", time: "11AM - 11PM", status: "OPEN" }
  ];

  const displayBranches = branches && branches.length > 0 ? branches : defaultLocations;

  const locations = displayBranches.map((b, idx) => {
    const name = b.BranchName || b.name;
    const lowerName = name?.toLowerCase() || "";
    
    let branchImages = [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=srgb&fm=jpg&w=800&q=85"
    ];

    if (lowerName.includes("vijay")) {
      branchImages = [
        "/images/branches/vijayanagar/sutra-bistro-vijayanagar-1.webp",
        "/images/branches/vijayanagar/sutra-bistro-vijayanagar-2.png",
        "/images/branches/vijayanagar/sutra-bistro-vijayanagar-3.png"
      ];
    } else if (lowerName.includes("siddartha") || lowerName.includes("siddhartha")) {
      branchImages = [
        "/images/branches/siddartha-layout/sutra-bistro-siddartha-layout-1.png",
        "/images/branches/siddartha-layout/sutra-bistro-siddartha-layout-2.png",
        "/images/branches/siddartha-layout/sutra-bistro-siddartha-layout-3.png"
      ];
    } else if (lowerName.includes("mall")) {
      branchImages = [
        "/images/branches/mall-of-mysore/sutra-bistro-mall-of-mysore.png"
      ];
    }

    return {
      id: name?.toLowerCase().replace(/\s+/g, '-') || `branch-${idx}`,
      name: name,
      address: b.Address || b.address || "Mysuru, Karnataka",
      rating: b.Rating || b.rating || "",
      reviews: b.Reviews || b.reviews || "",
      time: b.Hours || b.OpHours || b.time || "Visit us to know more",
      status: b.Status || b.status || "OPEN",
      link: b.MapLink || b.MapsURL || b.link || "https://maps.google.com/?q=Sutra+Bistro+Mysuru",
      swiggy: b.SwiggyLink,
      zomato: b.ZomatoLink,
      googleReview: b.GoogleBusinessLink,
      images: branchImages
    };
  });

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="bg-white py-24 md:py-40 relative overflow-hidden -mt-14 md:-mt-18 z-10 rounded-theme shadow-md" 
      data-testid="about-section"
    >
      {/* Background Decorative Text */}
      <div className="absolute top-0 right-0 font-display text-[20vw] text-sutra-deep opacity-[0.02] pointer-events-none select-none -translate-y-1/2 translate-x-1/4">
        OUR STORY
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <FadeIn className="max-w-2xl">
            <div className="font-heading uppercase tracking-[0.4em] text-[10px] text-sutra-deep/80 mb-6 flex items-center gap-3 font-bold">
              <div className="w-8 h-[1px] bg-sutra-accent" />
              Who We Are
            </div>
            <h2 className="font-display text-[14vw] md:text-[8vw] leading-[0.85] text-sutra-deep uppercase mb-8">
              OUR <span className="text-sutra-accent">STORY.</span>
            </h2>
            <p className="font-body text-lg text-sutra-deep/70 leading-relaxed max-w-xl">
              From a single kitchen in Vijay Nagar to Mysuru's favorite pure-veg destination. 
              Sutra Bistro is where traditional flavors meet modern aesthetics. 
              Two branches, one soul.
            </p>
          </FadeIn>
          <div className="flex-1 hidden lg:flex flex-col items-end relative">
            {/* Parallax Fries Overlay in Header */}
            <div className="relative w-full flex justify-end pr-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-0"
              >
                <img 
                  src="/images/about-us/Sutra_French_Fries.webp" 
                  alt="Sutra French Fries" 
                  className="w-full max-w-[450px] h-auto drop-shadow-[0_20px_40px_rgba(48,35,0,0.05)] opacity-90"
                  loading="lazy"
                  width={800}
                  height={533}
                  onError={(e) => {
                    console.error("Asset fallback resolution triggered for Sutra_French_Fries.webp");
                  }}
                />
                <div className="absolute inset-0 bg-sutra-accent/10 blur-[120px] rounded-full -z-10 animate-pulse" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3-Column Content Grid: Cards + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
          {locations.map((loc, idx) => (
            <FadeIn key={loc.id || idx} delay={idx * 0.1}>
              <LocationCard loc={loc} idx={idx} onOrderClick={onOrderClick} />
            </FadeIn>
          ))}

          {/* Stats Counters in the 3rd slot */}
          <div className="grid grid-cols-2 md:flex md:flex-col gap-6 md:gap-10 text-center md:text-right px-4 md:px-0 md:pr-6 md:pb-6 items-center md:items-end justify-center">
            <div className="flex flex-col">
              <span className="font-display text-3xl md:text-7xl text-sutra-accent leading-none">
                <NumberCounter value="200" suffix="+" />
              </span>
              <span className="font-heading uppercase tracking-[0.3em] text-[9px] md:text-[10px] text-sutra-deep/80 mt-2 font-bold">
                Customers Daily
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-3xl md:text-7xl text-sutra-deep leading-none">
                20<SlotCounter value="16" />
              </span>
              <span className="font-heading uppercase tracking-[0.3em] text-[9px] md:text-[10px] text-sutra-deep/80 mt-2 font-bold">
                Established Since
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
