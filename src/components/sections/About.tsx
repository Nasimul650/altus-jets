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
    <section id="about" ref={containerRef} className="relative w-full bg-transparent text-white py-24 md:py-48 px-6 md:px-12">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          <motion.div 
            style={{ opacity: textOpacity, y: textY }}
            className="lg:col-span-8 lg:col-start-2"
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-sans tracking-tight leading-tight mb-12">
              <span className="text-white/50">Jesko Jets® is a private aviation operator with over </span>
              5,000 missions completed across 150+ countries. 
              <span className="text-white/50"> From international executives to global industries, our clients trust us to deliver on time, every time.</span>
            </h2>
          </motion.div>

          {/* Established Info Box */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 lg:col-start-10 flex flex-col justify-end"
          >
             <div className="border border-white/20 p-6 flex items-center justify-between font-sans text-xs tracking-widest uppercase">
               <span className="text-white/50">EST.</span>
               <div className="text-right">
                  <span className="block mb-1">BY EVGENY DEMIDENKO</span>
                  <span className="block">2013</span>
               </div>
             </div>
          </motion.div>

        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-32 border-t border-white/20 pt-16">
          <FeatureCard 
            title="Direct Access to Private Travel"
            desc="Fly beyond boundaries with Jesko Jets. Our global operations ensure seamless, personalized travel experiences — from the first call to landing. Every journey is tailored to your comfort, privacy, and schedule."
          />
          <FeatureCard 
            title="Your Freedom to Enjoy Life"
            desc="We value your time above all. Jesko Jets gives you the freedom to live, work, and relax wherever life takes you — without compromise."
          />
          <FeatureCard 
            title="Precision and Excellence"
            desc="Each detail of your flight — from route planning to in-flight service — reflects our dedication to perfection. Our crew and fleet meet the highest global standards, ensuring reliability in every mission."
          />
          <FeatureCard 
            title="Global Reach, Personal Touch"
            desc="With access to destinations in over 150 countries, Jesko Jets brings the world closer to you. Our experts manage every aspect of your flight, guaranteeing a smooth and effortless journey."
          />
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
      className="flex flex-col gap-6"
    >
      <h3 className="text-xl md:text-2xl font-sans font-medium tracking-tight h-16">{title}</h3>
      <div className="w-full h-[1px] bg-white/20"></div>
      <p className="text-sm text-white/60 leading-relaxed font-sans">{desc}</p>
    </motion.div>
  );
}
