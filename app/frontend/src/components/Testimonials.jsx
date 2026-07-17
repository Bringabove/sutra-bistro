import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, ExternalLink, Quote, X, Maximize2 } from 'lucide-react';
import FadeIn from './FadeIn';

const branchLinks = [
  { id: "vjn", name: "Vijay Nagar", short: "01", url: "https://g.page/sutra-vjn/review", image: "/images/branches/vijayanagar/sutra-bistro-vijayanagar-1.png" },
  { id: "sid", name: "Siddharthanagar", short: "02", url: "https://g.page/sutra-sid/review", image: "/images/branches/siddartha-layout/sutra-bistro-siddartha-layout-1.png" }
];

const testimonialsRow1 = [
  { name: "Ananya Rao", content: "The best Filter Coffee in Mysuru, hands down. The ambiance is simply electric!" },
  { name: "Vikram Singh", content: "Sutra Bistro is my go-to for Punjabi Paratas. The Paneer Cheese Parata is a masterpiece." },
  { name: "Sneha Kapoor", content: "I love the new search feature on the menu! It makes ordering so much easier." },
  { name: "Rahul Deshmukh", content: "Pure veg heaven. The Hazelnut Frappe is a must-try for everyone." },
];

const testimonialsRow2 = [
  { name: "Priya Nair", content: "The staff is so courteous. Mall of Mysore branch has the best service." },
  { name: "Arjun Mehta", content: "Quality and taste are consistent across all three branches. Incredible work." },
  { name: "Meera Iyer", content: "Authentic North Indian flavors in the heart of Mysuru. Loved the Daabeli." },
  { name: "Siddharth Jain", content: "Minimalist design, maximum flavor. Sutra is truly Mysore's pride." },
];

const TestimonialCard = ({ name, content, rating = 5 }) => (
  <div className="mx-4 p-10 bg-white/40 backdrop-blur-md rounded-theme border border-sutra-deep/5 w-[320px] md:w-[480px] flex flex-col justify-between h-full group hover:bg-white/60 transition-all duration-700">
    <div className="relative">
      {/* Decorative Quote Icon - Top Right, Brand Brown Filled */}
      <Quote className="absolute -top-6 -right-6 w-16 h-16 text-sutra-deep/10 fill-current -z-10 scale-x-[-1]" />
      
      <div className="flex gap-1 text-sutra-accent mb-8">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            fill={i < Math.round(Number(rating)) ? "currentColor" : "none"} 
            className={i < Math.round(Number(rating)) ? "text-sutra-accent" : "text-sutra-accent/20"}
          />
        ))}
      </div>
      
      {content ? (
        <p className="font-heading italic text-sutra-deep/90 text-base md:text-xl mb-10 leading-[1.7] relative">
          {content}
        </p>
      ) : (
        <p className="font-heading italic text-sutra-deep/40 text-sm md:text-base mb-10 leading-relaxed">
          (No review text provided)
        </p>
      )}
    </div>
    
    <div className="flex items-center gap-4 pt-8 border-t border-sutra-deep/5">
      <div className="w-10 h-10 rounded-full bg-sutra-deep text-sutra-base flex items-center justify-center font-display text-xs">
        {name ? name.charAt(0) : "S"}
      </div>
      <div>
        <p className="font-display text-xs uppercase tracking-[0.2em] text-sutra-deep leading-none font-bold">{name || "Anonymous"}</p>
        <span className="font-heading text-[9px] uppercase tracking-widest text-sutra-accent/60 mt-1 block">Verified Guest</span>
      </div>
    </div>
  </div>
);

