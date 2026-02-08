const crypto = require('crypto');

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
      return { statusCode: 500, body: JSON.stringify({ error: 'RAZORPAY_SECRET not configured' }) };
    }

    // Compute expected HMAC using order_id|payment_id
    const hmac = crypto.createHmac('sha256', secret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');

    if (hmac !== razorpay_signature) {
      return { statusCode: 400, body: JSON.stringify({ verified: false, error: 'Signature mismatch' }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ verified: true, paymentId: razorpay_payment_id, orderId: razorpay_order_id })
    };
  } catch (err) {
    console.error('verifyPayment error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
