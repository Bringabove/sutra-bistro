import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin as MapPin, FiPhone as Phone, FiMail as Mail, FiInstagram as Instagram, FiExternalLink as ExternalLink } from 'react-icons/fi';
import { toast } from 'sonner';
import MagneticButton from './MagneticButton';

const Footer = ({ onReserve, isSubmitting, branches = [], settings = {} }) => {
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
    <footer id="reserve" className="bg-sutra-deep text-sutra-base rounded-t-[3rem] pt-24 md:pt-32 px-6 md:px-12 mt-10 relative overflow-hidden" data-testid="footer-section">
      {/* Decorative SB Background */}
      <div className="absolute -bottom-10 right-[-4%] font-display text-[40vw] md:text-[24vw] text-sutra-base opacity-[0.05] pointer-events-none select-none">
        SB
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[16vw] md:text-[10vw] leading-[0.85] uppercase mb-20"
          data-testid="footer-heading"
        >
          RESERVE A <br /><span className="text-sutra-accent">TABLE.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Reservation Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8" data-testid="reservation-form">
              <div className="group">
                <label className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/60 group-focus-within:text-sutra-accent transition-colors">Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors"
                  placeholder="John Doe"
                  data-testid="form-name"
                />
              </div>
              <div className="group">
                <label className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/60 group-focus-within:text-sutra-accent transition-colors">Phone</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors"
                  placeholder="+91 98765 43210"
                  data-testid="form-phone"
                />
              </div>
              <div className="group">
                <label className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/60 group-focus-within:text-sutra-accent transition-colors">Email (Optional)</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors"
                  placeholder="hello@example.com"
                  data-testid="form-email"
                />
              </div>
              <div className="group">
                <label className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/60 group-focus-within:text-sutra-accent transition-colors">Location</label>
                <select 
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors"
                  data-testid="form-location"
                >
                  {locations.map((loc, i) => (
                    <option key={i} value={loc.name} className="text-sutra-deep">
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="group">
                <label className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/60 group-focus-within:text-sutra-accent transition-colors">Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors [color-scheme:dark]"
                  data-testid="form-date"
                />
              </div>
              <div className="group">
                <label className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/60 group-focus-within:text-sutra-accent transition-colors">Time</label>
                <input 
                  type="time" 
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors [color-scheme:dark]"
                  data-testid="form-time"
                />
              </div>
              <div className="group">
                <label className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/60 group-focus-within:text-sutra-accent transition-colors">Guests</label>
                <input 
                  type="number" 
                  min="1" 
                  max="30"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors"
                  data-testid="form-guests"
                />
              </div>
              <div className="group md:col-span-2">
                <label className="block font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-base/60 group-focus-within:text-sutra-accent transition-colors">Anything special?</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent border-0 border-b border-sutra-base/30 focus:border-sutra-accent py-3 font-heading text-lg text-sutra-base outline-none transition-colors resize-none"
                  rows="1"
                  placeholder="Special requests..."
                  data-testid="form-message"
                />
              </div>

              <div className="md:col-span-2 pt-8">
                <MagneticButton
                  disabled={isSubmitting}
                  className={`bg-sutra-accent text-sutra-deep px-10 py-4 rounded-full font-heading uppercase tracking-widest hover:bg-sutra-base transition-colors duration-500 ${isSubmitting ? 'opacity-60' : ''}`}
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
                          <h4 className="font-display text-2xl uppercase group-hover:text-sutra-accent transition-colors">{loc.name}</h4>
                          <a 
                            href={loc.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-white/5 rounded-lg text-sutra-accent hover:bg-sutra-accent hover:text-sutra-deep transition-all"
                            title="Get Directions"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                        <p className="font-body text-sutra-base/60 leading-relaxed mb-1 text-sm">{loc.address}</p>
                        {loc.time && <p className="font-heading text-xs uppercase tracking-widest text-sutra-accent/80">{loc.time}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-sutra-base/10 pt-10 space-y-4">
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 group" data-testid="footer-phone">
                <Phone size={18} className="text-sutra-accent" />
                <span className="font-heading tracking-widest group-hover:text-sutra-accent transition-colors">{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-4 group" data-testid="footer-email">
                <Mail size={18} className="text-sutra-accent" />
                <span className="font-heading tracking-widest group-hover:text-sutra-accent transition-colors">{email}</span>
              </a>
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group" data-testid="footer-instagram">
                <Instagram size={18} className="text-sutra-accent" />
                <span className="font-heading tracking-widest group-hover:text-sutra-accent transition-colors">
                  {instagram.includes('instagram.com/') ? `@${instagram.split('instagram.com/')[1].replace('/', '')}` : 'Follow Us'}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="mt-10 border-t border-sutra-base/10 pt-6 flex justify-between items-end">
          <div className="w-44 md:w-56 -ml-4 md:-ml-6 opacity-40 hover:opacity-100 transition-opacity duration-500">
            <img src="/images/global/sutra-logo.png" alt="Sutra Bistro Logo" className="w-full h-auto object-contain filter brightness-0 invert" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sutra-base/10 mt-20 py-8 flex flex-col md:flex-row justify-between items-center gap-6 font-heading text-[10px] uppercase tracking-[0.2em] text-sutra-base/40 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span>{"©"} {new Date().getFullYear()} Sutra Bistro {"·"} Mysuru</span>
            <span className="hidden md:inline text-sutra-base/10">|</span>
            <a 
              href="https://instagram.com/hibroonearth" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sutra-accent/60 hover:text-sutra-accent transition-colors"
            >
              Built by @hibroonearth
            </a>
          </div>
          <div>Pure Veg {"·"} Crave Worthy {"·"} Made with butter</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
