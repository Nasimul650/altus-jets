'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function GlobeFooter() {
  const citiesRow1 = ["Mexico City", "New York", "Los Angeles", "Riyadh", "Paris", "Tel Aviv", "Milan", "Bangkok", "Shanghai"];
  const citiesRow2 = ["Cape Town", "Cairo", "Dubai", "Zurich", "Marrakech", "Miami", "Hong Kong", "Berlin", "Singapore"];
  const citiesRow3 = ["Doha", "Sydney", "Lagos", "Abu Dhabi", "Mykonos", "London", "São Paulo", "Geneva", "Tokyo"];

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section id="global" ref={containerRef} className="relative w-full bg-[#050505] text-white overflow-hidden pb-12 border-t border-white/10">
      
      {/* Background Globe video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
         <video 
            src="/globe-loop.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-70 mix-blend-screen scale-100"
            style={{
              maskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)'
            }}
          />
      </div>

      {/* Top Title Marquee Area */}
      <div className="w-full pt-16 pb-24 relative border-b border-white/10 z-10 bg-gradient-to-b from-[#050505] to-transparent">
         <div className="flex flex-col items-center justify-center relative">
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-sans tracking-tight mb-16 uppercase">Fly anywhere</h2>
            
            <div className="w-full overflow-hidden flex flex-col gap-6 opacity-40 font-sans text-2xl md:text-4xl tracking-tight whitespace-nowrap">
                <motion.div style={{ x: x1 }} className="flex gap-12">
                   {[...citiesRow1, ...citiesRow1, ...citiesRow1].map((city, i) => (
                     <span key={i}>{city}</span>
                   ))}
                </motion.div>
                <motion.div style={{ x: x2 }} className="flex gap-12 ml-[-200px]">
                   {[...citiesRow2, ...citiesRow2, ...citiesRow2].map((city, i) => (
                     <span key={i}>{city}</span>
                   ))}
                </motion.div>
                <motion.div style={{ x: x3 }} className="flex gap-12">
                   {[...citiesRow3, ...citiesRow3, ...citiesRow3].map((city, i) => (
                     <span key={i}>{city}</span>
                   ))}
                </motion.div>
            </div>
         </div>
      </div>

      {/* Middle Contact Section */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 mt-24 mb-24 z-10 relative">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
               <h3 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1] font-sans">
                 <span className="text-white/40 block mb-4">5K+ flights</span>
                 Fly anywhere with <br/> total comfort <br/> and control
               </h3>
            </div>
            
            <div className="lg:col-span-4 flex flex-col mt-12 lg:mt-0">
               <div className="w-full h-[1px] bg-white/20 mb-12"></div>
               <h4 className="text-sm tracking-widest uppercase mb-12 text-white/50">For inquiries</h4>

               <div className="flex flex-col gap-8 text-2xl md:text-4xl tracking-tight font-sans">
                  <a href="mailto:info@jeskojets.com" className="hover:text-white/70 transition-colors group flex items-center gap-4">
                     info@jeskojets.com
                     <span className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">→</span>
                  </a>
                  <a href="tel:+971544325050" className="hover:text-white/70 transition-colors group flex items-center gap-4">
                     +971 54 432 5050
                     <span className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">→</span>
                  </a>
               </div>
            </div>
         </div>
      </div>

      {/* Bottom Legal / Credits */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/50 tracking-widest uppercase font-sans border-t border-white/10 pt-8 z-10 relative">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
          <span>© 2026 Jesko Jets. All rights reserved</span>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>
        <div className="flex items-center gap-2">
           Made by <a href="#" className="text-white hover:text-white/70 transition-colors border-b border-white/30 pb-1">The First The Last</a>
        </div>
      </div>

    </section>
  );
}
