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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 flex justify-center w-full ${
        isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-12 py-8 flex justify-between items-center">
        {/* Left Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-xs font-sans font-bold tracking-[0.05em] capitalize justify-self-start">
          <a href="#hero" onClick={handleScroll} className="group relative overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">About</span>
            <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white/50">About</span>
          </a>
          <a href="#flight" onClick={handleScroll} className="group relative overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Our Fleet</span>
             <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white/50">Our Fleet</span>
          </a>
          <a href="#benefits" onClick={handleScroll} className="group relative overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Advantages</span>
             <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white/50">Advantages</span>
          </a>
          <a href="#global" onClick={handleScroll} className="group relative overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">Global</span>
             <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white/50">Global</span>
          </a>
        </nav>

        {/* Right Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-xs font-sans font-bold tracking-[0.05em] justify-self-end">
          <a href="tel:+971544325050" className="group relative overflow-hidden whitespace-nowrap">
             <span className="block transition-transform duration-300 group-hover:-translate-y-full">+971 54 432 5050</span>
             <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white/50">+971 54 432 5050</span>
          </a>
          <a href="mailto:info@jeskojets.com" className="group relative overflow-hidden whitespace-nowrap lowercase">
             <span className="block transition-transform duration-300 group-hover:-translate-y-full">info@jeskojets.com</span>
             <span className="block absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white/50">info@jeskojets.com</span>
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
