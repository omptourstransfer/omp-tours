import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Tag, CheckCircle, XCircle, Info, MapPin, ChevronRight } from 'lucide-react';
import { getTourBySlug, tours } from '@/data/tours';
import BookingWidget from '@/components/tours/BookingWidget';
import TourCard from '@/components/tours/TourCard';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = getTourBySlug(params.slug);
  if (!tour) return {};
  return {
    title: `${tour.name} | OMP Tours & Transfer`,
    description: tour.shortDescription,
    openGraph: {
      images: [{ url: tour.image, width: 394, height: 394, alt: tour.name }],
    },
  };
}

const categoryColors: Record<string, string> = {
  Adventure: '#F0A500',
  'Water Sports': '#00C9A7',
  'Nature & Wildlife': '#4CAF50',
  'City Tours': '#9C27B0',
};

export default function TourPage({ params }: Props) {
  const tour = getTourBySlug(params.slug);
  if (!tour) notFound();

  const relatedTours = tours
    .filter((t) => t.category === tour.category && t.id !== tour.id)
    .slice(0, 4);

  const deposit = Math.ceil(tour.price * 0.15);

  return (
    <div className="min-h-screen bg-[#071929] pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-white/40 text-sm">
          <Link href="/" className="hover:text-[#00C9A7] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/book-online" className="hover:text-[#00C9A7] transition-colors">Tours</Link>
          <ChevronRight size={14} />
          <span className="text-white/70">{tour.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero image */}
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src={tour.image}
                alt={tour.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071929]/60 to-transparent" />

              {/* Badges overlay */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                <span
                  className="text-[#071929] text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: categoryColors[tour.category] || '#00C9A7' }}
                >
                  {tour.category}
                </span>
                <span className="glass border border-white/20 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Clock size={12} />
                  {tour.duration}
                </span>
                {tour.seasonal && (
                  <span className="bg-[#F0A500] text-[#071929] text-xs font-bold px-3 py-1.5 rounded-full">
                    {tour.seasonal}
                  </span>
                )}
              </div>
            </div>

            {/* Title & rating */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1
                  className="text-3xl md:text-4xl font-bold text-white"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {tour.name}
                </h1>
                {tour.isPackage && (
                  <span className="bg-[#F0A500]/20 text-[#F0A500] border border-[#F0A500]/30 text-xs px-3 py-1 rounded-full whitespace-nowrap">
                    Package Deal
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < tour.rating ? 'text-[#F0A500]' : 'text-white/20'}
                      fill={i < tour.rating ? '#F0A500' : 'none'}
                    />
                  ))}
                  <span className="text-white/60 text-sm ml-1">{tour.rating}.0 ({tour.reviewCount} reviews)</span>
                </div>
                <span className="text-white/30">·</span>
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <MapPin size={14} className="text-[#00C9A7]" />
                  Punta Cana, Dominican Republic
                </div>
              </div>
            </div>

            {/* Price info */}
            <div className="neo-card p-5 flex flex-wrap gap-6">
              <div>
                {tour.isPackage ? (
                  <>
                    <p className="text-white/50 text-xs mb-1">Package Price</p>
                    <p className="text-[#00C9A7] font-bold text-2xl">${tour.price.toLocaleString()}</p>
                    <p className="text-white/40 text-xs">{tour.packageLabel}</p>
                  </>
                ) : (
                  <>
                    <p className="text-white/50 text-xs mb-1">Full Price</p>
                    <p className="text-[#00C9A7] font-bold text-2xl">${tour.price}<span className="text-white/40 text-sm font-normal">/person</span></p>
                  </>
                )}
              </div>
              <div>
                <p className="text-white/50 text-xs mb-1">Online Deposit (15%)</p>
                <p className="text-[#F0A500] font-bold text-2xl">${deposit}</p>
                <p className="text-white/40 text-xs">per person via PayPal</p>
              </div>
              <div>
                <p className="text-white/50 text-xs mb-1">Balance</p>
                <p className="text-white font-bold text-2xl">${Math.ceil(tour.price * 0.85)}</p>
                <p className="text-white/40 text-xs">in cash on tour day</p>
              </div>
            </div>

            {/* Description */}
            <div className="neo-card p-6">
              <h2
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                About This Tour
              </h2>
              <p className="text-white/70 leading-relaxed">{tour.description}</p>
            </div>

            {/* Highlights */}
            {tour.highlights.length > 0 && (
              <div className="neo-card p-6">
                <h2
                  className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  <Star size={18} className="text-[#F0A500]" />
                  Tour Highlights
                </h2>
                <ul className="space-y-3">
                  {tour.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                      <div className="w-5 h-5 rounded-full bg-[#00C9A7]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00C9A7]" />
                      </div>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Included / Not included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="neo-card p-5">
                <h3
                  className="text-white font-bold mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  <CheckCircle size={16} className="text-[#00C9A7]" />
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {tour.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                      <CheckCircle size={14} className="text-[#00C9A7] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="neo-card p-5">
                <h3
                  className="text-white font-bold mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  <Tag size={16} className="text-[#F0A500]" />
                  What to Bring
                </h3>
                <ul className="space-y-2">
                  {tour.whatToBring.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F0A500] flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pickup info */}
            <div className="neo-card p-5 border border-[#00C9A7]/20">
              <h3
                className="text-white font-bold mb-3 flex items-center gap-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                <MapPin size={16} className="text-[#00C9A7]" />
                Pickup Information
              </h3>
              <p className="text-white/70 text-sm">{tour.pickupInfo}</p>
              <p className="text-white/50 text-xs mt-2">
                Pickup available at <strong className="text-[#00C9A7]">9:00 AM</strong> or <strong className="text-[#00C9A7]">2:00 PM</strong>
              </p>
            </div>

            {/* Restrictions */}
            {tour.restrictions && tour.restrictions.length > 0 && (
              <div className="neo-card p-5 border border-[#F0A500]/20">
                <h3
                  className="text-white font-bold mb-3 flex items-center gap-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  <Info size={16} className="text-[#F0A500]" />
                  Important Information
                </h3>
                <ul className="space-y-2">
                  {tour.restrictions.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/60 text-sm">
                      <XCircle size={14} className="text-[#F0A500] flex-shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar booking widget */}
          <div className="lg:col-span-1">
            <BookingWidget tour={tour} />
          </div>
        </div>

        {/* Related tours */}
        {relatedTours.length > 0 && (
          <div className="mt-16">
            <h2
              className="text-3xl font-bold text-white mb-8"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTours.map((t, i) => (
                <TourCard key={t.id} tour={t} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky Book Now */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-4 bg-[#071929] border-t border-[#00C9A7]/20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[#00C9A7] font-bold text-xl">
              {tour.isPackage ? `$${tour.price.toLocaleString()}` : `$${tour.price}/person`}
            </p>
            <p className="text-[#F0A500] text-xs">Only ${deposit} deposit online</p>
          </div>
          <a
            href="#booking"
            className="flex-1 btn-shimmer text-[#071929] font-bold py-3 rounded-full text-center"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
