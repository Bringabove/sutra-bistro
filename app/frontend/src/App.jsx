import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DeliveryMarquee from './components/DeliveryMarquee';
import InteractiveMenu from './components/InteractiveMenu';
import InstagramWall from './components/InstagramWall';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import OrderPopup from './components/OrderPopup';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { AlertCircle, X, Loader2 } from 'lucide-react';

import SuggestionPopup from './components/SuggestionPopup';

// Live Google Apps Script Web App URL
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyoCVd3F3Fvxefk0iOE4ki1PqrKhrHD5bucCxPwu0mXmdUoDID2Kr2spYzYKOKCXk46/exec';

// --- ERROR BOUNDARY ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Critical Render Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full bg-sutra-deep flex flex-col items-center justify-center p-10 text-center">
          <AlertCircle className="w-16 h-16 text-sutra-accent mb-6" />
          <h2 className="font-display text-4xl text-white uppercase mb-4">Something went wrong</h2>
          <p className="font-heading text-sutra-base/60 max-w-md mb-8">
            The app encountered a rendering error. This usually happens if the database returns unexpected data.
          </p>
          <pre className="bg-black/30 p-6 rounded-2xl text-red-400 font-mono text-xs text-left overflow-auto max-w-2xl max-h-40 mb-10">
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            className="bg-sutra-accent text-sutra-deep px-8 py-3 rounded-full font-heading uppercase tracking-widest text-xs font-bold"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const NotificationBanner = ({ branches = [] }) => {
  const safeBranches = Array.isArray(branches) ? branches : [];
  const closedBranches = safeBranches.filter(b => {
    const status = (b?.Status || "").toUpperCase();
    return status === 'CLOSED' || status === 'TEMPORARILY CLOSED';
  }).map(b => b.BranchName || 'Branch');
  const [isVisible, setIsVisible] = useState(closedBranches.length > 0);

  useEffect(() => {
    setIsVisible(closedBranches.length > 0);
  }, [closedBranches.length]);

  if (!isVisible || closedBranches.length === 0) return null;

  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="bg-red-600 text-white py-3 px-6 relative z-[100] flex items-center justify-center gap-4 text-center shadow-lg"
    >
      <AlertCircle size={18} className="shrink-0" />
      <p className="font-heading text-[10px] md:text-xs uppercase tracking-widest font-bold">
        Note: Our {closedBranches.join(", ")} {closedBranches.length > 1 ? 'branches are' : 'branch is'} currently unavailable. Will open soon!
      </p>
      <button onClick={() => setIsVisible(false)} className="absolute right-4 hover:rotate-90 transition-transform">
        <X size={16} />
      </button>
    </motion.div>
  );
};