const VideoCard = ({ url, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="my-4 mx-2 w-full aspect-[9/16] rounded-theme overflow-hidden bg-sutra-deep/5 border border-sutra-deep/10 shadow-lg group relative cursor-pointer"
    >
      <video 
        src={url}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      
      {/* Play Overlay */}
      <div className="absolute inset-0 bg-sutra-deep/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
        <div className="w-16 h-16 rounded-full bg-sutra-accent text-sutra-deep flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
          <Maximize2 className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

const VideoPopup = ({ isOpen, onClose, videos, initialVideo }) => {
  const [activeVideo, setActiveVideo] = useState(initialVideo);

  useEffect(() => {
    if (initialVideo) setActiveVideo(initialVideo);
  }, [initialVideo]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-sutra-deep/95 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-fit max-w-[95vw] h-[85vh] bg-sutra-base rounded-theme overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              aria-label="Close Video Player"
              className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-sutra-accent rounded-full text-white hover:text-sutra-deep transition-all"
            >
              <X size={24} />
            </button>

            {/* Main Player Area - Compact & Rounded */}
            <div className="flex-1 bg-black/5 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
              <video
                src={activeVideo}
                autoPlay
                controls
                className="h-full w-auto max-w-full object-contain rounded-theme shadow-2xl border border-white/5"
              />
            </div>

            {/* Sidebar: More Videos - On the right */}
            <div className="w-full md:w-72 bg-sutra-deep p-6 overflow-y-auto no-scrollbar border-l border-white/5 flex flex-col">
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-sutra-accent/60 mb-6 font-bold">Experience More</p>
              <div className="flex flex-col gap-4">
                {videos.map((url, idx) => {
                  const id = url.includes('/reel/') ? (url.split('/reel/')[1]?.split(/[/?]/)[0]) : idx;
                  const thumb = url.includes('cloudinary') ? url.replace('.mp4', '.jpg') : `https://www.instagram.com/reel/${id}/media/?size=l`;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveVideo(url)}
                      className={`relative aspect-[9/16] w-full rounded-theme overflow-hidden border-2 transition-all flex-shrink-0 ${activeVideo === url ? 'border-sutra-accent scale-95 shadow-lg shadow-sutra-accent/20' : 'border-transparent opacity-40 hover:opacity-100 hover:scale-105'}`}
                    >
                      <video
                        src={url}
                        muted
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-transparent" />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Testimonials = ({ testimonials = [], branches = [] }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fallback branch links if sheet is empty
  const defaultBranchLinks = [
    { id: "vjn", name: "Vijay Nagar", short: "01", url: "https://g.page/sutra-vjn/review", image: "/images/branches/vijayanagar/sutra-bistro-vijayanagar-1.png" },
    { id: "sid", name: "Siddharthanagar", short: "02", url: "https://g.page/sutra-sid/review", image: "/images/branches/siddartha-layout/sutra-bistro-siddartha-layout-1.png" }
  ];

  const displayBranchLinks = branches && branches.length > 0 ? branches.map(b => {
    const name = b.BranchName || b.name;
    const lowerName = name?.toLowerCase() || "";
    let branchImage = "/images/global/sutra-logo.png"; // Fallback

    if (lowerName.includes("vijay")) {
      branchImage = "/images/branches/vijayanagar/sutra-bistro-vijayanagar-1.png";
    } else if (lowerName.includes("siddartha") || lowerName.includes("siddhartha")) {
      branchImage = "/images/branches/siddartha-layout/sutra-bistro-siddartha-layout-1.png";
    }

    return {
      id: name?.toLowerCase().replace(/\s+/g, '-'),
      name: name,
      url: b.GoogleBusinessLink || b.GoogleReviewLink || b.ReviewURL || b.url || "#",
      image: branchImage
    };
  }) : defaultBranchLinks;

  const [selectedBranch, setSelectedBranch] = useState(() => {
    const initialLinks = branches && branches.length > 0 ? branches : defaultBranchLinks;
    const vijay = initialLinks.find(b => (b.BranchName || b.name || "").toLowerCase().includes("vijay"));
    if (vijay) {
      const name = vijay.BranchName || vijay.name;
      let branchImage = "/images/branches/vijayanagar/sutra-bistro-vijayanagar-1.png";
      return {
        id: name?.toLowerCase().replace(/\s+/g, '-'),
        name: name,
        url: vijay.GoogleBusinessLink || vijay.GoogleReviewLink || vijay.ReviewURL || vijay.url || "#",
        image: branchImage
      };
    }
    return defaultBranchLinks[0];
  });

  useEffect(() => {
    if (displayBranchLinks && displayBranchLinks.length > 0) {
      const vijayNagarBranch = displayBranchLinks.find(b => b.name?.toLowerCase().includes("vijay"));
      if (vijayNagarBranch) {
        setSelectedBranch(vijayNagarBranch);
      } else {
        setSelectedBranch(displayBranchLinks[0]);
      }
    }
  }, [branches]);

  // Split testimonials into text and video
  const defaultTestimonials = [
    { name: "Ananya Rao", content: "The best Filter Coffee in Mysuru, hands down. The ambiance is simply electric!", rating: 5 },
    { name: "Vikram Singh", content: "Sutra Bistro is my go-to for Punjabi Paratas. The Paneer Cheese Parata is a masterpiece.", rating: 5 },
    { name: "Sneha Kapoor", content: "I love the new search feature on the menu! It makes ordering so much easier.", rating: 5 },
    { name: "Rahul Deshmukh", content: "Pure veg heaven. The Hazelnut Frappe is a must-try for everyone.", rating: 4 },
    { name: "Priya Nair", content: "The staff is so courteous. Mall of Mysore branch has the best service.", rating: 5 }
  ];

  const defaultVideos = [
    "https://res.cloudinary.com/dncekwbbo/video/upload/v1778066204/AQPjpJQiEb3Fxz-A0oKOA-8uSH88dJh4wjSCZp9Jk50YUF-adQ1iSBt9BSxN1DCfFxD6jpxZOXxLnuJvzBOjQurQszxOJvXR_uk3rfw.mp4",
    "https://res.cloudinary.com/dncekwbbo/video/upload/v1778066202/Flea_Market_-_28th_and_29th_July_-_3pm_to_8pm_We_re_thrilled_to_invite_you_all_to_Sutra_s_first_bru2of.mp4",
    "https://res.cloudinary.com/dncekwbbo/video/upload/v1778066193/Join_us_on_the_11th_of_Nov_at_6pm_sutra_sutrabistro_sutraevents_speakyourheartout_blond_yuwc7e.mp4",
    "https://res.cloudinary.com/dncekwbbo/video/upload/v1778066183/Your_support_and_reviews_mean_everything_they_push_us_to_do_our_best_daily._sutrabistro_sutram_sysumv.mp4",
    "https://res.cloudinary.com/dncekwbbo/video/upload/v1778066175/Spend_a_day_with_me_in_Mysore_Day_3_Today_was_all_about_good_food_calm_vibes_and_a_peacef_nwak60.mp4"
  ];

  const finalTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;
  const displayVideos = defaultVideos; // Always use these as requested

  const openVideo = (url) => {
    setSelectedVideo(url);
    setIsPopupOpen(true);
  };

  return (
    <section id="reviews" className="bg-sutra-base py-24 md:py-40 relative overflow-hidden rounded-theme shadow-md" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <FadeIn className="max-w-2xl">
          <div className="font-heading uppercase tracking-[0.4em] text-[10px] text-sutra-accent mb-6 flex items-center gap-3">
            <div className="w-8 h-[1px] bg-sutra-accent" />
            Voices of Sutra
          </div>
          <h2 className="font-display text-[14vw] md:text-[8vw] leading-[0.85] text-sutra-deep uppercase">
            <span className="block">WHAT OUR</span>
            <span className="block text-sutra-accent">GUESTS SAY.</span>
          </h2>
        </FadeIn>
      </div>

      {/* Stacked Horizontal Marquees */}
      <div className="space-y-12 mb-32">
        
        {/* Row 1: Text Testimonials */}
        <div className="relative flex flex-col justify-stretch">
          <Marquee gradient={false} speed={40} pauseOnHover={true}>
            {finalTestimonials.map((t, i) => (
              <TestimonialCard 
                key={i} 
                name={t.Name || t.name || "Happy Guest"} 
                content={t.Content || t.content || t.Review || t.review || t.Testimonial || t.testimonial || t.ReviewText || t.reviewtext} 
                rating={t.RatingScore || t.Rating || t.rating || t.Stars || t.stars || t.Score || t.score || 5}
              />
            ))}
          </Marquee>
          {/* Side Fades for Row 1 */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-sutra-base to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-sutra-base to-transparent z-10 pointer-events-none" />
        </div>

        {/* Row 2: Video Reels (Horizontal Scroll) */}
        <div className="relative flex flex-col justify-stretch">
          <Marquee gradient={false} speed={30} direction="right" pauseOnHover={true}>
            {displayVideos.map((url, i) => (
              <div key={i} className="w-[200px] md:w-[320px] mx-4 md:mx-10">
                <VideoCard url={url} onClick={() => openVideo(url)} />
              </div>
            ))}
          </Marquee>
          {/* Side Fades for Row 2 */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-sutra-base to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-sutra-base to-transparent z-10 pointer-events-none" />
        </div>
      </div>

      {/* Review CTA Box */}
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-sutra-deep rounded-theme text-left shadow-2xl relative overflow-hidden flex flex-col lg:flex-row"
        >
          {/* Left Side: Content */}
          <div className="p-10 md:p-16 lg:p-20 flex-1 relative z-10">
            <h3 className="font-display text-4xl md:text-6xl text-sutra-base uppercase mb-6">Love our <br />food?</h3>
            <p className="font-heading text-sutra-base/60 text-sm md:text-base uppercase tracking-widest mb-12 max-w-sm">
              Share your experience on Google and help us grow.
            </p>

            <div className="space-y-10">
              <div className="flex flex-col gap-6">
                <span className="font-heading text-[10px] uppercase tracking-widest text-sutra-accent/60">Choose Branch</span>
                <div className="flex flex-wrap gap-4">
                  {displayBranchLinks.map((branch, idx) => (
                    <button
                      key={branch.id || idx}
                      onClick={() => setSelectedBranch(branch)}
                      className={`px-6 py-3 rounded-theme font-display text-sm uppercase tracking-wider flex items-center justify-center transition-all duration-500 border ${selectedBranch?.id === branch.id ? 'bg-sutra-accent text-sutra-deep border-sutra-accent shadow-lg' : 'bg-white/5 text-sutra-base/40 border-white/10 hover:border-sutra-accent/50'}`}
                    >
                      {branch.name}
                    </button>
                  ))}
                </div>
              </div>

              <motion.a
                href={selectedBranch?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 bg-sutra-base text-sutra-deep px-12 py-5 rounded-theme font-heading uppercase tracking-[0.2em] text-xs font-bold shadow-xl hover:bg-sutra-accent transition-all duration-500"
              >
                Review on Google
                <ExternalLink size={14} />
              </motion.a>
            </div>
          </div>

          {/* Right Side: Dynamic Image */}
          <div className="lg:w-2/5 min-h-[300px] lg:min-h-full relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedBranch?.id || 'default'}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                src={selectedBranch?.image || "/images/global/sutra-logo.png"} 
                alt={selectedBranch?.name || "Sutra Bistro"}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                width="480"
                height="600"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r lg:bg-gradient-to-t from-sutra-deep/60 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <span className="font-display text-xs text-sutra-accent uppercase tracking-[0.4em]">Current Selection</span>
              <p className="font-display text-2xl text-white uppercase tracking-tighter mt-2">{selectedBranch?.name || "Sutra Bistro"}</p>
            </div>
          </div>
        </motion.div>
      </div>
      <VideoPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        videos={displayVideos} 
        initialVideo={selectedVideo} 
      />
    </section>
  );
};

export default Testimonials;
