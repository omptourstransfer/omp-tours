'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Images } from 'lucide-react';

export const dynamic = 'force-static';

const allImages = [
  { id: 1,  src: 'https://static.wixstatic.com/media/04bb94_f0eef5315a0248b7820fe58af3a94ae9~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_f0eef5315a0248b7820fe58af3a94ae9~mv2.jpeg', alt: 'Punta Cana tour experience', cat: 'Adventures' },
  { id: 2,  src: 'https://static.wixstatic.com/media/04bb94_fe7509f6996e456082274f0a7882dc66~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_fe7509f6996e456082274f0a7882dc66~mv2.jpeg', alt: 'Caribbean excursion Punta Cana', cat: 'Beaches' },
  { id: 3,  src: 'https://static.wixstatic.com/media/04bb94_c8557ab40391490cb404b006c5cdcc67~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_c8557ab40391490cb404b006c5cdcc67~mv2.jpeg', alt: 'OMP Tours Dominican Republic', cat: 'Adventures' },
  { id: 4,  src: 'https://static.wixstatic.com/media/04bb94_d7615097999e45cb87dd46e5c8f1c331~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_d7615097999e45cb87dd46e5c8f1c331~mv2.jpeg', alt: 'Saona Island adventure', cat: 'Islands' },
  { id: 5,  src: 'https://static.wixstatic.com/media/04bb94_abfc11ea22d247cdb9cc7f2ece364f53~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_abfc11ea22d247cdb9cc7f2ece364f53~mv2.jpeg', alt: 'Caribbean water sports', cat: 'Water Sports' },
  { id: 6,  src: 'https://static.wixstatic.com/media/04bb94_5c5cd915861f41cabf1d0986f913d48f~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_5c5cd915861f41cabf1d0986f913d48f~mv2.jpeg', alt: 'Punta Cana water activities', cat: 'Water Sports' },
  { id: 7,  src: 'https://static.wixstatic.com/media/04bb94_ea997081969a4f9aa86747248dc62d5e~mv2.jpeg/v1/fill/w_480,h_604,q_90/04bb94_ea997081969a4f9aa86747248dc62d5e~mv2.jpeg', alt: 'Dominican Republic beach paradise', cat: 'Beaches' },
  { id: 8,  src: 'https://static.wixstatic.com/media/04bb94_82a1a7e0fdef44be8bb5b9af790cdca2~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_82a1a7e0fdef44be8bb5b9af790cdca2~mv2.jpeg', alt: 'Tropical Caribbean scenery', cat: 'Beaches' },
  { id: 9,  src: 'https://static.wixstatic.com/media/04bb94_a4ea18c24f834cebbc806ac72f4850d9~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_a4ea18c24f834cebbc806ac72f4850d9~mv2.jpeg', alt: 'OMP adventure tour', cat: 'Adventures' },
  { id: 10, src: 'https://static.wixstatic.com/media/04bb94_cb5959fd0f094a84ab5a5cb4755f66f1~mv2.jpeg/v1/fill/w_480,h_641,q_90/04bb94_cb5959fd0f094a84ab5a5cb4755f66f1~mv2.jpeg', alt: 'Caribbean fun Punta Cana', cat: 'Adventures' },
  { id: 11, src: 'https://static.wixstatic.com/media/04bb94_d24c282ad5ac445e9261d71e005fb02e~mv2.jpeg/v1/fill/w_480,h_604,q_90/04bb94_d24c282ad5ac445e9261d71e005fb02e~mv2.jpeg', alt: 'Punta Cana island beauty', cat: 'Islands' },
];

const cats = ['All', 'Adventures', 'Beaches', 'Islands', 'Water Sports'];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activecat, setActivecat] = useState('All');

  const filtered = activecat === 'All' ? allImages : allImages.filter(img => img.cat === activecat);

  return (
    <div className="min-h-screen bg-[#071929] pt-20">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=60)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071929]/80 to-[#071929]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Images size={16} style={{ color: '#00C9B1' }} />
            <span className="text-[#00C9B1] text-sm font-bold tracking-widest uppercase">Our Gallery</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Moments from Paradise
          </h1>
          <p className="text-white/55 text-lg">Real moments from real adventures — your journey starts here.</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {cats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActivecat(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                background: activecat === cat ? '#00C9B1' : 'rgba(0,201,177,0.1)',
                color: activecat === cat ? '#071929' : '#00C9B1',
                border: activecat === cat ? 'none' : '1px solid rgba(0,201,177,0.3)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ delay: i * 0.04, duration: 0.45 }}
              className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group mb-3"
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: 'rgba(7,26,45,0.5)' }}>
                <ZoomIn size={28} className="text-white drop-shadow" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(7,26,45,0.9), transparent)' }}>
                <span className="text-white text-xs font-semibold">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 text-white bg-white/10 rounded-full p-2 hover:bg-white/20 transition z-10"
              onClick={() => setLightbox(null)}>
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              src={lightbox}
              alt="Gallery"
              className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
