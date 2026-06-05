import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/Providers';

const SITE_URL = 'https://www.omptoursandtransfers.com';
const OG_IMAGE  = `${SITE_URL}/hero-bg.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'OMP Tours & Transfers | Best Punta Cana Excursions 2025',
    template: '%s | OMP Tours & Transfers',
  },
  description:
    'Book the best Punta Cana excursions with OMP Tours & Transfers. Saona Island tours, buggy adventures, ATV, whale watching, scuba diving & 31 more. Only 15% deposit online. Hotel pickup included. 5-star rated by 10,000+ guests.',
  keywords: [
    'Punta Cana excursions',
    'OMP Tours',
    'OMP Tours and Transfer',
    'Saona Island tour Punta Cana',
    'Punta Cana tours 2025',
    'Dominican Republic excursions',
    'buggy tour Punta Cana',
    'ATV tour Punta Cana',
    'Samana whale watching',
    'Catalina Island snorkeling',
    'Punta Cana private tours',
    'Punta Cana boat tours',
    'scuba diving Punta Cana',
    'Punta Cana adventure tours',
    'best excursions Punta Cana',
    'Higüey Dominican Republic tours',
    'Orlando tour guide Punta Cana',
    'Punta Cana party boat',
    'parasailing Punta Cana',
    'horseback riding Punta Cana',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'OMP Tours & Transfers | Best Punta Cana Excursions 2025',
    description: 'Book 31 handcrafted Punta Cana tours. Saona Island, buggies, ATV, whale watching & more. Only 15% deposit — hotel pickup included!',
    url: SITE_URL,
    siteName: 'OMP Tours & Transfers',
    locale: 'en_US',
    images: [{ url: OG_IMAGE, width: 1440, height: 900, alt: 'OMP Tours & Transfers – Punta Cana Excursions' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OMP Tours & Transfers | Best Punta Cana Excursions 2025',
    description: 'Book 31 Punta Cana tours — only 15% deposit online! Saona Island, buggies, ATV, whale watching & more.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TouristInformationCenter',
  name: 'OMP Tours & Transfers',
  alternateName: 'OMP Tours and Transfer',
  description: 'Best Punta Cana excursions — Saona Island tours, buggy adventures, ATV, whale watching, scuba diving & 31 more. 5-star rated, hotel pickup included.',
  url: SITE_URL,
  telephone: '+18094312542',
  email: 'bookings@omptoursandtransfers.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Higüey',
    addressLocality: 'La Altagracia',
    addressRegion: 'La Altagracia',
    addressCountry: 'DO',
    postalCode: '23301',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 18.6556,
    longitude: -68.4279,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '1',
    reviewCount: '10000',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '07:00',
    closes: '20:00',
  },
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, PayPal',
  hasMap: 'https://maps.app.goo.gl/yHkMvcHhooLJgJE68',
  sameAs: [
    'https://www.facebook.com/share/1BjEkvmdAt/',
    'https://www.instagram.com/msexcursion',
  ],
  image: OG_IMAGE,
  areaServed: {
    '@type': 'Place',
    name: 'Punta Cana, Dominican Republic',
  },
  knowsLanguage: ['en', 'es'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Nunito:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics placeholder — add your GA4 ID in .env */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
