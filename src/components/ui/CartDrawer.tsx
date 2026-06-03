'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingCart, Trash2, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, clearCart, totalItems } = useCart();

  const totalDeposit = items.reduce((sum, i) => {
    return sum + Math.ceil(i.tour.price * 0.15);
  }, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col"
            style={{ background: '#071A2D', borderLeft: '1px solid rgba(0,201,177,0.2)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} style={{ color: '#00C9B1' }} />
                <span className="text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Saved Tours
                </span>
                {totalItems > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#00C9B1', color: '#071929' }}>
                    {totalItems}
                  </span>
                )}
              </div>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Empty state */}
            {items.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                <ShoppingCart size={48} style={{ color: 'rgba(255,255,255,0.15)' }} />
                <p className="text-white/40 text-sm text-center">
                  Koi tour select nahi hua abhi.<br />Tour cards pe "Add to Cart" dabao!
                </p>
                <Link
                  href="/book-online"
                  onClick={onClose}
                  className="btn-shimmer text-[#071929] font-bold text-sm px-6 py-3 rounded-full"
                >
                  Browse All Tours
                </Link>
              </div>
            )}

            {/* Items */}
            {items.length > 0 && (
              <>
                <div className="flex-1 overflow-y-auto py-3 space-y-3 px-4">
                  {items.map((item) => {
                    const deposit = Math.ceil(item.tour.price * 0.15);
                    return (
                      <div
                        key={item.tour.id}
                        className="flex gap-3 p-3 rounded-2xl"
                        style={{ background: '#0C2642', border: '1px solid rgba(0,201,177,0.1)' }}
                      >
                        {/* Image */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={item.tour.image}
                            alt={item.tour.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm leading-snug line-clamp-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {item.tour.name}
                          </p>
                          <p className="text-[#00C9B1] font-bold text-sm mt-0.5">
                            ${item.tour.isPackage ? item.tour.price.toLocaleString() : item.tour.price}
                            {!item.tour.isPackage && <span className="text-white/40 text-xs font-normal">/person</span>}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Tag size={9} style={{ color: '#C9A84C' }} />
                            <span className="text-[10px]" style={{ color: '#C9A84C' }}>Only ${deposit} deposit</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => removeFromCart(item.tour.id)}
                            className="text-white/30 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                          <Link
                            href={`/tours/${item.tour.slug}`}
                            onClick={onClose}
                            className="text-[10px] font-bold px-2.5 py-1 rounded-full transition-all"
                            style={{ background: 'rgba(0,201,177,0.15)', color: '#00C9B1', border: '1px solid rgba(0,201,177,0.3)' }}
                          >
                            Book
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="px-4 pb-6 pt-3 border-t border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/50 text-sm">Total deposit (15%):</span>
                    <span className="text-[#C9A84C] font-bold text-lg">${totalDeposit}</span>
                  </div>

                  <Link
                    href="/book-online"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 btn-shimmer text-[#071929] font-bold py-3.5 rounded-2xl"
                  >
                    Book All Tours <ArrowRight size={16} />
                  </Link>

                  <button
                    onClick={clearCart}
                    className="w-full text-center text-white/30 text-xs hover:text-white/60 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
