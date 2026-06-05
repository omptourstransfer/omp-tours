'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Zap } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  instant?: boolean;
}

/* ─── INSTANT PRE-BUILT ANSWERS ──────────────────────────
   These fire immediately — zero API wait.
   Keywords are checked before any network call.
────────────────────────────────────────────────────────── */
const INSTANT: { keys: string[]; answer: string }[] = [
  {
    keys: ['horseback', 'horse', 'horse riding', 'caballo'],
    answer: `🐴 **Horseback Riding** — $85/person · 2 hrs\n\nRide along pristine Caribbean beaches & tropical trails. Perfect for beginners & experienced riders!\n\n✅ Hotel pickup included\n✅ Helmet & guide included\n⏰ Pickup: 9:00 AM or 2:00 PM\n⚠️ Max weight 250 lbs\n\n💰 Only $13 deposit online — rest in cash on tour day!\n\nReady to book? 👉 /tours/horseback-riding`,
  },
  {
    keys: ['buggy', 'buggies', 'off road', 'offroad', 'macao'],
    answer: `🏎️ **Buggy Tour** — $60/person · 4 hrs\n\nDrive your own buggy through rugged trails, splash through mud, visit a cenote & relax at Macao Beach!\n\n✅ Hotel pickup included\n✅ Helmets & safety gear\n✅ Cenote swimming stop\n✅ Coffee & cocoa tasting\n⏰ Pickup: 7:00 AM or 11:00 AM\n\nAlso available: Polaris Buggy ($95) and Sunset Buggy Ride ($150)\n\n💰 Only $9 deposit online!\n\n👉 /tours/buggies`,
  },
  {
    keys: ['atv', '4 wheeler', '4-wheeler', 'wheeler', 'quad'],
    answer: `🏍️ **ATV (4-Wheelers)** — $70/person · 4 hrs\n\nConquer Dominican terrain on a powerful ATV! Race through off-road trails, forests & local villages.\n\n✅ Hotel pickup included\n✅ Helmet & safety gear\n✅ Cenote or river stop\n✅ Cultural village stop\n⏰ Pickup: 8:00 AM or 1:00 PM\n\n💰 Only $11 deposit online!\n\n👉 /tours/atv-4-wheelers`,
  },
  {
    keys: ['saona', 'saona island', 'catamaran', 'isla saona'],
    answer: `🏝️ **Saona Island Tours** — from $110/person\n\nThe crown jewel of the Dominican Republic! Multiple options:\n\n• Catamaran Tour — $190 (groups 10+)\n• Catamaran Jacuzzi — $220 (premium)\n• Semi-Private Catamaran — $110\n• Private Speedboat — $140\n• Couple Package — $650 total\n• Small Group (6 pax) — $750 total\n• Medium Group (12 pax) — $900 total\n\n✅ Hotel pickup · Open bar · Snorkeling · Lunch included\n⏰ Pickup: 7:30–8:00 AM\n\n👉 /tours/saona-island-catamaran-tour`,
  },
  {
    keys: ['whale', 'whale watching', 'samana', 'ballena', 'humpback'],
    answer: `🐋 **Samana Whale Watching** — $160/person · 10 hrs\n\n⚠️ SEASONAL: January to April ONLY\n\nWitness humpback whales in their natural breeding grounds at Samana Bay — one of the world's greatest wildlife spectacles!\n\n✅ Hotel pickup & drop-off\n✅ Certified naturalist guide\n✅ National park entrance fee\n✅ Traditional Dominican lunch\n✅ Samana city tour included\n⏰ Pickup: 5:30 AM (very early!)\n\n💰 Only $24 deposit online!\n\n👉 /tours/samana-whale-watching`,
  },
  {
    keys: ['scuba', 'diving', 'scuba diving', 'dive', 'buceo'],
    answer: `🤿 **Scuba Diving Options**\n\n• Scuba Doo (underwater scooter) — $80 · 2 hrs *(No cert needed!)*\n• Scuba Diving Punta Cana — $110 · 3 hrs\n• Scuba Diving Catalina Island — $190 · 6 hrs *(Premium)*\n\nAll options include hotel pickup, PADI-certified instructors & all equipment.\n⏰ Pickup: 8:00 AM or 1:00 PM\n\n👉 /tours/scuba-diving`,
  },
  {
    keys: ['zipline', 'zip line', 'zip', 'tyrolienne'],
    answer: `🦅 **ZipLine Adventure** — $85/person · 2 hrs\n\nSoar above the tropical canopy on thrilling ziplines with stunning jungle views!\n\n✅ Hotel pickup included\n✅ All equipment & harnesses\n✅ Certified safety team\n✅ Multiple courses\n⏰ Pickup: 9:00 AM or 2:00 PM\n⚠️ Weight limit: 280 lbs\n\n💰 Only $13 deposit online!\n\n👉 /tours/zipline`,
  },
  {
    keys: ['party boat', 'party', 'boat party', 'open bar', 'fiesta'],
    answer: `🎉 **Party Boat** — $85/person · 4 hrs\n\nThe most popular social tour in Punta Cana! Dance, drink, snorkel & have the time of your life!\n\n✅ Hotel pickup included\n✅ Open bar (beer, rum, sodas)\n✅ Snorkeling equipment\n✅ Music & DJ\n✅ Natural pool swimming\n⏰ Pickup: 9:00 AM\n\n💰 Only $13 deposit online!\n\n👉 /tours/party-boat`,
  },
  {
    keys: ['speed boat', 'speedboat', 'lancha', 'fast boat'],
    answer: `🚤 **Speed Boat** — $95/person · 3 hrs\n\nFeel the Caribbean spray as you race across crystal-clear turquoise waters with snorkeling stops!\n\n✅ Hotel pickup included\n✅ Snorkeling equipment\n✅ Life jackets\n✅ Professional captain\n⏰ Pickup: 9:00 AM or 2:00 PM\n\n💰 Only $15 deposit online!\n\n👉 /tours/speed-boat`,
  },
  {
    keys: ['parasailing', 'paragliding', 'parasail'],
    answer: `🪂 **Parasailing** — $85/person · 1 hr\n\nSoar 300+ feet above the Caribbean Sea with breathtaking panoramic views!\n\n✅ Hotel pickup included\n✅ Safety harness & equipment\n✅ Solo, tandem, or trio available\n⏰ Pickup: 9:00 AM or 2:00 PM\n⚠️ Min weight: 80 lbs · Max: 350 lbs\n\n💰 Only $13 deposit online!\n\n👉 /tours/parasailing`,
  },
  {
    keys: ['dolphin', 'swim with dolphin', 'delfin', 'dolphins'],
    answer: `🐬 **Swim with Dolphins** — $120/person · 2 hrs\n\nOne of the most magical bucket-list experiences! Swim, play & interact with magnificent dolphins.\n\n✅ Hotel pickup included\n✅ Expert trainer guidance\n✅ Photos of your encounter\n⏰ Pickup: 9:00 AM or 1:00 PM\n⚠️ Min age: 8 years\n\n💰 Only $18 deposit online!\n\n👉 /tours/swim-with-dolphins`,
  },
  {
    keys: ['deposit', 'how much', 'price', 'cost', 'payment', 'pay', 'precio'],
    answer: `💰 **Our Pricing & Payment**\n\nAll prices are per person (packages have flat rates).\n\n🔸 Only **15% deposit online** via PayPal to confirm your booking\n🔸 Balance paid in **cash** directly to guide on tour day\n🔸 No hidden fees!\n\nExample: $85 tour → Only $13 online now!\n\n📋 Need the full tour list with prices? Check:\n👉 /book-online`,
  },
  {
    keys: ['pickup', 'hotel pickup', 'where meet', 'collect', 'recogida'],
    answer: `🚐 **Hotel Pickup Info**\n\nWe come directly to your resort!\n\n⏰ Pickup times: **9:00 AM or 2:00 PM**\n(Some early tours: 6:00–7:30 AM)\n\n✅ All-inclusive resort pickups\n✅ We confirm exact details after booking\n✅ Drop-off back to your hotel included\n\nJust WhatsApp us your hotel name after booking:\n📱 +1 (809) 431-2542`,
  },
  {
    keys: ['book', 'booking', 'how to book', 'reserve', 'reservar'],
    answer: `📋 **How to Book with OMP**\n\nSuper easy — 3 steps:\n\n1️⃣ Choose your tour on **/book-online**\n2️⃣ Pick your date & number of guests\n3️⃣ Pay only **15% deposit** via PayPal\n\n✅ Balance paid in cash on tour day\n✅ Confirmation sent to your email\n✅ Our team WhatsApps you to confirm pickup\n\nQuestions? WhatsApp us anytime:\n📱 +1 (809) 431-2542`,
  },
  {
    keys: ['cancel', 'refund', 'reschedule', 'change date', 'cancelar'],
    answer: `✅ **Cancellation & Rescheduling**\n\nWe understand plans change!\n\n• Cancel/reschedule **24+ hrs before** → No charge, full reschedule\n• Contact us via WhatsApp ASAP\n\n📱 WhatsApp: +1 (809) 431-2542\n📧 Email: bookings@omptoursandtransfers.com\n\nWe'll always do our best to accommodate you! 🌴`,
  },
  {
    keys: ['007', 'combo', 'package deal', 'best tour', 'best value'],
    answer: `🎯 **007 Combo Tour** — $120/person · 6 hrs\n\nThe BEST VALUE tour! Everything in one:\n\n✅ Off-road buggy adventure\n✅ Cenote swimming\n✅ Coffee & cocoa tasting\n✅ Macao Beach visit\n✅ Hotel pickup included\n⏰ Pickup: 7:00 AM\n\n💰 Only $18 deposit online!\n\n👉 /tours/007-combo-tour`,
  },
];

