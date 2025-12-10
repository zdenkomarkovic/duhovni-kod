import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { urlFor } from '@/lib/sanity';
import Link from 'next/link';

interface Kategorija {
  naziv: string;
  slug: { current: string };
  boja: string;
  roditeljskaKategorija?: {
    naziv: string;
    slug: { current: string };
  };
}

interface PonudaCardProps {
  ponuda: {
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
  };
}

export default function PonudaCard({ ponuda }: PonudaCardProps) {
  return (
    <Card 
      className={`group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col ${
        ponuda.istaknuto ? 'ring-2 ring-yellow-400' : ''
      }`}
    >
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {ponuda.glavnaSlika && ponuda.glavnaSlika.asset ? (
          <img
            src={urlFor(ponuda.glavnaSlika).width(400).height(300).url()}
            alt={ponuda.naziv}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/1 Манастир Дечани-min.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100">
            <span className="text-gray-400 text-sm">Slika se učitava...</span>
          </div>
        )}
        <div className="absolute top-4 right-4 flex gap-2">
          {ponuda.istaknuto && (
            <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
              Istaknuto
            </Badge>
          )}
          <Badge className="bg-white text-gray-900 hover:bg-white">
            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
            {ponuda.ocena}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {ponuda.kategorije?.map((kategorija, index) => (
            <Badge
              key={index}
              variant={kategorija.roditeljskaKategorija ? "secondary" : "outline"}
              className={`text-${kategorija.boja || 'blue'}-600 border-${kategorija.boja || 'blue'}-600`}
            >
              {kategorija.roditeljskaKategorija
                ? `${kategorija.roditeljskaKategorija.naziv} → ${kategorija.naziv}`
                : kategorija.naziv
              }
            </Badge>
          ))}
        </div>
        
        <h3 className="text-xl font-semibold mb-0">{ponuda.naziv}</h3>
        
        {ponuda.kratakOpis && (
          <p className="text-gray-600 mb-0 text-sm flex-1">{ponuda.kratakOpis}</p>
        )}
        
        <div className="flex justify-between items-center mb-1">
          {(ponuda.cena || ponuda.cenaRSD) && (
            <span className="text-lg font-semibold text-blue-600 my-0">
              {ponuda.cena
                ? `€${ponuda.cena}`
                : ponuda.cenaRSD
                  ? `${ponuda.cenaRSD.toLocaleString("sr-RS")} RSD`
                  : ""
              }
            </span>
          )}
        </div>
        
        <Link href={`/ponuda/${ponuda.slug.current}`} className="block w-full mt-auto">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
            Saznaj više
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}