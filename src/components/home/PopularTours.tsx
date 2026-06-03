'use client';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import TourCard from '@/components/tours/TourCard';
import { getPopularTours } from '@/data/tours';

export default function PopularTours() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const popular = getPopularTours();

  return (
    <section id="services" ref={ref} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#00C9A7] text-sm font-bold tracking-widest uppercase mb-3 block">
            Most Loved
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Popular Tours
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            From thrilling buggies to pristine island escapes — these are the tours our guests love most.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/book-online"
            className="inline-flex items-center gap-2 btn-shimmer text-[#071929] font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-glow-teal transition-all duration-300"
          >
            View All 31 Tours <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
