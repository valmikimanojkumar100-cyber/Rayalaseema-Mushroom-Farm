# Netlify Deployment Guide

This project is fully configured for seamless Netlify deployment. Follow these steps to deploy your Rayalaseema Mushroom Farm website.

## Prerequisites

- GitHub account with access to the repository
- Netlify account (free tier available at https://netlify.com)

## Automatic Deployment Steps (Recommended)

### Step 1: Connect GitHub to Netlify
1. Visit https://app.netlify.com
2. Click **"New site from Git"**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select the repository: **Rayalaseema-Mushroom-Farm**

### Step 2: Configure Build Settings
The build settings should auto-fill, but verify:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 or higher

### Step 3: Set Environment Variables
In Netlify Dashboard → Site Settings → Build & deploy → Environment:

Add these environment variables:
```
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_OAUTH_CLIENT_ID
VITE_RAZORPAY_KEY=rzp_test_SDbLXflWneqvCJ
```

**How to get VITE_GOOGLE_CLIENT_ID:**
1. Go to https://console.cloud.google.com
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web Application)
5. Add authorized redirect URIs:
   - `https://your-netlify-domain.netlify.app`
   - `http://localhost:3000`
6. Copy the Client ID

### Step 4: Deploy
1. Click **"Deploy"** button
2. Wait for build to complete (~2-3 minutes)
3. Your site will be live at `https://your-site-name.netlify.app`

## Manual Deployment (Alternative)

If you prefer deploying from your local machine:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify (opens browser)
netlify login

# Navigate to project directory
cd "d:\Mushrooms Project\Project\rayalaseema-mushroom-farm---premium-mushroom-farming"

# Deploy to production
netlify deploy --prod --dir=dist
```

## Environment Variables Reference

Create a `.env.local` file locally (not committed to git):

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_RAZORPAY_KEY=rzp_test_SDbLXflWneqvCJ
```

See `.env.example` for all available variables.

## Key Features Configured for Netlify

✅ **SPA Routing**: All routes redirect to index.html  
✅ **Cache Optimization**: Static assets cached for 1 year  
✅ **Security Headers**: XSS protection, content-type sniffing prevention  
✅ **Build Optimization**: Code splitting, minification, gzip compression  
✅ **CI/CD Ready**: Automatic builds on every git push  

## Troubleshooting

### Build Fails
- Check Node version: Netlify uses Node 18+
- Verify all dependencies are in package.json
- Check `.env` variables are set correctly

### Site Shows Blank Page
- Check browser console for JavaScript errors
- Verify `VITE_GOOGLE_CLIENT_ID` is set in Netlify environment variables
- Clear site cache: Netlify Dashboard → Deploy settings → Clear cache & redeploy

### Payment (Razorpay) Not Working
- Ensure `VITE_RAZORPAY_KEY=rzp_test_SDbLXflWneqvCJ` is set
- For production, update with live key from Razorpay dashboard
- Test mode keys start with `rzp_test_`, production with `rzp_live_`

### Google OAuth Not Working
- Verify redirect URIs in Google Cloud Console include your Netlify domain
- Check that `VITE_GOOGLE_CLIENT_ID` environment variable is set

## Custom Domain Setup

1. Go to Netlify Dashboard → Domain settings
2. Click "Add custom domain"
3. Enter your domain (e.g., rayalaseemamushroomfarm.com)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (up to 48 hours)

## Monitoring & Logs

**View Build Logs:**
1. Netlify Dashboard → Deploys
2. Click on any deploy to see build logs
3. Check for build errors or warnings

**Monitor Site Performance:**
1. Netlify Dashboard → Analytics
2. View page visits, performance metrics
3. Track user interactions

## Continuous Deployment

After initial setup, every git push to `main` branch will:
1. Trigger automatic build
2. Run optimizations
3. Deploy to production
4. Show deployment status in GitHub

## Support

For issues with:
- **Netlify**: https://support.netlify.com
- **Razorpay**: https://razorpay.com/support
- **Google OAuth**: https://developers.google.com/identity/protocols/oauth2
- **Project Code**: Check GitHub Issues

---

**Website Status**: Ready for automatic Netlify deployment! 🚀
