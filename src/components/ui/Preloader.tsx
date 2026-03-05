'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple mock preloader for visual 1:1 parity (production would wait for assets)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden pointer-events-none"
        >
          {/* Subtle radial gradient background mask from HTML */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 60%)'
            }}
          />
          
          <div className="relative z-10 flex flex-col items-center text-center font-sans">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-4xl font-semibold tracking-wide mb-4"
            >
              Jesko Jets
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xs md:text-sm tracking-widest uppercase text-white/50"
            >
              Private jet charter worldwide
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
