"use client";

import { useState, useEffect } from 'react';
import { client, projectId } from '@/lib/sanity';
import PonudaCard from '@/components/cards/PonudaCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  kategorije: Array<{
    naziv: string;
    slug: { current: string };
    boja: string;
    roditeljskaKategorija?: {
      naziv: string;
      slug: { current: string };
    };
  }>;
  klasifikacije: Array<{
    _id: string;
    naziv: string;
  }>;
}

const ITEMS_PER_PAGE = 8;

const ISTAKNUTE_PONUDE_QUERY = `*[_type == "ponuda" && istaknuto == true] {
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
  },
  klasifikacije[]-> {
    _id,
    naziv
  }
} | order(_createdAt desc)`;

const ISTAKNUTE_COUNT_QUERY = `count(*[_type == "ponuda" && istaknuto == true])`;

export default function PonudeFromSanity() {
  const [allPonude, setAllPonude] = useState<Ponuda[]>([]);
  const [displayedPonude, setDisplayedPonude] = useState<Ponuda[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPonude() {
      // Don't fetch if using placeholder project ID
      if (projectId === 'your-project-id-here' || !projectId || projectId.length < 5) {
        setLoading(false);
        return;
      }

      try {
        // Fetch total count
        const count = await client.fetch(ISTAKNUTE_COUNT_QUERY);
        setTotalCount(count);

        // Fetch all ponude
        const data = await client.fetch(ISTAKNUTE_PONUDE_QUERY);
        setAllPonude(data);
      } catch (error) {
        console.warn('Sanity not configured yet - using demo mode');
      } finally {
        setLoading(false);
      }
    }

    fetchPonude();
  }, []);

  // Update displayed ponude when page changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedPonude(allPonude.slice(startIndex, endIndex));
  }, [allPonude, currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of section
      const section = document.getElementById('destinations');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (allPonude.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-4">Нема истакнутих понуда</h3>
        <p className="text-gray-600 mb-6">
          {projectId === 'your-project-id-here' || !projectId || projectId.length < 5
            ? 'Креирајте Sanity пројекат и додајте Project ID у .env.local фајл.'
            : 'Означите неке понуде као истакнуте у Sanity Studio.'
          }
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Ponude Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {displayedPonude.map((ponuda) => (
          <PonudaCard key={ponuda._id} ponuda={ponuda} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center space-y-4">
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Страница {currentPage} од {totalPages} • Укупно {totalCount} {totalCount === 1 ? 'понуда' : totalCount >= 2 && totalCount <= 4 ? 'понуде' : 'понуда'}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="flex items-center px-2 md:px-4"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Претходна
            </Button>
            
            <div className="flex space-x-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                
                // Show first page, last page, current page and adjacent pages
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => goToPage(page)}
                      className="w-5 h-10 md:w-10 md:h-10 p-0"
                    >
                      {page}
                    </Button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2 text-gray-400">...</span>;
                }
                return null;
              })}
            </div>

            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center px-2 md:px-4"
            >
              Следећа
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}