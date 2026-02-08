
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { EASE_ORGANIC } from '../constants';
import { Button } from './ui/Button';

interface LoginPageProps {
  onBack: () => void;
  onLoginSuccess: (userName: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBack, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleGoogleLoginSuccess = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setIsLoading(true);
      try {
        // Exchange authorization code for tokens
        const response = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' + codeResponse.id_token, {
          method: 'GET',
        }).catch(() => {
          // Fallback: Decode JWT from id_token to get user info
          const token = codeResponse.id_token;
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          return { ok: true, json: async () => JSON.parse(jsonPayload) };
        });

        if (response && response.ok) {
          const data = await response.json();
          const userName = data.name || data.email?.split('@')[0] || 'User';
          
          // Store user info in localStorage for persistence
          localStorage.setItem('googleUser', JSON.stringify({
            email: data.email,
            name: userName,
            picture: data.picture,
          }));

          setIsLoading(false);
          onLoginSuccess(userName);
        }
      } catch (error) {
        console.error('Login failed:', error);
        setIsLoading(false);
      }
    },
    onError: () => {
      console.error('Login failed');
      setIsLoading(false);
    },
    flow: 'implicit',
  });

  const handleEmailLogin = () => {
    if (!emailInput.trim()) {
      setEmailError('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setEmailError('Please enter a valid email');
      return;
    }
    
    setEmailError('');
    setIsLoading(true);
    
    // Simulate email login processing
    setTimeout(() => {
      const userName = emailInput.split('@')[0];
      localStorage.setItem('emailUser', JSON.stringify({
        email: emailInput,
        name: userName,
      }));
      setIsLoading(false);
      onLoginSuccess(userName);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleEmailLogin();
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 flex items-center justify-center relative overflow-hidden p-6">
      {/* Background with Blur */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1615214044535-6967f139031c?auto=format&fit=crop&q=80&w=1920')", // Mushroom Farming / Growing
          filter: "blur(12px) brightness(0.65)" 
        }}
      />
      <div className="absolute inset-0 bg-earth-900/30 z-0" />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE_ORGANIC }}
        className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/40"
      >
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 text-earth-400 hover:text-earth-800 transition-colors p-2 -ml-2 hover:bg-earth-50 rounded-full"
          aria-label="Back to home"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-center mb-10 mt-6">
          <div className="w-16 h-16 bg-moss-50 text-moss-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-sm border border-moss-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-8 h-8"
            >
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M12 3v2" />
              <path d="M12 19v2" />
            </svg>
          </div>
          <h1 className="text-3xl font-serif text-earth-900 mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-earth-500 font-light">Sign in to access your farm dashboard</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleGoogleLoginSuccess()}
            disabled={isLoading}
            className="w-full bg-white border border-earth-200 text-earth-700 hover:bg-earth-50 hover:border-earth-300 transition-all p-4 rounded-xl flex items-center justify-center gap-3 font-medium shadow-sm hover:shadow-md group relative overflow-hidden"
          >
            {isLoading ? (
              <Loader2 className="animate-spin text-earth-400" />
            ) : (
              <>
                 <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>
          
          <div className="relative py-4">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-earth-200"></div>
             </div>
             <div className="relative flex justify-center text-xs">
                <span className="bg-white/60 px-2 text-earth-400 uppercase tracking-widest font-semibold">Or</span>
             </div>
          </div>

          <div className="grid gap-4">
             <div>
               <input 
                 type="email" 
                 value={emailInput}
                 onChange={(e) => {
                   setEmailInput(e.target.value);
                   if (emailError) setEmailError('');
                 }}
                 onKeyPress={handleKeyPress}
                 placeholder="Email address" 
                 className={`w-full p-4 bg-earth-50 border rounded-xl focus:ring-2 focus:outline-none text-earth-800 placeholder:text-earth-400 transition-all ${emailError ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-earth-100 focus:ring-moss-200 focus:border-moss-300'}`}
               />
               {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
             </div>
             <Button 
               className="w-full justify-center text-lg" 
               onClick={handleEmailLogin}
               disabled={isLoading}
             >
                {isLoading ? 'Signing In...' : 'Sign In with Email'}
             </Button>
          </div>
          
          <p className="text-center text-xs text-earth-400 mt-8 leading-relaxed">
            By continuing, you agree to Rayalaseema Mushroom Farm's<br/>
            <a href="#" className="underline hover:text-moss-600 transition-colors">Terms of Service</a> and <a href="#" className="underline hover:text-moss-600 transition-colors">Privacy Policy</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
