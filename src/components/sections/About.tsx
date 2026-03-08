'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section id="about" ref={containerRef} className="relative w-full bg-transparent text-white py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-[1720px] mx-auto">
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="w-full max-w-[95%] lg:max-w-[90%]"
        >
          <h2 className="text-[2.5rem] md:text-6xl lg:text-[5.5rem] font-sans font-medium tracking-tight leading-[1] mb-24 md:mb-40">
            Jesko Jets® is a private aviation operator with over 5,000 missions completed across 150+ countries. From international executives to global industries, our clients trust us to deliver on time, every time.
          </h2>
        </motion.div>

        {/* Features & Logo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Logo & EST Column */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-12 lg:col-span-4 flex items-start gap-3 md:gap-5 uppercase font-sans font-bold text-[10px] md:text-xs tracking-widest text-white/90"
          >
            {/* simple SVG globe */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-90 shrink-0">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            
            {/* jr monogram */}
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1">
               <path d="M4 20 V10 A 6 6 0 0 1 16 10 V20 M26 6 V20 M26 13 A 6 6 0 0 1 38 13" />
            </svg>

            <span className="ml-1 md:ml-2 mt-1 shrink-0">EST.</span>
            
            <div className="flex flex-col ml-4 md:ml-6 mt-1 overflow-hidden shrink-0">
               <span>BY EVGENY DEMIDENKO</span>
               <span>2013</span>
            </div>
          </motion.div>

          {/* Features Column 1 */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-16 lg:gap-24">
            <FeatureCard 
              title="Direct Access to Private Travel"
              desc="Fly beyond boundaries with Jesko Jets. Our global operations ensure seamless, personalized travel experiences — from the first call to landing. Every journey is tailored to your comfort, privacy, and schedule."
            />
            <FeatureCard 
              title="Precision and Excellence"
              desc="Each detail of your flight — from route route planning to in-flight service — reflects our dedication to perfection. Our crew and fleet meet the highest global standards, ensuring reliability in every mission."
            />
          </div>

          {/* Features Column 2 */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-16 lg:gap-24">
             <FeatureCard 
              title="Your Freedom to Enjoy Life"
              desc="We value your time above all. Jesko Jets gives you the freedom to live, work, and relax wherever life takes you — without compromise."
            />
            <FeatureCard 
              title="Global Reach, Personal Touch"
              desc="With access to destinations in over 150 countries, Jesko Jets brings the world closer to you. Our experts manage every aspect of your flight, guaranteeing a smooth and effortless journey."
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, desc }: { title: string, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-5 md:gap-6"
    >
      <h3 className="text-[1.35rem] md:text-2xl lg:text-[1.75rem] font-sans font-medium tracking-tight leading-[1.15] lg:w-4/5">{title}</h3>
      <div className="w-6 md:w-8 h-[1px] bg-white/70"></div>
      <p className="text-sm md:text-[0.95rem] text-white/90 leading-relaxed font-sans">{desc}</p>
    </motion.div>
  );
}
