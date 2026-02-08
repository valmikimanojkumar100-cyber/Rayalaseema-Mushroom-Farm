import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Get environment variables - prioritize Netlify environment variables
const getEnvVariable = (varName: string, fallback: string): string => {
  // First try Vite's import.meta.env
  const viteVar = (import.meta.env as any)[varName];
  if (viteVar && viteVar !== '') {
    return viteVar;
  }
  
  // Then try window.__NETLIFY_ENV__
  const netlifyEnv = (window as any).__NETLIFY_ENV__;
  if (netlifyEnv && netlifyEnv[varName] && netlifyEnv[varName] !== '') {
    return netlifyEnv[varName];
  }
  
  // Fall back to process.env
  const processEnv = (process.env as any)[varName];
  if (processEnv && processEnv !== '') {
    return processEnv;
  }
  
  // Use fallback
  return fallback;
};

// Get Google Client ID from environment variables
const googleClientId = getEnvVariable(
  'VITE_GOOGLE_CLIENT_ID',
  '123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com'
);

// Warn if using default Google Client ID
if (googleClientId === '123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com') {
  console.warn(
    '⚠️ Using default Google Client ID. Set VITE_GOOGLE_CLIENT_ID in Netlify environment variables for production.'
  );
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);