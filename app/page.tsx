"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import Footer from "@/components/sections/Footer";
import KategorijeFromSanity from "@/components/KategorijeFromSanity";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <KategorijeFromSanity />
      <DestinationsSection />
      <NewsletterSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
