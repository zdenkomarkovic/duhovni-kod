import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg)",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="flex flex-col text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Pustolovina Počinje sa nama{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
            Pustolovi
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-delay">
          Vaš vodič kroz nezaboravne avanture. Otkrijte svet kroz naše
          jedinstvene pustolove i doživite putovanja kakva niste ni sanjali.
        </p>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-delay">
         Nismo najjeftiniji. Nismo najluksuzniji. Ali jesmo <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-extrabold">NAJORIGINALNIJI</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
          <a href="#destinations">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
            >
              Počnite Pustolovinu
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }
      `}</style>
    </section>
  );
}
