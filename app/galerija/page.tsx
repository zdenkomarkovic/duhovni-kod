'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import FloatingCallButton from '@/components/FloatingCallButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { client, urlFor, projectId } from '@/lib/sanity';
import { X, ChevronLeft, ChevronRight, ArrowLeft, Image as ImageIcon } from 'lucide-react';

interface GalerijaItem {
  _id: string;
  naziv: string;
  opis?: string;
  slike: Array<{
    asset: any;
    alt?: string;
    caption?: string;
  }>;
}

const GALERIJA_QUERY = `*[_type == "galerija"] | order(_createdAt desc) {
  _id,
  naziv,
  opis,
  slike[] {
    asset,
    alt,
    caption
  }
}`;

export default function GalerijaPage() {
  const [galerije, setGalerije] = useState<GalerijaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGalerija, setSelectedGalerija] = useState<GalerijaItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
    caption?: string;
    slikaIndex: number;
  } | null>(null);

  useEffect(() => {
    async function fetchGalerije() {
      if (
        projectId === 'your-project-id-here' ||
        !projectId ||
        projectId.length < 5
      ) {
        setLoading(false);
        return;
      }

      try {
        const data = await client.fetch(GALERIJA_QUERY);
        setGalerije(data);
      } catch (error) {
        console.warn('Sanity not configured yet');
      } finally {
        setLoading(false);
      }
    }

    fetchGalerije();
  }, []);

  const openGalerija = (galerija: GalerijaItem) => {
    setSelectedGalerija(galerija);
  };

  const closeGalerija = () => {
    setSelectedGalerija(null);
    setSelectedImage(null);
  };

  const openLightbox = (slika: any, slikaIndex: number) => {
    if (!slika || !slika.asset) return;

    setSelectedImage({
      url: urlFor(slika).width(1200).height(900).url(),
      alt: slika.alt || 'Galerija slika',
      caption: slika.caption,
      slikaIndex,
    });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage || !selectedGalerija) return;

    const totalSlike = selectedGalerija.slike.length;
    let newIndex = selectedImage.slikaIndex;

    if (direction === 'next') {
      newIndex = (newIndex + 1) % totalSlike;
    } else {
      newIndex = (newIndex - 1 + totalSlike) % totalSlike;
    }

    openLightbox(selectedGalerija.slike[newIndex], newIndex);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-64 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <FloatingCallButton />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Galerija
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pogledajte najlepše trenutke sa naših putovanja na Kosovo i Metohiju
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          {!selectedGalerija ? (
            <>
              {/* Kartice Galerija */}
              {galerije.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    Nema galerija za prikaz.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {galerije.map((galerija) => {
                    const validSlike = galerija.slike.filter(
                      (slika) => slika && slika.asset
                    );
                    const coverImage = validSlike[0];

                    return (
                      <Card
                        key={galerija._id}
                        className="group overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        onClick={() => openGalerija(galerija)}
                      >
                        <div className="relative h-64 overflow-hidden bg-gray-200">
                          {coverImage ? (
                            <img
                              src={urlFor(coverImage).width(600).height(400).url()}
                              alt={galerija.naziv}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  '/images/1 Манастир Дечани-min.jpg';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100">
                              <ImageIcon className="w-16 h-16 text-gray-400" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                          {/* Badge sa brojem slika */}
                          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {validSlike.length} {validSlike.length === 1 ? 'slika' : 'slika'}
                          </div>

                          {/* Naziv galerije na dnu slike */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {galerija.naziv}
                            </h3>
                            {galerija.opis && (
                              <p className="text-gray-200 text-sm line-clamp-2">
                                {galerija.opis}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Prikaz Odabrane Galerije */}
              <div className="mb-8">
                <Button
                  onClick={closeGalerija}
                  variant="outline"
                  className="mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Nazad na sve galerije
                </Button>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedGalerija.naziv}
                </h2>
                {selectedGalerija.opis && (
                  <p className="text-gray-600 text-lg">{selectedGalerija.opis}</p>
                )}
              </div>

              {/* Grid slika */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {selectedGalerija.slike
                  .filter((slika) => slika && slika.asset)
                  .map((slika, slikaIndex) => (
                    <Card
                      key={slikaIndex}
                      className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                      onClick={() => openLightbox(slika, slikaIndex)}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={urlFor(slika).width(400).height(300).url()}
                          alt={slika.alt || `${selectedGalerija.naziv} ${slikaIndex + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              '/images/1 Манастир Дечани-min.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                      </div>
                      {slika.caption && (
                        <CardContent className="p-3">
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {slika.caption}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-7xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image */}
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="max-w-full max-h-[80vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            {selectedImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center">
                <p>{selectedImage.caption}</p>
              </div>
            )}

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
