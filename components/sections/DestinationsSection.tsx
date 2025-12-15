
import PonudeFromSanity from '@/components/PonudeFromSanity';

export default function DestinationsSection() {
  return (
    <section id="destinations" className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Истакнуте Понуде
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Откријте наше најбоље и најпопуларније понуде
          </p>
        </div>
        <PonudeFromSanity />
      </div>
    </section>
  );
}