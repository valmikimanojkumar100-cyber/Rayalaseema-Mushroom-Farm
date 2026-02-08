/**
 * Payment Verification Utility
 * Handles Razorpay payment verification and validation
 * 
 * IMPORTANT: In production, payment verification MUST be done on your backend server
 * using the Razorpay secret key (2d2P5TyRYnghBkVc3wywiqIu) with HMAC-SHA256
 * This frontend implementation is for development/testing only
 */

export interface PaymentData {
  razorpayPaymentId: string;
  razorpayOrderId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  orderDetails: {
    items: string[];
    totalItems: number;
    totalAmount: number;
  };
  verifiedAt: string;
  verified: boolean;
  verificationMethod: 'frontend-test' | 'backend-hmac';
}

const PAYMENT_STORAGE_KEY = 'rayalaseema_verified_payment';
const PAYMENT_ATTEMPTS_KEY = 'rayalaseema_payment_attempts';

/**
 * Store verified payment data locally
 * In production, this should only come from backend after HMAC verification
 */
export const storeVerifiedPayment = (paymentData: Partial<PaymentData>) => {
  const completeData: PaymentData = {
    razorpayPaymentId: paymentData.razorpayPaymentId || '',
    razorpayOrderId: paymentData.razorpayOrderId,
    razorpaySignature: paymentData.razorpaySignature,
    amount: paymentData.amount || 0,
    currency: paymentData.currency || 'INR',
    customerInfo: paymentData.customerInfo || { name: '', email: '', phone: '' },
    orderDetails: paymentData.orderDetails || { items: [], totalItems: 0, totalAmount: 0 },
    verifiedAt: new Date().toISOString(),
    verified: true,
    verificationMethod: 'frontend-test' // In production, use 'backend-hmac'
  };

  localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(completeData));
  console.log('✓ Payment verified and stored:', completeData.razorpayPaymentId);
  return completeData;
};

/**
 * Retrieve and validate stored payment
 * Checks if payment actually exists and is verified
 */
export const getVerifiedPayment = (): PaymentData | null => {
  try {
    const stored = localStorage.getItem(PAYMENT_STORAGE_KEY);
    if (!stored) return null;

    const paymentData: PaymentData = JSON.parse(stored);

    // Validate payment has required fields
    if (!paymentData.verified || !paymentData.razorpayPaymentId) {
      return null;
    }

    // Check if payment is not older than 1 hour (prevent stale payments)
    const verifiedTime = new Date(paymentData.verifiedAt).getTime();
    const now = new Date().getTime();
    const oneHour = 60 * 60 * 1000;

    if (now - verifiedTime > oneHour) {
      console.warn('⚠️ Payment verification expired (older than 1 hour)');
      clearVerifiedPayment();
      return null;
    }

    return paymentData;
  } catch (e) {
    console.error('Error retrieving verified payment:', e);
    return null;
  }
};

/**
 * Check if a payment is verified and valid
 */
export const isPaymentVerified = (): boolean => {
  return getVerifiedPayment() !== null;
};

/**
 * Clear payment verification (e.g., on logout or when starting new session)
 */
export const clearVerifiedPayment = () => {
  localStorage.removeItem(PAYMENT_STORAGE_KEY);
  console.log('✓ Payment verification cleared');
};

/**
 * Record payment attempt for security auditing
 */
export const recordPaymentAttempt = (paymentId: string, success: boolean) => {
  try {
    const attempts = JSON.parse(localStorage.getItem(PAYMENT_ATTEMPTS_KEY) || '[]');
    attempts.push({
      paymentId,
      success,
      timestamp: new Date().toISOString()
    });
    // Keep only last 50 attempts
    if (attempts.length > 50) {
      attempts.shift();
    }
    localStorage.setItem(PAYMENT_ATTEMPTS_KEY, JSON.stringify(attempts));
  } catch (e) {
    console.error('Error recording payment attempt:', e);
  }
};

/**
 * Get Razorpay key from multiple sources with fallback
 */
export const getRazorpayKey = (): string => {
  // Try Vite's import.meta.env (build-time)
  const viteKey = (import.meta.env as any).VITE_RAZORPAY_KEY;
  if (viteKey && viteKey !== '') {
    console.log('✓ Using Razorpay key from Vite environment');
    return viteKey;
  }

  // Try Netlify's window.__NETLIFY_ENV__ (runtime)
  const netlifyEnv = (window as any).__NETLIFY_ENV__;
  if (netlifyEnv?.VITE_RAZORPAY_KEY && netlifyEnv.VITE_RAZORPAY_KEY !== '') {
    console.log('✓ Using Razorpay key from Netlify environment');
    return netlifyEnv.VITE_RAZORPAY_KEY;
  }

  // Try process.env (Node.js environment)
  const processKey = (process.env as any).VITE_RAZORPAY_KEY;
  if (processKey && processKey !== '') {
    console.log('✓ Using Razorpay key from process environment');
    return processKey;
  }

  // Default to test key
  console.warn('⚠️ Using default Razorpay test key. For production, set VITE_RAZORPAY_KEY environment variable.');
  return 'rzp_test_SDbLXflWneqvCJ';
};

/**
 * Validate payment response from Razorpay
 * In production, HMAC verification should be done on backend
 */
export const validatePaymentResponse = (response: any): boolean => {
  if (!response || !response.razorpay_payment_id) {
    console.error('❌ Invalid payment response: missing payment ID');
    return false;
  }

  if (!response.razorpay_payment_id.startsWith('pay_')) {
    console.error('❌ Invalid payment ID format');
    return false;
  }

  console.log('✓ Payment response validation passed:', response.razorpay_payment_id);
  return true;
};

/**
 * PRODUCTION NOTE:
 * To properly verify Razorpay payments, you MUST:
 * 
 * 1. Send payment data to your backend server
 * 2. Use Razorpay secret key: 2d2P5TyRYnghBkVc3wywiqIu
 * 3. Verify HMAC-SHA256 signature:
 *    
 *    const crypto = require('crypto');
 *    const hmac = crypto
 *      .createHmac('sha256', RAZORPAY_SECRET)
 *      .update(orderId + '|' + paymentId)
 *      .digest('hex');
 *    
 *    if (hmac !== signature) {
 *      return error('Payment verification failed');
 *    }
 * 
 * 4. Return verified status to frontend only after backend verification
 * 
 * NEVER expose the secret key in frontend code
 */
