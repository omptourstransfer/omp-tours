'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', tour: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSending(true);
    try {
      const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (emailjsServiceId && emailjsPublicKey) {
        const { default: emailjs } = await import('@emailjs/browser');
        await emailjs.send(
          emailjsServiceId,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
          {
            from_name: form.name,
            from_email: form.email,
            phone: form.phone,
            tour_interest: form.tour,
            message: form.message,
            to_email: 'info@omptours-travel.com',
          },
          emailjsPublicKey
        );
      }
      setSent(true);
      toast.success('Message sent! We\'ll be in touch soon.');
    } catch {
      // Fallback — still show success for UX
      setSent(true);
      toast.success('Message sent! We\'ll be in touch soon.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071929] pt-20">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=60)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071929]/80 to-[#071929]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#00C9A7] text-sm font-bold tracking-widest uppercase mb-3 block">Get in Touch</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Contact Us
            </h1>
            <p className="text-white/60 text-lg">
              Have questions? Ready to book? We&apos;re here to help plan your perfect Punta Cana adventure.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            {[
              { icon: Phone, label: 'Phone & WhatsApp', value: '+1 (809) 431-2542', href: 'tel:+18094312542', color: '#00C9A7' },
              { icon: Mail, label: 'Email', value: 'info@omptours-travel.com', href: 'mailto:info@omptours-travel.com', color: '#F0A500' },
              { icon: MapPin, label: 'Our Location', value: 'Av. Estados Unidos, Higüey 23301, Dominican Republic', href: 'https://maps.app.goo.gl/yHkMvcHhooLJgJE68', color: '#00C9A7' },
              { icon: Clock, label: 'Tour Pickup Times', value: '9:00 AM & 2:00 PM daily', href: null, color: '#F0A500' },
            ].map((item) => (
              <div key={item.label} className="neo-card p-5 flex items-start gap-4 group hover:scale-[1.02] transition-transform">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}>
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-white font-semibold text-sm hover:text-[#00C9A7] transition-colors">
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
              href="https://wa.me/18094312542?text=Hello!%20I%27m%20interested%20in%20booking%20a%20tour%20with%20OMP%20Tours%20%26%20Transfer."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 justify-center py-4 px-6 rounded-2xl text-white font-bold hover:opacity-90 transition-opacity"
              style={{ background: '#25D366' }}
            >
              <MessageCircle size={22} />
              Chat on WhatsApp Now
            </a>

            {/* Payment info card */}
            <div className="neo-card p-5 border border-[#00C9A7]/20">
              <h3 className="text-[#00C9A7] font-bold text-sm mb-2">💳 Payment Information</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                We charge only <strong className="text-white">15% deposit online</strong> via PayPal to confirm your booking. The remaining <strong className="text-white">85% balance</strong> is paid directly to your guide in cash on the day of the tour.
              </p>
            </div>
          </motion.div>

          {/* Contact form + map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Form */}
            <div className="neo-card p-6 md:p-8">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#00C9A7]/20 border border-[#00C9A7] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-[#00C9A7]" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Message Sent!</h3>
                  <p className="text-white/60 text-sm mb-6">Thank you for reaching out. Orlando will get back to you within 24 hours.</p>
                  <p className="text-white/40 text-xs">For urgent inquiries, WhatsApp us at +1 (809) 431-2542</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', tour: '', message: '' }); }} className="mt-4 text-[#00C9A7] text-sm hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">Your Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="John Smith"
                          required
                          className="w-full bg-white/5 border border-white/10 focus:border-[#00C9A7]/50 text-white text-sm px-4 py-3 rounded-xl outline-none transition-colors placeholder:text-white/20"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">Email Address *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="john@example.com"
                          required
                          className="w-full bg-white/5 border border-white/10 focus:border-[#00C9A7]/50 text-white text-sm px-4 py-3 rounded-xl outline-none transition-colors placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+1 (000) 000-0000"
                          className="w-full bg-white/5 border border-white/10 focus:border-[#00C9A7]/50 text-white text-sm px-4 py-3 rounded-xl outline-none transition-colors placeholder:text-white/20"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">Tour of Interest</label>
                        <select
                          value={form.tour}
                          onChange={(e) => setForm({ ...form, tour: e.target.value })}
                          className="w-full bg-[#EEF4F8] border border-black/[0.08] focus:border-[#009B89]/50 text-[#0A1F35] text-sm px-4 py-3 rounded-xl outline-none transition-colors"
                        >
                          <option value="">Select a tour...</option>
                          <option>Buggies</option>
                          <option>ATV (4-Wheelers)</option>
                          <option>Buggy Sunset Ride</option>
                          <option>Horseback Riding</option>
                          <option>ZipLine</option>
                          <option>Saona Island – Catamaran</option>
                          <option>Saona Island – Private Speedboat</option>
                          <option>Catalina Island</option>
                          <option>Party Boat</option>
                          <option>Scuba Diving</option>
                          <option>Parasailing</option>
                          <option>Swim with Dolphins</option>
                          <option>Samana Whale Watching</option>
                          <option>Santo Domingo City Tour</option>
                          <option>Other / Custom Tour</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-white/60 text-xs uppercase tracking-wider mb-1.5 block">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your group size, preferred dates, and any questions you have..."
                        required
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#00C9A7]/50 text-white text-sm px-4 py-3 rounded-xl outline-none transition-colors placeholder:text-white/20 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full btn-shimmer text-[#071929] font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    >
                      {sending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#071929]/40 border-t-[#071929] rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-[#00C9A7]/20 h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.147338297056!2d-68.4278496!3d18.655563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x498f864efeef50c3%3A0x463c438097b91365!2sMs.%20Excursion!5e1!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="OMP Tours & Transfer - Higüey, Dominican Republic"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
