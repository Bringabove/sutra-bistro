import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin as MapPin, FiPhone as Phone, FiMail as Mail, FiInstagram as Instagram, FiExternalLink as ExternalLink, FiX as X } from 'react-icons/fi';
import { toast } from 'sonner';
import MagneticButton from './MagneticButton';
import FadeIn from './FadeIn';
import TermsModal from './TermsModal';
import RefundModal from './RefundModal';

const Footer = ({ onReserve, isSubmitting, branches = [], settings = {} }) => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);

  React.useEffect(() => {
    if (isPrivacyOpen) {
      document.body.style.overflow = 'hidden';
      window.lenis?.stop();
      return () => {
        document.body.style.overflow = 'auto';
        window.lenis?.start();
      };
    }
  }, [isPrivacyOpen]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branch: branches[0]?.BranchName || 'Vijay Nagar',
    date: '',
    time: '',
    guests: 2,
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      toast.error("Please fill the essentials: name, phone, date, time.");
      return;
    }

    const success = await onReserve('reservation', formData, () => {
      setFormData({
        name: '', phone: '', email: '', branch: branches[0]?.BranchName || 'Vijay Nagar',
        date: '', time: '', guests: 2, message: ''
      });
    });

    if (success) {
      toast.success("Reservation confirmed. We'll confirm on your phone shortly.");
    }
  };

  const defaultLocations = [
    { id: 'vjn', name: "Vijay Nagar", address: "Kalidasa Rd, Vijayanagar 1st Stage, Vijayanagar, Mysuru, Karnataka 570017", time: "11AM - 11PM" },
    { id: 'sid', name: "Siddharthanagar", address: "geetha school, 174, moksha marga, road, Mysuru, Karnataka 570011", time: "11AM - 11PM" }
  ];

  const locations = branches && branches.length > 0 ? branches.map((b, idx) => ({
    id: b.BranchName?.toLowerCase().replace(/\s+/g, '-') || `branch-${idx}`,
    name: b.BranchName,
    address: b.Address || "Mysuru, Karnataka",
    time: b.Hours || b.OpHours || ""
  })) : defaultLocations;

  const phone = (settings.GlobalPhone && !settings.GlobalPhone.includes("#ERROR!")) ? settings.GlobalPhone : "+91 98765 43210";
  const email = (settings.GlobalEmail && !settings.GlobalEmail.includes("#ERROR!")) ? settings.GlobalEmail : "hello@sutrabistro.com";
  const instagram = (settings.GlobalInstagram && !settings.GlobalInstagram.includes("#ERROR!")) ? settings.GlobalInstagram : "https://www.instagram.com/sutrabistro/";

  return (
    <footer id="reserve" className="bg-sutra-deep text-sutra-base rounded-t-theme pt-24 md:pt-32 px-6 md:px-12 mt-10 relative overflow-hidden" data-testid="footer-section">
      {/* Decorative SB Background */}
      <div className="absolute -bottom-5 md:-bottom-10 right-[-4%] font-display text-[60vw] md:text-[24vw] text-sutra-base opacity-[0.05] pointer-events-none select-none leading-none overflow-hidden h-full flex items-end">
        SB
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <h2 
            className="font-display text-[16vw] md:text-[10vw] leading-[0.85] uppercase mb-20 text-sutra-base"
            data-testid="footer-heading"
          >
            RESERVE A <br /><span className="text-sutra-accent">TABLE.</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Reservation Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 relative z-20" data-testid="reservation-form">
              <div className="group">
                <label htmlFor="reserve-name" className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/90 group-focus-within:text-sutra-accent transition-colors font-bold">
                  Your Name
                  <input 
                    id="reserve-name"
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors placeholder-sutra-base/65 mt-1"
                    placeholder="Rahul Sharma"
                    data-testid="form-name"
                  />
                </label>
              </div>
              <div className="group">
                <label htmlFor="reserve-phone" className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/90 group-focus-within:text-sutra-accent transition-colors font-bold">
                  Phone
                  <input 
                    id="reserve-phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors placeholder-sutra-base/65 mt-1"
                    placeholder="+91 XXXXX XXXXX"
                    data-testid="form-phone"
                  />
                </label>
              </div>
              <div className="group">
                <label htmlFor="reserve-email" className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/90 group-focus-within:text-sutra-accent transition-colors font-bold">
                  Email (Optional)
                  <input 
                    id="reserve-email"
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors placeholder-sutra-base/65 mt-1"
                    placeholder="rahul@example.com"
                    data-testid="form-email"
                  />
                </label>
              </div>
              <div className="group">
                <label htmlFor="reserve-location" className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/90 group-focus-within:text-sutra-accent transition-colors font-bold">
                  Location
                  <select 
                    id="reserve-location"
                    value={formData.branch}
                    onChange={(e) => setFormData({...formData, branch: e.target.value})}
                    className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors mt-1"
                    data-testid="form-location"
                  >
                    {locations.map((loc, i) => (
                      <option key={i} value={loc.name} className="text-sutra-deep">
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="group">
                <label htmlFor="reserve-date" className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/90 group-focus-within:text-sutra-accent transition-colors font-bold">
                  Date
                  <input 
                    id="reserve-date"
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors [color-scheme:dark] mt-1"
                    data-testid="form-date"
                  />
                </label>
              </div>
              <div className="group">
                <label htmlFor="reserve-time" className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/90 group-focus-within:text-sutra-accent transition-colors font-bold">
                  Time
                  <input 
                    id="reserve-time"
                    type="time" 
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors [color-scheme:dark] mt-1"
                    data-testid="form-time"
                  />
                </label>
              </div>
              <div className="group">
                <label htmlFor="reserve-guests" className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/90 group-focus-within:text-sutra-accent transition-colors font-bold">
                  Guests
                  <input 
                    id="reserve-guests"
                    type="number" 
                    min="1" 
                    max="30"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors mt-1"
                    data-testid="form-guests"
                  />
                </label>
              </div>
              <div className="group md:col-span-2">
                <label htmlFor="reserve-message" className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/90 group-focus-within:text-sutra-accent transition-colors font-bold">
                  Anything special?
                  <input 
                    id="reserve-message"
                    type="text"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors resize-none placeholder-sutra-base/65 mt-1"
                    placeholder="Special requests..."
                    data-testid="form-message"
                  />
                </label>
              </div>

              <div className="md:col-span-2 pt-8">
                <MagneticButton
                  disabled={isSubmitting}
                  className={`bg-sutra-accent text-sutra-deep px-10 py-4 rounded-theme font-heading uppercase tracking-widest hover:bg-sutra-base transition-colors duration-500 font-bold ${isSubmitting ? 'opacity-60' : ''}`}
                  data-testid="submit-reservation"
                >
                  {isSubmitting ? "Reserving..." : "Make a Reservation"}
                </MagneticButton>
              </div>
            </form>
          </div>

          {/* Location Info */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div>
              <div className="font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-accent mb-8" data-testid="footer-eyebrow">
                Find Us
              </div>
              <div className="space-y-10">
                {locations.map((loc) => (
                  <div key={loc.id} className="group cursor-default" data-testid={`location-${loc.id}`}>
                    <div className="flex items-start gap-4">
                      <MapPin className="text-sutra-accent mt-1" size={24} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <h3 className="font-display text-2xl uppercase group-hover:text-sutra-accent transition-colors">{loc.name}</h3>
                          <a 
                            href={loc.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-white/5 rounded-theme text-sutra-accent hover:bg-sutra-accent hover:text-sutra-deep transition-all"
                            title="Get Directions"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                        <p className="font-body text-sutra-base/85 leading-relaxed mb-1 text-sm">{loc.address}</p>
                        {loc.time && <p className="font-heading text-xs uppercase tracking-widest text-sutra-accent/80">{loc.time}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

             <div className="border-t border-sutra-base/10 pt-10 space-y-4">
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 group w-fit" data-testid="footer-phone">
                <Phone size={18} className="text-sutra-accent transition-transform duration-300 group-hover:scale-110" />
                <span className="font-heading tracking-widest text-sutra-base/90 group-hover:text-sutra-accent transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1px] after:bg-sutra-accent after:transition-all after:duration-300 group-hover:after:w-full">{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-4 group w-fit" data-testid="footer-email">
                <Mail size={18} className="text-sutra-accent transition-transform duration-300 group-hover:scale-110" />
                <span className="font-heading tracking-widest text-sutra-base/90 group-hover:text-sutra-accent transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1px] after:bg-sutra-accent after:transition-all after:duration-300 group-hover:after:w-full">{email}</span>
              </a>
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group w-fit" data-testid="footer-instagram">
                <Instagram size={18} className="text-sutra-accent transition-transform duration-300 group-hover:scale-110" />
                <span className="font-heading tracking-widest text-sutra-base/90 group-hover:text-sutra-accent transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1px] after:bg-sutra-accent after:transition-all after:duration-300 group-hover:after:w-full">
                  {instagram.includes('instagram.com/') ? `@${instagram.split('instagram.com/')[1].replace('/', '')}` : 'Follow Us'}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="mt-10 border-t border-sutra-base/10 pt-6 flex justify-between items-end">
          <div className="w-44 md:w-56 -ml-4 md:-ml-6 opacity-40 hover:opacity-100 transition-opacity duration-500">
            <img 
              src="/images/global/sutra-logo.png" 
              alt="Sutra Bistro Logo" 
              width={224} 
              height={60} 
              loading="lazy" 
              className="w-auto h-auto object-contain filter brightness-0 invert" 
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sutra-base/10 mt-12 md:mt-20 py-8 flex flex-col lg:flex-row justify-between items-center gap-6 font-heading text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-sutra-base/70 text-center lg:text-left relative z-20 font-bold">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span>{"©"} {new Date().getFullYear()} Sutra Bistro {"·"} Mysuru</span>
            <span className="hidden md:inline text-sutra-base/10">|</span>
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="text-sutra-accent/80 hover:text-sutra-accent transition-colors focus:outline-none relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-sutra-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              Privacy Policy
            </button>
            <span className="hidden md:inline text-sutra-base/10">|</span>
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="text-sutra-accent/80 hover:text-sutra-accent transition-colors focus:outline-none relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-sutra-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              Terms & Conditions
            </button>
            <span className="hidden md:inline text-sutra-base/10">|</span>
            <button 
              onClick={() => setIsRefundOpen(true)}
              className="text-sutra-accent/80 hover:text-sutra-accent transition-colors focus:outline-none relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-sutra-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              Cancellation & Refund Policy
            </button>
            <span className="hidden md:inline text-sutra-base/10">|</span>
            <a 
              href="https://instagram.com/hibroonearth" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sutra-accent/80 hover:text-sutra-accent transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-sutra-accent after:transition-all after:duration-300 hover:after:w-full"
            >
              Built by @hibroonearth
            </a>
          </div>
          <div className="text-sutra-base/80">Pure Veg {"·"} Crave Worthy {"·"} Made with butter</div>
        </div>
      </div>

      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute inset-0 bg-sutra-deep/80 backdrop-blur-md"
            />
            
            <motion.div
              data-lenis-prevent
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-sutra-base border border-white/20 p-8 rounded-theme shadow-2xl z-10 text-sutra-deep text-left overflow-y-auto overscroll-contain max-h-[85vh] scrollbar-thin scrollbar-thumb-sutra-deep/20 scrollbar-track-transparent"
            >
              <button 
                onClick={() => setIsPrivacyOpen(false)}
                className="absolute top-6 right-6 text-sutra-deep/60 hover:text-sutra-deep transition-colors p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              
              <div className="mb-6">
                <span className="font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-accent block mb-2 font-bold">Disclosure</span>
                <h3 className="font-display text-3xl uppercase leading-none font-bold">Privacy Policy</h3>
              </div>
              
              <p className="font-heading text-sm uppercase tracking-wider leading-relaxed text-sutra-deep/80 border-t border-sutra-deep/10 pt-6">
                We care about your privacy. By using our contact or reservation forms, you provide us with your Name, Phone Number, and Email Address. We collect this data strictly to manage your table bookings and respond to your inquiries. We will never sell, share, or misuse your personal information.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <RefundModal isOpen={isRefundOpen} onClose={() => setIsRefundOpen(false)} />
    </footer>
  );
};

export default Footer;
