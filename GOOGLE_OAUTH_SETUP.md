# Google OAuth Setup Guide

This project now includes Google Gmail authentication. Follow these steps to set up Google OAuth2 for your application.

## Step 1: Create a Google Cloud Project

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click on the project dropdown at the top and select "New Project"
4. Enter a project name (e.g., "Rayalaseema Mushroom Farm") and click "Create"
5. Wait for the project to be created

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and click "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. If prompted to create a consent screen first:
   - Select "External" for User Type
   - Fill in the required fields:
     - App name: "Rayalaseema Mushroom Farm"
     - User support email: Your email
     - Developer contact information: Your email
   - Click "Save and Continue"
   - On "Scopes" page, click "Save and Continue"
   - On "Summary" page, click "Back to Dashboard"

4. Go back to "Credentials"
5. Click "Create Credentials" > "OAuth 2.0 Client IDs"
6. Select "Web application"
7. Name your OAuth 2.0 client (e.g., "Web Client")

## Step 4: Configure Authorized URLs

In the OAuth 2.0 Client ID configuration, add:

**Authorized JavaScript origins:**
- `http://localhost:5173` (for local development)
- `http://localhost:3000` (if using different port)
- Your production domain (e.g., `https://yourdomain.com`)

**Authorized redirect URIs:**
- `http://localhost:5173/` (for local development)
- Your production URL (e.g., `https://yourdomain.com/`)

## Step 5: Copy Your Client ID

1. After creating the OAuth 2.0 Client ID, you'll see a modal with your credentials
2. Copy the "Client ID" (it looks like: `123456789-abcdefg.apps.googleusercontent.com`)

## Step 6: Add to Environment Variables

1. Open `.env.local` file in the project root
2. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
   ```
3. Save the file

## Step 7: Test the Setup

1. Run the development server:
   ```bash
   npm run dev
   ```
2. Navigate to the login page
3. Click "Continue with Google"
4. You should be redirected to Google's login screen
5. After authentication, you'll be logged into the application

## Features Implemented

✅ **Google OAuth2 Authentication**
- Users can sign in with their Google account
- User profile information is stored locally
- Redirects to shop dashboard after successful login

✅ **Email Authentication**
- Alternative email-based login
- Email validation
- Error handling and user feedback

✅ **User Session Management**
- User data is stored in localStorage
- User information persists across page refreshes
- Logout functionality clears session

## Troubleshooting

### "Invalid Client ID" Error
- Verify your Client ID is correct in `.env.local`
- Check that your development URL is in the authorized origins list
- Make sure the file is `VITE_GOOGLE_CLIENT_ID` (not `REACT_APP_...`)

### Redirect URI Mismatch
- Ensure the exact URL in your browser matches the authorized redirect URIs
- Include the trailing slash if configured

### CORS Errors
- This might occur if the origin isn't authorized
- Add your current domain to "Authorized JavaScript origins" in Google Cloud

### Need More Info?
- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React OAuth2 Library Docs](https://www.npmjs.com/package/@react-oauth/google)
- [Google Cloud Console](https://console.cloud.google.com/)
