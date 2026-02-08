import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X } from 'lucide-react';
import { EASE_ORGANIC } from '../constants';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-earth-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ ease: EASE_ORGANIC, duration: 0.4 }}
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-earth-400 hover:text-earth-800 hover:bg-earth-50 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="text-center mb-8 mt-2">
              <div className="w-14 h-14 bg-moss-50 rounded-2xl mx-auto flex items-center justify-center text-moss-600 mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-earth-900 mb-2">Get in Touch</h3>
              <p className="text-earth-500 text-sm">
                Have questions about our mushrooms? Reach out to us directly.
              </p>
            </div>

            <div className="space-y-3">
              <a 
                href="tel:9100982233"
                className="flex items-center gap-4 w-full p-4 rounded-xl bg-earth-50 border border-earth-100 text-earth-800 hover:bg-moss-50 hover:border-moss-200 hover:text-moss-800 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-earth-500 group-hover:text-moss-600 shadow-sm">
                  <Phone size={18} />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-earth-400 group-hover:text-moss-500">Call Us</span>
                  <span className="font-medium">91009 82233</span>
                </div>
              </a>

              <a 
                href="https://wa.me/919100982233"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full p-4 rounded-xl bg-green-50 border border-green-100 text-green-900 hover:bg-green-100 hover:border-green-200 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-600 shadow-sm">
                  <MessageCircle size={18} />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-green-600/70">WhatsApp</span>
                  <span className="font-medium">91009 82233</span>
                </div>
              </a>
            </div>
            
            {/* Grain Overlay */}
            <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none mix-blend-multiply" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};