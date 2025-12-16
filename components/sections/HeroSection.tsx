"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const heroImages = [
  {
    src: "/images/IMG_20250928_074339-min.jpg",
    alt: "Манастир Дечани",
    title: "Манастир Дечани",
  },
  // {
  //   src: "/images/2 Манастир Дечани улаз-min.jpg",
  //   alt: "Манастир Дечани улаз",
  //   title: "Манастир Дечани улаз",
  // },
  {
    src: "/images/3 Манастир Грачаница-min.jpg",
    alt: "Манастир Грачаница",
    title: "Манастир Грачаница",
  },
  {
    src: "/images/5 Свети Архангели улаз-min.jpg",
    alt: "Свети Архангели улаз",
    title: "Свети Архангели улаз",
  },
  {
    src: "/images/6 Свети Архангели-min.jpg",
    alt: "Свети Архангели",
    title: "Свети Архангели",
  },
  // {
  //   src: "/images/7 Пећка патријаршија-min.jpg",
  //   alt: "Пећка патријаршија",
  //   title: "Пећка патријаршија",
  // },
  {
    src: "/images/8 Пећка припрата-min.jpg",
    alt: "Пећка припрата",
    title: "Пећка припрата",
  },
  // { src: "/images/9 Призрен-min.jpg", alt: "Призрен", title: "Призрен" },
  // {
  //   src: "/images/10 Богородица Љевишка-min.jpg",
  //   alt: "Богородица Љевишка",
  //   title: "Богородица Љевишка",
  // },
  {
    src: "/images/11 Црква св Ђорђа Призрен-min.jpg",
    alt: "Црква св Ђорђа Призрен",
    title: "Црква св Ђорђа Призрен",
  },
  // {
  //   src: "/images/12 Виница цара Душана-min.jpg",
  //   alt: "Виница цара Душана",
  //   title: "Виница цара Душана",
  // },
  {
    src: "/images/13 Црква св Стефана Велика Хоча-min.jpg",
    alt: "Црква св Стефана Велика Хоča",
    title: "Црква св Стефана Велика Хоча",
  },

  {
    src: "/images/15 Споменик на Косову пољу-min.jpg",
    alt: "Споменик на Косову пољу",
    title: "Споменик на Косову пољу",
  },
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Мења слику сваких 5 секунди

    return () => clearInterval(interval);
  }, []);

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

  return (
    <section id="home" className="relative h-screen  overflow-hidden">
      {/* Слајдер позадина */}
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
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/30" />

      {/* Навигациони дугмићи */}
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

      {/* Садржај */}
      <div className="relative flex items-end h-full z-10 text-left text-white max-w-7xl px-4 mt-auto mx-auto">
        <h1 className="text-2xl md:text-5xl mt-20 font-bold mb-16 animate-fade-in max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 ">
          Посетите Косовo и Метохијy, yпознајте свој духовни код{" "}
        </h1>

        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
          <a href="#destinations">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
            >
              Istražite Ponudu
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div> */}
      </div>

      {/* Индикатори */}
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
