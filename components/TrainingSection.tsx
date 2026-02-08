import React from 'react';
import { motion } from 'framer-motion';
import { TRAINING_MODULES, EASE_ORGANIC } from '../constants';
import { ScrollReveal } from './ui/ScrollReveal';
import { Sprout, Sun, Droplets, Thermometer } from 'lucide-react';

const icons = {
  Sprout: Sprout,
  Sun: Sun,
  Droplets: Droplets,
  Thermometer: Thermometer,
};

export const TrainingSection: React.FC = () => {
  return (
    <section id="training" className="py-32 bg-earth-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          {/* Text Content */}
          <div className="md:w-1/3 sticky top-32">
            <ScrollReveal>
              <h2 className="text-4xl font-serif text-earth-900 mb-6">Expert Cultivation Training</h2>
              <p className="text-earth-600 leading-relaxed mb-8">
                We share our knowledge openly. Learn the delicate art of mycology through our structured modules, designed to take you from spore to harvest.
              </p>
            </ScrollReveal>
          </div>

          {/* Cards List */}
          <div className="md:w-2/3 grid gap-6">
            {TRAINING_MODULES.map((module, index) => {
              const Icon = icons[module.iconName];
              return (
                <ScrollReveal key={module.id} delay={index * 0.1}>
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-6 p-8 bg-white rounded-xl shadow-sm border border-earth-100 hover:border-moss-200 transition-colors duration-300"
                    whileHover={{ x: 8, transition: { ease: EASE_ORGANIC } }}
                  >
                    <div className="shrink-0 w-16 h-16 bg-moss-50 rounded-full flex items-center justify-center text-moss-600">
                      <motion.div
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                      >
                         <Icon size={28} />
                      </motion.div>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-moss-600 uppercase tracking-wider mb-2 block">
                        {module.duration}
                      </span>
                      <h3 className="text-xl font-serif text-earth-900 mb-2">{module.title}</h3>
                      <p className="text-earth-500 text-sm leading-relaxed">{module.description}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
