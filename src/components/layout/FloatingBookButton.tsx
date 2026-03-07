'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingBookButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [footerProgress, setFooterProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('global');
      if (!footer) return;
      
      const rect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the footer is visible
      if (rect.top <= windowHeight) {
        // Footer is coming into view
        const visiblePixels = windowHeight - rect.top;
        const progress = Math.min(1, Math.max(0, visiblePixels / (windowHeight / 2))); // normalize to 0-1 over half screen height
        setFooterProgress(progress);
      } else {
        setFooterProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When progress = 0: bottom = 48px (12 * 4)
  // When progress = 1: bottom = 50vh + offset to place it in center
  
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50 flex items-end justify-center">
        <motion.div 
          className="flex gap-3 mix-blend-difference pointer-events-auto"
          style={{
             marginBottom: `calc(3rem + ${footerProgress * 40}vh)`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-white text-black px-6 py-3 rounded-full text-[13px] font-bold tracking-wide hover:bg-white/90 transition-colors shadow-lg"
          >
            Book the Flight
          </button>
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/90 transition-colors shadow-lg overflow-hidden group"
          >
             <motion.div 
                whileHover={{ rotateY: 180, scale: 1.1 }} 
                transition={{ duration: 0.5 }}
                style={{ transformStyle: 'preserve-3d' }}
             >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
                </svg>
             </motion.div>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none pb-4 md:pb-8 px-4 md:px-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 pointer-events-auto backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-[1400px] bg-white text-black rounded-3xl p-6 md:p-12 relative pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.5)] origin-bottom"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center">
                <h2 className="text-4xl md:text-5xl font-sans font-medium tracking-tight">Contact</h2>
                
                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-black/50">Name</label>
                    <input type="text" placeholder="Type..." className="border-b border-black/20 pb-2 bg-transparent outline-none focus:border-black transition-colors text-base md:text-lg placeholder:text-black/30" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-black/50">Email</label>
                    <input type="email" placeholder="Email..." className="border-b border-black/20 pb-2 bg-transparent outline-none focus:border-black transition-colors text-base md:text-lg placeholder:text-black/30" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-black/50">Phone</label>
                    <input type="tel" placeholder="Phone..." className="border-b border-black/20 pb-2 bg-transparent outline-none focus:border-black transition-colors text-base md:text-lg placeholder:text-black/30" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-black/50">Arriving</label>
                    <input type="text" placeholder="City, Country..." className="border-b border-black/20 pb-2 bg-transparent outline-none focus:border-black transition-colors text-base md:text-lg placeholder:text-black/30" />
                  </div>
                </div>

                <div className="flex-shrink-0 mt-4 md:mt-0">
                  <button className="w-14 h-14 md:w-16 md:h-16 bg-[#1a1A1A] hover:bg-black text-white rounded-full flex items-center justify-center transition-colors group">
                     <motion.div whileHover={{ x: 5, y: -5 }} transition={{ duration: 0.2 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
                        </svg>
                     </motion.div>
                  </button>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 md:ml-[calc(theme(spacing.16)+theme(spacing.8)+theme(spacing.4))]">
                <input type="radio" className="w-4 h-4 border border-black/30 focus:ring-0 cursor-pointer appearance-none checked:bg-black rounded-full transition-colors relative before:absolute before:inset-0 before:m-auto before:w-2 before:h-2 before:rounded-full checked:before:bg-white" />
                <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold leading-tight">
                  By submitting, you agree<br/>to our <a href="#" className="underline hover:text-black transition-colors">Privacy Policy</a>
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
