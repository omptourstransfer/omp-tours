'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Clock, Star, Sparkles, ArrowRight, ShoppingCart, Check } from 'lucide-react';
import { tours } from '@/data/tours';
import { useCart } from '@/context/CartContext';

const packages = tours.filter((t) => t.isPackage);

const groupIcons = ['💑', '👨‍👩‍👧‍👦', '🎉'];

export default function SpecialPackages() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const { addToCart, isInCart } = useCart();

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #071A2D 0%, #0C2642 50%, #071A2D 100%)',
      }}
    >
      {/* Ocean shimmer top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,201,177,0.5), transparent)' }}
      />

      {/* Ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,150,199,0.2) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles size={14} className="text-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-bold tracking-widest uppercase">
              Exclusive Packages
            </span>
            <Sparkles size={14} className="text-[#C9A84C]" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Special Group Packages
          </h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Private Saona Island escapes designed for couples, families &amp; groups. One fixed price — no per-person counting.
          </p>
        </motion.div>

        {/* Package cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group relative"
            >
              {/* Popular badge on first */}
              {i === 0 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-[#C9A84C] to-[#E8C96A] text-[#071929] text-xs font-extrabold px-5 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                  ❤️ Most Popular
                </div>
              )}

              <div
                className="relative rounded-3xl overflow-hidden h-full flex flex-col"
                style={{
                  background: '#0C2642',
                  border: i === 0
                    ? '1.5px solid rgba(201,168,76,0.4)'
                    : '1px solid rgba(0,201,177,0.15)',
                  boxShadow: i === 0
                    ? '0 20px 50px rgba(0,0,0,0.55), 0 0 30px rgba(201,168,76,0.12)'
                    : '0 16px 40px rgba(0,0,0,0.5)',
                }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden flex-shrink-0">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"

                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, #0C2642 0%, rgba(12,38,66,0.4) 60%, transparent 100%)' }}
                  />
                  {/* Group icon badge */}
                  <div className="absolute top-4 right-4 text-2xl">{groupIcons[i]}</div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3
                    className="text-white font-bold text-xl mb-1 leading-snug"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {pkg.name}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1 text-[#00C9B1] text-xs font-semibold">
                      <Clock size={11} />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-1 text-[#C9A84C] text-xs font-semibold">
                      <Star size={11} fill="#C9A84C" />
                      5.0 ({pkg.reviewCount} reviews)
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {pkg.shortDescription}
                  </p>

                  {/* Package label */}
                  <div className="flex items-center gap-2 mb-4 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Users size={14} className="text-[#00C9B1] flex-shrink-0" />
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{pkg.packageLabel}</span>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Package price</p>
                      <p
                        className="font-bold text-3xl"
                        style={{
                          fontFamily: 'Playfair Display, serif',
                          background: 'linear-gradient(135deg, #C9A84C, #9A7828)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        ${pkg.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => addToCart(pkg)}
                        disabled={isInCart(pkg.id)}
                        className="flex items-center gap-1.5 font-bold text-xs px-4 py-2 rounded-full transition-all duration-300"
                        style={{
                          background: isInCart(pkg.id) ? 'rgba(0,201,177,0.15)' : 'rgba(255,255,255,0.08)',
                          color: isInCart(pkg.id) ? '#00C9B1' : 'rgba(255,255,255,0.5)',
                          border: isInCart(pkg.id) ? '1px solid rgba(0,201,177,0.4)' : '1px solid rgba(255,255,255,0.12)',
                          cursor: isInCart(pkg.id) ? 'default' : 'pointer',
                        }}
                      >
                        {isInCart(pkg.id) ? <Check size={11} /> : <ShoppingCart size={11} />}
                        {isInCart(pkg.id) ? 'Saved' : 'Save'}
                      </button>
                      <Link
                        href={`/tours/${pkg.slug}`}
                        className="flex items-center gap-2 font-bold text-sm px-5 py-3 rounded-full transition-all duration-300"
                        style={{
                          background: i === 0
                            ? 'linear-gradient(135deg, #C9A84C, #E8C96A)'
                            : '#0A1F35',
                          color: i === 0 ? '#071929' : '#00C9B1',
                          border: 'none',
                        }}
                      >
                        Book Now <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center text-white/35 text-sm mt-10"
        >
          🔒 All packages include hotel pickup · Only 15% deposit online · Balance in cash on tour day
        </motion.p>
      </div>

      {/* Ocean shimmer bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,150,199,0.4), transparent)' }}
      />
    </section>
  );
}
