'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Benefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const benefits = [
    {
      title: "Pets",
      desc: "Traveling with pets on a private jet means comfort and peace of mind for both owners and their companions. Our dedicated team ensures seamless arrangements, from documentation and safety to onboard care, so that your pet enjoys the same level of attention and luxury as you do."
    },
    {
      title: "24/7 availability",
      desc: "Our team is available around the clock to handle any request, no matter the time zone or urgency. From last-minute flight arrangements to personalized services, we provide seamless support whenever you need it."
    },
    {
      title: "Onboard services",
      desc: "Every flight is tailored with a range of personalized onboard services designed to elevate your journey. From fine dining and curated entertainment to attentive crew and seamless connectivity."
    },
    {
      title: "Efficient",
      desc: "Efficiency is at the core of every flight we operate. From optimized routes and streamlined procedures to quick boarding and smooth ground handling, we make sure your time is always used wisely."
    }
  ];

  return (
    <section id="benefits" className="relative w-full bg-[#050505] text-white pt-48 pb-24 md:pt-64 md:pb-48 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1920px] mx-auto z-10 relative">
         
         {/* Title Area */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32">
            <h2 className="text-4xl md:text-6xl lg:text-8xl tracking-tight font-sans">A Better Way<br/>to Fly</h2>
            <div className="mt-8 md:mt-0 text-white/50 text-sm tracking-widest uppercase flex items-center gap-4">
              <span>01</span>
              <div className="w-12 h-[1px] bg-white/30"></div>
              <span>04</span>
            </div>
         </div>

         {/* Sticky Cards Layout */}
         <div className="relative w-full" ref={containerRef}>
            {benefits.map((item, i) => (
               <BenefitCard key={i} index={i} total={benefits.length} {...item} />
            ))}
         </div>

      </div>
    </section>
  );
}

function BenefitCard({ title, desc, index, total }: { title: string, desc: string, index: number, total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start center"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ y, opacity, top: `calc(10vh + ${index * 40}px)` }}
      className="sticky w-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 mb-8 lg:w-3/4 mx-auto shadow-[0_0_50px_rgba(255,255,255,0.03)]"
    >
       <div className="flex justify-between items-start mb-12">
          <div className="text-white/30 text-2xl font-sans tracking-widest uppercase">
            0{index + 1}
          </div>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>
       </div>
       <div className="flex flex-col md:flex-row gap-8 md:gap-24">
          <h3 className="text-3xl md:text-5xl font-sans tracking-tight md:w-1/2">{title}</h3>
          <p className="text-base md:text-lg leading-relaxed text-white/70 font-sans md:w-1/2">{desc}</p>
       </div>
    </motion.div>
  );
}
