"use client";

import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FloatingCallButton() {
  const phoneNumber = "+381628197532";
  const displayNumber = "062 8197532";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleCall}
        size="lg"
        className="bg-green-600 hover:bg-green-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-full w-16 h-16 p-0 group"
        title={`Pozovi ${displayNumber}`}
      >
        <Phone className="w-6 h-6 group-hover:animate-pulse" />
      </Button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
          Pozovi {displayNumber}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
}