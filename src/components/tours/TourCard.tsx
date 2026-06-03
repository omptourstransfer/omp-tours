'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Star, Tag, ArrowRight, ShoppingCart, Check } from 'lucide-react';
import { Tour } from '@/types';
import { useCart } from '@/context/CartContext';

interface TourCardProps {
  tour: Tour;
  index?: number;
}

const categoryColors: Record<string, string> = {
  Adventure: '#F0A500',
  'Water Sports': '#00C9A7',
  'Nature & Wildlife': '#4CAF50',
  'City Tours': '#9C27B0',
};

export default function TourCard({ tour, index = 0 }: TourCardProps) {
  const deposit = Math.ceil(tour.price * 0.15);
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(tour.id);

  return (
    <div className="card-glow-wrap">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        className="neo-card overflow-hidden group cursor-pointer"
      >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030C18] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[#071929] text-xs font-bold"
          style={{ background: categoryColors[tour.category] || '#00C9A7' }}
        >
          {tour.category}
        </div>

        {/* Badges top-right */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          {tour.offeredDaily && (
            <span className="badge-daily">✦ Daily</span>
          )}
          {tour.seasonal && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(240,165,0,0.9)', color: '#071929' }}>
              Seasonal
            </span>
          )}
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/tours/${tour.slug}`}
            className="btn-shimmer text-[#071929] font-bold px-6 py-2.5 rounded-full flex items-center gap-2 shadow-xl"
          >
            Book Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating & duration */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.round(tour.rating) ? 'text-[#F0A500]' : 'text-white/20'}
                fill={i < Math.round(tour.rating) ? '#F0A500' : 'none'}
              />
            ))}
            <span className="text-white/50 text-xs ml-1">({tour.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-white/50 text-xs">
            <Clock size={12} />
            {tour.duration}
          </div>
        </div>

        {/* Name */}
        <h3
          className="text-white font-bold text-base mb-2 line-clamp-2 leading-snug"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {tour.name}
        </h3>

        {/* Short desc */}
        <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">
          {tour.shortDescription}
        </p>

        {/* Pricing */}
        <div className="mb-4">
          {tour.isPackage ? (
            <div className="flex items-baseline gap-1">
              <span
                className="font-bold text-2xl"
                style={{
                  background: 'linear-gradient(135deg, #E8C96A, #C9A84C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: 'Playfair Display, serif',
                }}
              >
                ${tour.price.toLocaleString()}
              </span>
              <span className="text-white/40 text-xs">{tour.packageLabel}</span>
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-1">
                <span
                  className="font-bold text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #00EDD1, #00C9B1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  ${tour.price}
                </span>
                <span className="text-white/40 text-xs">/person</span>
              </div>
              <div className="flex items-center gap-1 text-[#F0A500] text-xs mt-0.5">
                <Tag size={10} />
                Only ${deposit} deposit online
              </div>
            </>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(tour)}
          disabled={inCart}
          className="w-full flex items-center justify-center gap-2 font-bold text-sm py-2.5 rounded-2xl mb-2 transition-all duration-300"
          style={{
            background: inCart ? 'rgba(0,201,177,0.12)' : 'transparent',
            border: inCart ? '1px solid rgba(0,201,177,0.4)' : '1px solid rgba(255,255,255,0.12)',
            color: inCart ? '#00C9B1' : 'rgba(255,255,255,0.5)',
            cursor: inCart ? 'default' : 'pointer',
          }}
        >
          {inCart ? <Check size={13} /> : <ShoppingCart size={13} />}
          {inCart ? 'Added to Cart' : 'Add to Cart'}
        </button>

        {/* Book Now — full-width CTA */}
        <Link
          href={`/tours/${tour.slug}`}
          className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-2xl transition-all duration-300 group/btn"

          style={{
            background: 'linear-gradient(135deg, rgba(0,201,177,0.15), rgba(0,150,199,0.15))',
            border: '1px solid rgba(0,201,177,0.35)',
            color: '#00C9B1',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, #00C9B1, #0096C7)';
            (e.currentTarget as HTMLAnchorElement).style.color = '#071929';
            (e.currentTarget as HTMLAnchorElement).style.border = '1px solid transparent';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'linear-gradient(135deg, rgba(0,201,177,0.15), rgba(0,150,199,0.15))';
            (e.currentTarget as HTMLAnchorElement).style.color = '#00C9B1';
            (e.currentTarget as HTMLAnchorElement).style.border = '1px solid rgba(0,201,177,0.35)';
          }}
        >
          Book Now <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
      </motion.div>
    </div>
  );
}
