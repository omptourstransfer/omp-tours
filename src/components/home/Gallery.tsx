'use client';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Images, ArrowRight } from 'lucide-react';

const previewImages = [
  { id: 1, src: 'https://static.wixstatic.com/media/04bb94_f0eef5315a0248b7820fe58af3a94ae9~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_f0eef5315a0248b7820fe58af3a94ae9~mv2.jpeg', alt: 'Punta Cana tour experience', span: 'row-span-2' },
  { id: 2, src: 'https://static.wixstatic.com/media/04bb94_fe7509f6996e456082274f0a7882dc66~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_fe7509f6996e456082274f0a7882dc66~mv2.jpeg', alt: 'Caribbean excursion Punta Cana', span: '' },
  { id: 3, src: 'https://static.wixstatic.com/media/04bb94_c8557ab40391490cb404b006c5cdcc67~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_c8557ab40391490cb404b006c5cdcc67~mv2.jpeg', alt: 'OMP Tours Dominican Republic', span: '' },
  { id: 4, src: 'https://static.wixstatic.com/media/04bb94_d7615097999e45cb87dd46e5c8f1c331~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_d7615097999e45cb87dd46e5c8f1c331~mv2.jpeg', alt: 'Saona Island adventure', span: '' },
  { id: 5, src: 'https://static.wixstatic.com/media/04bb94_abfc11ea22d247cdb9cc7f2ece364f53~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_abfc11ea22d247cdb9cc7f2ece364f53~mv2.jpeg', alt: 'Caribbean water sports', span: '' },
];

export default function Gallery() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden" style={{ background: '#071A33' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Images size={15} style={{ color: '#00C9B1' }} />
              <span className="text-[11px] font-bold tracking-[3px] uppercase" style={{ color: '#00C9B1' }}>
                Gallery
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Moments from Paradise
            </h2>
          </div>
          <Link
            href="/gallery"
            className="hidden md:flex items-center gap-2 font-bold text-sm px-5 py-3 rounded-full transition-all duration-300 group"
            style={{ background: 'rgba(0,201,177,0.1)', border: '1px solid rgba(0,201,177,0.3)', color: '#00C9B1' }}
          >
            View All Photos <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* 5-image preview grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px]">
          {previewImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.55 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${i === 0 ? 'row-span-2' : ''}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
                style={{ transition: 'transform 0.7s ease' }}
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{ background: 'linear-gradient(to top, rgba(7,26,45,0.85) 0%, transparent 60%)' }}
              >
                <span className="text-white text-xs font-semibold opacity-90">{img.alt}</span>
              </div>
            </motion.div>
          ))}

          {/* View More tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.55 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <Link
              href="/gallery"
              className="w-full h-full flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
              style={{ background: 'linear-gradient(135deg, rgba(0,201,177,0.12), rgba(0,150,199,0.12))', border: '1.5px dashed rgba(0,201,177,0.3)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ background: 'rgba(0,201,177,0.2)', border: '1px solid rgba(0,201,177,0.4)' }}
              >
                <Images size={22} style={{ color: '#00C9B1' }} />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>View All Photos</p>
                <p className="text-white/40 text-xs mt-0.5">6 more moments →</p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Mobile view all button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="md:hidden text-center mt-6"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full"
            style={{ background: 'rgba(0,201,177,0.1)', border: '1px solid rgba(0,201,177,0.3)', color: '#00C9B1' }}
          >
            View All Photos <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
