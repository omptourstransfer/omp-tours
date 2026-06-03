'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const PARTICLES = [
  { x: '12%', y: '25%', s: 3, d: '0s',   r: '7s',  c: 'rgba(0,201,177,0.8)' },
  { x: '88%', y: '20%', s: 2, d: '1.2s', r: '9s',  c: 'rgba(201,168,76,0.7)' },
  { x: '5%',  y: '70%', s: 4, d: '0.4s', r: '8s',  c: 'rgba(0,150,199,0.7)' },
  { x: '92%', y: '65%', s: 2, d: '2s',   r: '11s', c: 'rgba(0,201,177,0.6)' },
  { x: '25%', y: '85%', s: 3, d: '0.8s', r: '10s', c: 'rgba(201,168,76,0.6)' },
  { x: '75%', y: '80%', s: 2, d: '1.6s', r: '8s',  c: 'rgba(0,201,177,0.5)' },
  { x: '50%', y: '10%', s: 3, d: '3s',   r: '12s', c: 'rgba(0,150,199,0.6)' },
  { x: '38%', y: '92%', s: 2, d: '0.2s', r: '9s',  c: 'rgba(201,168,76,0.5)' },
];

const TAGLINE = 'Your Paradise Awaits'.split('');

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar to 100% over 1.8s
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) { p = 100; clearInterval(interval); }
      setProgress(p);
    }, 80);

    const t = setTimeout(() => setVisible(false), 2400);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 0%, #0C2642 0%, #071A2D 40%, #030C18 100%)' }}
        >
          {/* ── Ambient glow orbs ── */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.06, 0.18, 0.06] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,201,177,0.2) 0%, transparent 70%)', top: '20%', left: '30%', transform: 'translate(-50%, -50%)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)', bottom: '20%', right: '25%' }}
          />

          {/* ── Floating particles ── */}
          {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -180, 0], opacity: [0, 0.9, 0] }}
              transition={{ duration: parseFloat(p.r), repeat: Infinity, delay: parseFloat(p.d), ease: 'easeInOut' }}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: p.x, top: p.y,
                width: p.s, height: p.s,
                background: `radial-gradient(circle, ${p.c} 0%, transparent 70%)`,
              }}
            />
          ))}

          {/* ── Logo section ── */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8 flex items-center justify-center"
          >
            {/* Pulsing rings */}
            {[180, 148, 120].map((size, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  border: `1px solid ${i === 0 ? 'rgba(0,201,177,0.5)' : i === 1 ? 'rgba(201,168,76,0.4)' : 'rgba(0,150,199,0.4)'}`,
                  boxShadow: `0 0 ${16 - i * 4}px ${i === 0 ? 'rgba(0,201,177,0.2)' : 'rgba(201,168,76,0.15)'}`,
                }}
              />
            ))}

            {/* Spinning accent arc */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[126px] h-[126px] rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, rgba(0,201,177,0.8) 0%, rgba(201,168,76,0.6) 30%, transparent 60%)',
                mask: 'radial-gradient(transparent 55px, black 57px)',
                WebkitMask: 'radial-gradient(transparent 55px, black 57px)',
              }}
            />

            {/* ── Main logo circle (neomorphic) ── */}
            <div
              className="relative w-[96px] h-[96px] rounded-full overflow-hidden flex-shrink-0"
              style={{
                boxShadow: '0 0 0 3px rgba(201,168,76,0.5), 0 0 40px rgba(0,201,177,0.3), 0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <Image
                src="/logoomp.JPG"
                alt="OMP Tours & Transfers
                width={96}
                height={96}
                className="w-full h-full object-cover"
                priority
                unoptimized
              />
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
            </div>

            {/* Sparkle dots */}
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#00C9B1' : '#C9A84C',
                  transform: `rotate(${deg}deg) translateX(72px)`,
                  boxShadow: `0 0 6px ${i % 2 === 0 ? '#00C9B1' : '#C9A84C'}`,
                }}
              />
            ))}
          </motion.div>

          {/* ── Brand name ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-center mb-3"
          >
            <motion.h1
              className="font-bold text-white text-2xl mb-1 tracking-wide"
              style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 0 30px rgba(0,201,177,0.3)' }}
            >
              OMP Tours &amp; Transfers
            </motion.h1>

            {/* Tagline character reveal */}
            <div className="flex justify-center gap-[1px]">
              {TAGLINE.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.04, duration: 0.35 }}
                  className="text-sm font-semibold tracking-widest"
                  style={{ color: '#00C9B1', textShadow: '0 0 12px rgba(0,201,177,0.6)', display: 'inline-block', minWidth: char === ' ' ? '6px' : 'auto' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* ── Progress bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="w-48 mt-6"
          >
            <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00C9B1, #C9A84C, #00C9B1)',
                  backgroundSize: '200% 100%',
                  boxShadow: '0 0 10px rgba(0,201,177,0.6)',
                  transition: 'width 0.12s ease',
                }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <motion.p
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-center text-white/30 text-[10px] mt-2 tracking-[2px] uppercase font-semibold"
            >
              Loading experience...
            </motion.p>
          </motion.div>

          {/* ── Higüey · Punta Cana tag ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 text-white text-[11px] tracking-[4px] uppercase font-light"
          >
            Higüey · Punta Cana · Dominican Republic
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
