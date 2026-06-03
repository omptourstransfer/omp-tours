import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import PopularTours from '@/components/home/PopularTours';
import SpecialPackages from '@/components/home/SpecialPackages';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import Gallery from '@/components/home/Gallery';
import FAQ from '@/components/home/FAQ';
import ContactSection from '@/components/home/ContactSection';

export const metadata: Metadata = {
  title: 'OMP Tours & Transfers| Best Punta Cana Excursions 2025',
  description:
    'Book the best Punta Cana excursions with OMP Tours & Transfers 31 tours including Saona Island, buggies, whale watching, scuba diving & more. Only 15% deposit online!',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <PopularTours />
      <SpecialPackages />
      <HowItWorks />
      <Testimonials />
      <Gallery />
      <FAQ />
      <ContactSection />
    </>
  );
}
