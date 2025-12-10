"use client";

import { useState, useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import { client, urlFor, projectId } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  CheckCircle,
  ArrowLeft,
  Phone,
  Mail,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import Navbar from "@/components/Navbar";

interface PonudaDetail {
  _id: string;
  naziv: string;
  slug: { current: string };
  kratakOpis: string;
  detaljniOpis: any[];
  glavnaSlika: any;
  galerija: any[];
  cena: number;
  cenaRSD?: number;
  ocena: number;
  istaknuto: boolean;
  dostupno: boolean;
  ukluceno: string[];
  prikaziTabelu?: boolean;
  tabela?: {
    naslovTabele?: string;
    kolone?: Array<{ naziv: string }>;
    redovi?: Array<{
      celije: Array<{ sadrzaj: string }>;
    }>;
  };
  napomeneTabele?: any[];
  kategorije: Array<{
    naziv: string;
    slug: { current: string };
    boja: string;
    roditeljskaKategorija?: {
      naziv: string;
      slug: { current: string };
    };
  }>;
  datumKreiranja: string;
}

const PONUDA_DETAIL_QUERY = `*[_type == "ponuda" && slug.current == $slug][0] {
  _id,
  naziv,
  slug,
  kratakOpis,
  detaljniOpis,
  glavnaSlika,
  galerija,
  cena,
  cenaRSD,
  ocena,
  istaknuto,
  dostupno,
  ukluceno,
  prikaziTabelu,
  tabela {
    naslovTabele,
    kolone[] {
      naziv
    },
    redovi[] {
      celije[] {
        sadrzaj
      }
    }
  },
  napomeneTabele,
  stilTabele,
  kategorije[]-> {
    naziv,
    slug,
    boja,
    roditeljskaKategorija-> {
      naziv,
      slug
    }
  },
  datumKreiranja
}`;

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{children}</h3>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value || !value.asset) {
        return null;
      }
      return (
        <div className="my-8">
          <img
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || "Slika"}
            className="w-full rounded-lg shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/1 Манастир Дечани-min.jpg';
            }}
          />
          {value.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

export default function PonudaPage({ params }: { params: { slug: string } }) {
  const [ponuda, setPonuda] = useState<PonudaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    async function fetchPonuda() {
      // Don't fetch if using placeholder project ID
      if (
        projectId === "your-project-id-here" ||
        !projectId ||
        projectId.length < 5
      ) {
        setLoading(false);
        return;
      }

      try {
        const data = await client.fetch(PONUDA_DETAIL_QUERY, {
          slug: params.slug,
        });
        if (!data) {
          notFound();
        }
        setPonuda(data);
      } catch (error) {
        console.warn("Sanity not configured yet");
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchPonuda();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ponuda) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Ponuda nije pronađena</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nazad na početnu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [ponuda.glavnaSlika, ...(ponuda.galerija || [])]
    .filter(Boolean)
    .filter((img) => img && img.asset);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Dugme za štampanje */}
        <div className="mb-4 flex justify-end">
          <Button onClick={handlePrint} variant="outline">
            🖨️ Štampaj ponudu
          </Button>
        </div>
        {/* Print sekcija */}
        <div id="print-section" ref={printRef}>
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Nazad na destinacije
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl bg-gray-200">
              {allImages.length > 0 && allImages[selectedImage] ? (
                <img
                  onClick={() => setIsLightboxOpen(true)}
                  src={urlFor(allImages[selectedImage])
                    .width(800)
                    .height(600)
                    .url()}
                  alt={ponuda.naziv}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/1 Манастир Дечани-min.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100">
                  <span className="text-gray-400">Slika se učitava...</span>
                </div>
              )}
              {ponuda.istaknuto && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-yellow-500 text-white">Istaknuto</Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {image && image.asset ? (
                      <img
                        src={urlFor(image).width(200).height(150).url()}
                        alt={`${ponuda.naziv} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/1 Манастир Дечани-min.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lightbox */}
          {isLightboxOpen && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setIsLightboxOpen(false)}
            >
              <div className="relative max-w-7xl max-h-full">
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
                >
                  <X className="w-6 h-6" />
                </button>

                {allImages[selectedImage] && allImages[selectedImage].asset && (
                  <img
                    src={urlFor(allImages[selectedImage])
                      .width(1200)
                      .height(900)
                      .url()}
                    alt={ponuda.naziv}
                    className="max-w-full max-h-full object-contain"
                    onClick={(e) => e.stopPropagation()}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/1 Манастир Дечани-min.jpg';
                    }}
                  />
                )}

                {/* Navigation arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage((prev) =>
                          prev === 0 ? allImages.length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage((prev) =>
                          prev === allImages.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 rounded-full p-2"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                    {selectedImage + 1} / {allImages.length}
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Content */}
          <div className="space-y-6">
            {/* Categories */}
            {ponuda.kategorije && ponuda.kategorije.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {ponuda.kategorije.map((kategorija, index) => (
                  <Badge
                    key={index}
                    variant={
                      kategorija.roditeljskaKategorija ? "secondary" : "outline"
                    }
                    className={`text-${kategorija.boja || "blue"}-600 border-${kategorija.boja || "blue"}-600`}
                  >
                    {kategorija.roditeljskaKategorija
                      ? `${kategorija.roditeljskaKategorija.naziv} → ${kategorija.naziv}`
                      : kategorija.naziv}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {ponuda.naziv}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                {ponuda.ocena && (
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{ponuda.ocena}</span>
                  </div>
                )}
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    ponuda.dostupno
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {ponuda.dostupno ? "Dostupno" : "Nedostupno"}
                </div>
              </div>
            </div>

            {/* Price */}
            {(ponuda.cena || ponuda.cenaRSD) && (
              <div className="bg-blue-50 p-6 rounded-lg">
                {ponuda.cena && (
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    €{ponuda.cena}
                  </div>
                )}
                {ponuda.cenaRSD && !ponuda.cena && (
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {ponuda.cenaRSD.toLocaleString("sr-RS")} RSD
                  </div>
                )}
                <p className="text-gray-600">po osobi</p>
              </div>
            )}

            {/* Short Description */}
            {ponuda.kratakOpis && (
              <p className="text-lg text-gray-700 leading-relaxed">
                {ponuda.kratakOpis}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <a href="tel:+381638815544" className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Pozovite nas - 063 8815544
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  // Check if navigator.share is available and we're in a secure context
                  if (navigator.share && window.isSecureContext) {
                    navigator
                      .share({
                        title: ponuda.naziv,
                        text:
                          ponuda.kratakOpis ||
                          `Pogledajte ovu ponudu: ${ponuda.naziv}`,
                        url: window.location.href,
                      })
                      .catch(() => {
                        // Fallback to clipboard if share fails
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link je kopiran u clipboard!");
                      });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link je kopiran u clipboard!");
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Podeli
              </Button>
            </div>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Kontaktirajte nas</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-blue-600" />
                    <a
                      href="mailto:duhovni.kod@gmail.com"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      duhovni.kod@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Description */}
        {ponuda.detaljniOpis && ponuda.detaljniOpis.length > 0 && (
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Detaljan opis</h2>
              <div className="prose max-w-none">
                <PortableText
                  value={ponuda.detaljniOpis}
                  components={portableTextComponents}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* What's Included */}
        {ponuda.ukluceno &&
          ponuda.ukluceno.length > 0 &&
          ponuda.ukluceno.some((item) => item && item.trim() !== "") && (
            <Card className="mb-12">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Šta je uključeno</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ponuda.ukluceno
                    .filter((item) => item && item.trim() !== "")
                    .map((item, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

        {/* Table */}
        {ponuda.prikaziTabelu &&
          ponuda.tabela &&
          ponuda.tabela.kolone &&
          ponuda.tabela.kolone.length > 0 && (
            <Card className="mb-12">
              <CardContent className="p-8">
                {ponuda.tabela.naslovTabele && (
                  <h2 className="text-2xl font-bold mb-6">
                    {ponuda.tabela.naslovTabele}
                  </h2>
                )}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-blue-50 to-teal-50">
                        <tr>
                          {ponuda.tabela.kolone.map((kolona, index) => (
                            <th
                              key={index}
                              className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200"
                            >
                              {kolona.naziv}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      {ponuda.tabela.redovi &&
                        ponuda.tabela.redovi.length > 0 && (
                          <tbody className="divide-y divide-gray-100">
                            {ponuda.tabela.redovi.map((red, redIndex) => (
                              <tr
                                key={redIndex}
                                className="hover:bg-gray-50 transition-colors"
                              >
                                {red.celije?.map((celija, celijaIndex) => (
                                  <td
                                    key={celijaIndex}
                                    className="px-6 py-4 text-gray-700"
                                  >
                                    {celija.sadrzaj || (
                                      <span className="text-gray-400 italic">
                                        Nije uneto
                                      </span>
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        )}
                    </table>
                  </div>
                </div>
                {ponuda.napomeneTabele && ponuda.napomeneTabele.length > 0 && (
                  <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Napomene:
                    </h4>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      <PortableText
                        value={ponuda.napomeneTabele}
                        components={portableTextComponents}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        {/* Kraj print sekcije */}
        </div>
      </div>
    </div>
  );
}
