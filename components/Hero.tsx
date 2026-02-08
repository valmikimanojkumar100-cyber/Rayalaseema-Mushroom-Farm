
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, Variants } from 'framer-motion';
import { Button } from './ui/Button';
import { EASE_ORGANIC } from '../constants';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Parallax Logic
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 1000], [0, 400]); // 0.4x speed roughly
  const smoothY = useSpring(yRange, { stiffness: 100, damping: 20 });
  const y = shouldReduceMotion || isMobile ? 0 : smoothY;

  // Text Reveal Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const textMaskVariants: Variants = {
    hidden: { y: "110%" },
    visible: { 
      y: 0,
      transition: { duration: 1, ease: EASE_ORGANIC }
    }
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-[120%] absolute -top-[10%] bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/hero-bg.png')",
            filter: "brightness(0.75) saturate(0.9)" 
          }}
        />
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-grain opacity-40 mix-blend-overlay" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-earth-50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Tagline */}
          <motion.span variants={fadeUpVariants} className="inline-block px-4 py-1 mb-6 border border-earth-200/30 rounded-full text-xs uppercase tracking-widest bg-earth-900/20 backdrop-blur-sm">
            Premium Organic Cultivation
          </motion.span>

          {/* Headline with Masking (Desktop) or Fade (Mobile) */}
          <div className="overflow-hidden mb-2">
            <motion.h1 
              variants={isMobile ? fadeUpVariants : textMaskVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] tracking-tight"
            >
              Cultivating Nature’s
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
             <motion.h1 
              variants={isMobile ? fadeUpVariants : textMaskVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] tracking-tight text-moss-300 italic"
            >
              Quiet Intelligence
            </motion.h1>
          </div>

          {/* Subhead */}
          <motion.p 
            variants={fadeUpVariants}
            className="max-w-xl text-lg md:text-xl text-earth-100/90 leading-relaxed mb-10 font-light"
          >
            Sustainable mushroom farming delivering the freshest organic fungi directly to your table, rooted in trust and grown with care.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4">
            <Button>Explore Varieties</Button>
            <Button variant="outline" className="text-earth-50 border-earth-50 hover:bg-earth-50 hover:text-earth-900">
              Our Process
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Soft gradient at bottom to blend into next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-earth-50 to-transparent pointer-events-none" />
    </section>
  );
};
