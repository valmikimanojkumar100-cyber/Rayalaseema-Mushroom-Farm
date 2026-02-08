const crypto = require('crypto');
const fetch = global.fetch || require('node-fetch');

exports.handler = async function(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const body = JSON.parse(event.body || '{}');
    const { amount, currency = 'INR', items = [], customer = {} } = body;

    if (!amount || amount <= 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid amount' }) };
    }

    const key = process.env.VITE_RAZORPAY_KEY || process.env.RAZORPAY_KEY;
    const secret = process.env.RAZORPAY_SECRET;
    if (!key || !secret) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Razorpay credentials not configured' }) };
    }

    const url = 'https://api.razorpay.com/v1/orders';
    const receipt = `order_rcpt_${Date.now()}`;
    const payload = {
      amount: Math.round(amount * 100), // paise
      currency,
      receipt,
      payment_capture: 1,
      notes: {
        items: JSON.stringify(items),
        customer: JSON.stringify({ name: customer.name, email: customer.email, phone: customer.phone })
      }
    };

    const auth = Buffer.from(`${key}:${secret}`).toString('base64');

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (!resp.ok) {
      return { statusCode: resp.status || 500, body: JSON.stringify({ error: data }) };
    }

    return { statusCode: 200, body: JSON.stringify({ orderId: data.id, amount: data.amount, currency: data.currency }) };
  } catch (err) {
    console.error('createOrder error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
