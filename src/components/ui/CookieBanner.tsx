'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('omp-cookies-accepted');
    if (!accepted) {
      const t = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('omp-cookies-accepted', 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 glass-dark rounded-2xl p-5 border border-[#00C9A7]/20 shadow-2xl"
        >
          <button
            onClick={accept}
            className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
          <div className="flex items-start gap-3">
            <Cookie className="text-[#F0A500] flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-white text-sm font-semibold mb-1">We use cookies</p>
              <p className="text-white/60 text-xs leading-relaxed">
                We use cookies to enhance your experience. By continuing to browse this site, you agree to our use of cookies.
              </p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={accept}
                  className="btn-shimmer text-[#071929] font-bold text-xs px-4 py-2 rounded-full"
                >
                  Accept
                </button>
                <button
                  onClick={accept}
                  className="text-white/60 text-xs hover:text-white transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