const SYSTEM_CONTEXT = `You are the friendly AI assistant for OMP Tours & Transfers a premier tour company based in Higüey/Punta Cana, Dominican Republic. Owner is Orlando — local expert and your Caribbean guide. Phone/WhatsApp: +1 (809) 431-2542. Only 15% deposit charged online via PayPal. Rest paid in cash on tour day. Pickup: 9:00AM or 2:00PM. Be warm, concise, helpful. If unsure, direct to WhatsApp.`;

function findInstantAnswer(text: string): string | null {
  const lower = text.toLowerCase();
  for (const item of INSTANT) {
    if (item.keys.some((k) => lower.includes(k))) {
      return item.answer;
    }
  }
  return null;
}

const QUICK_CHIPS = ['Buggies 🏎️', 'Saona Island 🏝️', 'Whale Watching 🐋', 'Deposit info 💰', 'Hotel pickup 🚐'];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Welcome to OMP Tours! 🌴 Ask me anything about our 31 tours — prices, what to bring, booking, pickup. I have instant answers for popular tours!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const userMsg: Message = { role: 'user', content: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // ── Check for instant pre-built answer first ──
    const instant = findInstantAnswer(userText);
    if (instant) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', content: instant, instant: true }]);
      }, 180); // tiny delay so it feels natural
      return;
    }

    // ── Fall back to AI for complex questions ──
    setLoading(true);
    try {
      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_CONTEXT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userText },
          ],
          model: 'openai',
          seed: 42,
          stream: false,
        }),
      });
      const txt = await response.text();
      setMessages((prev) => [...prev, { role: 'assistant', content: txt }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Quick question? Try WhatsApp for the fastest reply: +1 (809) 431-2542 🌺' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle */}
      <motion.button
        onClick={() => setOpen(!open)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
        style={{ bottom: '5.5rem', left: '1.5rem', background: 'linear-gradient(135deg, #00C9B1, #0077B6)', border: '2px solid rgba(0,201,177,0.5)' }}
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}><X size={22} className="text-white" /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}><MessageCircle size={22} className="text-white" /></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-50 w-[360px] max-w-[calc(100vw-2rem)] glass-dark rounded-2xl border border-[#00C9B1]/30 shadow-2xl flex flex-col overflow-hidden"
            style={{ bottom: '10rem', left: '1.5rem' }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #00C9B1, #0077B6)' }}>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">OMP AI Assistant</p>
                <div className="flex items-center gap-1">
                  <Zap size={10} className="text-yellow-300" />
                  <p className="text-white/80 text-[10px]">Instant answers for popular tours</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white"><X size={18} /></button>
            </div>

            {/* Quick chips */}
            {messages.length <= 1 && (
              <div className="px-3 pt-3 flex flex-wrap gap-1.5">
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="text-[11px] px-2.5 py-1 rounded-full font-semibold transition-all"
                    style={{ background: 'rgba(0,201,177,0.15)', color: '#00C9B1', border: '1px solid rgba(0,201,177,0.3)' }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-72">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${msg.role === 'assistant' ? 'bg-[#00C9B1]/20 text-[#00C9B1]' : 'bg-[#F0A500]/20 text-[#F0A500]'}`}>
                    {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className={`px-3 py-2 rounded-xl text-xs max-w-[82%] leading-relaxed whitespace-pre-line ${msg.role === 'assistant' ? 'bg-white/10 text-white/90' : 'bg-[#00C9B1] text-[#071929] font-semibold'}`}>
                    {msg.instant && <span className="inline-flex items-center gap-1 text-[10px] font-bold mb-1 opacity-60"><Zap size={9} />Instant</span>}
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#00C9B1]/20 text-[#00C9B1] flex items-center justify-center"><Bot size={14} /></div>
                  <div className="px-3 py-2 rounded-xl bg-white/10 flex gap-1 items-center">
                    {[0,1,2].map((i) => (
                      <motion.div key={i} animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} className="w-1.5 h-1.5 rounded-full bg-[#00C9B1]" />
                    ))}
                    <span className="text-white/40 text-[10px] ml-1">thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about any tour..."
                className="flex-1 bg-white/10 text-white text-sm px-3 py-2 rounded-xl border border-white/10 focus:border-[#00C9B1]/50 focus:outline-none placeholder:text-white/30"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40 transition-colors"
                style={{ background: '#00C9B1', color: '#071929' }}
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
