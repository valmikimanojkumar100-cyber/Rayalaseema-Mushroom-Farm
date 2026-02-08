
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Check, LogOut } from 'lucide-react';
import { SHOP_PRODUCTS, EASE_ORGANIC } from '../constants';
import { ShopProduct, CartItem } from '../types';
import { ScrollReveal } from './ui/ScrollReveal';

interface ShopDashboardProps {
  userName: string;
  cart: CartItem[];
  addToCart: (product: ShopProduct) => void;
  removeFromCart: (productId: string) => void;
  onLogout: () => void;
  onCheckout: () => void;
}

export const ShopDashboard: React.FC<ShopDashboardProps> = ({ 
  userName, 
  cart, 
  addToCart,
  removeFromCart,
  onLogout,
  onCheckout
}) => {
  const [showCart, setShowCart] = useState(false);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-earth-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-earth-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-moss-900 pt-1">
              Rayalaseema <span className="text-earth-500 text-base font-sans font-bold uppercase tracking-widest align-middle ml-2">Shop</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-sm font-medium text-earth-600">
              Welcome, <span className="text-moss-700">{userName}</span>
            </span>
            <button 
              onClick={onLogout}
              className="text-earth-400 hover:text-earth-800 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <ScrollReveal className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-earth-900 mb-4">Fresh Harvest Collection</h2>
          <p className="text-earth-600 max-w-2xl">
            Select from our premium naturally grown mushroom varieties. All products are harvested same-day to ensure peak freshness, nutrition, and exceptional quality.
          </p>
        </ScrollReveal>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {SHOP_PRODUCTS.map((product, index) => {
            const inCart = cart.find(item => item.id === product.id);
            return (
              <ScrollReveal key={product.id} delay={index * 0.1}>
                <motion.div 
                  className="bg-white rounded-3xl overflow-hidden border border-earth-100 hover:border-moss-300 hover:shadow-2xl hover:shadow-moss-900/10 transition-all group flex flex-col h-full"
                  whileHover={{ y: -6 }}
                >
                  {/* Product Image */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-earth-100 to-earth-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-moss-700 uppercase tracking-widest shadow-lg">
                      {product.tag}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    {/* Name and Price */}
                    <div className="mb-3">
                      <h3 className="font-serif text-lg text-earth-900 leading-tight mb-2">{product.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-moss-700">₹{product.price}</span>
                        <span className="text-earth-400 text-xs font-semibold uppercase tracking-wide">{product.weight}</span>
                      </div>
                    </div>

                    {/* Description */}
                    {product.description && (
                      <p className="text-sm text-earth-600 mb-4 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* Benefits */}
                    {product.benefits && product.benefits.length > 0 && (
                      <div className="mb-4 flex-grow">
                        <p className="text-xs font-semibold text-moss-800 uppercase tracking-wide mb-2">Key Benefits:</p>
                        <ul className="text-xs text-earth-600 space-y-1">
                          {product.benefits.slice(0, 3).map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-moss-600 font-bold mt-0.5">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action Button */}
                    {inCart ? (
                      <div className="flex items-center justify-between bg-moss-50 rounded-2xl p-2 mt-auto">
                        <button 
                          onClick={() => removeFromCart(product.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-moss-700 shadow-sm hover:bg-moss-100 transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="font-bold text-moss-900 text-lg">{inCart.quantity}</span>
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg bg-moss-600 text-white shadow-sm hover:bg-moss-700 transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full py-3 bg-gradient-to-r from-moss-600 to-moss-700 text-white rounded-xl font-semibold hover:from-moss-700 hover:to-moss-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-auto"
                      >
                        <Plus size={18} /> Add to Cart
                      </button>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </main>

      {/* Cart Floating Summary */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 inset-x-0 z-40 p-4 md:p-6 pointer-events-none"
          >
            <div className="max-w-3xl mx-auto bg-earth-900 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-4 px-2">
                <div className="bg-moss-600 w-12 h-12 rounded-xl flex items-center justify-center relative">
                  <ShoppingBag size={24} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-earth-900">
                    {totalItems}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-earth-300">Total</div>
                  <div className="font-serif text-xl font-semibold">₹{totalAmount}</div>
                </div>
              </div>
              
              <button 
                onClick={onCheckout}
                className="bg-white text-earth-900 px-8 py-3 rounded-xl font-semibold hover:bg-moss-50 transition-colors"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
