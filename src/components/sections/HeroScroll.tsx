'use client';
import { useCanvasScroll } from '@/hooks/useCanvasScroll';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroScroll({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { images, loading } = useImagePreloader('/sequence-1', 98, 3, 'ezgif-frame-');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useCanvasScroll(canvasRef, images, scrollYProgress);

  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 1], [1, 1, 0, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div className="relative bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-white/50 z-20 font-sans tracking-widest text-sm pointer-events-none">
              LOADING ASSETS...
            </div>
          )}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          />
        </div>
      </div>

      <section ref={containerRef} id="hero" className="relative h-[400vh] z-10 w-full pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full max-w-[1920px] mx-auto px-6 md:px-12 pb-32"
          >
           {/* Top Title */}
           <div className="w-full flex flex-col items-start lg:flex-row lg:justify-between text-white font-sans mt-32 md:mt-48">
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.1]">We are movement</h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.1] mt-2 lg:mt-0 text-right w-full lg:w-auto text-white/90">We are distinction</h2>
           </div>

           {/* Bottom Description */}
           <div className="w-full mt-auto mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 border-t border-white/20 pt-8">
              <div className="lg:col-span-3">
                 <h3 className="text-xl leading-relaxed text-white font-sans">Your <br/>freedom to enjoy life</h3>
              </div>
              <div className="lg:col-span-5 lg:col-start-5">
                 <p className="text-sm md:text-base leading-relaxed text-white/70 font-sans max-w-md">Every flight is designed around your comfort, time, and ambitions — so you can focus on what truly matters, while we take care of everything else.</p>
              </div>
              <div className="lg:col-span-2 lg:col-start-11 flex flex-col items-end justify-center text-xs tracking-widest uppercase text-white/50 text-right">
                 <div className="w-[1px] h-12 bg-white/30 mb-4 animate-pulse"></div>
                 <span>Scroll down</span>
                 <span>To start the journey</span>
              </div>
           </div>
        </motion.div>
        </div>
      </section>

      <div className="relative z-10 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent pt-32">
        {children}
      </div>
    </div>
  );
}
