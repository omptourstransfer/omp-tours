'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import TourCard from '@/components/tours/TourCard';
import { tours, tourCategories } from '@/data/tours';
import type { TourCategory } from '@/types';

export default function BookOnlinePage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchCategory = activeCategory === 'All' || tour.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const categoryColors: Record<string, string> = {
    All: '#00C9A7',
    Adventure: '#F0A500',
    'Water Sports': '#00C9A7',
    'Nature & Wildlife': '#4CAF50',
    'City Tours': '#9C27B0',
  };

  return (
    <div className="min-h-screen bg-[#071929] pt-20">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=60)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071929]/80 to-[#071929]" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#00C9A7] text-sm font-bold tracking-widest uppercase mb-3 block">
              31 Amazing Excursions
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Book Your Adventure
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Choose from 31 incredible tours. Pay only 15% deposit online — rest in cash on tour day. Hotel pickup included!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Search & filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tours..."
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 pl-11 pr-10 py-3 rounded-xl outline-none focus:border-[#00C9A7]/50 transition-colors text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-white/40" />
            {tourCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                  activeCategory === cat
                    ? 'text-[#071929] border-transparent'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-[#00C9A7]/30 hover:text-white'
                }`}
                style={
                  activeCategory === cat
                    ? { background: categoryColors[cat] || '#00C9A7', borderColor: 'transparent' }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/50 text-sm">
            Showing <span className="text-[#00C9A7] font-bold">{filteredTours.length}</span> tours
            {activeCategory !== 'All' && ` in ${activeCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          <p className="text-white/40 text-xs">
            💳 Only 15% deposit online · Rest in cash
          </p>
        </div>

        {/* Tour grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTours.map((tour, i) => (
              <TourCard key={tour.id} tour={tour} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white text-xl font-bold mb-2">No tours found</h3>
            <p className="text-white/50 mb-6">Try a different search or category</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="btn-shimmer text-[#071929] font-bold px-6 py-3 rounded-full"
            >
              View All Tours
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 neo-card p-8 text-center border border-[#00C9A7]/20">
          <h2
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Can't find what you're looking for?
          </h2>
          <p className="text-white/60 mb-6">
            We offer custom group tours and private packages. Contact Orlando directly for a personalized experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/18094312542?text=Hello!%20I%27d%20like%20to%20inquire%20about%20a%20custom%20tour."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center font-bold py-3 px-6 rounded-full text-white"
              style={{ background: '#25D366' }}
            >
              WhatsApp Orlando
            </a>
            <a
              href="tel:+18094312542"
              className="flex items-center gap-2 justify-center font-bold py-3 px-6 rounded-full glass border border-[#00C9A7]/30 text-white hover:border-[#00C9A7] transition-all"
            >
              Call +1 (809) 431-2542
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
