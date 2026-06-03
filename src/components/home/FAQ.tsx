'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What is the best excursion in Punta Cana?',
    a: 'The Saona Island tour is the crown jewel — crystal-clear waters, white sand, starfish pools. But if you love adventure, our Buggy or ATV tours through Dominican trails are unforgettable. We\'ll help you choose based on your group.',
  },
  {
    q: 'How much deposit do I need to book?',
    a: 'Only 15% of the tour price online via PayPal. The remaining 85% is paid in cash directly to your guide on the day of your tour — no surprise fees, no stress.',
  },
  {
    q: 'Is hotel pickup included?',
    a: 'Yes! We come directly to your resort at 9:00 AM or 2:00 PM (tour-dependent). No taxi needed, no confusion — our team picks you up and drops you off.',
  },
  {
    q: 'Are the tours safe?',
    a: 'Absolutely. All tours are led by certified local guides with full safety equipment. We\'ve served 10,000+ happy guests with a 5-star rated track record. Your safety is our number one priority.',
  },
  {
    q: 'Can I book for a large group?',
    a: 'Yes! We have private packages for couples (up to 2), small groups (up to 6), and medium groups (up to 12). For larger groups, contact us on WhatsApp and we\'ll arrange something special.',
  },
  {
    q: 'What should I bring on tour?',
    a: 'Swimwear, reef-safe sunscreen, a towel, comfortable shoes, and your camera. Each tour page has a specific "What to Bring" list. Cash for tips is appreciated!',
  },
  {
    q: 'Is whale watching available year-round?',
    a: 'The Samana Whale Watching tour runs January to April only — that\'s when humpback whales come to breed in Samana Bay. It\'s one of the world\'s greatest wildlife spectacles!',
  },
  {
    q: 'Can I cancel or reschedule my booking?',
    a: 'Yes. Contact us at least 24 hours before your tour via WhatsApp (+1 809 431-2542) and we\'ll reschedule at no charge. We understand travel plans change.',
  },
  {
    q: 'Do you offer private tours?',
    a: 'Yes — several of our tours are available in a fully private format. The Saona Island Private Speedboat tour, for example, is 100% just your group with a dedicated captain and guide.',
  },
  {
    q: 'What languages do your guides speak?',
    a: 'Our guides speak English and Spanish fluently. Some tours also have French and Portuguese-speaking guides available on request.',
  },
];

export default function FAQ() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #071A2D 0%, #0C2642 100%)' }}
    >
      {/* Animated wave top */}
      <div className="wave-top" />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,150,199,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <HelpCircle size={16} style={{ color: '#00C9B1' }} />
            <span className="text-[11px] font-bold tracking-[3px] uppercase" style={{ color: '#00C9B1' }}>
              Got Questions?
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Everything you need to know before booking your Punta Cana adventure.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="faq-item"
            >
              <button
                className="w-full text-left py-5 flex items-start gap-4 group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 transition-all duration-300"
                  style={{
                    background: openIndex === i ? '#00C9B1' : 'rgba(0,201,177,0.15)',
                    color: openIndex === i ? '#071929' : '#00C9B1',
                    border: '1px solid rgba(0,201,177,0.3)',
                  }}
                >
                  {i + 1}
                </span>
                <span
                  className="flex-1 font-semibold text-base leading-snug transition-colors duration-200"
                  style={{ color: openIndex === i ? '#00C9B1' : 'rgba(255,255,255,0.85)', fontFamily: 'Playfair Display, serif' }}
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 mt-1"
                  style={{ color: openIndex === i ? '#00C9B1' : 'rgba(255,255,255,0.3)' }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="pb-5 pl-11 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated wave bottom */}
      <div className="wave-bottom" />
    </section>
  );
}
