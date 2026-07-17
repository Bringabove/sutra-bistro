import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const OrderPopup = ({ isOpen, onClose, branches = [] }) => {
  const [selectedOrderBranch, setSelectedOrderBranch] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.lenis?.stop();
      return () => {
        document.body.style.overflow = 'auto';
        window.lenis?.start();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (branches.length > 0 && !selectedOrderBranch) {
      setSelectedOrderBranch(branches[0]);
    }
  }, [branches, selectedOrderBranch]);

  const isValidLink = (link) => {
    if (!link) return false;
    const lower = link.toLowerCase();
    if (lower.includes('zomato.com') && (lower.endsWith('zomato.com') || lower.endsWith('zomato.com/'))) return false;
    if (lower.includes('swiggy.com') && (lower.endsWith('swiggy.com') || lower.endsWith('swiggy.com/'))) return false;
    return link.includes('http');
  };

  const getRatings = (branch) => {
    const name = (branch?.BranchName || "").toLowerCase();
    if (name.includes("vijay")) return { swiggy: "4.3", zomato: "4.5" };
    if (name.includes("siddartha") || name.includes("siddhartha")) return { swiggy: "4.3", zomato: "4.0" };
    return { swiggy: branch?.SwiggyRating || "4.2", zomato: branch?.ZomatoRating || "4.1" };
  };

  const currentRatings = selectedOrderBranch ? getRatings(selectedOrderBranch) : { swiggy: "4.2", zomato: "4.1" };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-sutra-deep/80 backdrop-blur-md"
          />
          
          <motion.div 
            data-lenis-prevent
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-sutra-base rounded-theme overflow-y-auto overscroll-contain max-h-[90vh] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border border-white/20 flex flex-col md:flex-row h-auto md:min-h-[480px]"
          >
            {/* Left Column: Branch Selection (Master) */}
            <div className="w-full md:w-[38%] bg-sutra-deep p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sutra-accent/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
              
              <div className="relative z-10">
                <div className="font-heading uppercase tracking-[0.4em] text-[10px] md:text-xs text-sutra-accent font-bold mb-6">Select Outlet</div>
                <h3 className="font-display text-4xl md:text-6xl text-white uppercase leading-[0.85] mb-12">WHERE ARE <br />YOU NOW?</h3>
                
                <div className="space-y-4">
                  {branches.map((b, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setSelectedOrderBranch(b)}
                      className={`w-full text-left px-8 py-5 rounded-theme font-heading text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-500 flex items-center justify-between group border-2 ${selectedOrderBranch?.BranchName === b.BranchName ? 'bg-sutra-accent text-sutra-deep border-sutra-accent shadow-xl scale-105' : 'bg-white/5 text-sutra-base/40 border-white/5 hover:border-sutra-accent/50 hover:text-white'}`}
                    >
                      <span>{b.BranchName || b.name}</span>
                      <motion.div 
                        animate={{ x: selectedOrderBranch?.BranchName === b.BranchName ? 0 : 5, opacity: selectedOrderBranch?.BranchName === b.BranchName ? 1 : 0 }}
                        className="w-2 h-2 bg-current rounded-full" 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-10 border-t border-white/10 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                  <span className="font-heading font-bold text-[10px] md:text-xs uppercase tracking-widest text-white/60">1.6k+ Happy Customers</span>
                </div>
                <p className="font-heading italic text-xs text-sutra-accent/80">Crafting flavors with love since 2016</p>
              </div>
            </div>

            {/* Right Column: Platform Selection (Detail) */}
            <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative bg-white">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-sutra-deep/5 flex items-center justify-center text-sutra-deep hover:bg-red-500 hover:text-white transition-all z-20 group"
                aria-label="Close Ordering Modal"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="mb-12">
                <span className="font-heading uppercase tracking-[0.3em] text-[10px] md:text-xs text-sutra-deep/30 font-bold block mb-4">Choose Platform</span>
                <h3 className="font-display text-4xl md:text-5xl text-sutra-deep uppercase leading-tight">Order From <br /><span className="text-sutra-accent">{selectedOrderBranch?.BranchName || "Sutra Bistro"}</span></h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Swiggy */}
                {isValidLink(selectedOrderBranch?.SwiggyLink) ? (
                  <a 
                    href={selectedOrderBranch.SwiggyLink}
                    target="_blank"
                    className="group relative p-10 bg-sutra-deep/5 rounded-theme border-2 border-transparent hover:border-sutra-accent hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-500 text-center"
                  >
                    <div className="relative w-20 h-20 mx-auto mb-8">
                      <img src="/images/hero/icons/swiggy.png" className="w-full h-full object-contain" alt="Swiggy" width="80" height="80" loading="lazy" />
                    </div>
                    <div className="absolute top-6 right-6 px-4 py-1.5 bg-sutra-deep text-sutra-base rounded-full text-xs font-bold shadow-lg overflow-hidden border border-white/10">
                      <span className="relative z-10">★ {currentRatings.swiggy}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </div>
                    <span className="block font-heading font-bold uppercase tracking-[0.2em] text-xs md:text-sm text-sutra-deep group-hover:text-sutra-accent transition-colors">Swiggy</span>
                  </a>
                ) : (
                  <div className="p-10 bg-sutra-deep/[0.02] border-2 border-dashed border-sutra-deep/10 rounded-theme flex flex-col items-center justify-center opacity-30 grayscale">
                    <img src="/images/hero/icons/swiggy.png" className="w-16 h-16 object-contain opacity-50 mb-6" alt="Offline Swiggy Link" width="64" height="64" loading="lazy" />
                    <span className="font-heading font-bold uppercase tracking-widest text-xs">Offline</span>
                  </div>
                )}

                {/* Zomato */}
                {isValidLink(selectedOrderBranch?.ZomatoLink) ? (
                  <a 
                    href={selectedOrderBranch.ZomatoLink}
                    target="_blank"
                    className="group relative p-10 bg-sutra-deep/5 rounded-theme border-2 border-transparent hover:border-sutra-accent hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-500 text-center"
                  >
                    <div className="relative w-20 h-20 mx-auto mb-8">
                      <img src="/images/hero/icons/zomato.png" className="w-full h-full object-contain" alt="Zomato" width="80" height="80" loading="lazy" />
                    </div>
                    <div className="absolute top-6 right-6 px-4 py-1.5 bg-sutra-deep text-sutra-base rounded-full text-xs font-bold shadow-lg overflow-hidden border border-white/10">
                      <span className="relative z-10">★ {currentRatings.zomato}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    </div>
                    <span className="block font-heading font-bold uppercase tracking-[0.2em] text-xs md:text-sm text-sutra-deep group-hover:text-sutra-accent transition-colors">Zomato</span>
                  </a>
                ) : (
                  <div className="p-10 bg-sutra-deep/[0.02] border-2 border-dashed border-sutra-deep/10 rounded-theme flex flex-col items-center justify-center opacity-30 grayscale">
                    <img src="/images/hero/icons/zomato.png" className="w-16 h-16 object-contain opacity-50 mb-6" alt="Offline Zomato Link" width="64" height="64" loading="lazy" />
                    <span className="font-heading font-bold uppercase tracking-widest text-xs">Offline</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderPopup;
