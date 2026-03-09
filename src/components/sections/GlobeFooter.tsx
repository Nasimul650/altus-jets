'use client';
import { motion, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function GlobeFooter() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cities = [
    "Paris", "Mexico City", "Miami", "Nice", "Tel Aviv", 
    "Cairo", "Dubai", "Doha", "Bangkok", "London", 
    "Tokyo", "New York", "Singapore"
  ];

  const [cityIndex, setCityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex((prev) => (prev + 1) % cities.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [cities.length]);

  return (
    <section id="global" ref={containerRef} className="relative w-full bg-[#111111] text-[#e8e8e8]">
      
      {/* Sticky Background Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-end pointer-events-none z-0">
        
        {/* Massive Faded "Global" Background Text */}
        <div className="absolute inset-0 flex items-center justify-center select-none pt-20">
          <h1 className="text-[25vw] font-sans font-medium tracking-tighter text-white/[0.03] leading-none whitespace-nowrap">Global</h1>
        </div>

        {/* Background Globe video */}
        <div className="absolute bottom-0 w-full flex justify-center translate-y-[35%] md:translate-y-[25%] opacity-90 mix-blend-screen scale-110">
           <video 
              src="/globe-loop.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              controlsList="nodownload"
              className="w-full max-w-[1200px] h-auto object-cover"
              style={{
                maskImage: 'radial-gradient(ellipse at bottom, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at bottom, black 40%, transparent 80%)'
              }}
            />
        </div>
      </div>

      {/* Foreground Scrollable Content */}
      <div className="relative z-10 -mt-[100vh]">

        {/* SECTION 1: Destinations (Image 1) */}
        <div className="w-full min-h-screen flex items-center justify-center pt-24 pb-24 border-b border-transparent">
           <div className="max-w-[1720px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
              
              <div className="flex items-center gap-8 md:gap-16">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-sans tracking-tight font-medium text-white">Fly anywhere</h2>
                <div className="flex items-center gap-4 text-white/50">
                  <div className="w-8 md:w-16 h-[1px] bg-white/20"></div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white transform rotate-45">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                  <div className="w-8 md:w-16 h-[1px] bg-white/20"></div>
                </div>
              </div>

              {/* Vertical Scroll List style with fading */}
              <div className="relative h-[250px] overflow-hidden mask-fade-vertical flex flex-col justify-center pr-12 w-[200px] md:w-[250px]">
                 <motion.div
                   animate={{ y: -(cityIndex * 48) }}
                   transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                   className="flex flex-col absolute top-[50%] mt-[-24px] items-start w-full"
                 >
                   {cities.map((city, index) => {
                     // Determine styling based on distance from active index
                     const distance = Math.abs(index - cityIndex);
                     const isTarget = distance === 0;
                     const isAdjacent1 = distance === 1;
                     const isAdjacent2 = distance === 2;
                     const isAdjacent3 = distance === 3;
                     
                     let opacityClass = "text-white/5";
                     if (isTarget) opacityClass = "text-white tracking-normal font-semibold";
                     else if (isAdjacent1) opacityClass = "text-white/60";
                     else if (isAdjacent2) opacityClass = "text-white/30";
                     else if (isAdjacent3) opacityClass = "text-white/10";

                     return (
                       <div key={index} className={`transition-all duration-500 h-[48px] flex items-center text-xl md:text-2xl lg:text-3xl font-sans tracking-tight font-medium whitespace-nowrap ${opacityClass}`}>
                         {city}
                       </div>
                     );
                   })}
                 </motion.div>
              </div>
           </div>
        </div>

        {/* SECTION 2: Stats Card (Image 2) */}
        <div className="w-full min-h-screen flex items-center relative pb-32">
          <div className="ml-[10%] lg:ml-[20%] xl:ml-[25%] pointer-events-none mt-[10vh]">
            <div className="bg-[#fdf8f0] text-[#111111] p-8 md:p-12 pb-16 w-[300px] md:w-[380px] rounded-sm shadow-2xl relative">
              <h3 className="text-6xl md:text-7xl font-sans font-medium tracking-tighter leading-[0.9] mb-8">5K+<br/>flights</h3>
              <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest border-t border-black/10 pt-4 mb-24">Successfully arranged</p>
              
              <div className="relative border-l border-black/20 pl-4 py-1">
                 <div className="absolute -left-5 -top-8 text-black opacity-90 w-12 h-12">
                   {/* Custom SVG similar to 'JR' logo from screenshot */}
                   <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="4" className="w-full h-full">
                     <path d="M20 40 C 20 20, 40 20, 40 40" strokeLinecap="round" />
                     <path d="M60 40 C 60 20, 80 20, 80 40" strokeLinecap="round" />
                   </svg>
                 </div>
                 <p className="text-[11px] md:text-sm font-medium leading-relaxed mt-2 text-black/80">Each journey reflects years of expertise, precision, and trust. From last-minute charters to intercontinental business routes — Altus Jets ensures safety, discretion, and excellence in every flight.</p>
              </div>

              {/* Top right barcode element */}
              <div className="absolute top-6 right-6 w-8 h-32 flex justify-between opacity-80">
                <div className="w-[1px] h-full bg-black/60 shadow-[2px_0_0_rgba(0,0,0,0.6),4px_0_0_rgba(0,0,0,0.6),12px_0_0_rgba(0,0,0,0.6),16px_0_0_rgba(0,0,0,0.6),20px_0_0_rgba(0,0,0,0.6)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Final Footer (Image 3) */}
        <div className="w-full min-h-[90vh] flex flex-col justify-end pb-12 pt-32 relative z-10 pointer-events-auto">
          <div className="max-w-[1720px] mx-auto w-full px-6 md:px-12">
             {/* Top Grid of Footer */}
             <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end mb-24 md:mb-48">
                 
                 {/* Left Text */}
                 <div className="md:col-span-5 lg:col-span-4">
                   <h3 className="text-2xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] font-sans font-medium text-white max-w-[340px]">
                     Fly anywhere with total comfort and control
                   </h3>
                 </div>
                
                 {/* Right Contacts & "FOR INQUIRIES" */}
                 <div className="md:col-span-7 lg:col-span-8 flex justify-between items-end relative w-full h-full">
                   
                   <div className="hidden lg:block absolute left-[-40px] xl:left-[-120px] top-1/2 -translate-y-1/2 w-16 h-[1px] bg-white/30"></div>

                   <div className="flex flex-col gap-1 text-base md:text-[20px] font-sans font-bold tracking-tight text-white mb-2 ml-auto lg:ml-0 mr-auto lg:mr-0 z-10 w-full lg:w-auto mt-12 lg:mt-0">
                      <a href="mailto:info@altusjets.com" className="hover:text-white/70 transition-colors py-1">
                         info@altusjets.com
                      </a>
                      <a href="tel:+971544325050" className="hover:text-white/70 transition-colors py-1">
                         +971 54 432 5050
                      </a>
                   </div>

                   <div className="text-right absolute right-0 bottom-0 lg:static">
                      <h4 className="text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase text-white leading-tight">
                        For<br/>inquiries
                      </h4>
                   </div>
                 </div>
             </div>

             {/* Absolute Bottom Legal / Credits Line */}
             <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] md:text-[10px] text-white/50 tracking-[0.15em] font-bold uppercase font-sans border-t border-white/20 pt-8 w-full z-10 pb-4">
                <div className="flex flex-col sm:flex-row items-center justify-between w-full md:w-auto gap-4 md:gap-32">
                  <span className="w-8 h-[1px] bg-white/20 hidden md:block"></span>
                  <span>©2026 ALTUS JETS. ALL RIGHTS RESERVED</span>
                  <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between w-full md:w-auto gap-4 md:gap-32 relative pr-4">
                  <span className="text-white/30 text-center w-full sm:w-auto border-transparent lg:border-r border-white/20 pr-0 lg:pr-32 py-1">MADE BY</span>
                  <div className="flex items-center gap-2">
                     <a href="#" className="text-white/50 hover:text-white transition-colors">THE FIRST THE LAST</a>
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/50 ml-1"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>
                  </div>
                </div>
             </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        .mask-fade-vertical {
          mask-image: linear-gradient(to bottom, transparent, black 40%, black 60%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 40%, black 60%, transparent);
        }
      `}</style>
    </section>
  );
}
