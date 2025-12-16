"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client, urlFor, projectId } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import KlasifikacijeFilter from "@/components/filters/KlasifikacijeFilter";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Ponuda } from "@/types";
import PonudaCard from "@/components/cards/PonudaCard";

interface Kategorija {
  _id: string;
  naziv: string;
  slug: { current: string };
  opis: string;
  slika: any;
  ikona: string;
  boja: string;
}

interface Podkategorija {
  _id: string;
  naziv: string;
  slug: { current: string };
  slika?: any;
  boja: string;
}

const KATEGORIJA_QUERY = `*[_type == "kategorija" && slug.current == $slug][0] {
  _id,
  naziv,
  slug,
  opis,
  slika,
  ikona,
  boja
}`;

const PODKATEGORIJE_QUERY = `*[_type == "kategorija" && roditeljskaKategorija->slug.current == $slug] {
  _id,
  naziv,
  slug,
  slika,
  boja
} | order(naziv asc)`;

const PONUDE_QUERY = `*[_type == "ponuda" && references(*[_type == "kategorija" && (slug.current == $slug || roditeljskaKategorija->slug.current == $slug)]._id)] {
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

const PONUDE_COUNT_QUERY = `count(*[_type == "ponuda" && references(*[_type == "kategorija" && (slug.current == $slug || roditeljskaKategorija->slug.current == $slug)]._id)])`;

const ITEMS_PER_PAGE = 8;

// Portable Text components for rendering rich text
const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mb-2">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) {
        return null;
      }
      return (
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || ""}
          className="w-full h-auto rounded-lg my-4"
        />
      );
    },
  },
};

export default function KategorijaPage({
  params,
}: {
  params: { slug: string };
}) {
  const [kategorija, setKategorija] = useState<Kategorija | null>(null);
  const [podkategorije, setPodkategorije] = useState<Podkategorija[]>([]);
  const [ponude, setPonude] = useState<Ponuda[]>([]);
  const [totalPonude, setTotalPonude] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKlasifikacije, setSelectedKlasifikacije] = useState<string[]>(
    []
  );
  const [filteredPonude, setFilteredPonude] = useState<Ponuda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
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
        // Fetch kategorija
        const kategorijaData = await client.fetch(KATEGORIJA_QUERY, {
          slug: params.slug,
        });
        if (!kategorijaData) {
          notFound();
        }
        setKategorija(kategorijaData);

        // Fetch podkategorije
        const podkategorijeData = await client.fetch(PODKATEGORIJE_QUERY, {
          slug: params.slug,
        });
        setPodkategorije(podkategorijeData);

        // Fetch total count
        const totalCount = await client.fetch(PONUDE_COUNT_QUERY, {
          slug: params.slug,
        });
        setTotalPonude(totalCount);

        // Fetch ponude with pagination
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        // Fetch all ponude for this category first (for filtering)
        const allPonudeData = await client.fetch(PONUDE_QUERY, {
          slug: params.slug,
        });
        setPonude(allPonudeData);

        // Apply pagination after filtering
        const paginatedData = allPonudeData.slice(start, end);
        setFilteredPonude(paginatedData);
      } catch (error) {
        console.warn("Sanity not configured yet");
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.slug, currentPage]);

  // Filter ponude based on selected klasifikacije
  useEffect(() => {
    let filtered = ponude;

    if (selectedKlasifikacije.length > 0) {
      filtered = ponude.filter((ponuda) =>
        ponuda.klasifikacije?.some((klasifikacija) =>
          selectedKlasifikacije.includes(klasifikacija._id)
        )
      );
    }

    // Update total count
    setTotalPonude(filtered.length);

    // Apply pagination
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setFilteredPonude(filtered.slice(start, end));

    // Reset to first page if current page is out of bounds
    const newTotalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(1);
    }
  }, [ponude, selectedKlasifikacije, currentPage]);

  const handleKlasifikacijeChange = (klasifikacije: string[]) => {
    setSelectedKlasifikacije(klasifikacije);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const totalPages = Math.ceil(totalPonude / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!kategorija) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Категорија није пронађена</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад на почетну
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад на почетну
          </Link>
        </div>

        {/* Category Header */}
        {/* <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {kategorija.naziv}
          </h1>
          {kategorija.opis && Array.isArray(kategorija.opis) && (
            <div className="text-lg text-gray-600 prose max-w-none">
              <PortableText
                value={kategorija.opis}
                components={portableTextComponents}
              />
            </div>
          )}
        </div> */}

        {/* Podkategorije */}
        {/* {podkategorije.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Подкатегорије
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {podkategorije.map((podkategorija) => (
                <Link
                  key={podkategorija._id}
                  href={`/kategorija/${podkategorija.slug.current}`}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full overflow-hidden">
              
                    <div className="relative h-48 overflow-hidden">
                      {podkategorija.slika ? (
                        <img
                          src={urlFor(podkategorija.slika)
                            .width(400)
                            .height(300)
                            .url()}
                          alt={podkategorija.naziv}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br from-${podkategorija.boja || "blue"}-400 to-${podkategorija.boja || "blue"}-600 flex items-center justify-center`}
                        >
                          <div className="text-white text-4xl font-bold">
                            {podkategorija.naziv.charAt(0)}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 text-gray-900 hover:bg-white"
                        >
                          {kategorija.naziv}
                        </Badge>
                      </div>
                    </div>

                 
                    <CardContent className="p-6 flex-1 flex items-center justify-center">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-center">
                        {podkategorija.naziv}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )} */}

        {/* Ponude */}
        <div className="mb-12">
          <KlasifikacijeFilter
            selectedKlasifikacije={selectedKlasifikacije}
            onKlasifikacijeChange={handleKlasifikacijeChange}
          />

          <div className="flex justify-between items-center mb-6">
            {/* <h2 className="text-xl font-bold text-gray-900">
              Понуде {podkategorije.length > 0 ? `(${totalPonude})` : ""}
            </h2> */}
            {totalPages > 1 && (
              <div className="text-sm text-gray-600">
                Страница {currentPage} од {totalPages}
              </div>
            )}
          </div>

          {filteredPonude.length === 0 && selectedKlasifikacije.length > 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Нема понуда са одабраним класификацијама.
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedKlasifikacije([])}
                className="mt-4"
              >
                Обриши филтере
              </Button>
            </div>
          ) : filteredPonude.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Тренутно нема понуда у овој категорији.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {filteredPonude.map((ponuda) => (
                  <PonudaCard
                    key={ponuda._id}
                    ponuda={{ ...ponuda, kratakOpis: ponuda.kratakOpis || "" }}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="flex items-center px-2 md:px-4"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Претходна
                  </Button>

                  <div className="flex space-x-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            onClick={() => setCurrentPage(page)}
                            className="w-5 h-10 md:w-10 md:h-10 p-0"
                          >
                            {page}
                          </Button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="px-2">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center px-2 md:px-4"
                  >
                    Следећа
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
