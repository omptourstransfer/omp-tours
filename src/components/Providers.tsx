'use client';

import { Toaster } from 'react-hot-toast';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import ChatBot from '@/components/ui/ChatBot';
import CookieBanner from '@/components/ui/CookieBanner';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { CartProvider } from '@/context/CartContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <LoadingScreen />
      {children}
      <WhatsAppButton />
      <ChatBot />
      <CookieBanner />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#0D2D55',
            color: '#fff',
            border: '1px solid rgba(0,201,167,0.3)',
            borderRadius: '12px',
            fontFamily: 'Nunito, sans-serif',
          },
          success: {
            iconTheme: { primary: '#00C9A7', secondary: '#071929' },
          },
          error: {
            iconTheme: { primary: '#F0A500', secondary: '#071929' },
          },
        }}
      />
    </CartProvider>
  );
}
