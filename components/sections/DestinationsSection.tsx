
import PonudeFromSanity from '@/components/PonudeFromSanity';

export default function DestinationsSection() {
  return (
    <section id="destinations" className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Odaberite putovanja
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pogledajte sva dostupna putovanja
          </p>
        </div>
        <PonudeFromSanity />
      </div>
    </section>
  );
}