'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';

const themes = [
  {
    id: 'ocean',
    label: 'Ocean',
    emoji: '🌊',
    dot: '#00C9B1',
    tint: 'transparent',
    tintOpacity: '0',
    vars: {
      '--bg':        '#071A2D',
      '--bg-deep':   '#030C18',
      '--bg-raised': '#0C2642',
      '--bg-inset':  '#051525',
      '--teal':      '#00C9B1',
      '--teal-lt':   '#00EDD1',
      '--teal-dk':   '#009B89',
      '--ocean':     '#0096C7',
      '--gold':      '#C9A84C',
    },
  },
  {
    id: 'sunset',
    label: 'Sunset',
    emoji: '🌅',
    dot: '#FF6B35',
    tint: '#FF4500',
    tintOpacity: '0.18',
    vars: {
      '--bg':        '#1A0A00',
      '--bg-deep':   '#0D0500',
      '--bg-raised': '#2D1500',
      '--bg-inset':  '#120800',
      '--teal':      '#FF6B35',
      '--teal-lt':   '#FF8C5A',
      '--teal-dk':   '#CC4E1E',
      '--ocean':     '#F4A261',
      '--gold':      '#FFB347',
    },
  },
  {
    id: 'emerald',
    label: 'Emerald',
    emoji: '🌿',
    dot: '#00C9A7',
    tint: '#006644',
    tintOpacity: '0.2',
    vars: {
      '--bg':        '#071A10',
      '--bg-deep':   '#030C08',
      '--bg-raised': '#0C2618',
      '--bg-inset':  '#051510',
      '--teal':      '#00C9A7',
      '--teal-lt':   '#00EDD1',
      '--teal-dk':   '#008F77',
      '--ocean':     '#00A896',
      '--gold':      '#C9A84C',
    },
  },
  {
    id: 'royal',
    label: 'Royal',
    emoji: '👑',
    dot: '#A78BFA',
    tint: '#4B0082',
    tintOpacity: '0.22',
    vars: {
      '--bg':        '#110A2D',
      '--bg-deep':   '#070318',
      '--bg-raised': '#1E1042',
      '--bg-inset':  '#0D0825',
      '--teal':      '#A78BFA',
      '--teal-lt':   '#C4B5FD',
      '--teal-dk':   '#7C3AED',
      '--ocean':     '#818CF8',
      '--gold':      '#FCD34D',
    },
  },
];

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('ocean');

  useEffect(() => {
    const saved = localStorage.getItem('omp-theme') || 'ocean';
    setActiveTheme(saved);
    applyTheme(saved);
  }, []);

  const applyTheme = (id: string) => {
    const theme = themes.find(t => t.id === id);
    if (!theme) return;
    const root = document.documentElement;
    // Apply CSS custom properties
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    // Apply tint overlay via CSS vars
    root.style.setProperty('--theme-tint', theme.tint);
    root.style.setProperty('--theme-tint-opacity', theme.tintOpacity);
    // Also update body background directly for hardcoded fallback
    document.body.style.background = theme.vars['--bg'];
    localStorage.setItem('omp-theme', id);
  };

  const handleSelect = (id: string) => {
    setActiveTheme(id);
    applyTheme(id);
    setOpen(false);
  };

  const current = themes.find(t => t.id === activeTheme)!;

  return (
    <div className="fixed bottom-24 left-4 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -16, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -16, scale: 0.92 }}
            transition={{ duration: 0.22 }}
            className="mb-2 p-3 rounded-2xl min-w-[148px]"
            style={{
              background: 'rgba(7,26,45,0.97)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
            }}
          >
            <p className="text-white/35 text-[9px] font-bold tracking-[2px] uppercase mb-2 px-1">Color Theme</p>
            <div className="flex flex-col gap-0.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelect(t.id)}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all duration-200 w-full text-left"
                  style={{
                    background: activeTheme === t.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  }}
                >
                  <span className="text-sm">{t.emoji}</span>
                  <span className="text-white text-xs font-semibold">{t.label}</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full ml-auto flex-shrink-0"
                    style={{
                      background: t.dot,
                      boxShadow: activeTheme === t.id ? `0 0 6px ${t.dot}` : 'none',
                    }}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(7,26,45,0.92)',
          backdropFilter: 'blur(16px)',
          border: `1.5px solid ${current.dot}50`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 12px ${current.dot}30`,
          color: current.dot,
          transition: 'all 0.3s ease',
        }}
        title="Change color theme"
      >
        <Palette size={17} />
      </motion.button>
    </div>
  );
}
