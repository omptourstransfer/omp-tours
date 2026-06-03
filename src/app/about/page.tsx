import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, MapPin, Award, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | OMP Tours & Transfer',
  description:
    'Meet Orlando and the OMP Tours & Transfer team. Your local experts for unforgettable Punta Cana excursions and Dominican Republic adventures.',
};

const values = [
  { icon: Heart, title: 'Passion', description: 'We love what we do — sharing the beauty of our homeland with travelers from around the world.' },
  { icon: Star, title: 'Excellence', description: 'Every tour is delivered with the highest standards of safety, hospitality, and local expertise.' },
  { icon: Users, title: 'Community', description: 'We support local guides, businesses, and communities, ensuring tourism benefits everyone.' },
  { icon: Award, title: 'Authenticity', description: 'We show you the real Dominican Republic — beyond the resort, into the heart of the island.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#071929] pt-20">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=60)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F35]/70 to-[#0A1F35]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="text-[#00C9A7] text-sm font-bold tracking-widest uppercase mb-3 block">Our Story</span>
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            About OMP Tours &amp; Transfer
          </h1>
          <p className="text-white/60 text-lg">
            Born from a love of the Dominican Republic and a passion for authentic travel experiences.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-20">
        {/* Orlando section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-[500px] rounded-3xl overflow-hidden">
              {/* ✅ Orlando's photo — /public/orlando.png */}
              <Image
                src="/orlando.png"
                alt="Orlando - OMP Tours founder"
                fill
                className="object-cover object-top"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071929] via-transparent to-transparent" />
            </div>
            {/* Floating stats */}
            <div className="absolute -bottom-6 -right-6 neo-card p-5 text-center">
              <p className="text-[#00C9A7] font-bold text-3xl" style={{ fontFamily: 'Playfair Display, serif' }}>15+</p>
              <p className="text-white/60 text-sm">Years Experience</p>
            </div>
            <div className="absolute -top-6 -left-6 neo-card p-5 text-center">
              <p className="text-[#F0A500] font-bold text-3xl" style={{ fontFamily: 'Playfair Display, serif' }}>10K+</p>
              <p className="text-white/60 text-sm">Happy Guests</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-[#00C9A7] text-sm font-bold tracking-widest uppercase block mb-2">Meet the Team</span>
              <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Meet Orlando — The Heart Behind OMP Tours
              </h2>
            </div>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                <strong className="text-white">¡Hola!</strong> I&apos;m Orlando — your local guide, travel planner, and friend in the Dominican Republic. I&apos;m the best champagne popper here!
              </p>
              <p>
                I started OMP Tours & Transfer with one goal in mind: to give visitors more than just a vacation. I wanted to create real, personalized experiences that reflect the vibrant beauty, culture, and warmth of Punta Cana excursions and beyond.
              </p>
              <p>
                With years of experience and deep local knowledge, I&apos;ve had the pleasure of showing travelers from all over the world the hidden gems of our Caribbean paradise — from the pristine beaches of Saona Island to the dramatic vistas of Montaña Redonda.
              </p>
              <p>
                Every tour I lead is infused with genuine passion and local authenticity. When you book with OMP, you&apos;re not just getting a tour guide — you&apos;re gaining a Dominican friend for the day.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 glass border border-[#00C9A7]/20 rounded-full px-4 py-2">
                <MapPin size={14} className="text-[#00C9A7]" />
                <span className="text-white/70 text-sm">Higüey, Dominican Republic</span>
              </div>
              <div className="flex items-center gap-2 glass border border-[#F0A500]/20 rounded-full px-4 py-2">
                <Star size={14} className="text-[#F0A500]" fill="#F0A500" />
                <span className="text-white/70 text-sm">5-Star Rated Guide</span>
              </div>
            </div>

            <Link
              href="/book-online"
              className="inline-block btn-shimmer text-[#071929] font-bold px-8 py-4 rounded-full"
            >
              Book a Tour with Orlando
            </Link>
          </div>
        </div>

        {/* Company story */}
        <div className="neo-card p-8 md:p-12">
          <h2
            className="text-3xl font-bold text-white mb-6 text-center"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            OMP Tours &amp; Transfer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/70 leading-relaxed">
            <div className="space-y-4">
              <p>
                OMP Tours & Transfer is your trusted partner for unforgettable excursions and travel experiences in the Dominican Republic. We offer carefully selected tours, adventure activities, and local experiences at the best prices.
              </p>
              <p>
                Based in Higüey — right in the heart of the Punta Cana region — we are perfectly positioned to offer the most convenient, efficient, and authentic tour experiences available. We know every road, every beach, and every hidden gem.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Our goal is to provide safe, exciting, and hassle-free travel so you can enjoy every single moment of your trip. We handle everything from hotel pickup to expert guidance — you just need to show up and have fun.
              </p>
              <p>
                With 31 unique tours across adventure, water sports, nature, and cultural categories, we have something for every type of traveler. Whether you&apos;re a thrill-seeker, a nature lover, a culture enthusiast, or simply looking for a relaxing beach day — OMP has the perfect tour for you.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2
            className="text-3xl font-bold text-white text-center mb-10"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="neo-card p-6 text-center group hover:scale-105 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-[#00C9A7]/10 border border-[#00C9A7]/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00C9A7]/20 transition-colors">
                  <v.icon size={24} className="text-[#00C9A7]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{v.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center glass border border-[#00C9A7]/20 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready for Your Dominican Adventure?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Browse our 31 tours and book your perfect Punta Cana experience. Only 15% deposit required online!
          </p>
          <Link
            href="/book-online"
            className="btn-shimmer text-[#071929] font-bold px-10 py-4 rounded-full text-lg"
          >
            Explore All Tours
          </Link>
        </div>
      </div>
    </div>
  );
}
