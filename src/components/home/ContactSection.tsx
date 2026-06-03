'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

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
            Get in Touch
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Contact Us
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Have questions? We&apos;re here to help you plan your perfect Punta Cana adventure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-5"
          >
            {[
              {
                icon: Phone,
                label: 'Phone & WhatsApp',
                value: '+1 (809) 431-2542',
                href: 'tel:+18094312542',
                color: '#00C9A7',
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'info@omptours-travel.com',
                href: 'mailto:info@omptours-travel.com',
                color: '#F0A500',
              },
              {
                icon: MapPin,
                label: 'Location',
                value: 'Av. Estados Unidos, Higüey 23301, Dominican Republic',
                href: 'https://maps.app.goo.gl/yHkMvcHhooLJgJE68',
                color: '#00C9A7',
              },
              {
                icon: Clock,
                label: 'Pickup Times',
                value: '9:00 AM & 2:00 PM daily',
                href: null,
                color: '#F0A500',
              },
            ].map((item) => (
              <div key={item.label} className="neo-card p-5 flex items-start gap-4 group">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}
                >
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-white font-semibold text-sm hover:text-[#00C9A7] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white font-semibold text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/18094312542?text=Hello!%20I%27m%20interested%20in%20booking%20a%20tour%20with%20OMP%20Tours."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 justify-center py-4 px-6 rounded-2xl text-white font-bold transition-all hover:scale-105"
              style={{ background: '#25D366' }}
            >
              <MessageCircle size={22} />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-2xl overflow-hidden border border-[#00C9A7]/20 h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.147338297056!2d-68.4278496!3d18.655563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x498f864efeef50c3%3A0x463c438097b91365!2sMs.%20Excursion!5e1!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="OMP Tours & TransfersLocation"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
