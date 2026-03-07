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
    <section ref={containerRef} id="flight" className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-white/50 z-20 font-sans tracking-widest text-sm pointer-events-none">
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
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none w-full max-w-[1920px] mx-auto px-6 md:px-12"
        >
          <div className="w-full flex justify-between px-4 md:px-12">
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-sans tracking-tight text-white drop-shadow-2xl -mt-12 md:-mt-24">Fly in</h2>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-sans tracking-tight text-white drop-shadow-2xl text-right mt-12 md:mt-24">Luxury</h2>
          </div>
          <div className="absolute bottom-12 left-6 md:left-12 max-w-sm bg-black/40 p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-white/10">
             <h3 className="text-2xl text-white mb-4 drop-shadow-lg">Luxury<br/>that moves with you</h3>
             <p className="text-sm text-white/90 drop-shadow-md leading-relaxed">Featuring wings designed to minimize anything that could disrupt its natural aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 AI-12 engines, the Gulfstream G650 is engineered for exceptional range and top-end speed.</p>
          </div>
        </motion.div>

        {/* Global Stats Outline Sequence */}
        <motion.div 
          style={{ opacity: statsOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"
        >
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-[1920px] mx-auto px-6 md:px-12 h-full py-24">
              
              {/* Left Column Data */}
              <div className="lg:col-span-3 flex flex-col justify-end text-white">
                 <div className="mb-12">
                   <p className="text-xl">Gulfstream</p>
                   <h2 className="text-5xl tracking-tight">650ER</h2>
                 </div>
                 
                 <div className="flex flex-col gap-4 text-sm font-sans tracking-wide">
                    <div className="flex justify-between border-b border-white/20 pb-4">
                      <span className="text-white/50">Maximum operating range</span>
                      <span>11,263 km</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-4">
                      <span className="text-white/50">Speed</span>
                      <span>480 knots</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-4">
                      <span className="text-white/50">Passenger capacity</span>
                      <span>Up to 12 seats (+1 cabin)</span>
                    </div>
                 </div>
              </div>

              {/* Right Column Callout */}
              <div className="lg:col-span-3 lg:col-start-10 flex flex-col justify-end text-white">
                 <h2 className="text-4xl mb-12">Ultra-long-range Aircraft</h2>
                 <p className="text-white/70 max-w-sm text-sm">A true time-saving machine it brings Tokyo and New York an hour closer, and at 92% of the speed of sound, it can circle the globe with just a single stop.</p>
              </div>

           </div>
        </motion.div>
      </div>
    </section>
  );
}
