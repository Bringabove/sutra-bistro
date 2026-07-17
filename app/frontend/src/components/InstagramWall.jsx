import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram as Instagram } from 'react-icons/fi';
import MagneticButton from './MagneticButton';
import FadeIn from './FadeIn';

const InstagramWall = () => {
  const images = [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=srgb&fm=jpg&w=900&q=85",
    "https://images.unsplash.com/photo-1696487773677-c0c8061fe3d2?crop=entropy&cs=srgb&fm=jpg&w=800&q=85",
    "https://images.unsplash.com/photo-1708782343717-be4ea260249a?crop=entropy&cs=srgb&fm=jpg&w=600&q=85",
    "https://images.unsplash.com/photo-1615653633551-25dd80d2765a?crop=entropy&cs=srgb&fm=jpg&w=600&q=85",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?crop=entropy&cs=srgb&fm=jpg&w=600&q=80",
    "https://images.unsplash.com/photo-1703473751398-789a58f27c3f?crop=entropy&cs=srgb&fm=jpg&w=900&q=85",
  ];

  return (
    <section id="vibe" className="bg-white py-24 md:py-40 relative overflow-hidden rounded-theme shadow-md" data-testid="instagram-section">
      {/* Background Hashtag */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[22vw] text-sutra-deep opacity-[0.03] pointer-events-none select-none whitespace-nowrap z-0">
        #SUTRABISTRO
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-sutra-accent/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-sutra-accent/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <FadeIn className="max-w-2xl">
            <div className="font-heading uppercase tracking-[0.4em] text-[10px] text-sutra-accent mb-6 flex items-center gap-3">
              <div className="w-8 h-[1px] bg-sutra-accent" />
              Social Proof {"·"} @sutrabistro
            </div>
            <h2 className="font-display text-[14vw] md:text-[8vw] leading-[0.85] text-sutra-deep uppercase mb-6" data-testid="instagram-heading">
              CATCH THE <br /><span className="text-sutra-accent">VIBE.</span>
            </h2>
            <p className="font-heading text-sutra-deep/60 text-sm md:text-base uppercase tracking-widest leading-relaxed">
              Tag us <span className="text-sutra-deep font-bold">@sutrabistro</span> to get featured and also use <span className="text-sutra-deep font-bold">#sutrabistro</span>
            </p>
          </FadeIn>

          <motion.a
            href="https://www.instagram.com/sutrabistro/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-sutra-deep text-sutra-base px-10 py-4 rounded-full font-heading uppercase tracking-widest text-xs flex items-center gap-3 transition-colors hover:bg-sutra-accent hover:text-sutra-deep"
            data-testid="instagram-follow-btn"
          >
            <Instagram size={16} />
            Follow on Instagram
          </motion.a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4">
          {/* First 3 images */}
          {images.slice(0, 3).map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className="rounded-theme overflow-hidden ring-1 ring-sutra-accent/30 group"
              data-testid={`ig-tile-${idx}`}
            >
              <img 
                src={img} 
                alt="Vibe" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </motion.div>
          ))}

          {/* Iframe Center */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="row-span-2 col-span-2 lg:col-span-2 rounded-theme overflow-hidden ring-2 ring-sutra-accent bg-sutra-base/10"
            data-testid="ig-embed-wrap"
          >
            <iframe 
              src="https://www.instagram.com/sutrabistro/embed/" 
              className="w-full h-full min-h-[420px]"
              frameBorder="0" 
              scrolling="no" 
              allow="encrypted-media"
              title="Instagram Feed"
            />
          </motion.div>

          {/* Next 3 images */}
          {images.slice(3, 6).map((img, idx) => (
            <motion.div
              key={idx + 3}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: (idx + 4) * 0.08 }}
              className="rounded-theme overflow-hidden ring-1 ring-sutra-accent/30 group"
              data-testid={`ig-tile-b-${idx}`}
            >
              <img 
                src={img} 
                alt="Vibe" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramWall;
