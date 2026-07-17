import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle, Phone, X } from 'lucide-react';

const FloatingActions = ({ settings = {}, branches = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const phone = (settings.GlobalPhone && !settings.GlobalPhone.includes("#ERROR!")) ? settings.GlobalPhone : "+91 9353560150";
  const whatsapp = (settings.GlobalWhatsApp && !settings.GlobalWhatsApp.includes("#ERROR!")) ? settings.GlobalWhatsApp : "https://wa.me/919353560150";

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4">
      {/* Quick Contact Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="flex flex-col gap-3 mb-2"
          >
            <a 
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="w-14 h-14 bg-white text-sutra-deep rounded-full flex items-center justify-center shadow-2xl border border-sutra-deep/5 hover:bg-sutra-accent hover:text-sutra-deep transition-all group"
              title="Call Us"
            >
              <Phone size={20} />
              <span className="absolute right-16 bg-sutra-deep text-sutra-base px-3 py-1 rounded-theme text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Call Us</span>
            </a>
            <a 
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group"
              title="WhatsApp"
            >
              <img src="/images/contact-us/whatsapp.svg" alt="WhatsApp" className="w-7 h-7 object-contain" />
              <span className="absolute right-16 bg-sutra-deep text-sutra-base px-3 py-1 rounded-theme text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">WhatsApp Us</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button (Contact Us) */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${isOpen ? 'bg-sutra-accent text-sutra-deep' : 'bg-sutra-deep text-sutra-base'}`}
          >
            {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll to Top */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-16 h-16 bg-white/80 backdrop-blur-md text-sutra-deep rounded-full flex items-center justify-center shadow-xl border border-sutra-deep/5 hover:bg-sutra-deep hover:text-sutra-base transition-all"
            title="Take me to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActions;
