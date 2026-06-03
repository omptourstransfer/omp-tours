'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Emily R.',
    location: 'New York, USA',
    text: "The highlight of our trip! We booked the Saona Island private tour with OMP Tours, and it was hands down the best part of our vacation. The boat was clean, the guide was super friendly, and the beach was absolutely breathtaking. We felt like VIPs the whole day. Highly recommended!",
    rating: 5,
    tour: 'Saona Island Private Tour',
  },
  {
    id: 2,
    name: 'Liam D.',
    location: 'Manchester, UK',
    text: "Professional and personal service throughout. From airport pickup to the whale-watching tour, everything was flawless. The OMP team communicated clearly, showed up on time, and made sure we were comfortable at every step. Their attention to detail made all the difference.",
    rating: 5,
    tour: 'Samana Whale Watching',
  },
  {
    id: 3,
    name: 'Isabella M.',
    location: 'Toronto, Canada',
    text: "Amazing buggy adventure! Orlando and his team are incredibly professional and made the whole day so much fun. The cenote was stunning and Macao Beach was breathtaking. Already planning to come back and do the Catalina Island tour next time!",
    rating: 5,
    tour: 'Buggies Tour',
  },
  {
    id: 4,
    name: 'Alexa Young',
    location: 'California, USA',
    text: "Amazing tour experience! Everything was well organized and smooth from start to finish. Orlando is an incredible host who made us feel completely safe and had us laughing the whole time. The snorkeling was incredible — saw so many colorful fish!",
    rating: 5,
    tour: 'Catalina Island Tour',
  },
  {
    id: 5,
    name: 'Morgan James',
    location: 'New York, USA',
    text: "One of the best experiences in Punta Cana. Great team and excellent service throughout. The party boat was so much fun — open bar, great music, and beautiful snorkeling. Worth every penny. We paid the 15% deposit online and it was super easy.",
    rating: 5,
    tour: 'Party Boat',
  },
  {
    id: 6,
    name: 'Lisa Driver',
    location: 'Michigan, USA',
    text: "Orlando and his team were very helpful and professional. Everything was perfectly managed. We did the horseback riding along the beach at sunset — absolutely magical. The horses were gentle and well cared for. An experience I will never forget.",
    rating: 5,
    tour: 'Horseback Riding',
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#00C9A7] text-sm font-bold tracking-widest uppercase mb-3 block">
            Reviews
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            What Our Guests Say
          </h2>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-[#F0A500]" fill="#F0A500" />
            ))}
            <span className="text-white/60 ml-2">5.0 · 10,000+ happy travelers</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="neo-card p-6 relative group hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="text-[#00C9A7]/20 absolute top-4 right-4 group-hover:text-[#00C9A7]/40 transition-colors"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-[#F0A500]" fill="#F0A500" />
                ))}
              </div>

              {/* Tour tag */}
              <div className="inline-block bg-[#00C9A7]/10 border border-[#00C9A7]/20 text-[#00C9A7] text-xs px-2.5 py-1 rounded-full mb-3">
                {t.tour}
              </div>

              {/* Review text */}
              <p className="text-white/70 text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00C9A7] to-[#F0A500] flex items-center justify-center text-[#071929] font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
