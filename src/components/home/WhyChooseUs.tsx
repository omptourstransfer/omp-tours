'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, Tag, Car } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: '100% Safe & Guided',
    desc: 'Certified local guides with full safety gear on every single tour. Your safety is our non-negotiable.',
    color: '#00C9B1',
    delay: 0,
  },
  {
    icon: Star,
    title: '15+ Years Experience',
    desc: 'Orlando has shown thousands of travelers the hidden gems, best beaches, and real culture of Punta Cana.',
    color: '#C9A84C',
    delay: 0.12,
  },
  {
    icon: Tag,
    title: 'Best Price Guarantee',
    desc: 'Only 15% deposit online via PayPal. The remaining 85% is paid in cash directly to your guide on tour day.',
    color: '#00C9B1',
    delay: 0.24,
  },
  {
    icon: Car,
    title: 'Hotel Pickup Included',
    desc: 'We come directly to your resort at 9:00 AM or 2:00 PM. No taxis, no confusion — we handle everything.',
    color: '#C9A84C',
    delay: 0.36,
  },
];

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: '#071A2D' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[11px] font-bold tracking-[3px] uppercase block mb-3" style={{ color: '#C9A84C' }}>
            Why Choose OMP
          </span>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 50px)' }}
          >
            The OMP Difference
          </h2>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            We don&apos;t just offer tours — we create memories. Here&apos;s why travelers choose Orlando every time.
          </p>
        </motion.div>

        {/* Cards — TRUE neomorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: f.delay, duration: 0.7 }}
              className="group relative p-6 rounded-[22px] cursor-default"
              style={{
                background: '#0C2642',
                border: 'none',
                boxShadow: '10px 10px 24px rgba(0,0,0,0.55), -5px -5px 16px rgba(255,255,255,0.05)',
                transition: 'box-shadow 0.35s ease, transform 0.35s ease',
              }}
              whileHover={{
                y: -6,
                boxShadow: '16px 16px 36px rgba(0,0,0,0.65), -6px -6px 20px rgba(255,255,255,0.06), 0 0 0 1.5px rgba(201,168,76,0.35)',
              }}
            >
              {/* Top gold accent bar */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, ${f.color}, transparent)` }}
              />

              {/* Icon — neomorphic inset */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: '#071A2D',
                  boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.5), inset -3px -3px 8px rgba(255,255,255,0.05)',
                  border: `1px solid ${f.color}22`,
                }}
              >
                <f.icon size={26} style={{ color: f.color }} />
              </div>

              <h3
                className="font-bold text-white text-base mb-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {f.desc}
              </p>

              {/* Bottom indicator */}
              <div
                className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${f.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
