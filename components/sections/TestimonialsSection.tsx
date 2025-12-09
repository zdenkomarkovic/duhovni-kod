import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Marko Petrović",
    location: "Beograd",
    text: "Neverojatn iskustvo! Pustolovi su organizovali savršenu avanturu za našu porodicu. Sve je bilo precizno i profesionalno.",
    rating: 5
  },
  {
    name: "Ana Jovanović",
    location: "Novi Sad",
    text: "Najbolja avanturna agencija! Doživeli smo nezaboravnu pustolovinu i odličan servis. Definitivno ću ponovo putovati sa njima.",
    rating: 5
  },
  {
    name: "Stefan Nikolić",
    location: "Niš",
    text: "Profesionalni tim koji se brine o svakom detalju. Naša avantura u Grčkoj je bila nezaboravna!",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Šta Kažu Naši Pustolovci
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Više od 10,000 pustolovaca je doživelo nezaboravne avanture sa nama
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}