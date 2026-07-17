import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UtensilsCrossed, Send, Sparkles } from 'lucide-react';

const SuggestionPopup = ({ isOpen, onClose, onSubmit }) => {
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

  const [DishName, setDishName] = useState('');
  const [SpecialDetails, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!DishName) return;
    
    setIsSubmitting(true);
    const success = await onSubmit('suggestion', { DishName, SpecialDetails });
    setIsSubmitting(false);
    
    if (success) {
      setIsSuccess(true);
      setDishName('');
      setDescription('');
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-sutra-deep/80 backdrop-blur-md"
          />
          
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-sutra-base rounded-theme overflow-y-auto overscroll-contain max-h-[90vh] shadow-2xl border border-white/20"
          >
            {/* Header */}
            <div className="relative h-32 bg-sutra-deep flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-32 h-32 bg-sutra-accent rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-sutra-accent rounded-full blur-[60px] translate-x-1/2 translate-y-1/2" />
              </div>
              <Sparkles className="absolute top-4 right-8 text-sutra-accent/20 w-16 h-16" />
              <div className="relative z-10 flex flex-col items-center">
                <UtensilsCrossed className="text-sutra-accent mb-2" size={24} />
                <h3 className="font-display text-2xl text-white uppercase tracking-wider">Suggest a Dish</h3>
              </div>
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-10 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="text-green-500" size={40} />
                  </div>
                  <div>
                    <h4 className="font-display text-3xl text-sutra-deep uppercase mb-4">Thank You!</h4>
                    <p className="font-heading text-sm text-sutra-deep/60 leading-relaxed uppercase tracking-widest px-4">
                      Your suggestion has been received. We'll try to add it to our kitchen soon!
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="font-heading text-xs text-sutra-deep/60 uppercase tracking-widest text-center mb-4">
                    Not finding what you're looking for? <br />
                    <span className="text-sutra-deep font-bold">Tell us and we'll try to add it!</span>
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="font-heading text-[10px] uppercase tracking-widest text-sutra-deep/40 ml-2">Dish Name *</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Exotic Fruit Salad"
                        value={DishName}
                        onChange={(e) => setDishName(e.target.value)}
                        className="w-full px-6 py-4 bg-white/50 border border-sutra-deep/10 rounded-theme font-heading text-sm text-sutra-deep outline-none focus:border-sutra-accent focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-heading text-[10px] uppercase tracking-widest text-sutra-deep/40 ml-2">Any special details? (Optional)</label>
                      <textarea 
                        rows={3}
                        placeholder="Describe how you'd like it..."
                        value={SpecialDetails}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-6 py-4 bg-white/50 border border-sutra-deep/10 rounded-theme font-heading text-sm text-sutra-deep outline-none focus:border-sutra-accent focus:bg-white transition-all resize-none"
                      />
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-sutra-deep text-sutra-base py-5 rounded-theme font-heading font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-sutra-accent hover:text-sutra-deep transition-all duration-500 shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Send Suggestion'}
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuggestionPopup;
