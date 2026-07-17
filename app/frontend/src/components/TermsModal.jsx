import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.lenis?.stop();
      return () => {
        document.body.style.overflow = 'auto';
        window.lenis?.start();
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-sutra-deep/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-sutra-base border border-white/20 rounded-theme shadow-2xl z-10 text-sutra-deep text-left flex flex-col max-h-[85vh] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-sutra-deep/10 flex items-start justify-between shrink-0">
              <div>
                <span className="font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-accent block mb-2 font-bold flex items-center gap-1.5">
                  <ShieldAlert size={12} className="text-sutra-accent" /> Legal Agreement
                </span>
                <h3 className="font-display text-3xl uppercase leading-none font-bold">Terms & Conditions</h3>
                <p className="font-heading text-[10px] uppercase tracking-wider text-sutra-deep/50 mt-2 font-semibold">
                  Last Updated: July 17, 2026
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-sutra-deep/60 hover:text-sutra-deep transition-colors p-2 hover:bg-sutra-deep/5 rounded-full"
                aria-label="Close Terms"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div data-lenis-prevent className="p-6 md:p-8 overflow-y-auto overscroll-contain space-y-6 scrollbar-thin scrollbar-thumb-sutra-deep/20 scrollbar-track-transparent">
              <p className="font-body text-sm text-sutra-deep/80 leading-relaxed">
                Welcome to Sutra Bistro. By using our website, booking a table, or dining with us, you agree to the following operational terms:
              </p>

              <div className="space-y-6">
                <div className="p-4 bg-white/30 rounded-theme border border-sutra-deep/5 hover:bg-white/40 transition-colors duration-300">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-sutra-accent mb-2">
                    Table Reservations & Grace Period
                  </h4>
                  <p className="font-body text-sm text-sutra-deep/85 leading-relaxed">
                    We are thrilled to host you! However, table reservations are only held for a maximum of 15 minutes past your booked time. If you are running late, please call us. After the 15-minute grace period, management reserves the right to release the table to walk-in guests.
                  </p>
                </div>

                <div className="p-4 bg-white/30 rounded-theme border border-sutra-deep/5 hover:bg-white/40 transition-colors duration-300">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-sutra-accent mb-2">
                    Right of Admission
                  </h4>
                  <p className="font-body text-sm text-sutra-deep/85 leading-relaxed">
                    We strive to maintain a comfortable, family-friendly, pure vegetarian environment. Management reserves the right of admission and the right to refuse service to anyone violating our restaurant policies or disrupting the experience of other guests.
                  </p>
                </div>

                <div className="p-4 bg-white/30 rounded-theme border border-sutra-deep/5 hover:bg-white/40 transition-colors duration-300">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-sutra-accent mb-2">
                    Menu & Pricing Changes
                  </h4>
                  <p className="font-body text-sm text-sutra-deep/85 leading-relaxed">
                    All menu items, descriptions, prices, and branch availability are subject to change without prior notice based on seasonal availability and market conditions.
                  </p>
                </div>

                <div className="p-4 bg-white/30 rounded-theme border border-sutra-deep/5 hover:bg-white/40 transition-colors duration-300">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-sutra-accent mb-2">
                    Dietary Restrictions & Allergens
                  </h4>
                  <p className="font-body text-sm text-sutra-deep/85 leading-relaxed">
                    While we maintain rigorous hygiene standards in our pure veg kitchen, our facility handles various ingredients and allergens. Guests with severe food allergies must inform our staff prior to ordering. We cannot guarantee a 100% allergen-free environment.
                  </p>
                </div>

                <div className="p-4 bg-white/30 rounded-theme border border-sutra-deep/5 hover:bg-white/40 transition-colors duration-300">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-sutra-accent mb-2">
                    Third-Party Delivery
                  </h4>
                  <p className="font-body text-sm text-sutra-deep/85 leading-relaxed">
                    Any orders placed through external delivery partners (Swiggy, Zomato) are governed by the terms and conditions of those respective platforms.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div className="p-6 md:p-8 border-t border-sutra-deep/10 text-right shrink-0">
              <button
                onClick={onClose}
                className="bg-sutra-deep text-sutra-base px-6 py-3 rounded-theme font-heading font-bold uppercase tracking-widest text-[10px] hover:bg-sutra-accent hover:text-sutra-deep transition-all duration-300 active:scale-95 shadow-md"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
