'use client';
import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 flex justify-center w-full ${
        isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1920px] px-6 md:px-12 py-6 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-[10px] lg:text-xs font-sans tracking-widest uppercase justify-self-start">
          <a href="#about" className="group relative overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">About</span>
            <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white/50">About</span>
          </a>
          <a href="#flight" className="group relative overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Our Fleet</span>
             <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white/50">Our Fleet</span>
          </a>
          <a href="#benefits" className="group relative overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Advantages</span>
             <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white/50">Advantages</span>
          </a>
          <a href="#global" className="group relative overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Global</span>
             <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white/50">Global</span>
          </a>
        </nav>

        {/* Center Logo */}
        <a href="#hero" className="justify-self-start md:justify-self-center text-white text-xl md:text-2xl font-sans font-semibold tracking-widest uppercase">
          Altus Jets
        </a>

        {/* Right Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-[10px] lg:text-xs font-sans tracking-widest uppercase justify-self-end">
          <a href="tel:+971544325050" className="group relative overflow-hidden whitespace-nowrap">
             <span className="block transition-transform duration-300 group-hover:-translate-y-full">+971 54 432 5050</span>
             <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white/50">+971 54 432 5050</span>
          </a>
          <a href="mailto:info@altusjets.com" className="group relative overflow-hidden whitespace-nowrap">
             <span className="block transition-transform duration-300 group-hover:-translate-y-full">info@altusjets.com</span>
             <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white/50">info@altusjets.com</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden justify-self-end w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50 mix-blend-difference">
          <div className="w-full h-[1px] bg-white"></div>
          <div className="w-full h-[1px] bg-white"></div>
        </button>
      </div>
    </motion.header>
  );
}
