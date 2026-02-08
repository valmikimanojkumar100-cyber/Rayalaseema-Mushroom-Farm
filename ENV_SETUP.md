# Environment Variables Setup Guide for Netlify

## Overview

This project uses environment variables for sensitive data like API keys. Netlify will automatically inject these variables at build time and runtime.

## Required Environment Variables

### 1. **VITE_GOOGLE_CLIENT_ID** (Required for OAuth)
Your Google OAuth 2.0 Client ID for user authentication.

**How to get it:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to "Credentials" → Create OAuth 2.0 Web Application
5. Add authorized redirect URIs:
   - `https://your-netlify-domain.netlify.app`
   - `https://your-custom-domain.com` (if using custom domain)
   - `http://localhost:3000` (for local development)
6. Copy the **Client ID**

### 2. **VITE_RAZORPAY_KEY** (Required for payments)
Your Razorpay API key for processing payments.

**How to get it:**
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to Settings → API Keys
3. Copy the **Key ID** (test or live)
4. Format: `rzp_test_XXXXXXXXXX` or `rzp_live_XXXXXXXXXX`

### 3. **VITE_API_URL** (Optional)
Base URL for backend API calls (if you have a backend).

**Default:** `https://api.example.com`

## Setting Up on Netlify

### Step 1: Go to Netlify Dashboard
1. Log in to [Netlify](https://app.netlify.com)
2. Select your site (Rayalaseema Mushroom Farm)
3. Click **Site Settings** → **Build & Deploy**
4. Scroll to **Environment** section

### Step 2: Add Environment Variables
Click **Edit Variables** and add each variable:

```
VITE_GOOGLE_CLIENT_ID = YOUR_GOOGLE_CLIENT_ID_HERE
VITE_RAZORPAY_KEY = rzp_test_SDbLXflWneqvCJ (or your live key)
VITE_API_URL = https://api.example.com
```

### Step 3: Trigger a Deploy
After adding variables:
1. Go to **Deploys**
2. Click **Trigger deploy** → **Deploy site**
3. Wait for build to complete
4. Variables are now active!

## Local Development Setup

For local development, create a `.env.local` file (NOT in git):

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_RAZORPAY_KEY=rzp_test_SDbLXflWneqvCJ
VITE_API_URL=http://localhost:3001
```

**Important:** Never commit `.env.local` to git. Use `.env.example` as a template.

## Environment Variable Loading Priority

The application loads environment variables in this order:

1. **Netlify Runtime Variables** (`window.__NETLIFY_ENV__`)
2. **Vite Build-time Variables** (`import.meta.env`)
3. **Runtime Process Variables** (`process.env`)
4. **Fallback Defaults** (provides sensible defaults)

## Testing Environment Variables

After deploying to Netlify:

1. Open your site in browser
2. Open DevTools Console (F12)
3. You should see: `✓ Environment variables loaded from Netlify`
4. Variables are ready to use!

## Troubleshooting

### Razorpay Not Working
- Verify `VITE_RAZORPAY_KEY` is set in Netlify
- Check payment mode (test vs live)
- Test keys: `rzp_test_*`
- Live keys: `rzp_live_*`

### Google OAuth Not Working
- Verify `VITE_GOOGLE_CLIENT_ID` is correct
- Check authorized redirect URIs in Google Cloud Console
- Must include your Netlify domain
- Example: `https://rayalaseemamushroomfarm.netlify.app`

### "Cannot find module" Errors
- Ensure `.env.local` exists locally
- Restart dev server: `npm run dev`
- Check file path is correct

### Variables Not Loading
- Trigger a new Netlify deploy
- Clear browser cache (Ctrl+Shift+Delete)
- Check Netlify build logs for errors
- Verify variables are set in Site Settings

## Files Involved

- `netlify.toml` - Build configuration
- `.env.local` - Local development variables (not in git)
- `.env.example` - Template for environment variables
- `index.html` - Has runtime environment variable handler
- `index.tsx` - Uses environment variables at startup
- `components/CheckoutPage.tsx` - Uses Razorpay key from environment
- `src/utils/env.ts` - Utility for reading environment variables

## Security Best Practices

✅ **DO:**
- Store sensitive keys in Netlify environment variables
- Use live keys only in production
- Rotate keys regularly
- Use test keys for development

❌ **DON'T:**
- Commit `.env.local` to git
- Share API keys in code
- Use live keys in public repositories
- Hardcode sensitive information

## Reference Links

- [Netlify Environment Variables Docs](https://docs.netlify.com/configure-builds/manage-dependencies/#environment-variables)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [Razorpay API Keys](https://razorpay.com/docs/api/keys/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)

---

**Last Updated:** February 2024
**Status:** ✅ Production Ready
