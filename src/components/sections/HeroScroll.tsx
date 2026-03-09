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
            className="absolute inset-0 z-10 w-full max-w-[1720px] mx-auto px-6 md:px-12 pointer-events-auto"
          >
            {/* Center Background Text removed and placed in Header.tsx for scroll animation */}

            <div className="h-full w-full relative pointer-events-none">
              
              {/* Top/Middle Left Title */}
              <h1 className="absolute left-0 top-[22%] text-6xl md:text-8xl lg:text-[110px] tracking-tighter leading-[0.9] font-medium text-white z-10">
                We are<br/>movement
              </h1>
              
              {/* Bottom/Middle Right Title */}
              <h2 className="absolute right-0 top-[52%] lg:top-[58%] text-6xl md:text-8xl lg:text-[110px] tracking-tighter leading-[0.9] font-medium text-white text-right z-10">
                We are<br/>distinction
              </h2>

              {/* Bottom Description */}
              <div className="absolute bottom-8 lg:bottom-12 left-0 right-0 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end z-10 pointer-events-auto">
                {/* Left Bottom */}
                <div className="lg:col-span-4 flex flex-col gap-6 font-sans">
                  <h3 className="text-2xl md:text-[32px] font-medium leading-tight text-white mb-2">Your<br/>freedom to<br/>enjoy life</h3>
                  <div className="w-8 h-[1px] bg-white"></div>
                  <p className="text-xs md:text-[13px] leading-[1.8] text-white font-semibold max-w-[320px]">
                    Every flight is designed around your comfort, time, and ambitions — so you can focus on what truly matters, while we take care of everything else.
                  </p>
                </div>

                {/* Right Bottom */}
                <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end w-full pb-0 lg:pb-8">
                  <div className="w-full h-[1px] bg-white/40 mb-6"></div>
                  <div className="flex justify-between items-center text-[10px] tracking-widest uppercase font-bold text-white font-sans w-full">
                    <button 
                      onClick={() => {
                        const el = document.getElementById('about');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 hover:text-white/70 transition-colors"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      SCROLL DOWN
                    </button>
                    <span>TO START THE JOURNEY</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 bg-gradient-to-t from-[#575252] via-[#5e5b5b]/90 to-transparent pt-32">
        {children}
      </div>
    </div>
  );
}
