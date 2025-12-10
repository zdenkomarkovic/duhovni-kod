'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import FloatingCallButton from '@/components/FloatingCallButton';
import PonudaCard from '@/components/cards/PonudaCard';
import { Button } from '@/components/ui/button';
import { client, projectId } from '@/lib/sanity';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Kategorija {
  naziv: string;
  slug: { current: string };
  boja: string;
  roditeljskaKategorija?: {
    naziv: string;
    slug: { current: string };
  };
}

interface Ponuda {
  _id: string;
  naziv: string;
  slug: { current: string };
  kratakOpis: string;
  glavnaSlika: any;
  cena: number;
  cenaRSD?: number;
  ocena: number;
  istaknuto: boolean;
  kategorije: Kategorija[];
}

const PONUDE_QUERY = `*[_type == "ponuda"] | order(_createdAt desc) {
  _id,
  naziv,
  slug,
  kratakOpis,
  glavnaSlika,
  cena,
  cenaRSD,
  ocena,
  istaknuto,
  kategorije[]-> {
    naziv,
    slug,
    boja,
    roditeljskaKategorija-> {
      naziv,
      slug
    }
  }
}`;

const ITEMS_PER_PAGE = 12;

export default function PutovanjaPage() {
  const [ponude, setPonude] = useState<Ponuda[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchPonude() {
      if (
        projectId === 'your-project-id-here' ||
        !projectId ||
        projectId.length < 5
      ) {
        setLoading(false);
        return;
      }

      try {
        const data = await client.fetch(PONUDE_QUERY);
        setPonude(data);
      } catch (error) {
        console.warn('Sanity not configured yet');
      } finally {
        setLoading(false);
      }
    }

    fetchPonude();
  }, []);

  // Paginacija
  const totalPages = Math.ceil(ponude.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPonude = ponude.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generisanje brojeva strana za prikaz
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-64 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
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
              Odaberite putovanja
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Istražite naše organizovane ture na Kosovo i Metohiju i pronađite savršeno putovanje za vas
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          {/* Broj rezultata */}
          <div className="mb-6 text-gray-600">
            Prikazano <span className="font-semibold">{startIndex + 1}</span> -{' '}
            <span className="font-semibold">
              {Math.min(endIndex, ponude.length)}
            </span>{' '}
            od <span className="font-semibold">{ponude.length}</span> putovanja
          </div>

          {/* Grid ponuda */}
          {currentPonude.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Trenutno nema dostupnih putovanja.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {currentPonude.map((ponuda) => (
                  <PonudaCard key={ponuda._id} ponuda={ponuda} />
                ))}
              </div>

              {/* Paginacija */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center gap-4">
                  {/* Brojevi strana */}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={goToPrevious}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="icon"
                      className="disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    {getPageNumbers().map((page, index) => {
                      if (page === '...') {
                        return (
                          <span key={`ellipsis-${index}`} className="px-2">
                            ...
                          </span>
                        );
                      }

                      return (
                        <Button
                          key={page}
                          onClick={() => goToPage(page as number)}
                          variant={currentPage === page ? 'default' : 'outline'}
                          className={
                            currentPage === page
                              ? 'bg-blue-600 hover:bg-blue-700'
                              : ''
                          }
                        >
                          {page}
                        </Button>
                      );
                    })}

                    <Button
                      onClick={goToNext}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      size="icon"
                      className="disabled:opacity-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Informacije o stranici */}
                  <div className="text-sm text-gray-600">
                    Strana {currentPage} od {totalPages}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
