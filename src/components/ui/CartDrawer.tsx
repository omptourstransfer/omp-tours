'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ShoppingCart, Trash2, ArrowRight, User, Mail, Clock, Calendar, Users, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface TourBookingDetails {
  date: Date | null;
  adults: number;
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb';

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, clearCart, totalItems } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [pickupTime, setPickupTime] = useState<'9:00AM' | '2:00PM'>('9:00AM');
  const [tourDetails, setTourDetails] = useState<Record<number, TourBookingDetails>>({});
  const [bookingRefs, setBookingRefs] = useState<string[]>([]);
  const [finalDeposit, setFinalDeposit] = useState(0);
  const [finalCash, setFinalCash] = useState(0);

  const getDetails = (id: number): TourBookingDetails =>
    tourDetails[id] || { date: null, adults: 1 };

  const updateDetails = (id: number, update: Partial<TourBookingDetails>) => {
    setTourDetails(prev => ({ ...prev, [id]: { ...getDetails(id), ...update } }));
  };

  const totalDeposit = items.reduce((sum, i) => {
    const det = getDetails(i.tour.id);
    const deposit = Math.ceil(i.tour.price * 0.15);
    return sum + (i.tour.isPackage ? deposit : deposit * det.adults);
  }, 0);

  const totalCash = items.reduce((sum, i) => {
    const det = getDetails(i.tour.id);
    const cash = Math.ceil(i.tour.price * 0.85);
    return sum + (i.tour.isPackage ? cash : cash * det.adults);
  }, 0);

  const allDatesSelected = items.every(i => getDetails(i.tour.id).date !== null);
  const canCheckout = guestName.trim() && guestEmail.trim() && allDatesSelected;

  const generateRef = (idx: number) => 'OMP-' + (Date.now() + idx).toString(36).toUpperCase();

  const sendConfirmations = async (refs: string[]) => {
    try {
      const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) return;
      const { default: emailjs } = await import('@emailjs/browser');

      // Build one combined summary for all tours
      const toursSummary = items.map((item, idx) => {
        const det = getDetails(item.tour.id);
        const deposit = Math.ceil(item.tour.price * 0.15);
        const cash = Math.ceil(item.tour.price * 0.85);
        const totalDep = item.tour.isPackage ? deposit : deposit * det.adults;
        const totalCashItem = item.tour.isPackage ? cash : cash * det.adults;
        return `${idx + 1}. ${item.tour.name} | ${det.date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} | ${item.tour.isPackage ? 'Package' : det.adults + ' guests'} | Ref: ${refs[idx]} | Deposit: $${totalDep.toFixed(2)} | Cash due: $${totalCashItem.toFixed(2)}`;
      }).join('\n');

      const payload = {
        booking_ref: refs.join(', '),
        tour_name: toursSummary,
        tour_date: 'See tour details below',
        pickup_time: pickupTime,
        guest_name: guestName,
        guest_email: guestEmail,
        adults: String(items.reduce((s, i) => s + getDetails(i.tour.id).adults, 0)),
        deposit_paid: `$${totalDeposit.toFixed(2)}`,
        cash_balance: `$${totalCash.toFixed(2)}`,
        to_email: guestEmail,
        reply_to: guestEmail,
      };
      // One email to customer
      await emailjs.send(emailjsServiceId, emailjsTemplateId, payload, emailjsPublicKey);
      // One email to Orlando
      await emailjs.send(emailjsServiceId, emailjsTemplateId, { ...payload, to_email: 'bookings@omptoursandtransfers.com' }, emailjsPublicKey);
    } catch { /* non-critical */ }
  };

  const sendWhatsApp = (refs: string[]) => {
    const summary = items.map((item, idx) => {
      const det = getDetails(item.tour.id);
      return `• ${item.tour.name} — ${det.date?.toLocaleDateString('en-US')} (${det.adults} guests) — Ref: ${refs[idx]}`;
    }).join('\n');
    const msg = encodeURIComponent(
      `🌴 *New Cart Booking – OMP Tours & Transfers*\n\n` +
      `👤 Name: ${guestName}\n📧 Email: ${guestEmail}\n⏰ Pickup: ${pickupTime}\n\n` +
      `${summary}\n\n` +
      `💳 Total deposit paid: $${totalDeposit.toFixed(2)}\n💵 Total cash due: $${totalCash.toFixed(2)}`
    );
    window.open(`https://wa.me/18094312542?text=${msg}`, '_blank');
  };

  const resetDrawer = () => {
    setStep('cart');
    setGuestName('');
    setGuestEmail('');
    setPickupTime('9:00AM');
    setTourDetails({});
    setBookingRefs([]);
    setFinalDeposit(0);
    setFinalCash(0);
  };

  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: 'USD' }}>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { if (step !== 'confirmed') resetDrawer(); onClose(); }} className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" />

            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm z-50 flex flex-col overflow-y-auto"
              style={{ background: '#071A2D', borderLeft: '1px solid rgba(0,201,177,0.2)' }}>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 sticky top-0 z-10" style={{ background: '#071A2D' }}>
                <div className="flex items-center gap-2">
                  <ShoppingCart size={18} style={{ color: '#00C9B1' }} />
                  <span className="text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {step === 'cart' ? 'Saved Tours' : step === 'checkout' ? 'Checkout' : 'Confirmed!'}
                  </span>
                  {totalItems > 0 && step === 'cart' && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#00C9B1', color: '#071929' }}>
                      {totalItems}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {step === 'checkout' && (
                    <button onClick={() => setStep('cart')} className="text-white/40 hover:text-white text-xs transition-colors">← Back</button>
                  )}
                  <button onClick={() => { if (step !== 'confirmed') resetDrawer(); onClose(); }} className="text-white/50 hover:text-white transition-colors"><X size={20} /></button>
                </div>
              </div>

              {/* EMPTY STATE */}
              {items.length === 0 && step !== 'confirmed' && (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                  <ShoppingCart size={48} style={{ color: 'rgba(255,255,255,0.15)' }} />
                  <p className="text-white/40 text-sm text-center">No tours saved yet.<br />Click "Add to Cart" on any tour!</p>
                </div>
              )}

              {/* CART STEP */}
              {step === 'cart' && items.length > 0 && (
                <>
                  <div className="flex-1 py-3 space-y-3 px-4">
                    {items.map((item) => {
                      const deposit = Math.ceil(item.tour.price * 0.15);
                      return (
                        <div key={item.tour.id} className="flex gap-3 p-3 rounded-2xl" style={{ background: '#0C2642', border: '1px solid rgba(0,201,177,0.1)' }}>
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                            <Image src={item.tour.image} alt={item.tour.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm leading-snug line-clamp-1" style={{ fontFamily: 'Playfair Display, serif' }}>{item.tour.name}</p>
                            <p className="text-[#00C9B1] font-bold text-sm mt-0.5">${item.tour.isPackage ? item.tour.price.toLocaleString() : item.tour.price}{!item.tour.isPackage && <span className="text-white/40 text-xs font-normal">/person</span>}</p>
                            <p className="text-[10px] mt-0.5" style={{ color: '#C9A84C' }}>Only ${deposit} deposit</p>
                          </div>
                          <button onClick={() => removeFromCart(item.tour.id)} className="text-white/30 hover:text-red-400 transition-colors self-start mt-1"><Trash2 size={14} /></button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-4 pb-6 pt-3 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/50 text-sm">Total deposit (15%):</span>
                      <span className="text-[#C9A84C] font-bold text-lg">${totalDeposit.toFixed(2)}</span>
                    </div>
                    <button onClick={() => setStep('checkout')}
                      className="w-full flex items-center justify-center gap-2 btn-shimmer text-[#071929] font-bold py-3.5 rounded-2xl">
                      Book All Tours <ArrowRight size={16} />
                    </button>
                    <button onClick={clearCart} className="w-full text-center text-white/30 text-xs hover:text-white/60 transition-colors">Clear all</button>
                  </div>
                </>
              )}

              {/* CHECKOUT STEP */}
              {step === 'checkout' && (
                <div className="px-4 py-4 space-y-4">
                  {/* Personal info */}
                  <div className="space-y-3">
                    <p className="text-[#00C9A7] text-xs font-bold uppercase tracking-wider">Your Details</p>
                    <div>
                      <label className="text-white/50 text-xs mb-1 flex items-center gap-1"><User size={11} /> Full Name *</label>
                      <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Your full name"
                        className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 rounded-xl outline-none focus:border-[#00C9A7] transition-colors placeholder:text-white/20" />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs mb-1 flex items-center gap-1"><Mail size={11} /> Email *</label>
                      <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 rounded-xl outline-none focus:border-[#00C9A7] transition-colors placeholder:text-white/20" />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs mb-1 flex items-center gap-1"><Clock size={11} /> Pickup Time *</label>
                      <div className="flex gap-2">
                        {(['9:00AM', '2:00PM'] as const).map(t => (
                          <button key={t} onClick={() => setPickupTime(t)}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${pickupTime === t ? 'bg-[#00C9A7] text-[#071929] border-[#00C9A7]' : 'bg-white/5 text-white border-white/10'}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Per-tour details */}
                  <div className="space-y-3">
                    <p className="text-[#00C9A7] text-xs font-bold uppercase tracking-wider">Tour Details</p>
                    {items.map(item => {
                      const det = getDetails(item.tour.id);
                      return (
                        <div key={item.tour.id} className="p-3 rounded-xl space-y-2" style={{ background: '#0C2642', border: '1px solid rgba(0,201,177,0.15)' }}>
                          <p className="text-white font-semibold text-sm line-clamp-1">{item.tour.name}</p>
                          <div>
                            <label className="text-white/40 text-xs mb-1 flex items-center gap-1"><Calendar size={10} /> Date *</label>
                            <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                              <DatePicker selected={det.date} onChange={d => updateDetails(item.tour.id, { date: d })}
                                minDate={new Date()} placeholderText="Select date" dateFormat="MMM d, yyyy"
                                className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/20" />
                            </div>
                          </div>
                          {!item.tour.isPackage && (
                            <div>
                              <label className="text-white/40 text-xs mb-1 flex items-center gap-1"><Users size={10} /> Guests</label>
                              <div className="flex items-center gap-3">
                                <button onClick={() => updateDetails(item.tour.id, { adults: Math.max(1, det.adults - 1) })}
                                  className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold text-lg flex items-center justify-center">−</button>
                                <span className="text-white font-bold text-lg w-6 text-center">{det.adults}</span>
                                <button onClick={() => updateDetails(item.tour.id, { adults: Math.min(20, det.adults + 1) })}
                                  className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold text-lg flex items-center justify-center">+</button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary */}
                  <div className="glass rounded-xl p-4 space-y-2 border border-[#00C9A7]/20">
                    <div className="flex justify-between text-sm"><span className="text-white/60">Total deposit (PayPal):</span><span className="text-[#F0A500] font-bold">${totalDeposit.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-white/60">Total cash due on tour day:</span><span className="text-white font-bold">${totalCash.toFixed(2)}</span></div>
                  </div>

                  {/* Warning */}
                  <div className="flex gap-2 p-3 rounded-xl" style={{ background: 'rgba(240,165,0,0.1)', border: '1px solid rgba(240,165,0,0.3)' }}>
                    <AlertCircle size={14} className="text-[#F0A500] flex-shrink-0 mt-0.5" />
                    <p className="text-white/70 text-xs">Only 15% deposit online. Remaining <strong className="text-[#F0A500]">${totalCash.toFixed(2)}</strong> paid in cash on tour day.</p>
                  </div>

                  {/* PayPal */}
                  {!canCheckout ? (
                    <button disabled className="w-full py-3.5 rounded-xl bg-white/10 text-white/40 font-bold text-sm cursor-not-allowed">
                      Fill all details to continue
                    </button>
                  ) : (
                    <div>
                      <p className="text-white/50 text-xs text-center mb-2">Pay ${totalDeposit.toFixed(2)} deposit via PayPal</p>
                      <PayPalButtons
                        style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' }}
                        createOrder={(_, actions) => actions.order.create({
                          intent: 'CAPTURE',
                          purchase_units: [{
                            description: `OMP Tours Deposit – ${items.map(i => i.tour.name).join(', ')} – ${guestName}`,
                            amount: { currency_code: 'USD', value: totalDeposit.toFixed(2) }
                          }]
                        })}
                        onApprove={async (_, actions) => {
                          if (actions.order) {
                            await actions.order.capture();
                            const refs = items.map((_, idx) => generateRef(idx));
                            setBookingRefs(refs);
                            setFinalDeposit(totalDeposit);
                            setFinalCash(totalCash);
                            await sendConfirmations(refs);
                            sendWhatsApp(refs);
                            clearCart();
                            setStep('confirmed');
                            toast.success('All bookings confirmed!');
                          }
                        }}
                        onError={() => { toast.error('Payment failed. Try again.'); }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* CONFIRMED STEP */}
              {step === 'confirmed' && (
                <div className="px-4 py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ background: 'rgba(0,201,167,0.2)', border: '1px solid #00C9A7' }}>
                    <svg className="w-8 h-8 text-[#00C9A7]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>All Bookings Confirmed! 🎉</h3>
                  <p className="text-white/60 text-sm">Confirmation sent to <strong className="text-white">{guestEmail}</strong></p>
                  {bookingRefs.length > 0 && (
                    <div className="text-left space-y-1">
                      {bookingRefs.map((ref, idx) => (
                        <p key={ref} className="text-xs text-white/50">
                          <span className="text-[#00C9A7] font-bold">Ref {idx + 1}:</span> {ref}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="glass rounded-xl p-4 text-left space-y-2 border border-[#00C9A7]/20">
                    <p className="text-[#00C9A7] text-xs font-bold uppercase">Payment Summary</p>
                    <div className="flex justify-between text-sm"><span className="text-white/60">✅ Deposit paid:</span><span className="text-[#00C9A7] font-bold">${finalDeposit.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-white/80">💵 Cash due on tour days:</span><span className="text-[#F0A500] font-bold">${finalCash.toFixed(2)}</span></div>
                  </div>

                  <div className="p-3 rounded-xl text-xs" style={{ background: 'rgba(240,165,0,0.1)', border: '1px solid rgba(240,165,0,0.3)', color: '#F0A500' }}>
                    ⚠️ You still owe <strong>${finalCash.toFixed(2)}</strong> in cash to your guide on tour day.
                  </div>

                  <a href={`https://wa.me/18094312542`} target="_blank"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
                    style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.4)', color: '#25D366' }}>
                    💬 Confirm on WhatsApp
                  </a>

                  <button onClick={() => { resetDrawer(); onClose(); }}
                    className="w-full text-white/40 text-xs hover:text-white transition-colors">Close</button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </PayPalScriptProvider>
  );
}
