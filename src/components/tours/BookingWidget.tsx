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
  const [adults, setAdults] = useState(1);
  const [showPayPal, setShowPayPal] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(tour.id);

  const fullPrice = tour.price;
  const depositPerPerson = Math.ceil(fullPrice * 0.15);
  const cashBalance = tour.isPackage
    ? Math.ceil(fullPrice * 0.85)
    : Math.ceil(fullPrice * 0.85) * adults;
  const totalDeposit = tour.isPackage ? depositPerPerson : depositPerPerson * adults;
  const totalFullPrice = tour.isPackage ? fullPrice : fullPrice * adults;

  const canProceed = date && guestName.trim().length > 0;

  const generateBookingRef = () => {
    return 'OMP-' + Date.now().toString(36).toUpperCase();
  };

  const sendConfirmationEmail = async (ref: string) => {
    // EmailJS integration (configure in .env)
    try {
      const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
        const { default: emailjs } = await import('@emailjs/browser');
        await emailjs.send(
          emailjsServiceId,
          emailjsTemplateId,
          {
            booking_ref: ref,
            tour_name: tour.name,
            tour_date: date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
            pickup_time: pickupTime,
            guest_name: guestName,
            adults: tour.isPackage ? 'Package' : adults,
            deposit_paid: `$${totalDeposit.toFixed(2)}`,
            cash_balance: `$${cashBalance.toFixed(2)}`,
            to_email: 'info@omptours-travel.com',
          },
          emailjsPublicKey
        );
      }
    } catch {
      // Email sending is non-critical
    }
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
              A confirmation has been sent to your email. Our team will be in touch to confirm your pickup details.
            </p>
            <div className="glass rounded-xl p-4 text-left space-y-2 mb-4">
              <p className="text-white/80 text-sm"><strong className="text-white">Tour:</strong> {tour.name}</p>
              <p className="text-white/80 text-sm"><strong className="text-white">Date:</strong> {date?.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p className="text-white/80 text-sm"><strong className="text-white">Pickup:</strong> {pickupTime}</p>
              <p className="text-white/80 text-sm"><strong className="text-white">Name:</strong> {guestName}</p>
              <p className="text-[#F0A500] text-sm font-semibold"><strong>Balance due in cash:</strong> ${cashBalance.toFixed(2)}</p>
            </div>
            <p className="text-white/50 text-xs">Questions? WhatsApp us at +1 (809) 431-2542</p>
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

              {/* Adults */}
              {!tour.isPackage && (
                <div>
                  <label className="text-[#00C9A7] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users size={12} />
                    * How many adult/s?
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#00C9A7]/20 text-white font-bold text-xl transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-white font-bold text-xl w-8 text-center">{adults}</span>
                    <button
                      onClick={() => setAdults(Math.min(20, adults + 1))}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#00C9A7]/20 text-white font-bold text-xl transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
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
                    if (!canProceed) {
                      toast.error('Please select a date and enter your name');
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
