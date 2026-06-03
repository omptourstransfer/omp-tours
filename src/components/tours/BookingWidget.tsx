'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Users, AlertCircle, ShoppingCart, Check } from 'lucide-react';
import { Tour } from '@/types';
import { useCart } from '@/context/CartContext';

interface BookingWidgetProps {
  tour: Tour;
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb'; // 'sb' = sandbox

export default function BookingWidget({ tour }: BookingWidgetProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState<'9:00AM' | '2:00PM'>('9:00AM');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [adults, setAdults] = useState(tour.minPeople ?? 1);
  const [showPayPal, setShowPayPal] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(tour.id);

  const minPeople = tour.minPeople ?? 1;
  const maxPeople = tour.maxPeople ?? 20;
  const hasGroupLimit = !!(tour.minPeople || tour.maxPeople);
  const groupValid = !hasGroupLimit || (adults >= minPeople && adults <= maxPeople);

  const fullPrice = tour.price;
  const depositPerPerson = Math.ceil(fullPrice * 0.15);
  const cashBalance = tour.isPackage
    ? Math.ceil(fullPrice * 0.85)
    : Math.ceil(fullPrice * 0.85) * adults;
  const totalDeposit = tour.isPackage ? depositPerPerson : depositPerPerson * adults;
  const totalFullPrice = tour.isPackage ? fullPrice : fullPrice * adults;

  const canProceed = date && guestName.trim().length > 0 && guestEmail.trim().length > 0 && groupValid;

  const generateBookingRef = () => {
    return 'OMP-' + Date.now().toString(36).toUpperCase();
  };

  const sendConfirmationEmail = async (ref: string) => {
    try {
      const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const tourDateStr = date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const adultsStr = tour.isPackage ? 'Package' : String(adults);

      if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
        const { default: emailjs } = await import('@emailjs/browser');
        const payload = {
          booking_ref: ref,
          tour_name: tour.name,
          tour_date: tourDateStr,
          pickup_time: pickupTime,
          guest_name: guestName,
          guest_email: guestEmail,
          adults: adultsStr,
          deposit_paid: `$${totalDeposit.toFixed(2)}`,
          cash_balance: `$${cashBalance.toFixed(2)}`,
          to_email: 'info@omptours-travel.com',
          reply_to: guestEmail,
        };
        // Send to Orlando
        await emailjs.send(emailjsServiceId, emailjsTemplateId, payload, emailjsPublicKey);
        // Send confirmation to customer
        await emailjs.send(emailjsServiceId, emailjsTemplateId, { ...payload, to_email: guestEmail }, emailjsPublicKey);
      }
    } catch {
      // Email non-critical
    }
  };

