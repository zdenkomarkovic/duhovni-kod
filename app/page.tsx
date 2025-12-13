"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import Footer from "@/components/sections/Footer";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Kreiraj from "@/components/Kreiraj";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DestinationsSection />
      <Kreiraj />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
