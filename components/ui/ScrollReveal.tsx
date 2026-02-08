
import React, { ReactNode, useRef } from 'react';
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';
import { EASE_ORGANIC, DURATION_DEFAULT } from '../../constants';

interface ScrollRevealProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  className?: string;
  blurEffect?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  width = 'fit-content', 
  delay = 0,
  className = "",
  blurEffect = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const shouldReduceMotion = useReducedMotion();

  // Desktop Animation Variants
  const desktopVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 24, 
      filter: blurEffect ? 'blur(4px)' : 'none' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: DURATION_DEFAULT, 
        ease: EASE_ORGANIC, 
        delay: delay 
      }
    }
  };

  // Mobile/Reduced Motion Variants
  const simpleVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: 'easeOut',
        delay: delay 
      } 
    }
  };

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={shouldReduceMotion ? simpleVariants : desktopVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};
