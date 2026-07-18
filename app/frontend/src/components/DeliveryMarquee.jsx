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
        <span className="font-display text-sm md:text-4xl tracking-tight mx-3 md:mx-6 uppercase whitespace-nowrap">
          {item.value}
        </span>
      );
    }
    const Icon = item.icon;
    return (
      <button
        onClick={onOrderClick}
        className="flex items-center gap-1.5 md:gap-3 px-3.5 md:px-6 py-1.5 md:py-2.5 rounded-full bg-sutra-deep text-sutra-base font-heading uppercase tracking-widest text-[8px] md:text-xs hover:scale-105 transition-all duration-300 mx-3 md:mx-6 shadow-md"
        data-testid={`marquee-${item.value.toLowerCase().includes('swiggy') ? 'swiggy' : 'zomato'}-btn`}
      >
        <Icon className="text-xs md:text-xl" style={{ color: item.color }} />
        {item.value}
      </button>
    );
  };

  return (
    <div className="relative py-2 md:py-6 overflow-hidden bg-transparent select-none z-20 w-[105vw] left-[-2.5vw] -mt-12 md:-mt-16" data-testid="delivery-marquee">
      <div 
        className="bg-sutra-accent text-sutra-deep border-y-2 border-sutra-deep py-2 md:py-6 scale-[1.05] overflow-y-hidden"
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
