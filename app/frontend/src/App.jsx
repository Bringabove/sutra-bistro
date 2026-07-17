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
import Lenis from 'lenis';

import SuggestionPopup from './components/SuggestionPopup';
import FadeIn from './components/FadeIn';

// Live Google Apps Script Web App URL (Fallback for unsupported actions)
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyoCVd3F3Fvxefk0iOE4ki1PqrKhrHD5bucCxPwu0mXmdUoDID2Kr2spYzYKOKCXk46/exec';

// Live Production Backend URL
const BASE_URL = 'https://sutra-bistro-api.onrender.com';

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
          <pre className="bg-black/30 p-6 rounded-theme text-red-400 font-mono text-xs text-left overflow-auto max-w-2xl max-h-40 mb-10">
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
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (closedBranches.length > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [closedBranches.length]);

  return (
    <AnimatePresence>
      {isVisible && closedBranches.length > 0 && (
        <motion.div 
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          style={{ transformOrigin: 'top' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-red-600 text-white relative z-[100] shadow-lg overflow-hidden flex flex-col"
        >
          <div className="py-3 px-6 flex items-center justify-center gap-4 text-center w-full relative">
            <AlertCircle size={18} className="shrink-0" />
            <p className="font-heading text-[10px] md:text-xs uppercase tracking-widest font-bold">
              Note: Our {closedBranches.join(", ")} {closedBranches.length > 1 ? 'branches are' : 'branch is'} currently unavailable. Will open soon!
            </p>
            <button onClick={() => setIsVisible(false)} className="absolute right-4 hover:rotate-90 transition-transform">
              <X size={16} />
            </button>
          </div>
          {/* Progress Bar */}
          <motion.div 
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-1 bg-sutra-accent bottom-0 left-0"
          />
        </motion.div>
      )}
    </AnimatePresence>
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  const [isSuggestionPopupOpen, setIsSuggestionPopupOpen] = useState(false);

  // --- Lenis Smooth Scrolling ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      lerp: 0.06,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      syncTouch: true
    });
    window.lenis = lenis;

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    // Sync Lenis scroll updates with Framer Motion scroll rendering
    window.addEventListener('resize', () => lenis.resize());

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // --- 1. FETCH DATA ON LOAD (GET) ---
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/data`);
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
        // Loading complete
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

      let fetchUrl = GAS_URL;
      let fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: actionType, ...payload }),
      };

      // Route reservations and contacts to the new production backend
      if (actionType === 'reservation') {
        fetchUrl = `${BASE_URL}/api/reservations`;
        fetchOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        };
      } else if (actionType === 'contact') {
        fetchUrl = `${BASE_URL}/api/contact`;
        fetchOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        };
      }

      const response = await fetch(fetchUrl, fetchOptions);
      const result = await response.json();
      
      // Accept backend model response (response.ok) or GAS success status
      if (response.ok || result.status === 'success') {
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

  return (
    <ErrorBoundary>
      <main className="relative bg-sutra-base min-h-screen overflow-x-hidden">
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
        <FadeIn>
          <AboutUs 
            branches={appData.branches} 
            onOrderClick={() => setIsOrderPopupOpen(true)}
          />
        </FadeIn>
        <InteractiveMenu 
          menu={appData.menu} 
          categories={appData.categories} 
          branches={appData.branches} 
          onSuggest={() => setIsSuggestionPopupOpen(true)}
        />
        
        {/* Suggestion Section */}
        <FadeIn>
          <div className="bg-sutra-base pb-24 px-6">
            <div 
              style={{ borderRadius: 'var(--theme-radius)' }}
              className="max-w-4xl mx-auto bg-white/40 backdrop-blur-md rounded-theme p-10 md:p-16 border border-sutra-deep/5 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left"
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
                className="bg-sutra-deep text-sutra-base px-10 py-5 rounded-theme font-heading font-bold uppercase tracking-widest text-xs hover:bg-sutra-accent hover:text-sutra-deep transition-all duration-500 shadow-xl active:scale-95 whitespace-nowrap"
              >
                Suggest a Dish
              </button>
            </div>
          </div>
        </FadeIn>
        <FadeIn>
          <Testimonials testimonials={appData.testimonials} branches={appData.branches} />
        </FadeIn>
        <InstagramWall />
        <FadeIn>
          <Contact onContact={submitForm} isSubmitting={isSubmitting} settings={appData.settings} />
        </FadeIn>
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
