'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const benefits = [
  {
      title: "Pets",
      desc: "Traveling with pets on a private jet means comfort and peace of mind for both owners and their companions. Our dedicated team ensures seamless arrangements, from documentation and safety to onboard care, so that your pet enjoys the same level of attention and luxury as you do. Every detail is managed to create a stress-free and enjoyable journey for everyone on board.",
      image: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1974&auto=format&fit=crop"
  },
  {
      title: "24/7 availability",
      desc: "Our team is available around the clock to handle any request, no matter the time zone or urgency. From last-minute flight arrangements to personalized services, we provide seamless support whenever you need it.",
      image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=2070&auto=format&fit=crop"
  },
  {
      title: "Onboard services",
      desc: "Every flight is tailored with a range of personalized onboard services designed to elevate your journey. From fine dining and curated entertainment to attentive crew and seamless connectivity.",
      image: "https://images.unsplash.com/photo-1559827260-36ca18084ec4?q=80&w=2070&auto=format&fit=crop"
  },
  {
      title: "Efficient",
      desc: "Efficiency is at the core of every flight we operate. From optimized routes and streamlined procedures to quick boarding and smooth ground handling, we make sure your time is always used wisely.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function Benefits() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [time, setTime] = useState<string>("13:28");

  // Keep live local time for Dubai
  useEffect(() => {
    const updateTime = () => {
      const dubaiTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dubai',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      setTime(dubaiTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="benefits" className="w-full bg-[#fdf8f0] text-[#111111] pt-24 pb-12 px-6 md:px-12 font-sans relative z-20">
      <div className="max-w-[1720px] mx-auto relative">
        <h4 className="text-[10px] md:text-xs font-bold tracking-widest uppercase mb-16 md:mb-24 text-[#111111]">A Better Way to Fly</h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24 md:mb-32">
          
          {/* Left: Accordion */}
          <div className="flex flex-col justify-start">
            <div className="border-t border-[#111111]/10">
              {benefits.map((item, i) => (
                <div key={i} className="border-b border-[#111111]/10 py-6 md:py-8">
                  <button
                    onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                    className="w-full flex justify-between items-center text-left focus:outline-none group"
                  >
                    <h3 className="text-[1.75rem] md:text-4xl lg:text-[2rem] font-medium tracking-tight pr-8 text-[#111111] group-hover:text-[#111111]/70 transition-colors">
                      {item.title}
                    </h3>
                    <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                      {/* Horizontal line */}
                      <div className="absolute w-full h-[2px] bg-[#111111]" />
                      {/* Vertical line (animates out when open) */}
                      <motion.div
                        animate={{ 
                          rotate: openIndex === i ? 90 : 0, 
                          opacity: openIndex === i ? 0 : 1 
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute h-full w-[2px] bg-[#111111]"
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-8 pb-4 text-[13px] md:text-[15px] leading-[1.6] text-[#111111]/90 lg:max-w-[85%] font-medium">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[700px] xl:h-[800px] overflow-hidden bg-[#e0dcd5] rounded-sm"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                 key={openIndex !== -1 ? openIndex : 'closed'}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.4, ease: "easeInOut" }}
                 src={benefits[openIndex !== -1 ? openIndex : 0].image} 
                 alt={benefits[openIndex !== -1 ? openIndex : 0].title} 
                 className="absolute inset-0 w-full h-full object-cover object-center filter grayscale-[10%] brightness-95"
              />
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer Statistics */}
        <div className="w-full border-t border-[#111111]/10 pt-8 pb-10 mt-16 text-[#111111]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            {/* Left */}
            <div className="flex flex-col gap-1 w-full justify-start text-left">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#111111]/40">Countries Supported</span>
              <span className="text-[13px] sm:text-[14px] font-bold">174</span>
            </div>

            {/* Center */}
            <div className="flex flex-col gap-1 w-full md:justify-center text-left md:text-center">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#111111]/40">Based In</span>
              <span className="text-[13px] sm:text-[14px] font-bold">Dubai, UAE</span>
            </div>

            {/* Right */}
            <div className="flex w-full justify-start md:justify-end items-center">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#111111]/40 mr-4 md:mr-6 mt-1 md:mt-2">Local Time</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-none">{time}</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
