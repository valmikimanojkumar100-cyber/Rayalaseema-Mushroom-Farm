import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { NAV_ITEMS, EASE_ORGANIC } from '../constants';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  onContactClick: () => void;
  currentUser?: string;
  onShopClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, onContactClick, currentUser, onShopClick }) => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  const handleNavClick = (e: React.MouseEvent, label: string, href: string) => {
    if (label === 'Contact') {
      e.preventDefault();
      setMobileMenuOpen(false);
      onContactClick();
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: EASE_ORGANIC }}
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-500 ${
          scrolled ? 'bg-earth-50/80 backdrop-blur-md border-b border-earth-200/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl md:text-3xl font-display text-moss-900 whitespace-nowrap cursor-pointer pt-1">
            Rayalaseema <span className="text-moss-600">Mushroom Farm</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.label, item.href)}
                className="text-earth-700 hover:text-moss-700 font-medium text-sm transition-colors relative group cursor-pointer"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-moss-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            {currentUser && (
              <button
                onClick={onShopClick}
                className="text-earth-700 hover:text-moss-700 font-medium text-sm transition-colors relative group cursor-pointer"
              >
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-moss-500 transition-all duration-300 group-hover:w-full" />
              </button>
            )}
            <button 
              onClick={onLoginClick}
              className="ml-4 px-6 py-2.5 rounded-full bg-moss-700 text-white text-sm font-medium hover:bg-moss-800 transition-colors shadow-lg shadow-moss-900/10 hover:shadow-moss-900/20"
            >
              {currentUser ? `Hi, ${currentUser.split(' ')[0]}!` : 'Login / Register'}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-earth-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" },
          closed: { opacity: 0, pointerEvents: "none" }
        }}
        className="fixed inset-0 z-30 bg-earth-50 md:hidden flex flex-col items-center justify-center gap-8"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.label, item.href)}
            className="text-2xl font-serif text-earth-800"
          >
            {item.label}
          </a>
        ))}
        {currentUser && (
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onShopClick?.();
            }}
            className="text-2xl font-serif text-earth-800"
          >
            Shop
          </button>
        )}
        <button 
          onClick={() => {
            setMobileMenuOpen(false);
            onLoginClick();
          }}
          className="mt-4 px-10 py-4 rounded-full bg-moss-700 text-white text-lg font-medium shadow-xl"
        >
          {currentUser ? `Hi, ${currentUser.split(' ')[0]}!` : 'Login / Register'}
        </button>
      </motion.div>
    </>
  );
};