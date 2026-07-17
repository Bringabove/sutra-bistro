import React from 'react';
import Marquee from 'react-fast-marquee';
import { SiSwiggy, SiZomato } from 'react-icons/si';
import { Star } from 'lucide-react';

const DeliveryMarquee = ({ onOrderClick }) => {
  const content = [
    { type: 'text', value: 'Craving at home?' },
    { type: 'pill', value: 'Order on Swiggy', icon: SiSwiggy, color: '#FC8019' },
    { type: 'text', value: "We're delivering the best." },
    { type: 'pill', value: 'Order on Zomato', icon: SiZomato, color: '#E23744' },
    { type: 'text', value: 'Hot. Fresh. To your door.' },
  ];

  const Item = ({ item }) => {
    if (item.type === 'text') {
      return (
        <span className="font-display text-2xl md:text-4xl tracking-tight mx-6 uppercase whitespace-nowrap">
          {item.value}
        </span>
      );
    }
    const Icon = item.icon;
    return (
      <button
        onClick={onOrderClick}
        className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-sutra-deep text-sutra-base font-heading uppercase tracking-widest text-[10px] md:text-xs hover:scale-105 transition-all duration-300 mx-6 shadow-md"
        data-testid={`marquee-${item.value.toLowerCase().includes('swiggy') ? 'swiggy' : 'zomato'}-btn`}
      >
        <Icon className="text-lg md:text-xl" style={{ color: item.color }} />
        {item.value}
      </button>
    );
  };

  return (
    <div className="relative py-6 md:py-8 overflow-hidden bg-transparent select-none z-20 w-[105vw] left-[-2.5vw] -mt-12 md:-mt-16" data-testid="delivery-marquee">
      <div 
        className="bg-sutra-accent text-sutra-deep border-y-2 border-sutra-deep py-6 md:py-8 scale-[1.05] overflow-y-hidden"
        style={{ transform: 'skewY(-2deg)', outline: '1px solid #d89d03', backfaceVisibility: 'hidden' }}
      >
        <Marquee speed={60} gradient={false} pauseOnHover>
          <div className="flex items-center overflow-y-hidden py-2">
            {[...content, ...content, ...content].map((item, idx) => (
              <React.Fragment key={idx}>
                <Item item={item} />
                <Star className="w-5 h-5 md:w-6 md:h-6 text-sutra-deep fill-sutra-deep mx-6 opacity-30" />
              </React.Fragment>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default DeliveryMarquee;
