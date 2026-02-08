import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

export const Footer: React.FC<{ onTermsClick?: () => void; onPrivacyClick?: () => void }> = ({ onTermsClick, onPrivacyClick }) => {
  return (
    <footer id="footer" className="bg-earth-900 text-earth-200 py-24 relative overflow-hidden">
      {/* Decorative large mushroom outline opacity */}
      <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
         <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
           <circle cx="50" cy="50" r="50" />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-4xl font-display text-earth-50 mb-6">Rayalaseema Mushroom Farm</h2>
            <p className="max-w-sm text-earth-400 font-light leading-relaxed">
              Cultivating the future of food through organic practices and community education. Join us in growing a better world.
            </p>
          </div>
          
          <div>
            <h4 className="text-earth-50 font-medium mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group cursor-pointer">
                <Mail size={18} className="text-moss-400" />
                <span className="group-hover:text-white transition-colors">rayalaseemamushroomfarm@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <Phone size={18} className="text-moss-400" />
                <span className="group-hover:text-white transition-colors">+91 9100982233</span>
              </li>
            </ul>
          </div>

          <div>
             <h4 className="text-earth-50 font-medium mb-6">Follow Us</h4>
             <div className="flex gap-4">
               {[Instagram, Facebook].map((Icon, i) => (
                 <motion.a
                   key={i}
                   href="#"
                   whileHover={{ y: -4, color: '#fff' }}
                   className="w-10 h-10 rounded-full bg-earth-800 flex items-center justify-center text-earth-400 hover:bg-moss-700 transition-colors"
                 >
                   <Icon size={20} />
                 </motion.a>
               ))}
             </div>
          </div>
        </div>

        <div className="border-t border-earth-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-earth-500 gap-4">
          <p className="order-2 md:order-1 text-center md:text-left">&copy; 2024 Rayalaseema Mushroom Farm. All rights reserved.</p>
          
          <p className="order-1 md:order-2 font-display text-2xl text-earth-400 tracking-wide">
            Pure • Organic • Fresh
          </p>

          <div className="order-3 flex gap-6">
            <button 
              onClick={onPrivacyClick}
              className="hover:text-earth-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={onTermsClick}
              className="hover:text-earth-300 transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};