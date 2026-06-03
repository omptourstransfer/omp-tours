import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#071929] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div
            className="text-[160px] font-bold leading-none"
            style={{
              fontFamily: 'Playfair Display, serif',
              background: 'linear-gradient(135deg, #00C9A7, #F0A500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-8xl">
            🌴
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          Lost in Paradise?
        </h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          The page you&apos;re looking for seems to have drifted off to Saona Island. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-shimmer text-[#071929] font-bold px-8 py-4 rounded-full"
          >
            🏠 Go Home
          </Link>
          <Link
            href="/book-online"
            className="glass border border-[#00C9A7]/30 text-white font-bold px-8 py-4 rounded-full hover:border-[#00C9A7] transition-all"
          >
            🌊 Browse Tours
          </Link>
        </div>

        <p className="text-white/30 text-sm mt-8">
          Need help?{' '}
          <a href="https://wa.me/18094312542" target="_blank" rel="noopener noreferrer" className="text-[#00C9A7] hover:underline">
            WhatsApp Orlando
          </a>
        </p>
      </div>
    </div>
  );
}