  const sendWhatsAppConfirmation = (ref: string) => {
    const tourDateStr = date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const msg = encodeURIComponent(
      `🌴 *New Booking – OMP Tours & Transfers*\n\n` +
      `📋 Ref: ${ref}\n` +
      `🗺️ Tour: ${tour.name}\n` +
      `📅 Date: ${tourDateStr}\n` +
      `⏰ Pickup: ${pickupTime}\n` +
      `👤 Name: ${guestName}\n` +
      `📧 Email: ${guestEmail}\n` +
      `👥 Guests: ${tour.isPackage ? 'Package' : adults}\n\n` +
      `💳 Deposit paid (PayPal): $${totalDeposit.toFixed(2)}\n` +
      `💵 Balance due in cash on tour day: $${cashBalance.toFixed(2)}\n\n` +
      `Please confirm this booking. Thank you!`
    );
    window.open(`https://wa.me/18094312542?text=${msg}`, '_blank');
  };

  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: 'USD' }}>
      <div className="neo-card p-6 sticky top-24">
        {bookingComplete ? (
          /* Confirmation state */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#00C9A7]/20 border border-[#00C9A7] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#00C9A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              Booking Confirmed! 🎉
            </h3>
            <p className="text-[#00C9A7] font-bold text-sm mb-1">Reference: {bookingRef}</p>
            <p className="text-white/60 text-sm mb-4">
              A confirmation has been sent to <strong className="text-white">{guestEmail}</strong>. Please read the details below carefully.
            </p>
            <div className="glass rounded-xl p-4 text-left space-y-2 mb-3">
              <p className="text-white/80 text-sm"><strong className="text-white">Tour:</strong> {tour.name}</p>
              <p className="text-white/80 text-sm"><strong className="text-white">Date:</strong> {date?.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p className="text-white/80 text-sm"><strong className="text-white">Pickup:</strong> {pickupTime}</p>
              <p className="text-white/80 text-sm"><strong className="text-white">Name:</strong> {guestName}</p>
              <p className="text-white/80 text-sm"><strong className="text-white">Guests:</strong> {tour.isPackage ? 'Package' : adults}</p>
            </div>
            <div className="glass rounded-xl p-4 text-left space-y-2 mb-3 border border-[#00C9A7]/30">
              <p className="text-[#00C9A7] text-xs font-bold uppercase tracking-wider mb-1">Payment Summary</p>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">✅ Deposit paid (PayPal):</span>
                <span className="text-[#00C9A7] font-bold">${totalDeposit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-white/10 pt-2 mt-1">
                <span className="text-white/80">💵 Balance due in CASH on tour day:</span>
                <span className="text-[#F0A500] font-bold text-base">${cashBalance.toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-[#F0A500]/10 border border-[#F0A500]/30 rounded-xl p-3 mb-3">
              <p className="text-[#F0A500] text-xs font-semibold">⚠️ Important: You still owe <strong>${cashBalance.toFixed(2)}</strong> in cash, paid directly to your guide on the day of the tour. The ${totalDeposit.toFixed(2)} online was only a deposit to confirm your spot.</p>
            </div>
            <a
              href={`https://wa.me/18094312542?text=${encodeURIComponent(`Hi! I just booked ${tour.name} (Ref: ${bookingRef}) for ${date?.toLocaleDateString('en-US')} at ${pickupTime}. My name is ${guestName}. Please confirm!`)}`}
              target="_blank"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold mb-2"
              style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.4)', color: '#25D366' }}
            >
              💬 Confirm on WhatsApp
            </a>
            <p className="text-white/40 text-xs text-center">Questions? +1 (809) 431-2542</p>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <div className="border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  {tour.isPackage ? (
                    <>
                      <p className="text-[#00C9A7] font-bold text-2xl">${fullPrice.toLocaleString()}</p>
                      <p className="text-white/40 text-xs">{tour.packageLabel}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[#00C9A7] font-bold text-2xl">${fullPrice}</p>
                      <p className="text-white/40 text-xs">per person</p>
                    </>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-[#F0A500] font-bold text-sm">Only ${depositPerPerson}</p>
                  <p className="text-white/40 text-xs">deposit online</p>
                </div>
              </div>
            </div>

            {/* Important notice */}
            <div className="glass border border-[#F0A500]/30 rounded-xl p-3 mb-5 flex items-start gap-2">
              <AlertCircle size={16} className="text-[#F0A500] flex-shrink-0 mt-0.5" />
              <p className="text-white/70 text-xs">
                <strong className="text-[#F0A500]">15% deposit</strong> charged online. Balance paid in cash on tour day.
              </p>
            </div>

            <div className="space-y-4">
              {/* Date */}
              <div>
                <label className="text-[#00C9A7] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar size={12} />
                  * Select Your Cruise Date
                </label>
                <div className="bg-[#EEF4F8] border border-black/[0.08] rounded-xl px-4 py-3 hover:border-[#009B89]/40 transition-colors">
                  <DatePicker
                    selected={date}
                    onChange={(d) => setDate(d)}
                    minDate={new Date()}
                    placeholderText="Click to select date"
                    dateFormat="MMMM d, yyyy"
                    className="bg-transparent text-white text-sm w-full outline-none cursor-pointer placeholder:text-white/30"
                  />
                </div>
              </div>

              {/* Pickup time */}
              <div>
                <label className="text-[#00C9A7] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock size={12} />
                  * Pick Up Times
                </label>
                <div className="flex gap-3">
                  {(['9:00AM', '2:00PM'] as const).map((time) => (
                    <button
                      key={time}
                      onClick={() => setPickupTime(time)}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all ${
                        pickupTime === time
                          ? 'bg-[#00C9A7] text-[#071929] border-[#00C9A7]'
                          : 'bg-white/5 text-white border-white/10 hover:border-[#00C9A7]/40'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-[#00C9A7] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User size={12} />
                  * Name for Will-Call?
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-[#EEF4F8] border border-black/[0.08] hover:border-[#009B89]/50 focus:border-[#009B89] text-[#0A1F35] text-sm px-4 py-3 rounded-xl outline-none transition-colors placeholder:text-[#0A1F35]/30"
                />
              </div>

              {/* Price summary */}
              <div className="glass rounded-xl p-4 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Total tour price:</span>
                  <span className="text-white font-semibold">
                    {tour.isPackage ? `$${fullPrice.toLocaleString()} (package)` : `$${fullPrice}/person`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">15% deposit:</span>
                  <span className="text-[#F0A500] font-semibold">${depositPerPerson}/person</span>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-[#00C9A7] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User size={12} />
                  * Your Email (for confirmation)
                </label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-[#EEF4F8] border border-black/[0.08] hover:border-[#009B89]/50 focus:border-[#009B89] text-[#0A1F35] text-sm px-4 py-3 rounded-xl outline-none transition-colors placeholder:text-[#0A1F35]/30"
                />
              </div>

              {/* Adults */}
              {!tour.isPackage && (
                <div>
                  <label className="text-[#00C9A7] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users size={12} />
                    * How many adult/s?
                    {hasGroupLimit && (
                      <span className="text-white/40 font-normal normal-case tracking-normal ml-1">
                        ({minPeople}–{maxPeople} people)
                      </span>
                    )}
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setAdults(Math.max(minPeople, adults - 1))}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#00C9A7]/20 text-white font-bold text-xl transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-white font-bold text-xl w-8 text-center">{adults}</span>
                    <button
                      onClick={() => setAdults(Math.min(maxPeople, adults + 1))}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#00C9A7]/20 text-white font-bold text-xl transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  {hasGroupLimit && !groupValid && (
                    <div className="mt-2 flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                      <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-300 text-xs">
                        This tour requires a minimum of <strong>{minPeople}</strong> and maximum of <strong>{maxPeople}</strong> people.
                        Please <a href="https://wa.me/18094312542" target="_blank" className="underline text-red-300">contact us on WhatsApp</a> to arrange a private tour for smaller groups.
                      </p>
                    </div>
                  )}
                  {hasGroupLimit && groupValid && (
                    <p className="text-white/40 text-xs mt-1.5">✓ Group size confirmed ({adults} people)</p>
                  )}
                </div>
              )}

              {/* Cash balance */}
              <div className="glass rounded-xl p-4 space-y-2 border border-[#00C9A7]/20">
                <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                  <span className="text-white/60">Balance due in cash on tour day:</span>
                  <span className="text-white font-bold">${cashBalance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60 text-sm">Options amount (PayPal charge):</span>
                  <span className="text-[#00C9A7] font-bold text-lg">${totalDeposit.toFixed(2)}</span>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => { addToCart(tour); toast.success(inCart ? 'Already in cart!' : `${tour.name} added to cart!`); }}
                className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: inCart ? 'rgba(0,201,177,0.12)' : 'rgba(255,255,255,0.05)',
                  border: inCart ? '1px solid rgba(0,201,177,0.4)' : '1px solid rgba(255,255,255,0.12)',
                  color: inCart ? '#00C9B1' : 'rgba(255,255,255,0.55)',
                }}
              >
                {inCart ? <Check size={14} /> : <ShoppingCart size={14} />}
                {inCart ? 'Saved to Cart ✓' : 'Add to Cart (Book Later)'}
              </button>

              {/* Book button */}
              {!showPayPal ? (
                <button
                  onClick={() => {
                    if (!date || !guestName.trim() || !guestEmail.trim()) {
                      toast.error('Please fill in date, name and email');
                      return;
                    }
                    if (!groupValid) {
                      toast.error(`This tour requires ${minPeople}–${maxPeople} people`);
                      return;
                    }
                    setShowPayPal(true);
                  }}
                  className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 ${
                    canProceed
                      ? 'btn-shimmer text-[#071929] hover:shadow-glow-teal'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  {canProceed ? `Pay $${totalDeposit.toFixed(2)} Deposit via PayPal` : 'Select date & name to continue'}
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <p className="text-white/60 text-xs text-center mb-3">
                    Secure 15% deposit: <strong className="text-[#00C9A7]">${totalDeposit.toFixed(2)}</strong>
                  </p>
                  <PayPalButtons
                    style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                          {
                            description: `${tour.name} - 15% Deposit (${date?.toLocaleDateString()} ${pickupTime}) - ${guestName}`,
                            amount: {
                              currency_code: 'USD',
                              value: totalDeposit.toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      if (actions.order) {
                        await actions.order.capture();
                        const ref = generateBookingRef();
                        setBookingRef(ref);
                        await sendConfirmationEmail(ref);
                        sendWhatsAppConfirmation(ref);
                        setBookingComplete(true);
                        toast.success('Booking confirmed! Check your email.');
                      }
                    }}
                    onError={() => {
                      toast.error('Payment failed. Please try again.');
                      setShowPayPal(false);
                    }}
                  />
                  <button
                    onClick={() => setShowPayPal(false)}
                    className="w-full text-center text-white/40 text-xs mt-2 hover:text-white transition-colors"
                  >
                    ← Go back
                  </button>
                </motion.div>
              )}
            </div>

            {/* Footer note */}
            <p className="text-white/30 text-xs text-center mt-4">
              🔒 Secure payment via PayPal · Balance paid in cash on tour day
            </p>
          </>
        )}
      </div>
    </PayPalScriptProvider>
  );
}
