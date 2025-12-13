"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { client, UTISCI_QUERY } from "@/lib/sanity";
import { Utisak } from "@/types";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Utisak[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await client.fetch(UTISCI_QUERY);
        setTestimonials(data);
      } catch (error) {
        console.error("Greška pri učitavanju utisaka:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Menja slider svakih 6 sekundi

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Učitavanje utisaka...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Ne prikazuj sekciju ako nema utisaka
  }

  const getPrevIndex = (index: number) =>
    (index - 1 + testimonials.length) % testimonials.length;
  const getNextIndex = (index: number) => (index + 1) % testimonials.length;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Utisci putnika
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Čujte priče onih koji su se vratili sa duhovnog putovanja na Kosovo
            i Metohiju
          </p>
        </div>

        <div className="relative">
          {/* Mobilni prikaz - samo centralna kartica */}
          <div className="md:hidden">
            <div className="relative grid px-4">
              {testimonials.map((testimonial, idx) => (
                <Card
                  key={testimonial._id}
                  className="border-2 border-blue-200 shadow-2xl col-start-1 row-start-1 transition-opacity duration-700 h-full"
                  style={{
                    opacity: idx === currentSlide ? 1 : 0,
                    pointerEvents: idx === currentSlide ? "auto" : "none",
                  }}
                >
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.ocena)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-base text-gray-700 text-center mb-6 italic leading-relaxed flex-grow flex items-center justify-center">
                      "{testimonial.tekst}"
                    </p>
                    <div className="text-center">
                      <p className="font-bold text-xl text-gray-900">
                        {testimonial.ime}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Desktop prikaz - tri kartice */}
          <div className="hidden md:grid md:grid-cols-[1fr_1.5fr_1fr] items-stretch gap-4 px-8">
            {/* Leva kolona */}
            <div
              className="relative grid opacity-40 hover:opacity-60 transition-opacity cursor-pointer overflow-hidden h-full"
              onClick={prevSlide}
            >
              {testimonials.map((testimonial, idx) => (
                <Card
                  key={testimonial._id}
                  className="border-2 border-gray-100 shadow-lg col-start-1 row-start-1 transition-opacity duration-700 h-full"
                  style={{
                    opacity: idx === getPrevIndex(currentSlide) ? 1 : 0,
                    pointerEvents:
                      idx === getPrevIndex(currentSlide) ? "auto" : "none",
                  }}
                >
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div className="flex justify-center mb-3">
                      {[...Array(testimonial.ocena)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-base text-gray-700 text-center italic leading-relaxed flex-grow flex items-center justify-center">
                      "{testimonial.tekst}"
                    </p>
                    <div className="text-center mt-4">
                      <p className="font-bold text-base text-gray-900">
                        {testimonial.ime}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Centralna kolona */}
            <div className="relative grid h-full">
              {testimonials.map((testimonial, idx) => (
                <Card
                  key={testimonial._id}
                  className="border-2 border-blue-200 shadow-2xl transform scale-105 col-start-1 row-start-1 transition-opacity duration-700 h-full"
                  style={{
                    opacity: idx === currentSlide ? 1 : 0,
                    pointerEvents: idx === currentSlide ? "auto" : "none",
                  }}
                >
                  <CardContent className="p-10 flex flex-col justify-between h-full">
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.ocena)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-lg text-gray-700 text-center mb-6 italic leading-relaxed flex-grow flex items-center justify-center">
                      "{testimonial.tekst}"
                    </p>
                    <div className="text-center">
                      <p className="font-bold text-xl text-gray-900">
                        {testimonial.ime}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desna kolona */}
            <div
              className="relative grid opacity-40 hover:opacity-60 transition-opacity cursor-pointer overflow-hidden h-full"
              onClick={nextSlide}
            >
              {testimonials.map((testimonial, idx) => (
                <Card
                  key={testimonial._id}
                  className="border-2 border-gray-100 shadow-lg col-start-1 row-start-1 transition-opacity duration-700 h-full"
                  style={{
                    opacity: idx === getNextIndex(currentSlide) ? 1 : 0,
                    pointerEvents:
                      idx === getNextIndex(currentSlide) ? "auto" : "none",
                  }}
                >
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div className="flex justify-center mb-3">
                      {[...Array(testimonial.ocena)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-base text-gray-700 text-center italic leading-relaxed flex-grow flex items-center justify-center">
                      "{testimonial.tekst}"
                    </p>
                    <div className="text-center mt-4">
                      <p className="font-bold text-base text-gray-900">
                        {testimonial.ime}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation arrows - samo ako ima više od 1 utiska */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                aria-label="Prethodni utisak"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all hover:scale-110 z-10"
                aria-label="Sledeći utisak"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots indikatori */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-3 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-blue-600 w-8"
                        : "bg-gray-300 w-3 hover:bg-gray-400"
                    }`}
                    aria-label={`Idi na utisak ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
