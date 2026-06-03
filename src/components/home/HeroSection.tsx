'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MapPin, Star, Shield } from 'lucide-react';

// Local images from /public (uploaded by client)
const HERO_BG    = '/hero-bg.jpg';   // real OMP tour photo
const ORLANDO    = '/pier.jpg';       // Caribbean beauty shot — replace with Orlando's personal photo path

// Fallback online sources (OMP's own MS Excursion photos)
const TOUR_IMG   = 'https://msexcursion.com/wp-content/uploads/2023/10/484814347_667829885747530_3700995968075653279_n.jpg';

const stats = [
  { value: '31', label: 'Tours' },
  { value: '5★', label: 'Rated' },
  { value: '15%', label: 'Deposit Only' },
  { value: '10K+', label: 'Happy Guests' },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const bgY      = useTransform(scrollY, [0, 700], [0, 160]);
  const contentY = useTransform(scrollY, [0, 500], [0, -70]);
  const opacity  = useTransform(scrollY, [0, 380], [1, 0]);

  return (
    <section ref={ref} className="dark-section relative min-h-screen flex items-center overflow-hidden" style={{ background: '#030C18' }}>

      {/* ── Parallax background ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }} />
        {/* Cinematic layered overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(108deg, rgba(13,25,41,0.97) 0%, rgba(13,25,41,0.88) 42%, rgba(13,25,41,0.45) 68%, rgba(13,25,41,0.15) 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #030C18 0%, transparent 45%)' }} />
      </motion.div>

      {/* ── Animated ambient glow orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.18, 0.06] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,201,177,0.16) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.03, 0.09, 0.03] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute top-1/4 right-1/3 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,150,199,0.2) 0%, transparent 70%)' }}
      />

      {/* ── Floating particles ── */}
      {[
        { left:'5%',  size:3, delay:'0s',   dur:'8s',  color:'rgba(0,201,177,0.7)' },
        { left:'12%', size:2, delay:'2s',   dur:'11s', color:'rgba(201,168,76,0.6)' },
        { left:'22%', size:4, delay:'0.5s', dur:'9s',  color:'rgba(0,150,199,0.7)' },
        { left:'35%', size:2, delay:'3s',   dur:'12s', color:'rgba(0,201,177,0.5)' },
        { left:'50%', size:3, delay:'1s',   dur:'10s', color:'rgba(201,168,76,0.5)' },
        { left:'62%', size:2, delay:'4s',   dur:'8s',  color:'rgba(0,201,177,0.6)' },
        { left:'72%', size:4, delay:'1.5s', dur:'13s', color:'rgba(0,150,199,0.6)' },
        { left:'82%', size:2, delay:'2.5s', dur:'9s',  color:'rgba(201,168,76,0.7)' },
        { left:'91%', size:3, delay:'0.8s', dur:'11s', color:'rgba(0,201,177,0.5)' },
        { left:'18%', size:5, delay:'3.5s', dur:'14s', color:'rgba(201,168,76,0.3)' },
        { left:'55%', size:3, delay:'5s',   dur:'10s', color:'rgba(0,150,199,0.5)' },
        { left:'78%', size:2, delay:'1.2s', dur:'12s', color:'rgba(0,201,177,0.4)' },
      ].map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: p.left,
            bottom: '5%',
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}

      {/* ── Content ── */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-8 pt-24 pb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[86vh]">

          {/* Left — Text */}
          <div className="flex flex-col justify-center">
            {/* Location pill */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="inline-flex items-center gap-2 w-fit mb-6"
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.35)' }}
              >
                <MapPin size={12} style={{ color: '#C9A84C' }} />
                <span className="text-[11px] font-bold tracking-[1.8px] uppercase" style={{ color: '#C9A84C' }}>
                  Higüey · Punta Cana · Dominican Republic
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-black text-white leading-[1.0]"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(48px, 6.5vw, 88px)' }}
              >
                Experience
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-black leading-[1.0]"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(48px, 6.5vw, 88px)',
                  background: 'linear-gradient(135deg, #F0D878 0%, #C9A84C 45%, #9A7828 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Paradise
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-black text-white leading-[1.0]"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(48px, 6.5vw, 88px)' }}
              >
                In Full
              </motion.h1>
            </div>

            {/* Gold divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 72 }}
              transition={{ delay: 1, duration: 0.9 }}
              className="h-px my-6"
              style={{ background: 'linear-gradient(90deg, #C9A84C, rgba(201,168,76,0))' }}
            />

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="text-base lg:text-lg leading-relaxed mb-8 max-w-md"
              style={{ color: 'rgba(255,255,255,0.62)', fontFamily: 'Nunito, sans-serif' }}
            >
              31 handcrafted excursions across the Dominican Republic — from adrenaline-fuelled buggy rides to private Saona Island escapes. Led by Orlando, your local expert.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/book-online"
                className="btn-shimmer text-[#030C18] font-extrabold text-base px-8 py-4 rounded-full text-center"
              >
                🌴 Explore All 31 Tours
              </Link>
              <a
                href="#services"
                className="flex items-center justify-center gap-2 font-bold text-base px-8 py-4 rounded-full border transition-all"
                style={{ borderColor: 'rgba(201,168,76,0.3)', color: 'rgba(255,255,255,0.8)', background: 'rgba(201,168,76,0.06)' }}
              >
                View Popular Tours
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.7 }}
              className="flex flex-wrap gap-8 mt-10 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                >
                  <div
                    className="font-bold text-3xl"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      background: 'linear-gradient(135deg, #E8C96A, #C9A84C)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >{s.value}</div>
                  <div className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Nunito' }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — Photo + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex justify-center items-center"
          >
            {/* Main photo frame — neomorphic */}
            <div
              className="relative w-[380px] h-[500px] rounded-3xl overflow-hidden"
              style={{
                background: '#0C2642',
                boxShadow: '20px 20px 48px rgba(0,0,0,0.65), -8px -8px 24px rgba(255,255,255,0.04), 0 0 0 1.5px rgba(201,168,76,0.25)',
              }}
            >
              {/* Gold ring glow */}
              <div
                className="absolute -inset-1 rounded-3xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(201,168,76,0.45) 0%, transparent 40%, rgba(0,201,177,0.25) 100%)',
                  zIndex: -1,
                  filter: 'blur(2px)',
                }}
              />

              {/* Tour photo */}
              <img
                src={TOUR_IMG}
                alt="OMP Tours - Caribbean adventure"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center' }}
              />

              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-48"
                style={{ background: 'linear-gradient(to top, #030C18 0%, rgba(13,25,41,0.6) 60%, transparent 100%)' }}
              />

              {/* Inner Orlando caption */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-bold text-white text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Your Dominican Adventure Starts Here
                </p>
                <p className="text-[#C9A84C] text-xs mt-1 font-semibold">31 tours · Hotel pickup included</p>
              </div>
            </div>

            {/* Floating card — Orlando */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-5 -left-10 p-4 rounded-2xl"
              style={{
                background: '#0C2642',
                boxShadow: '12px 12px 28px rgba(0,0,0,0.55), -5px -5px 16px rgba(255,255,255,0.05)',
                border: '1px solid rgba(201,168,76,0.25)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
                    color: '#030C18',
                    fontFamily: 'Playfair Display, serif',
                    boxShadow: '0 4px 12px rgba(201,168,76,0.4)',
                  }}
                >O</div>
                <div>
                  <p className="text-white font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>Orlando</p>
                  <p className="text-xs font-semibold" style={{ color: '#C9A84C' }}>Your Local Expert</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card — Rating */}
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-6 -right-8 p-3.5 rounded-2xl"
              style={{
                background: '#0C2642',
                boxShadow: '10px 10px 24px rgba(0,0,0,0.5), -4px -4px 14px rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,201,177,0.25)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <Star size={18} style={{ color: '#C9A84C' }} fill="#C9A84C" />
                <div>
                  <p className="text-white font-bold text-sm">5.0 Rated</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>10,000+ guests</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card — Deposit */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 -right-12 p-3.5 rounded-2xl"
              style={{
                background: '#0C2642',
                boxShadow: '10px 10px 24px rgba(0,0,0,0.5), -4px -4px 14px rgba(255,255,255,0.04)',
                border: '1px solid rgba(201,168,76,0.3)',
              }}
            >
              <div className="flex items-center gap-2">
                <Shield size={18} style={{ color: '#C9A84C' }} />
                <div>
                  <p className="font-bold text-sm" style={{ color: '#C9A84C' }}>15% Deposit</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Rest in cash</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" className="w-full" fill="none">
          <path d="M0 40 C360 80 720 0 1080 40 C1260 60 1380 20 1440 40 L1440 80 L0 80 Z" fill="#071A2D" />
        </svg>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={22} style={{ color: '#C9A84C' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
