import type { Metadata } from 'next';
import { Star, Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reviews | OMP Tours & Transfers,
  description: 'Read what 10,000+ happy guests say about OMP Tours & Transfers 5-star reviews from travelers worldwide.',
};

const reviews = [
  { name: 'Emily R.', location: 'New York, USA', tour: 'Saona Island Private Tour', rating: 5, text: 'The highlight of our entire trip! The speedboat ride to Saona was exhilarating and the beach was absolutely breathtaking. Orlando made us feel like VIPs the whole day. We\'ll never forget this experience.' },
  { name: 'Liam D.', location: 'Manchester, UK', tour: 'Samana Whale Watching', rating: 5, text: 'From pickup to drop-off, everything was flawless. Watched humpback whales breaching 50 feet from our boat. The naturalist guide was incredibly knowledgeable. Best wildlife experience of my life.' },
  { name: 'Isabella M.', location: 'Toronto, Canada', tour: 'Party Boat', rating: 5, text: 'We booked for a bachelorette group and the party boat was PERFECT. Music, dancing, open bar, snorkeling — Orlando\'s team went above and beyond. Highly recommend for groups celebrating anything!' },
  { name: 'Marco V.', location: 'Milan, Italy', tour: 'Buggy Tour', rating: 5, text: 'Fantastico! The buggy trail was an adventure — mud, cenotes, local villages. The coffee and cocoa tasting was a highlight we didn\'t expect. Finished at Macao Beach which was stunning. 10/10.' },
  { name: 'Sarah K.', location: 'Sydney, Australia', tour: 'Catalina Island', rating: 5, text: 'A perfect day in paradise. The snorkeling at Catalina was incredible — colorful fish everywhere. The beachside Dominican lunch was delicious. Our guide was funny and professional. So glad we booked!' },
  { name: 'James T.', location: 'London, UK', tour: 'ATV Tour', rating: 5, text: 'Pure adrenaline! Racing through the jungle on ATVs was an absolute blast. The guides were experienced and kept everyone safe while still making it exciting. Best adventure of our Dominican Republic trip.' },
  { name: 'Sofia L.', location: 'Madrid, Spain', tour: 'Horseback Riding', rating: 5, text: 'Riding along the Caribbean beach at sunset on a beautiful horse — dreams are made of this. The horses were gentle and the guide was wonderful with my daughter (8 years old). A magical experience for our family.' },
  { name: 'Ethan W.', location: 'Chicago, USA', tour: 'Saona Catamaran', rating: 5, text: 'Worth every penny. The catamaran is gorgeous, the open bar keeps flowing, and Saona Island is jaw-droppingly beautiful. The starfish pool was something I\'ve never seen before. Already planning to come back!' },
  { name: 'Amara J.', location: 'Paris, France', tour: 'Scuba Diving', rating: 5, text: 'I was a complete beginner and felt completely safe the whole time. The PADI instructor was patient and encouraging. Seeing the coral reef up close for the first time — priceless! Orlando\'s team is world class.' },
  { name: 'Daniel R.', location: 'Miami, USA', tour: 'Deep Sea Fishing', rating: 5, text: 'Caught a mahi-mahi on my first cast! The captain knows exactly where the fish are. Fully equipped boat, cold drinks, and an incredible morning on the open Caribbean. Best fishing trip of my life by far.' },
  { name: 'Yuki T.', location: 'Tokyo, Japan', tour: 'Los Haitises', rating: 5, text: 'This hidden gem blew us away. The mangroves, the Taíno cave paintings, the birds — Los Haitises is unlike anything else in the Caribbean. Orlando\'s guide was so passionate about Dominican history.' },
  { name: 'Rachel M.', location: 'Cape Town, South Africa', tour: 'Montaña Redonda', rating: 5, text: 'The 360° view from the top is something you cannot describe — you have to see it. The mountaintop swing photo is now my phone wallpaper! Our guide made the whole journey fun and educational.' },
];

const stars = (n: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star key={i} size={13} fill={i < n ? '#F0A500' : 'none'} className={i < n ? 'text-[#F0A500]' : 'text-white/20'} />
  ));

const avatarColors = ['#00C9B1', '#C9A84C', '#0096C7', '#E8C96A', '#009B89', '#F0A500'];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-[#071929] pt-20">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=60)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071929]/80 to-[#071929]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#00C9A7] text-sm font-bold tracking-widest uppercase mb-3 block">What Our Guests Say</span>
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            10,000+ Happy Travelers
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Real reviews from real guests. We&apos;re proud of every single one.
          </p>
          {/* Star summary */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-1">{stars(5)}</div>
            <span className="text-white font-bold text-lg">5.0</span>
            <span className="text-white/50 text-sm">Average across all tours</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: '10K+', label: 'Happy Guests' },
            { value: '5.0★', label: 'Average Rating' },
            { value: '31', label: 'Tours Available' },
          ].map((s) => (
            <div key={s.label} className="neo-card p-6 text-center">
              <p
                className="font-bold text-3xl mb-1"
                style={{ fontFamily: 'Playfair Display, serif', background: 'linear-gradient(135deg, #E8C96A, #C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                {s.value}
              </p>
              <p className="text-white/50 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews grid */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="neo-card p-6 flex flex-col gap-4 group hover:scale-[1.02] transition-transform duration-300">
              {/* Quote icon */}
              <Quote size={22} style={{ color: 'rgba(0,201,177,0.4)' }} />

              {/* Review text */}
              <p className="text-white/70 text-sm leading-relaxed flex-1">&quot;{r.text}&quot;</p>

              {/* Tour badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full w-fit"
                style={{ background: 'rgba(0,201,177,0.1)', border: '1px solid rgba(0,201,177,0.2)' }}>
                <span className="text-[#00C9B1] text-[10px] font-bold">{r.tour}</span>
              </div>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-1 border-t border-white/10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: avatarColors[i % avatarColors.length], color: '#071929' }}
                >
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-white/40 text-xs">{r.location}</p>
                </div>
                <div className="flex gap-0.5 ml-auto">{stars(r.rating)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
