"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { client, projectId, urlFor } from "@/lib/sanity";

interface HeroImage {
  src: string;
  alt: string;
  title: string;
  objectPosition?: string;
}

interface HeroSlider {
  _id: string;
  naziv: string;
  aktivan: boolean;
  slike: Array<{
    slika: any;
    objectPosition?: string;
  }>;
  intervalRotacije: number;
}

// Default images kao fallback
const defaultHeroImages: HeroImage[] = [
  {
    src: "/images/IMG_20250928_074339-min.jpg",
    alt: "Манастир Дечани",
    title: "Манастир Дечани",
    objectPosition: "center 70%",
  },
  {
    src: "/images/3 Манастир Грачаница-min.jpg",
    alt: "Манастир Грачаница",
    title: "Манастир Грачаница",
  },
  {
    src: "/images/6 Свети Архангели-min.jpg",
    alt: "Свети Архангели",
    title: "Свети Архангели",
  },
  {
    src: "/images/8 Пећка припрата-min.jpg",
    alt: "Пећка припрата",
    title: "Пећка припрата",
  },
  {
    src: "/images/IMG-20250505-WA0004.jpg",
    alt: "Kosovo i Metohija",
    title: "Kosovo i Metohija",
  },
  {
    src: "/images/IMG_20250427_125710-min.jpg",
    alt: "Kosovo i Metohija",
    title: "Kosovo i Metohija",
    objectPosition: "center 100%",
  },
  {
    src: "/images/IMG_20250927_101149-min.jpg",
    alt: "Kosovo i Metohija",
    title: "Kosovo i Metohija",
    objectPosition: "center 70%",
  },
  {
    src: "/images/IMG_20250426_073230-min.jpg",
    alt: "Kosovo i Metohija",
    title: "Kosovo i Metohija",
  },
];

const HERO_SLIDER_QUERY = `*[_type == "heroSlider" && aktivan == true][0] {
  _id,
  naziv,
  aktivan,
  slike[] {
    slika,
    objectPosition
  },
  intervalRotacije
}`;

export default function HeroSection() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>(defaultHeroImages);
  const [intervalDuration, setIntervalDuration] = useState(5000);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  // Fetch hero slider data from Sanity
  useEffect(() => {
    async function fetchHeroSlider() {
      // Don't fetch if using placeholder project ID
      if (projectId === 'demo-project-id' || !projectId || projectId.length < 5) {
        setLoading(false);
        return;
      }

      try {
        const data: HeroSlider = await client.fetch(HERO_SLIDER_QUERY);

        if (data && data.slike && data.slike.length > 0) {
          // Transform Sanity data to HeroImage format
          const transformedImages: HeroImage[] = data.slike.map((slide, index) => ({
            src: urlFor(slide.slika).width(1920).quality(90).url(),
            alt: "Hero slika",
            title: "Hero slika",
            objectPosition: slide.objectPosition,
          }));

          setHeroImages(transformedImages);
          setIntervalDuration(data.intervalRotacije * 1000); // Convert to milliseconds
        }
      } catch (error) {
        console.warn('Hero slider not configured in Sanity - using default images');
      } finally {
        setLoading(false);
      }
    }

    fetchHeroSlider();
  }, []);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [heroImages.length, intervalDuration]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  if (loading) {
    return (
      <section id="home" className="relative h-screen overflow-hidden bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Учитавање...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Slider Background */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            title={image.title}
            fill
            className="object-cover"
            style={{
              objectPosition: image.objectPosition || "center center",
            }}
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/30" />

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        aria-label="Претходна слика"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all backdrop-blur-sm"
        aria-label="Следећа слика"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative flex items-end h-full z-10 text-white max-w-7xl px-4 mt-auto mx-auto">
        <h1 className="text-2xl md:text-4xl mx-auto mt-20 font-bold mb-16 animate-fade-in text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Одаберите путовање по жељи, yпознајте свој духовни код!
        </h1>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImage
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Иди на слику ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }
      `}</style>
    </section>
  );
}
