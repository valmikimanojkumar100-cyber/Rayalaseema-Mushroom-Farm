
import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, Variants } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { EASE_ORGANIC } from '../constants';

export const WhatsAppFloating: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Magnetic Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Limit movement range
    if (Math.abs(distanceX) < 100 && Math.abs(distanceY) < 100) {
      x.set(distanceX * 0.2);
      y.set(distanceY * 0.2);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Breathing animation variants
  const breathingVariants: Variants = {
    idle: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 4 // breathes every 8 seconds total cycle roughly
      }
    },
    hover: {
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="fixed bottom-8 right-8 z-50 pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      <motion.a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        variants={breathingVariants}
        animate={isHovered ? "hover" : "idle"}
        className="relative flex items-center justify-center w-16 h-16 rounded-full bg-moss-600 text-white shadow-2xl shadow-moss-900/20 cursor-pointer overflow-hidden group"
        whileTap={{ scale: 0.96 }}
      >
        {/* Glow Effect */}
        <motion.div 
          className="absolute inset-0 bg-moss-400 opacity-0 blur-lg group-hover:opacity-40 transition-opacity duration-500"
        />
        
        {/* Icon */}
        <MessageCircle size={32} strokeWidth={1.5} className="relative z-10" />
      </motion.a>
    </motion.div>
  );
};
