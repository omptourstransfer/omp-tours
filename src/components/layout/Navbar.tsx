'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartDrawer from '@/components/ui/CartDrawer';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/book-online', label: 'Book Online' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#030C18]/92 backdrop-blur-2xl border-b border-[#C9A84C]/15 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ rotate: 8, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0"
                  style={{ border: '2px solid rgba(201,168,76,0.4)', boxShadow: '0 0 12px rgba(201,168,76,0.25)' }}>
                  <Image
                    src="/logoomp.JPG"
                    alt="OMP Tours & Transfers"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              </motion.div>
              <div>
                <p className="font-bold text-white text-sm leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  OMP Tours &amp; Transfers
                </p>
                <p className="text-[10px] tracking-[2px] uppercase" style={{ color: '#C9A84C' }}>
                  Higüey · Punta Cana
                </p>
              </div>
            </Link>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold relative group transition-colors ${
                    pathname === link.href ? 'text-[#C9A84C]' : 'text-white/75 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-[#C9A84C] to-transparent transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Right */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="tel:+18094312542"
                className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#C9A84C]"
                style={{ color: '#C9A84C' }}
              >
                <Phone size={14} />
                +1 (809) 431-2542
              </a>

              {/* Cart icon */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ background: '#00C9B1', color: '#071929' }}>
                    {totalItems}
                  </span>
                )}
              </button>

              <Link
                href="/book-online"
                className="btn-shimmer text-[#030C18] font-bold text-sm px-6 py-2.5 rounded-full"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile: cart + hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-white/70"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ background: '#00C9B1', color: '#071929' }}>
                    {totalItems}
                  </span>
                )}
              </button>
              <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="dark-section fixed top-0 right-0 h-full w-72 z-50 md:hidden flex flex-col"
              style={{ background: '#030C18', borderLeft: '1px solid rgba(201,168,76,0.2)' }}
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0" style={{ border: '1.5px solid rgba(201,168,76,0.4)' }}>
                    <Image src="/logoomp.JPG" alt="OMP" width={36} height={36} className="w-full h-full object-cover" unoptimized />
                  </div>
                  <span className="text-white font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>OMP Tours</span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white">
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                        pathname === link.href
                          ? 'text-[#C9A84C] bg-[#C9A84C]/10'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-6 pb-8 space-y-4">
                <a href="tel:+18094312542" className="flex items-center gap-2 font-semibold text-sm" style={{ color: '#C9A84C' }}>
                  <Phone size={15} /> +1 (809) 431-2542
                </a>
                <Link
                  href="/book-online"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center btn-shimmer text-[#030C18] font-bold py-3 rounded-full"
                >
                  Book Now
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
