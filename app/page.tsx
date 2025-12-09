"use client";

"use client";

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import DestinationsSection from '@/components/sections/DestinationsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import Footer from '@/components/sections/Footer';
import KategorijeFromSanity from '@/components/KategorijeFromSanity';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
              <KategorijeFromSanity />
      <DestinationsSection />
      
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}