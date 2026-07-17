import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Star, ChevronUp, ChevronDown, MapPin, Leaf, Heart } from 'lucide-react';
import FadeIn from './FadeIn';

const InteractiveMenu = ({ menu = [], categories = [], branches = [], onSuggest }) => {
  const sheetCategories = categories && categories.length > 0 ? categories : [
    { CategoryName: "Chinese & Fast Food", blurb: "Wok tossed perfection." },
    { CategoryName: "North Indian & Chaat", blurb: "Authentic spices and flavors." },
    { CategoryName: "Punjabi Paratas", blurb: "Hot from the tawa." }
  ];

  // Use a fallback for the initial selected branch
  const firstBranchName = branches && branches.length > 0 ? (branches[0].BranchName || branches[0].name) : 'Vijay Nagar';
  const [selectedBranch, setSelectedBranch] = useState(firstBranchName); 
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const categoryListRef = useRef(null);

  // Sync selectedId with the first category when data loads
  useEffect(() => {
    if (sheetCategories && sheetCategories.length > 0 && !selectedId) {
      setSelectedId(sheetCategories[0].CategoryName || sheetCategories[0].name);
    }
  }, [sheetCategories, selectedId]);

  const activeCategory = useMemo(() => {
    if (!sheetCategories || sheetCategories.length === 0) return {};
    return sheetCategories.find(cat => (cat.CategoryName || cat.name) === selectedId) || sheetCategories[0] || {};
  }, [selectedId, sheetCategories]);

  const filteredItems = useMemo(() => {
    const categoryName = activeCategory.CategoryName || activeCategory.name;
    if (!categoryName || !menu) return [];
    return menu.filter(item => item.Category === categoryName);
  }, [activeCategory, menu]);

  const allItems = useMemo(() => 
    (menu || []).map(item => ({ ...item, categoryName: item.Category })),
    [menu]
  );

  const suggestions = useMemo(() => {
    if (!searchQuery || !allItems) return [];
    return allItems.filter(item => 
      (item.ItemName || "").toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery, allItems]);

  const scrollCategories = (direction) => {
    if (categoryListRef.current) {
      const { scrollTop, clientHeight } = categoryListRef.current;
      const scrollAmount = clientHeight / 2;
      categoryListRef.current.scrollTo({
        top: direction === 'up' ? scrollTop - scrollAmount : scrollTop + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const [highlightedItem, setHighlightedItem] = useState(null);

  const handleSuggestionClick = (item) => {
    setSelectedId(item.Category);
    setSearchQuery('');
    setShowSuggestions(false);
    setHighlightedItem(item.ItemName);

    // Give react time to switch category and render items
    setTimeout(() => {
      const element = document.getElementById(`item-${item.ItemName.replace(/\s+/g, '-').toLowerCase()}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

    // Remove highlight after 3 seconds
    setTimeout(() => setHighlightedItem(null), 3000);
  };

  // If no data is ready, we return null to avoid rendering a broken UI
  const hasData = sheetCategories && sheetCategories.length > 0 && activeCategory && (activeCategory.CategoryName || activeCategory.name);
  if (!hasData) return null;

  return (
    <section id="menu" className="bg-sutra-base py-24 md:py-32 relative overflow-hidden rounded-theme" data-testid="menu-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-20">
          <FadeIn className="flex flex-col gap-12">
            {/* Title Row & Badges */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <div className="font-heading uppercase tracking-[0.4em] text-[10px] text-sutra-deep/60 mb-6 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-sutra-accent" />
                  Sutra Bistro Culinary List
                </div>
                <h2 className="font-display text-[12vw] md:text-[8vw] leading-[0.85] text-sutra-deep uppercase">
                  THE <span className="text-sutra-accent">MENU.</span>
                </h2>
              </div>
              
              {/* Badges Container */}
              <div className="flex flex-wrap gap-4 mb-2">
                <div className="flex items-center gap-2 bg-green-500/5 border border-green-500/20 px-4 py-2.5 rounded-theme shadow-sm">
                  <div className="bg-green-500 p-1 rounded-full">
                    <Leaf size={10} className="text-white" fill="currentColor" />
                  </div>
                  <span className="font-heading text-[9px] uppercase tracking-widest text-green-700 font-bold">Pure Vegetarian</span>
                </div>
                <div className="flex items-center gap-2 bg-sutra-accent/5 border border-sutra-accent/20 px-4 py-2.5 rounded-theme shadow-sm">
                  <div className="bg-sutra-accent p-1 rounded-full">
                    <Heart size={10} className="text-sutra-deep" fill="currentColor" />
                  </div>
                  <span className="font-heading text-[9px] uppercase tracking-widest text-sutra-deep font-bold">Made with Love</span>
                </div>
              </div>
            </div>


            {/* Controls Row: Tabs + Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white/30 backdrop-blur-md p-6 rounded-theme border border-sutra-deep/5 shadow-sm relative z-40">
              {/* Branch Switcher Tabs */}
              <div className="flex flex-col gap-3">
                <span className="font-heading uppercase tracking-[0.2em] text-[9px] text-sutra-deep/75 px-2 font-bold">Select Branch</span>
                <div className="flex bg-white/40 p-1.5 rounded-theme border border-sutra-deep/5">
                  {(branches && branches.length > 0 ? branches : [{ BranchName: 'Vijay Nagar' }, { BranchName: 'Siddharthanagar' }]).map((branch, idx) => {
                    const bName = branch.BranchName || branch.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedBranch(bName)}
                        className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-theme font-heading text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 ${selectedBranch === bName ? 'bg-sutra-deep text-sutra-base shadow-lg' : 'text-sutra-deep/60 hover:text-sutra-deep'}`}
                      >
                        <MapPin size={12} className={selectedBranch === bName ? 'text-sutra-accent' : 'text-sutra-deep/40'} />
                        {bName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search Bar Container */}
              <div className="relative w-full lg:w-96 group pt-5 lg:pt-0">
                <div className="relative flex items-center">
                  <div className="absolute left-3 p-2.5 bg-sutra-accent rounded-theme z-10 flex items-center justify-center shadow-lg">
                    <Search className="w-4 h-4 text-sutra-deep" strokeWidth={3} />
                  </div>
                  <label htmlFor="dish-search" className="sr-only">Search for a dish</label>
                  <input 
                    id="dish-search"
                    type="text" 
                    placeholder="Search for a dish..."
                    aria-label="Search for a dish"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full pl-16 pr-6 py-4 bg-white border border-sutra-deep/10 rounded-theme font-heading text-sm text-sutra-deep outline-none focus:border-sutra-accent/50 transition-all shadow-inner"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} aria-label="Clear search query" className="absolute right-4 p-1 hover:bg-sutra-deep/5 rounded-full transition-colors">
                      <X className="w-4 h-4 text-sutra-deep/40" />
                    </button>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                <AnimatePresence>
                  {showSuggestions && searchQuery && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-white rounded-theme shadow-[0_30px_60px_rgba(48,35,0,0.15)] overflow-hidden z-[100] border border-sutra-deep/5"
                    >
                      {suggestions.length > 0 ? (
                        suggestions.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(item)}
                            className="w-full px-8 py-5 flex flex-col items-start hover:bg-sutra-accent/10 transition-colors border-b border-sutra-deep/5 last:border-0"
                          >
                            <span className="font-heading text-sm font-bold text-sutra-deep">{item.ItemName}</span>
                            <span className="font-heading text-[10px] text-sutra-deep/40 uppercase tracking-widest">{item.Category}</span>
                          </button>
                        ))
                      ) : (
                        <button
                          onClick={() => {
                            onSuggest();
                            setShowSuggestions(false);
                          }}
                          className="w-full px-8 py-8 flex flex-col items-center text-center hover:bg-sutra-accent/5 transition-colors group"
                        >
                          <span className="font-display text-lg text-sutra-deep/40 mb-2 group-hover:text-sutra-deep transition-colors">Not finding what you're looking for?</span>
                          <span className="font-heading text-xs font-bold text-sutra-accent uppercase tracking-[0.2em] underline underline-offset-8">Suggest us a Dish</span>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Categories List */}
          <div className="lg:col-span-4 flex flex-col relative group/nav">
            <div className="font-heading uppercase tracking-[0.3em] text-[10px] text-sutra-deep/30 mb-6 lg:mb-8 px-4 flex justify-between items-center">
              <span>Categories</span>
              <div className="hidden lg:flex gap-3">
                <button 
                  onClick={() => scrollCategories('up')} 
                  className="w-8 h-8 rounded-full bg-sutra-deep text-sutra-base flex items-center justify-center hover:bg-sutra-accent hover:text-sutra-deep transition-all shadow-md"
                >
                  <ChevronUp size={16} strokeWidth={3} />
                </button>
                <button 
                  onClick={() => scrollCategories('down')} 
                  className="w-8 h-8 rounded-full bg-sutra-deep text-sutra-base flex items-center justify-center hover:bg-sutra-accent hover:text-sutra-deep transition-all shadow-md"
                >
                  <ChevronDown size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
            
            {/* Category List: Horizontal on Mobile, Vertical on Desktop */}
            <div 
              ref={categoryListRef}
              className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto max-h-auto lg:max-h-[500px] no-scrollbar pb-4 lg:pb-0 pr-0 lg:pr-4 space-x-3 lg:space-x-0 lg:space-y-3 snap-x lg:snap-none"
            >
              {sheetCategories.map((cat, idx) => {
                const catName = cat.CategoryName || cat.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedId(catName)}
                    className={`group relative snap-start shrink-0 lg:w-[calc(100%-8px)] text-left py-3 lg:py-6 px-5 lg:px-5 rounded-theme transition-all duration-500 flex items-center justify-between border ${selectedId === catName ? 'bg-sutra-deep text-sutra-base shadow-xl border-sutra-deep' : 'bg-white/40 lg:hover:bg-white/80 text-sutra-deep/70 border-sutra-deep/5'}`}
                  >
                    <div className="flex items-center gap-3 lg:gap-6">
                      <span className={`hidden lg:block font-display text-xl transition-colors ${selectedId === catName ? 'text-sutra-accent' : 'text-sutra-deep/20'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-lg lg:text-3xl uppercase tracking-[0.05em] lg:tracking-tighter whitespace-nowrap">
                        {catName}
                      </span>
                    </div>
                    <ChevronRight className={`hidden lg:block w-5 h-5 transition-transform duration-500 ${selectedId === catName ? 'translate-x-0 opacity-100 text-sutra-base' : '-translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-sutra-deep/40'}`} />
                  </button>
                );
              })}
            </div>
            
            {/* Visual fade indicators for scroll (Desktop Only) */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-8 bg-gradient-to-b from-sutra-base to-transparent pointer-events-none z-10" />
            <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-sutra-base to-transparent pointer-events-none z-10" />
          </div>

          {/* Right Column: Category Details & Items */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedId}-${selectedBranch}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-12"
              >
                {/* Category Identity Card */}
                <div className="relative h-64 md:h-80 rounded-theme overflow-hidden group shadow-2xl">
                  {(() => {
                    const catName = activeCategory.CategoryName || activeCategory.name;
                    const bannerMap = {
                      "Chinese & Fast Food": "/images/menu/categories/Chinese & Fast Food/chinese-food.png",
                      "North Indian & Chaat": "/images/menu/categories/North Indian & Chaat/north-indian-chats.jpg",
                      "Punjabi Paratas": "/images/menu/categories/Punjabi Paratas/panjabi-parata.webp",
                      "Freak Shakes & Frappes": "/images/menu/categories/Freak Shakes & Frappes/Freak Shakes & Frappes.jpg",
                      "Filter Coffee & Teas": "/images/menu/categories/Filter Coffee & Teas/filter-coffee.jpg",
                      "Mocktails & Coolers": "/images/menu/categories/Mocktails & Coolers/mocktails.jpg",
                      "Desserts & Bakes": "/images/menu/categories/Desserts & Bakes/desserts.jpg",
                      "Soups & Salads": "/images/menu/categories/Soups & Salads/soups.jpg"
                    };
                    const bannerSrc = bannerMap[catName] || activeCategory.CategoryImage || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=srgb&fm=jpg&w=900&q=85";
                    
                    const convertedSrc = encodeURI(bannerSrc);
                    return (
                      <picture className="w-full h-full block">
                        <source srcSet={convertedSrc.replace(/\.(png|jpg|jpeg|gif)$/i, '.webp')} type="image/webp" />
                        <img 
                          src={convertedSrc} 
                          alt={catName} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                          loading="lazy"
                          width={800}
                          height={320}
                        />
                      </picture>
                    );
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-t from-sutra-deep via-sutra-deep/20 to-transparent opacity-80" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg">
                        <MapPin size={10} className="text-sutra-accent" />
                        <span className="font-heading text-[9px] uppercase tracking-[0.2em] text-white font-bold">
                          Available at {selectedBranch}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-display text-5xl md:text-6xl text-white uppercase mb-4 leading-none">{activeCategory.CategoryName || activeCategory.name}</h3>
                    <p className="font-heading italic text-sutra-base/70 text-sm md:text-base max-w-lg">{activeCategory.CategoryBlurb || activeCategory.blurb}</p>
                  </div>
                  <div className="absolute top-8 right-8 bg-sutra-accent w-14 h-14 rounded-full flex items-center justify-center text-sutra-deep shadow-xl">
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                </div>

                {/* Items List */}
                {filteredItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 px-2">
                    {filteredItems.map((item, idx) => {
                      // Live Availability Logic from Sheet
                      let isAvailable = false;
                      if (selectedBranch === 'Vijay Nagar') isAvailable = item.Avail_VijayNagar;
                      else if (selectedBranch === 'Siddharthanagar') isAvailable = item.Avail_Siddhartha;
                      else if (selectedBranch === 'Mall of Mysore') isAvailable = item.Avail_MallOfMysore;
                      else isAvailable = true; // Fallback

                      const isHighlighted = highlightedItem === item.ItemName;

                      return (
                        <motion.div 
                          key={idx}
                          id={`item-${item.ItemName.replace(/\s+/g, '-').toLowerCase()}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: isHighlighted ? 1.02 : 1,
                            backgroundColor: isHighlighted ? 'rgba(255, 150, 0, 0.1)' : 'transparent',
                          }}
                          transition={{ 
                            delay: idx * 0.1,
                            duration: isHighlighted ? 0.5 : 0.2
                          }}
                          className={`group border-b border-sutra-deep/10 pb-6 flex flex-col gap-2 relative transition-all duration-500 ${isHighlighted ? 'border-sutra-accent/40 rounded-theme p-4 -mx-4 z-10 shadow-[0_0_30px_rgba(255,150,0,0.15)]' : ''} ${!isAvailable ? 'opacity-40 grayscale pointer-events-none' : ''}`}
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex flex-col gap-1">
                              <h4 className="font-display text-2xl uppercase text-sutra-deep group-hover:text-sutra-accent transition-colors leading-none">{item.ItemName}</h4>
                              {item.Tag && (
                                <div className="flex">
                                  <span className="bg-sutra-accent/10 text-sutra-accent px-2 py-0.5 rounded-full font-heading text-[7px] uppercase tracking-widest font-bold">
                                    {item.Tag}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                              <span className="font-heading font-bold text-xl text-sutra-deep leading-none">₹{item.Price}</span>
                              <div className="z-10">
                                {!isAvailable ? (
                                  <span className="bg-red-600 text-white px-2 py-0.5 rounded-[4px] text-[6px] uppercase tracking-widest font-bold shadow-sm whitespace-nowrap">
                                    Currently Not Available
                                  </span>
                                ) : (
                                  <span className="bg-green-600/10 text-green-600 px-2 py-0.5 rounded-[4px] text-[6px] uppercase tracking-widest font-bold border border-green-600/20 whitespace-nowrap">
                                    Available
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {item.Description && (
                            <p className="font-heading text-xs md:text-sm text-sutra-deep/60 leading-relaxed max-w-[85%] mt-1">{item.Description}</p>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-20 text-center bg-white/20 rounded-theme border border-dashed border-sutra-deep/10">
                    <p className="font-heading text-sutra-deep/40 uppercase tracking-widest text-xs">No items in this category yet.</p>
                  </div>
                )}

                {/* Decorative Elements */}
                <div className="pt-8 flex items-center gap-6 opacity-10">
                  <div className="h-[1px] flex-1 bg-sutra-deep" />
                  <span className="font-display text-sm tracking-[0.5em] uppercase">Made with love</span>
                  <div className="h-[1px] flex-1 bg-sutra-deep" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMenu;
