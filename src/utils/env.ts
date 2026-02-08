/**
 * Environment Variables Utility
 * Handles loading environment variables from multiple sources:
 * 1. Vite's import.meta.env
 * 2. Netlify's window.__NETLIFY_ENV__
 * 3. process.env
 * 4. Fallback defaults
 */

interface EnvironmentVariables {
  VITE_GOOGLE_CLIENT_ID: string;
  VITE_RAZORPAY_KEY: string;
  VITE_API_URL: string;
}

/**
 * Get environment variable from multiple sources
 * @param varName - Name of the environment variable
 * @param fallback - Fallback value if not found
 * @returns The environment variable value
 */
export const getEnvVariable = (varName: string, fallback: string = ''): string => {
  // Try Vite's import.meta.env first
  const viteVar = (import.meta.env as any)[varName];
  if (viteVar && viteVar !== '') {
    return viteVar;
  }

  // Try Netlify's runtime environment variables
  const netlifyEnv = (window as any).__NETLIFY_ENV__;
  if (netlifyEnv && netlifyEnv[varName] && netlifyEnv[varName] !== '') {
    return netlifyEnv[varName];
  }

  // Try process.env
  const processEnv = (process.env as any)[varName];
  if (processEnv && processEnv !== '') {
    return processEnv;
  }

  // Return fallback
  return fallback;
};

/**
 * Get all environment variables
 */
export const getEnvironmentVariables = (): EnvironmentVariables => ({
  VITE_GOOGLE_CLIENT_ID: getEnvVariable(
    'VITE_GOOGLE_CLIENT_ID',
    '123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com'
  ),
  VITE_RAZORPAY_KEY: getEnvVariable(
    'VITE_RAZORPAY_KEY',
    'rzp_test_SDbLXflWneqvCJ'
  ),
  VITE_API_URL: getEnvVariable(
    'VITE_API_URL',
    'https://api.example.com'
  ),
});

/**
 * Check if running in production Netlify environment
 */
export const isNetlifyProduction = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    !window.location.hostname.startsWith('127.') &&
    !window.location.hostname.includes('netlify.app') === false
  );
};

/**
 * Log environment status for debugging
 */
export const logEnvironmentStatus = (): void => {
  const isDev = (import.meta.env as any).DEV;
  if (isDev) {
    const env = getEnvironmentVariables();
    console.group('🔧 Environment Variables');
    console.log('VITE_GOOGLE_CLIENT_ID:', env.VITE_GOOGLE_CLIENT_ID.substring(0, 10) + '...');
    console.log('VITE_RAZORPAY_KEY:', env.VITE_RAZORPAY_KEY);
    console.log('VITE_API_URL:', env.VITE_API_URL);
    console.log('Running on:', isNetlifyProduction() ? 'Netlify Production' : 'Local/Preview');
    console.groupEnd();
  }
};

export default {
  getEnvVariable,
  getEnvironmentVariables,
  isNetlifyProduction,
  logEnvironmentStatus,
};
