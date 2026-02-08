import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, Home, Star, Send } from 'lucide-react';
import { EASE_ORGANIC } from '../constants';

import { getVerifiedPayment } from '../utils/paymentVerification';
const BODY_CLASS = 'payment-success-view';

interface PaymentSuccessPageProps {
  currentUser?: string;
  onContinueShopping: () => void;
  onBackToHome: () => void;
}

export const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({
  currentUser,
  onContinueShopping,
  onBackToHome,
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Verify payment before showing success page
  const [paymentVerified, setPaymentVerified] = useState(false);

  useEffect(() => {
    const verifiedPayment = getVerifiedPayment();
    if (!verifiedPayment) {
      console.warn('❌ Unauthorized access: No verified payment found');
      alert('❌ Payment not verified. This page is only accessible after a successful payment.');
      onBackToHome();
      return;
    }
    setPaymentVerified(true);
    console.log('✓ Payment verified. Displaying success page.');
  }, [onBackToHome]);
  useEffect(() => {
    document.body.classList.add(BODY_CLASS);
    return () => document.body.classList.remove(BODY_CLASS);
  }, []);

  const handleFeedbackSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    // Store feedback in localStorage
    const feedbackData = {
      rating,
      feedback,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('customerFeedback', JSON.stringify(feedbackData));
    setFeedbackSubmitted(true);

    // Clear form
    setTimeout(() => {
      setRating(0);
      setFeedback('');
    }, 500);
  };

  // Don't render if payment is not verified
  if (!paymentVerified) {
    return (
      <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-6 bg-earth-50">
        <p className="text-earth-600">Verifying payment...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center p-6 bg-earth-50 overflow-y-auto">
      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1595304383796-03c0b05b3b0d?auto=format&fit=crop&q=80&w=1920')",
        }}
      />
      <div className="absolute inset-0 bg-earth-50/95 backdrop-blur-sm pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_ORGANIC }}
        className="relative z-10 w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-earth-100 overflow-hidden my-8"
      >
        <div className="p-10 md:p-12 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-full bg-moss-100 text-moss-600 mx-auto flex items-center justify-center mb-6"
          >
            <CheckCircle2 className="w-12 h-12" strokeWidth={2} />
          </motion.div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-serif text-earth-900 mb-3">
            🎉 Payment Successful!
          </h1>
          <p className="text-lg text-earth-600 mb-2">
            {currentUser ? `Welcome back, ${currentUser}!` : 'Welcome!'} Thank you for your order!
          </p>
          <p className="text-earth-600 mb-8">
            Your payment has been verified and confirmed. We're preparing your fresh mushrooms for delivery.
          </p>

          {/* Payment Verification Details */}
          {(() => {
            const payment = getVerifiedPayment();
            return payment ? (
              <div className="bg-moss-50 rounded-2xl p-4 mb-6 text-left border border-moss-200">
                <p className="text-xs font-semibold text-moss-700 mb-3 uppercase tracking-wider">✓ Payment Verified</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-earth-600">Payment ID:</span>
                    <code className="text-moss-700 font-mono text-xs bg-white px-2 py-1 rounded">{payment.razorpayPaymentId.slice(0, 15)}...</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-600">Amount:</span>
                    <span className="font-semibold text-moss-700">₹{payment.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-earth-600">Status:</span>
                    <span className="text-moss-700 font-medium">✓ Successful</span>
                  </div>
                </div>
              </div>
            ) : null;
          })()}
          {/* Order Details */}
          <div className="bg-gradient-to-br from-moss-50 to-earth-50 rounded-2xl p-6 mb-8 text-left border border-moss-100">
            <p className="font-semibold text-earth-900 mb-4 text-center">What Happens Next?</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-moss-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-medium text-earth-900">Order Confirmation</p>
                  <p className="text-sm text-earth-600">Check your email for the order details</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-moss-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-medium text-earth-900">Preparation</p>
                  <p className="text-sm text-earth-600">We'll carefully pack your fresh mushrooms</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-moss-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-medium text-earth-900">Delivery</p>
                  <p className="text-sm text-earth-600">Tracking information will be sent to you</p>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          {!feedbackSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-earth-50 rounded-2xl p-6 mb-8 border border-earth-200"
            >
              <h3 className="font-serif text-xl text-earth-900 mb-6 text-center">
                Share Your Experience
              </h3>

              {/* Star Rating */}
              <div className="flex justify-center gap-3 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className="focus:outline-none transition-colors"
                  >
                    <Star
                      size={40}
                      className={`transition-all ${
                        star <= (hoveredRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-earth-300 hover:text-amber-300'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Rating Text */}
              {rating > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-earth-600 mb-6 font-medium"
                >
                  {rating === 1 && "We'd love to know how we can improve"}
                  {rating === 2 && "We appreciate your honest feedback"}
                  {rating === 3 && "Thanks for the fair review"}
                  {rating === 4 && "We're glad you enjoyed it!"}
                  {rating === 5 && "Amazing! We're thrilled you loved it!"}
                </motion.p>
              )}

              {/* Feedback Text Area */}
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience with our products and service (optional)"
                className="w-full p-4 border border-earth-200 rounded-xl bg-white text-earth-800 placeholder-earth-400 focus:ring-2 focus:ring-moss-300 focus:border-moss-500 outline-none transition-all resize-none mb-4"
                rows={4}
              />

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFeedbackSubmit}
                className="w-full bg-gradient-to-r from-moss-600 to-moss-700 text-white font-semibold py-3 rounded-xl hover:from-moss-700 hover:to-moss-800 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Submit Feedback
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-moss-50 rounded-2xl p-6 mb-8 border-2 border-moss-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-full bg-moss-100 text-moss-600 mx-auto flex items-center justify-center mb-4"
              >
                <CheckCircle2 className="w-10 h-10" strokeWidth={2} />
              </motion.div>
              <p className="text-earth-900 font-semibold text-center mb-2">Thank You!</p>
              <p className="text-earth-600 text-center text-sm">
                Your feedback helps us improve our products and service.
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinueShopping}
              className="inline-flex items-center justify-center gap-2 bg-moss-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-moss-800 transition-colors shadow-lg"
            >
              <ShoppingBag size={20} />
              Continue Shopping
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBackToHome}
              className="inline-flex items-center justify-center gap-2 bg-earth-100 text-earth-800 px-8 py-3 rounded-xl font-semibold hover:bg-earth-200 transition-colors border border-earth-200"
            >
              <Home size={20} />
              Back to Home
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
