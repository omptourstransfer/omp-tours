'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';

const COLOR_THEMES = [
  { id: 'ocean',   emoji: '🌊', dot: '#00C9B1', label: 'Ocean' },
  { id: 'sunset',  emoji: '🌅', dot: '#FF6B35', label: 'Sunset' },
  { id: 'emerald', emoji: '🌿', dot: '#00C9A7', label: 'Emerald' },
  { id: 'royal',   emoji: '👑', dot: '#A78BFA', label: 'Royal' },
];

const THEME_VARS: Record<string, Record<string, string>> = {
  ocean:   { '--bg': '#071A2D', '--bg-raised': '#0C2642', '--teal': '#00C9B1', '--ocean': '#0096C7', '--gold': '#C9A84C', '--theme-tint': 'transparent', '--theme-tint-opacity': '0' },
  sunset:  { '--bg': '#1A0A00', '--bg-raised': '#2D1500', '--teal': '#FF6B35', '--ocean': '#F4A261', '--gold': '#FFB347', '--theme-tint': '#FF4500', '--theme-tint-opacity': '0.18' },
  emerald: { '--bg': '#071A10', '--bg-raised': '#0C2618', '--teal': '#00C9A7', '--ocean': '#00A896', '--gold': '#C9A84C', '--theme-tint': '#006644', '--theme-tint-opacity': '0.2' },
  royal:   { '--bg': '#110A2D', '--bg-raised': '#1E1042', '--teal': '#A78BFA', '--ocean': '#818CF8', '--gold': '#FCD34D', '--theme-tint': '#4B0082', '--theme-tint-opacity': '0.22' },
};

const tourLinks = [
  { href: '/tours/buggies', label: 'Buggy Tours' },
  { href: '/tours/saona-island-catamaran-tour', label: 'Saona Island' },
  { href: '/tours/horseback-riding', label: 'Horseback Riding' },
  { href: '/tours/scuba-diving', label: 'Scuba Diving' },
  { href: '/tours/parasailing', label: 'Parasailing' },
  { href: '/tours/samana-whale-watching', label: 'Whale Watching' },
  { href: '/tours/swim-with-dolphins', label: 'Swim with Dolphins' },
  { href: '/tours/santo-domingo-city-tour', label: 'Santo Domingo Tour' },
];

export default function Footer() {
  const [activeTheme, setActiveTheme] = useState('ocean');

  useEffect(() => {
    const saved = localStorage.getItem('omp-theme') || 'ocean';
    setActiveTheme(saved);
  }, []);

  const applyTheme = (id: string) => {
    setActiveTheme(id);
    const vars = THEME_VARS[id];
    if (!vars) return;
    Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    document.body.style.background = vars['--bg'];
    localStorage.setItem('omp-theme', id);
  };

  return (
    <footer className="dark-section bg-[#071A33] border-t border-[#00C9A7]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
                style={{ border: '2px solid rgba(201,168,76,0.45)', boxShadow: '0 0 16px rgba(0,201,177,0.2)' }}>
                <Image src="/logoomp.JPG" alt="OMP Tours" width={56} height={56} className="w-full h-full object-cover" unoptimized />
              </div>
              <div>
                <div className="font-bold text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  OMP Tours &amp; Transfer
                </div>
                <div className="text-[#00C9A7] text-xs">Higüey, Punta Cana</div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Your trusted partner for unforgettable excursions and travel experiences in the Dominican Republic. Safe, exciting, and hassle-free adventures since day one.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/omptourstransfer?igsh=MWx4YnFhM3pzZmFhYg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#00C9A7] hover:text-[#071929] transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/share/1BMKph7zZa/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#00C9A7] hover:text-[#071929] transition-all"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#00C9A7] hover:text-[#071929] transition-all"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/book-online', label: 'Book Online' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-[#00C9A7] transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h3 className="text-white font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
              Popular Tours
            </h3>
            <ul className="space-y-3">
              {tourLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-[#00C9A7] transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#00C9A7] mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/yHkMvcHhooLJgJE68"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 text-sm hover:text-[#00C9A7] transition-colors"
                >
                  Av. Estados Unidos, Higüey 23301, Dominican Republic
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#00C9A7] flex-shrink-0" />
                <a
                  href="tel:+18094312542"
                  className="text-white/60 text-sm hover:text-[#00C9A7] transition-colors"
                >
                  +1 (809) 431-2542
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#00C9A7] flex-shrink-0" />
                <a
                  href="mailto:info@omptours-travel.com"
                  className="text-white/60 text-sm hover:text-[#00C9A7] transition-colors"
                >
                  info@omptours-travel.com
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-[#00C9A7]/10 border border-[#00C9A7]/20">
              <p className="text-[#00C9A7] text-xs font-semibold mb-1">💳 Payment Info</p>
              <p className="text-white/60 text-xs">
                Only 15% deposit charged online via PayPal. Balance paid in cash on tour day.
              </p>
            </div>
          </div>
        </div>

        {/* ── Theme Switcher Strip ── */}
        <div className="mt-10 py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-widest uppercase font-semibold">Color Theme</p>
          <div className="flex items-center gap-2">
            {COLOR_THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => applyTheme(t.id)}
                title={t.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300"
                style={{
                  background: activeTheme === t.id ? `${t.dot}20` : 'rgba(255,255,255,0.05)',
                  border: activeTheme === t.id ? `1.5px solid ${t.dot}70` : '1.5px solid rgba(255,255,255,0.1)',
                  color: activeTheme === t.id ? t.dot : 'rgba(255,255,255,0.4)',
                  boxShadow: activeTheme === t.id ? `0 0 12px ${t.dot}40` : 'none',
                }}
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} OMP Tours & Transfers All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-white/40 text-sm hover:text-[#00C9A7] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 text-sm hover:text-[#00C9A7] transition-colors">
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-xs">Secure payments by</span>
            <span className="text-[#00C9A7] font-bold text-sm">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
