'use client';
import { useCanvasScroll } from '@/hooks/useCanvasScroll';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function PlaneMorph() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { images, loading } = useImagePreloader('/sequence-2', 120, 4);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: entranceProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  useCanvasScroll(canvasRef, images, scrollYProgress, { 
    objectFit: 'cover' 
  });

  const canvasY = useTransform(entranceProgress, [0, 1], ["20vh", "0vh"]);
  const canvasScale = useTransform(entranceProgress, [0, 1], [0.85, 1]);

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 1, 1, 0, 0, 0]
  );
  
  const statsOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.85, 0.95, 1],
    [0, 1, 1, 0]
  );

  return (
    <section ref={containerRef} id="flight" className="relative h-[400vh] bg-[#d7cec3]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-[#111111]/50 z-20 font-sans tracking-widest text-sm pointer-events-none">
            LOADING ASSETS...
          </div>
        )}
        <motion.canvas
          ref={canvasRef}
          style={{ y: canvasY, scale: canvasScale }}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        />
        
        {/* Floating Titles Sequence */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute inset-0 z-10 pointer-events-none w-full max-w-[1720px] mx-auto px-6 md:px-12 h-screen relative"
        >
          {/* Top Left: Fly in */}
          <div className="absolute top-[8%] left-6 md:left-12">
            <h2 className="text-[6rem] md:text-[11rem] lg:text-[14rem] font-medium tracking-tighter text-[#2a2724] leading-none">Fly in</h2>
          </div>

          {/* Left sub-text under Fly in */}
          <div className="absolute top-[35%] lg:top-[32%] left-6 md:left-12 mt-4 md:mt-12">
             <h3 className="text-xl md:text-3xl font-medium tracking-tight text-[#2a2724] leading-[1.1] max-w-[200px]">Luxury<br/>that moves<br/>with you</h3>
          </div>
          
          {/* Right Bottom container: Luxury text + paragraph stacked */}
          <div className="absolute bottom-[10%] lg:bottom-[5%] right-0 md:right-12 flex flex-col items-end z-0">
            {/* The giant "Luxury" text */}
            <h2 className="text-[6rem] md:text-[11rem] lg:text-[16rem] font-medium tracking-tighter text-[#2a2724] leading-[0.8] mb-8 relative lg:-mr-8">Luxury</h2>
            
            {/* The paragraph block placed neatly below "Luxury", pushed to the left so it aligns with the 'x'/'u' */}
            <div className="max-w-[280px] md:max-w-[340px] flex flex-col gap-4 relative right-[18%] md:right-[20%] lg:right-[35%]">
               <div className="flex justify-between items-center border-b border-[#2a2724]/20 pb-3 text-[#2a2724] text-[9px] md:text-[10px] font-bold font-sans uppercase tracking-[0.2em] w-full">
                  <span>Gulfstream</span>
                  <span>650ER</span>
               </div>
               <p className="text-[11px] md:text-[12px] text-[#2a2724]/90 leading-relaxed font-medium">Featuring wings designed to minimize anything that could disrupt its natural aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 AI-12 engines, the Gulfstream G650 is engineered for exceptional range and top-end speed.</p>
            </div>
          </div>
        </motion.div>

        {/* Global Stats Outline Sequence */}
        <motion.div 
          style={{ opacity: statsOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none mix-blend-difference text-[#e8e8e8]"
        >
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-[1720px] mx-auto px-6 md:px-12 h-full py-24 pb-[15vh]">
              
              {/* Left Column Data */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full">
                 <div className="mt-8">
                   <p className="text-xl md:text-2xl font-medium tracking-tight mb-0 md:-mb-2">Gulfstream</p>
                   <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-none">650ER</h2>
                 </div>
                 
                 <div className="flex flex-col gap-6 text-[11px] md:text-xs font-bold font-sans uppercase tracking-widest pointer-events-auto">
                    
                    <div className="grid grid-cols-2 gap-4 border-t border-[#e8e8e8]/20 pt-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#e8e8e8]/50">Maximum operating range</span>
                        <span className="text-sm">11,263 km</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[#e8e8e8]/50">Speed</span>
                        <span className="text-sm">480 knots</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#e8e8e8]/50">Passenger capacity</span>
                        <span className="text-sm leading-tight max-w-[150px]">Up to 12 seats (+1 cabin<br/>server)</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[#e8e8e8]/50">Endurance</span>
                        <span className="text-sm leading-tight max-w-[150px]">14 hrs (maximum for<br/>European based aircraft)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-[#e8e8e8]/20 pb-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#e8e8e8]/50">Baggage capacity</span>
                        <span className="text-sm flex items-start">5.52 m<span className="text-[9px] -mt-0.5">3</span></span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[#e8e8e8]/50">Cruising altitude</span>
                        <span className="text-sm">15,544 m</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <span className="text-[#e8e8e8]/50">Specification</span>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1 text-[11px]">
                          <span>Cabin length</span>
                          <span>Cabin width</span>
                          <span>Cabin height</span>
                        </div>
                        <div className="flex flex-col gap-1 text-[11px]">
                          <span className="flex items-start">14.05 m<span className="text-[8px] -mt-0.5">2</span></span>
                          <span className="flex items-start">2.49 m<span className="text-[8px] -mt-0.5">2</span></span>
                          <span className="flex items-start">1.92 m<span className="text-[8px] -mt-0.5">2</span></span>
                        </div>
                      </div>
                    </div>

                 </div>
              </div>

              {/* Center Bottom Button completely removed per user request (relying on main floating button) */}

              {/* Right Column Callout */}
              <div className="lg:col-span-3 lg:col-start-10 flex flex-col justify-start mt-10 lg:mt-12">
                 <h2 className="text-2xl md:text-[1.75rem] font-medium tracking-tight leading-none mb-16 lg:mb-24">Ultra-long-range<br/>Aircraft</h2>
                 
                 <div className="border-t border-[#e8e8e8]/20 pt-6 mb-8 uppercase text-[10px] md:text-xs font-bold tracking-widest">
                   <p className="leading-snug">Direct access to<br/>private travel</p>
                 </div>

                 <p className="text-[#e8e8e8]/80 max-w-[90%] text-sm md:text-[15px] leading-relaxed font-medium">A true time-saving machine it brings Tokyo and New York an hour closer, and at 92% of the speed of sound, it can circle the globe with just a single stop.</p>
              </div>

           </div>
        </motion.div>
      </div>
    </section>
  );
}
