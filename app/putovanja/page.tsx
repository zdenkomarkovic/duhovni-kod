import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import PonudeBezKategorije from "@/components/PonudeBezKategorije";

export default function PutovanjaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Odaberite putovanja
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pogledajte sva dostupna putovanja
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <PonudeBezKategorije />
        </div>
      </main>

      <Footer />
    </div>
  );
}
