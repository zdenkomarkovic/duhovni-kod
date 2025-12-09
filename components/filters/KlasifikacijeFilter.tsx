"use client";

import { useState, useEffect } from 'react';
import { client, projectId } from '@/lib/sanity';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Hotel, 
  Plane, 
  Bus, 
  Car, 
  MapPin,
  Building,
  Utensils,
  Camera,
  X
} from 'lucide-react';
import { Klasifikacija } from '@/types';

interface KlasifikacijeFilterProps {
  selectedKlasifikacije: string[];
  onKlasifikacijeChange: (klasifikacije: string[]) => void;
}

const KLASIFIKACIJE_QUERY = `*[_type == "klasifikacija"] {
  _id,
  naziv
} | order(naziv asc)`;

export default function KlasifikacijeFilter({ 
  selectedKlasifikacije, 
  onKlasifikacijeChange 
}: KlasifikacijeFilterProps) {
  const [klasifikacije, setKlasifikacije] = useState<Klasifikacija[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKlasifikacije() {
      // Don't fetch if using placeholder project ID
      if (projectId === 'your-project-id-here' || !projectId || projectId.length < 5) {
        setLoading(false);
        return;
      }
      
      try {
        const data = await client.fetch(KLASIFIKACIJE_QUERY);
        setKlasifikacije(data);
      } catch (error) {
        console.warn('Sanity not configured yet - using demo mode');
      } finally {
        setLoading(false);
      }
    }

    fetchKlasifikacije();
  }, []);

  const handleKlasifikacijaToggle = (klasifikacijaId: string) => {
    if (selectedKlasifikacije.includes(klasifikacijaId)) {
      onKlasifikacijeChange(selectedKlasifikacije.filter(id => id !== klasifikacijaId));
    } else {
      onKlasifikacijeChange([...selectedKlasifikacije, klasifikacijaId]);
    }
  };

  const clearAllFilters = () => {
    onKlasifikacijeChange([]);
  };

  if (loading) {
    return (
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="flex gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded w-20"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (klasifikacije.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filtriraj po tagovima</h3>
          {selectedKlasifikacije.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4 mr-1" />
              Obriši sve ({selectedKlasifikacije.length})
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {klasifikacije.map((klasifikacija) => {
            const isSelected = selectedKlasifikacije.includes(klasifikacija._id);
            return (
              <Badge
                key={klasifikacija._id}
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  isSelected 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-blue-600 border-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => handleKlasifikacijaToggle(klasifikacija._id)}
              >
                {klasifikacija.naziv}
              </Badge>
            );
          })}
        </div>

        {selectedKlasifikacije.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Prikazuju se ponude sa sledećim tagovima: {selectedKlasifikacije.length}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}