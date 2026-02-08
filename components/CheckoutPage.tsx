
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { EASE_ORGANIC } from '../constants';

interface CheckoutPageProps {
  cart: CartItem[];
  totalAmount: number;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  totalAmount,
  onBack,
  onPaymentSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen relative pb-24">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1595304383796-03c0b05b3b0d?auto=format&fit=crop&q=80&w=1920')", // Button Mushrooms
          }}
        />
        {/* Strong overlay to ensure form readability */}
        <div className="absolute inset-0 bg-earth-50/90 backdrop-blur-sm" />
      </div>

      <header className="relative z-30 bg-white/80 backdrop-blur-md border-b border-earth-100 sticky top-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-earth-500 hover:text-earth-900 hover:bg-earth-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-serif text-2xl text-moss-900">Checkout</h1>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Shipping Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE_ORGANIC, duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <section className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-earth-100">
              <h2 className="text-xl font-serif text-earth-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-moss-50 text-moss-700 flex items-center justify-center text-sm font-bold">1</span>
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-earth-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-earth-50 border border-earth-200 rounded-lg focus:ring-2 focus:ring-moss-200 focus:border-moss-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-earth-500 uppercase tracking-wider mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-earth-50 border border-earth-200 rounded-lg focus:ring-2 focus:ring-moss-200 focus:border-moss-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-earth-500 uppercase tracking-wider mb-2">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-earth-50 border border-earth-200 rounded-lg focus:ring-2 focus:ring-moss-200 focus:border-moss-500 outline-none transition-all"
                    placeholder="+91 91009 82233"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-earth-500 uppercase tracking-wider mb-2">Address</label>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 bg-earth-50 border border-earth-200 rounded-lg focus:ring-2 focus:ring-moss-200 focus:border-moss-500 outline-none transition-all resize-none"
                    placeholder="Street address, Flat number..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-earth-500 uppercase tracking-wider mb-2">City</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-earth-50 border border-earth-200 rounded-lg focus:ring-2 focus:ring-moss-200 focus:border-moss-500 outline-none transition-all"
                    placeholder="Tirupati"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-earth-500 uppercase tracking-wider mb-2">ZIP Code</label>
                  <input 
                    type="text" 
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-earth-50 border border-earth-200 rounded-lg focus:ring-2 focus:ring-moss-200 focus:border-moss-500 outline-none transition-all"
                    placeholder="517501"
                  />
                </div>
              </div>
            </section>
          </motion.div>

          {/* RIGHT COLUMN: Order Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: EASE_ORGANIC, duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl shadow-moss-900/5 border border-earth-100 sticky top-28">
              <h2 className="text-xl font-serif text-earth-900 mb-6 flex items-center gap-2">
                <ShoppingBag size={20} />
                Order Summary
              </h2>

              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b border-earth-50 last:border-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-lg object-cover bg-earth-100"
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium text-earth-900">{item.name}</h4>
                      <p className="text-xs text-earth-500 mb-1">{item.weight}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs bg-earth-100 px-2 py-0.5 rounded text-earth-600">Qty: {item.quantity}</span>
                        <span className="font-medium text-moss-700">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-earth-100">
                <div className="flex justify-between text-earth-600">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-earth-600">
                  <span>Shipping</span>
                  <span className="text-moss-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-xl font-serif font-bold text-earth-900 pt-4 border-t border-earth-100 mt-4">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8"
              >
                {/* Razorpay Hosted Payment Button */}
                <form>
                  <script 
                    src="https://checkout.razorpay.com/v1/payment-button.js" 
                    data-payment_button_id="pl_SDJ8x6qFOQ6GGP" 
                    async
                  />
                </form>
              </motion.div>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-earth-400">
                <Lock size={12} />
                <span>Secured by Razorpay</span>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};
