import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Mountain, Plane, Camera, Utensils, Building } from 'lucide-react';
import { urlFor } from '@/lib/sanity';
import Link from 'next/link';

interface KategorijaCardProps {
  kategorija: {
    _id: string;
    naziv: string;
    slug: { current: string };
    slika: any;
    ikona: string;
    boja: string;
  };
}

// Mapiranje ikona
const getIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    'MapPin': MapPin,
    'Mountain': Mountain,
    'Plane': Plane,
    'Camera': Camera,
    'Utensils': Utensils,
    'Building': Building,
  };
  
  const IconComponent = icons[iconName] || MapPin;
  return <IconComponent className="w-6 h-6" />;
};

export default function KategorijaCard({ kategorija }: KategorijaCardProps) {
  return (
    <Link href={`/kategorija/${kategorija.slug.current}`}>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          {kategorija.slika ? (
            <img 
              src={urlFor(kategorija.slika).width(400).height(300).url()} 
              alt={kategorija.naziv}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br from-${kategorija.boja || 'blue'}-400 to-${kategorija.boja || 'blue'}-600 flex items-center justify-center`}>
              <div className="text-white">
                {getIcon(kategorija.ikona)}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
          <div className="absolute top-4 left-4">
            <Badge 
              className={`bg-${kategorija.boja || 'blue'}-600 text-white hover:bg-${kategorija.boja || 'blue'}-700`}
            >
              {getIcon(kategorija.ikona)}
              <span className="ml-2">{kategorija.naziv}</span>
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
            {kategorija.naziv}
          </h3>
          <Button 
            className={`w-full bg-gradient-to-r from-${kategorija.boja || 'blue'}-600 to-${kategorija.boja || 'blue'}-700 hover:from-${kategorija.boja || 'blue'}-700 hover:to-${kategorija.boja || 'blue'}-800 text-white`}
          >
            Istraži kategoriju
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}