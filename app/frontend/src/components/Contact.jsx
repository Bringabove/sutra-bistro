import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone as Phone, FiMail as Mail, FiInstagram as Instagram, FiMessageCircle as MessageCircle, FiSend as Send } from 'react-icons/fi';

const Contact = ({ onContact, isSubmitting, settings = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    
    await onContact('contact', formData, () => {
      setSuccess(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    });
  };

  const phone = (settings.GlobalPhone && !settings.GlobalPhone.includes("#ERROR!")) ? settings.GlobalPhone : "+91 98765 43210";
  const email = (settings.GlobalEmail && !settings.GlobalEmail.includes("#ERROR!")) ? settings.GlobalEmail : "hello@sutrabistro.com";
  const whatsapp = (settings.GlobalWhatsApp && !settings.GlobalWhatsApp.includes("#ERROR!")) ? settings.GlobalWhatsApp : "https://wa.me/919876543210";
  const instagram = (settings.GlobalInstagram && !settings.GlobalInstagram.includes("#ERROR!")) ? settings.GlobalInstagram : "https://instagram.com/sutrabistro";

  return (
    <section id="contact" className="bg-sutra-deep pt-24 md:pt-40 pb-0 relative overflow-hidden" data-testid="contact-section">
      {/* Decorative Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sutra-accent/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sutra-accent/5 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-16">
          
          {/* Left: Info */}
          <div className="space-y-12 flex flex-col justify-center">
            <div>
              <div className="font-heading uppercase tracking-[0.4em] text-[10px] text-sutra-accent mb-6 flex items-center gap-3">
                <div className="w-8 h-[1px] bg-sutra-accent" />
                Get in Touch
              </div>
              <h2 className="font-display text-[14vw] md:text-[8vw] leading-[0.85] text-sutra-base uppercase mb-8">
                LET'S <span className="text-sutra-accent">TALK.</span>
              </h2>
              <p className="font-body text-lg text-sutra-base/60 leading-relaxed max-w-md">
                Questions about our menu, catering for events, or just want to say hi? 
                We're always here for a good conversation.
              </p>
            </div>

            <div className="flex items-end -ml-12 md:-ml-20 lg:-ml-24 relative">
              {/* 3D Character - Fully Visible and Overlapping Tile */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-30 pointer-events-none w-[180px] md:w-[350px] lg:w-[500px] shrink-0"
              >
                <img 
                  src="/images/contact-us/contact-us-sutra.webp" 
                  alt="Sutra Chef" 
                  className="w-full h-auto object-contain block drop-shadow-[20px_0_50px_rgba(0,0,0,0.3)]"
                />
              </motion.div>

              {/* Consolidated Info Box - Shifted left to create 5% overlap */}
              <div className="flex-1 -ml-8 md:-ml-12 lg:-ml-16 mb-24 md:mb-32 relative group z-20">
                {/* Box Background & Content */}
                <div className="relative bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm p-6 md:p-8 lg:p-10 space-y-6 md:space-y-8 z-10">
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="group/item flex items-center gap-4 lg:gap-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-sutra-accent/10 rounded-xl md:rounded-2xl flex items-center justify-center text-sutra-accent group-hover/item:bg-sutra-accent group-hover/item:text-sutra-deep transition-all duration-500">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-heading text-[8px] md:text-[9px] uppercase tracking-widest text-sutra-base/40">Call Us</span>
                      <span className="font-heading text-sm md:text-base text-sutra-base group-hover/item:text-sutra-accent transition-colors">{phone}</span>
                    </div>
                  </a>

                  <a href={`mailto:${email}`} className="group/item flex items-center gap-4 lg:gap-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-sutra-accent/10 rounded-xl md:rounded-2xl flex items-center justify-center text-sutra-accent group-hover/item:bg-sutra-accent group-hover/item:text-sutra-deep transition-all duration-500">
                      <Mail size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-heading text-[8px] md:text-[9px] uppercase tracking-widest text-sutra-base/40">Email Us</span>
                      <span className="font-heading text-sm md:text-base text-sutra-base group-hover/item:text-sutra-accent transition-colors">{email}</span>
                    </div>
                  </a>

                  <a href={whatsapp} target="_blank" rel="noreferrer" className="group/item flex items-center gap-4 lg:gap-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-sutra-accent/10 rounded-xl md:rounded-2xl flex items-center justify-center text-sutra-accent group-hover/item:bg-sutra-accent group-hover/item:text-sutra-deep transition-all duration-500">
                      <MessageCircle size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-heading text-[8px] md:text-[9px] uppercase tracking-widest text-sutra-base/40">WhatsApp</span>
                      <span className="font-heading text-sm md:text-base text-sutra-base group-hover/item:text-sutra-accent transition-colors">Chat with Us</span>
                    </div>
                  </a>

                  <a href={instagram} target="_blank" rel="noreferrer" className="group/item flex items-center gap-4 lg:gap-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-sutra-accent/10 rounded-xl md:rounded-2xl flex items-center justify-center text-sutra-accent group-hover/item:bg-sutra-accent group-hover/item:text-sutra-deep transition-all duration-500">
                      <Instagram size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-heading text-[8px] md:text-[9px] uppercase tracking-widest text-sutra-base/40">Instagram</span>
                      <span className="font-heading text-sm md:text-base text-sutra-base group-hover/item:text-sutra-accent transition-colors">
                        {instagram.includes('instagram.com/') ? `@${instagram.split('instagram.com/')[1].replace('/', '')}` : 'Follow Us'}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Form */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl mb-24 md:mb-32 relative z-20">
            <h3 className="font-display text-3xl uppercase text-sutra-deep mb-8">Send a Quick Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-heading text-[10px] uppercase tracking-widest text-sutra-deep/40 px-2">Your Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-6 py-4 bg-sutra-base/30 border border-sutra-deep/5 rounded-2xl outline-none focus:border-sutra-accent/50 transition-all" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-heading text-[10px] uppercase tracking-widest text-sutra-deep/40 px-2">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full px-6 py-4 bg-sutra-base/30 border border-sutra-deep/5 rounded-2xl outline-none focus:border-sutra-accent/50 transition-all" 
                    placeholder="+91 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-heading text-[10px] uppercase tracking-widest text-sutra-deep/40 px-2">Email (Optional)</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-4 bg-sutra-base/30 border border-sutra-deep/5 rounded-2xl outline-none focus:border-sutra-accent/50 transition-all" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-heading text-[10px] uppercase tracking-widest text-sutra-deep/40 px-2">Message</label>
                <textarea 
                  required
                  rows="4" 
                  className="w-full px-6 py-4 bg-sutra-base/30 border border-sutra-deep/5 rounded-2xl outline-none focus:border-sutra-accent/50 transition-all resize-none" 
                  placeholder="What's on your mind?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                disabled={isSubmitting || success}
                className={`w-full py-5 rounded-2xl font-heading uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 transition-all duration-500 shadow-xl disabled:opacity-50 ${success ? 'bg-green-600 text-white' : 'bg-sutra-deep text-sutra-base hover:bg-sutra-accent hover:text-sutra-deep'}`}
              >
                {isSubmitting ? 'Sending...' : success ? 'Message Sent!' : 'Submit Message'}
                {success ? <div className="w-2 h-2 bg-white rounded-full animate-ping" /> : <Send size={16} />}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
