/// <reference path="./vite.config.env.d.ts" />
import path from 'path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        middlewareMode: false,
      },
      plugins: [react()],
      define: {
        'process.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(env.VITE_GOOGLE_CLIENT_ID || ''),
        'process.env.VITE_RAZORPAY_KEY': JSON.stringify(env.VITE_RAZORPAY_KEY || 'rzp_test_SDbLXflWneqvCJ'),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13'],
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor': ['react', 'react-dom'],
              'framer': ['framer-motion'],
              'icons': ['lucide-react'],
            }
          }
        }
      },
      preview: {
        port: 3000,
        host: '0.0.0.0',
      }
    };
});
