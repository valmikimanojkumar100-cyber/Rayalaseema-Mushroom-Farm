const crypto = require('crypto');

/**
 * CRITICAL: Set RAZORPAY_SECRET in Netlify environment variables
 * 1. Go to https://app.netlify.com → Your site → Site Settings
 * 2. Build & Deploy → Environment
 * 3. Add: RAZORPAY_SECRET = 2d2P5TyRYnghBkVc3wywiqIu
 * 4. Trigger new deploy
 */

exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const payload = JSON.parse(event.body || '{}');
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = payload;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing payment fields' }) };
    }

    const secret = process.env.RAZORPAY_SECRET;
    if (!secret) {
      console.error('❌ CRITICAL: RAZORPAY_SECRET environment variable NOT set in Netlify');
      console.error('FIX: Go to https://app.netlify.com → Site Settings → Build & Deploy → Environment');
      console.error('ADD: RAZORPAY_SECRET = 2d2P5TyRYnghBkVc3wywiqIu');
      return { statusCode: 500, body: JSON.stringify({ error: 'RAZORPAY_SECRET not configured in Netlify. See deployment logs.' }) };
    }

    // Compute expected HMAC using order_id|payment_id
    const hmac = crypto.createHmac('sha256', secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');

    if (hmac !== razorpay_signature) {
      console.error('❌ Signature mismatch - payment INVALID');
      return { statusCode: 400, body: JSON.stringify({ verified: false, error: 'Signature mismatch' }) };
    }

    console.log('✓ SUCCESS: Payment verified -', razorpay_payment_id);
    return {
      statusCode: 200,
      body: JSON.stringify({ verified: true, paymentId: razorpay_payment_id, orderId: razorpay_order_id })
    };
  } catch (err) {
    console.error('verifyPayment error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
