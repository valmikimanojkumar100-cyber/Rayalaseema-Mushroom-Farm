import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EASE_ORGANIC } from '../../constants';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'outline';
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "relative px-8 py-4 rounded-full font-medium tracking-wide transition-all overflow-hidden flex items-center justify-center gap-2 group";
  const variants = {
    primary: "bg-moss-800 text-moss-50 hover:bg-moss-900 shadow-lg shadow-moss-900/10",
    outline: "border border-earth-400 text-earth-800 hover:border-earth-600 hover:bg-earth-100/50"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: EASE_ORGANIC }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {icon && (
        <motion.span
          className="relative z-10"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ ease: EASE_ORGANIC }}
        >
          <ArrowRight size={18} />
        </motion.span>
      )}
    </motion.button>
  );
};