function App() {
  const [appData, setAppData] = useState({ 
    menu: [], 
    branches: [], 
    categories: [], 
    hero: [], 
    testimonials: [], 
    settings: {} 
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  const [isSuggestionPopupOpen, setIsSuggestionPopupOpen] = useState(false);

  // --- 1. FETCH DATA ON LOAD (GET) ---
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await fetch(GAS_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Clean and filter branch data
        const rawBranches = data.branches || [];
        const cleanBranches = rawBranches
          .filter(b => {
            const name = (b.BranchName || b.name || "").toLowerCase();
            const isMall = name.includes("mall") || name.includes("mom") || (name.includes("mysore") && !name.includes("siddharth"));
            return !isMall; 
          })
          .map(b => {
            return b;
          });

        // Robustly parse settings
        let settingsMap = {};
        if (Array.isArray(data.settings)) {
          data.settings.forEach(s => {
            const key = s.Setting || s.key || s.name;
            const value = s.Value || s.value || s.content;
            if (key) settingsMap[key] = value;
          });
        } else {
          settingsMap = data.settings || {};
        }

        setAppData(prev => ({
          menu: data.menu || prev.menu,
          branches: cleanBranches,
          categories: data.categories || prev.categories,
          hero: data.hero || prev.hero,
          testimonials: data.testimonials || prev.testimonials,
          settings: settingsMap
        }));
      } catch (err) {
        console.error("Database Connection Error (CORS or Network):", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSheetData();
  }, []);

  // --- 2. HANDLE FORM SUBMISSIONS (POST) ---
  const submitForm = async (actionType, formData, resetFunction) => {
    setIsSubmitting(true);
    try {
      // Prepare payload with compatibility mappings
      const payload = { ...formData };
      if (actionType === 'contact' && payload.phone) {
        payload.mobile = payload.phone; // Map phone to mobile for sheet compatibility
      }

      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: actionType, ...payload }),
      });
      const result = await response.json();
      
      if (result.status === 'success') {
        const messages = {
          'reservation': 'Table Booked!',
          'suggestion': 'Dish Suggested! Thanks for your input.',
          'contact': 'Message Sent!'
        };
        alert(`${messages[actionType] || 'Success!'} We will contact you shortly.`);
        if (resetFunction) resetFunction();
        return true;
      } else {
        alert('Something went wrong. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Error connecting to the database.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-sutra-deep flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-64 h-32 mb-12 transform scale-90 md:scale-100">
          {/* Base Logo (Shadow/Empty) */}
          <img 
            src="/images/global/sutra-logo.png" 
            alt="Loading..." 
            className="absolute inset-0 w-full h-full object-contain opacity-5 grayscale brightness-200"
          />
          
          {/* Filling Logo */}
          <div className="absolute inset-0 w-full h-full overflow-hidden animate-logo-fill">
            <img 
              src="/images/global/sutra-logo.png" 
              alt="Loading..." 
              className="w-full h-full object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-48 h-48 bg-white/5 rounded-full blur-[80px] animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/20" />
            <p className="font-heading text-[9px] md:text-[11px] text-white/70 uppercase tracking-[0.5em] text-center whitespace-nowrap">
              Crafting Mysore's Finest Pure Veg Experience
            </p>
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/20" />
          </div>
          
          {/* Progress Indicator (Subtle) */}
          <div className="w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-white/30 w-1/2 animate-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <main className="relative bg-sutra-base min-h-screen">
        <NotificationBanner branches={appData.branches} />
        <Navbar />
        <Hero 
          data={appData.hero} 
          settings={appData.settings} 
          branches={appData.branches} 
          onOrderClick={() => setIsOrderPopupOpen(true)}
        />
        <DeliveryMarquee 
          onOrderClick={() => setIsOrderPopupOpen(true)}
          text={appData.settings?.MarqueeText || "Taste the soul of Mysuru · Pure Veg Excellence · Visit us today!"} 
        />
        <AboutUs 
          branches={appData.branches} 
          onOrderClick={() => setIsOrderPopupOpen(true)}
        />
        <InteractiveMenu 
          menu={appData.menu} 
          categories={appData.categories} 
          branches={appData.branches} 
          onSuggest={() => setIsSuggestionPopupOpen(true)}
        />
        
        {/* Suggestion Section */}
        <div className="bg-sutra-base pb-24 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white/40 backdrop-blur-md rounded-[3rem] p-10 md:p-16 border border-sutra-deep/5 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left"
          >
            <div className="max-w-md">
              <h3 className="font-display text-3xl md:text-4xl text-sutra-deep uppercase leading-tight mb-4">
                Not finding what you're <span className="text-sutra-accent">looking for?</span>
              </h3>
              <p className="font-heading text-sm text-sutra-deep/60 uppercase tracking-widest leading-relaxed">
                Suggest your favorite dish and we'll try to add it to our kitchen soon!
              </p>
            </div>
            <button 
              onClick={() => setIsSuggestionPopupOpen(true)}
              className="bg-sutra-deep text-sutra-base px-10 py-5 rounded-2xl font-heading font-bold uppercase tracking-widest text-xs hover:bg-sutra-accent hover:text-sutra-deep transition-all duration-500 shadow-xl active:scale-95 whitespace-nowrap"
            >
              Suggest a Dish
            </button>
          </motion.div>
        </div>
        <Testimonials testimonials={appData.testimonials} branches={appData.branches} />
        <InstagramWall />
        <Contact onContact={submitForm} isSubmitting={isSubmitting} settings={appData.settings} />
        <Footer onReserve={submitForm} isSubmitting={isSubmitting} branches={appData.branches} settings={appData.settings} />
        <FloatingActions settings={appData.settings} branches={appData.branches} />
        <OrderPopup 
          isOpen={isOrderPopupOpen} 
          onClose={() => setIsOrderPopupOpen(false)} 
          branches={appData.branches} 
        />
        <SuggestionPopup 
          isOpen={isSuggestionPopupOpen}
          onClose={() => setIsSuggestionPopupOpen(false)}
          onSubmit={submitForm}
        />
      </main>
    </ErrorBoundary>
  );
}

export default App;
