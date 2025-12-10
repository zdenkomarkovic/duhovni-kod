import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Milica Stojanović",
    location: "Beograd",
    text: "Poseta Dečanima i Gračanici me je duboko dirnula. Vodič nam je ispričao priče koje se ne nalaze u knjigama. Ovo nije obično putovanje - ovo je duhovno iskustvo.",
    rating: 5
  },
  {
    name: "Nenad Jovanović",
    location: "Novi Sad",
    text: "Sa Duhovnim Kodom sam prvi put posetio Kosovo. Organizacija je bila besprekorna, a atmosfera na putovanju neverovatna. Vratio sam se promenjen čovek.",
    rating: 5
  },
  {
    name: "Jelena Nikolić",
    location: "Niš",
    text: "Svaki manastir, svaka priča, svaki trenutak - sve je bilo dirljivo. Preporučujem svima da dođu i sami vide lepotu naše baštine. Hvala Duhovnom Kodu!",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Utisci putnika
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Čujte priče onih koji su se vratili sa duhovnog putovanja na Kosovo i Metohiju
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