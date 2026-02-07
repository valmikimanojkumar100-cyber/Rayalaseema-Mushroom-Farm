
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MushroomCard } from './components/MushroomCard';
import { StatsSection } from './components/StatsSection';
import { TrainingSection } from './components/TrainingSection';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { ScrollReveal } from './components/ui/ScrollReveal';
import { LoginPage } from './components/LoginPage';
import { ContactModal } from './components/ContactModal';
import { ShopDashboard } from './components/ShopDashboard';
import { CheckoutPage } from './components/CheckoutPage';
import { MUSHROOMS } from './constants';
import { CartItem, ShopProduct } from './types';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'login' | 'shop' | 'checkout'>('home');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleLoginSuccess = (userName: string) => {
    setCurrentUser(userName);
    setView('shop');
  };

  const handleAddToCart = (product: ShopProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const handlePaymentSuccess = () => {
    setCart([]);
    setView('shop');
    setShowOrderSuccess(true);
    setTimeout(() => setShowOrderSuccess(false), 5000);
  };

  if (view === 'login') {
    return (
      <LoginPage 
        onBack={() => setView('home')} 
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (view === 'shop') {
    return (
      <>
        <ShopDashboard 
          userName={currentUser}
          cart={cart}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          onLogout={() => {
            setCurrentUser('');
            setCart([]);
            setView('home');
          }}
          onCheckout={() => setView('checkout')}
        />
        <AnimatePresence>
          {showOrderSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-moss-700 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3"
            >
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-medium">Order placed successfully! We will contact you soon.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  if (view === 'checkout') {
    return (
      <CheckoutPage 
        cart={cart}
        totalAmount={cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
        onBack={() => setView('shop')}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <div className="antialiased text-earth-900 bg-earth-50 min-h-screen flex flex-col">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-moss-500 origin-left z-50"
        style={{ scaleX }}
      />

      <Header 
        onLoginClick={() => setView('login')} 
        onContactClick={() => setIsContactOpen(true)}
      />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Varieties Grid */}
        <section id="varieties" className="py-24 md:py-32 max-w-7xl mx-auto px-6">
          <ScrollReveal className="mb-16 text-center mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif text-earth-900 mb-6">Signature Harvests</h2>
            <p className="text-earth-600 leading-relaxed">
              Grown on locally sourced oak and soy hulls, our mushrooms are harvested at the peak of their nutritional density.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MUSHROOMS.map((mushroom, index) => (
              <ScrollReveal key={mushroom.id} delay={index * 0.12} blurEffect={false}>
                <MushroomCard mushroom={mushroom} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        <StatsSection />
        
        <TrainingSection />

        {/* Call to Action Section */}
        <section className="py-32 bg-moss-900 text-moss-50 text-center px-6 relative overflow-hidden">
           {/* Abstract organic shape */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-moss-800/30 rounded-full blur-3xl -z-1" />
           
           <ScrollReveal className="mx-auto max-w-4xl">
             <h2 className="text-4xl md:text-6xl font-serif mb-8">Ready to start growing?</h2>
             <p className="text-moss-200 max-w-xl mx-auto mb-10 text-lg">
               Whether you want to buy fresh produce or learn the trade, we are here to support your journey into the fungal kingdom.
             </p>
             <button 
               onClick={() => setIsContactOpen(true)}
               className="bg-white text-moss-900 px-10 py-4 rounded-full font-semibold hover:bg-moss-100 hover:scale-105 transition-all duration-300 shadow-xl"
             >
               Get in Touch
             </button>
           </ScrollReveal>
        </section>
      </main>

      <Footer />
      <WhatsAppFloating />
      
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
};

export default App;
