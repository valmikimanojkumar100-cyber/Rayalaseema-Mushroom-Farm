import React from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS, EASE_ORGANIC } from '../constants';
import { ScrollReveal } from './ui/ScrollReveal';

const StatCounter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quart
        const ease = 1 - Math.pow(1 - progress, 4);
        
        setDisplayValue(start + (end - start) * ease);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-serif text-moss-800">
      {displayValue.toFixed(value % 1 !== 0 ? 1 : 0)}{suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  return (
    <section id="nutrition" className="py-24 bg-earth-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: "radial-gradient(#5e4d41 1px, transparent 1px)", backgroundSize: "32px 32px" }} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal width="100%">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-earth-300/50">
            {STATS.map((stat, index) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: EASE_ORGANIC }}
                className="py-8 md:py-0 px-4 flex flex-col items-center"
              >
                {/* Pulsing Dot */}
                <motion.div 
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: 0, delay: index * 0.2 + 0.5 }}
                  className="w-2 h-2 rounded-full bg-moss-500 mb-6"
                />

                <div className="mb-2">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <h4 className="text-lg font-medium text-earth-800 mb-2">{stat.label}</h4>
                <p className="text-earth-500 text-sm max-w-[200px] mx-auto">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
