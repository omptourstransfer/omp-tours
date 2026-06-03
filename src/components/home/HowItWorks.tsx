'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Search, CreditCard, Car } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Choose Your Tour',
    description: 'Browse our 31 unique excursions. Filter by adventure, water sports, nature, or city tours to find your perfect match.',
  },
  {
    step: '02',
    icon: CreditCard,
    title: 'Select Date & Pay 15% Deposit',
    description: 'Pick your date, choose 9:00 AM or 2:00 PM pickup, enter your group size, and securely pay just 15% via PayPal. Rest in cash on the day.',
  },
  {
    step: '03',
    icon: Car,
    title: 'We Pick You Up',
    description: 'Sit back and relax — our team picks you up directly from your hotel at the agreed time. Your adventure begins from your door!',
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-[#071A33]">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 30 C360 60 720 0 1080 30 C1260 45 1380 15 1440 30 L1440 0 L0 0 Z" fill="#071929" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 30 C360 0 720 60 1080 30 C1260 15 1380 45 1440 30 L1440 60 L0 60 Z" fill="#071929" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00C9A7] text-sm font-bold tracking-widest uppercase mb-3 block">
            Simple Process
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            How It Works
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Booking your dream excursion in Punta Cana takes just 3 easy steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-[#00C9A7] via-[#F0A500] to-[#00C9A7] z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative z-10 text-center"
            >
              {/* Step number with icon */}
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full neo-card flex items-center justify-center mx-auto border border-[#00C9A7]/20">
                  <step.icon size={40} className="text-[#00C9A7]" />
                </div>
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#F0A500] flex items-center justify-center text-[#0A1F35] font-bold text-sm"
                >
                  {step.step}
                </div>
              </div>

              <h3
                className="text-white font-bold text-xl mb-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {step.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Payment note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 glass rounded-2xl p-6 text-center border border-[#00C9A7]/20 max-w-2xl mx-auto"
        >
          <p className="text-white/80 text-sm">
            💳 <strong className="text-[#00C9A7]">Only 15% deposit</strong> charged via PayPal at booking.
            The remaining <strong className="text-white">85% balance</strong> is paid in cash directly to your guide on tour day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
