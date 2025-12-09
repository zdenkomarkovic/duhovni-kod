"use client";

import { useState, useEffect } from 'react';
import { client, projectId } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import KategorijaCard from '@/components/cards/KategorijaCard';

interface Kategorija {
  _id: string;
  naziv: string;
  slug: { current: string };
  slika: any;
  ikona: string;
  boja: string;
}

const KATEGORIJE_QUERY = `*[_type == "kategorija" && !defined(roditeljskaKategorija)] {
  _id,
  naziv,
  slug,
  slika,
  ikona,
  boja
} | order(redosled asc, naziv asc)`;

export default function KategorijeFromSanity() {
  const [kategorije, setKategorije] = useState<Kategorija[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKategorije() {
      // Don't fetch if using placeholder project ID
      if (projectId === 'your-project-id-here' || !projectId || projectId.length < 5) {
        setLoading(false);
        return;
      }
      
      try {
        const data = await client.fetch(KATEGORIJE_QUERY);
        setKategorije(data);
      } catch (error) {
        console.warn('Sanity not configured yet - using demo mode');
      } finally {
        setLoading(false);
      }
    }

    fetchKategorije();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (kategorije.length === 0) {
    return null; // Ne prikazuj ništa ako nema kategorija
  }

  return (
    <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Kategorije Putovanja
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Izaberite tip avanture koji vas zanima i otkrijte nezaboravne destinacije
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {kategorije.map((kategorija) => (
          <KategorijaCard key={kategorija._id} kategorija={kategorija} />
        ))}
      </div>
    </div>
  );
}