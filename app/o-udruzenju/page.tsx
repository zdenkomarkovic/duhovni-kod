"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function OUdruzenјuPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero sekcija */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              O Udruženju Duhovni Kod
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>

          {/* Sadržaj */}
          <Card className="shadow-xl mb-12">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Udruženje organizuje putovanja na{" "}
                  <strong>Kosovo i Metohију</strong> uz stručno vođenje.
                  Pridružite nam se na putovanju različitom od svih drugih, uz
                  druženje, priče iz istorije i duhovno nadahnuće.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Kao potомci treba da sačuvamo sve što smo dobili, i time
                  potvrdimo sebe kao pojedince i kao narod. Kosovo je naše
                  ogledalo i naš odraz, Kosovo i Metohija to smo mi sami.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Proverite zašto se naša putovanja razlikuju od drugih, zašto
                  se putnici vraćaju i preporučuju nas.
                </p>

                {/* Istaknuta poruka */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
                  <p className="text-xl font-semibold text-blue-900 mb-2">
                    Naša misija
                  </p>
                  <p className="text-gray-700">
                    Očuvanje kulturne i duhovne baštine kroz organizovana
                    putovanja na Kosovo i Metohiju, gde svaki učesnik može
                    doživeti autentično iskustvo naše istorije i tradicije.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Stručno vođenje
                    </h3>
                    <p className="text-gray-700">
                      Naša putovanja vode iskusni vodiči koji dele znanje o
                      istoriji, kulturi i duhovnom značaju svakog mesta koje
                      posetimo.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Duhovno nadahnuće
                    </h3>
                    <p className="text-gray-700">
                      Svako putovanje je prilika za duhovno osvежenje i
                      povezivanje sa našim korenima kroz posete manastirima i
                      svetinjama.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Poziv na akciju */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-teal-600 text-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Pridružite se našem sledećem putovanju
            </h2>
            <p className="text-xl mb-6">
              Kontaktirajte nas i saznajte više o predstojećim putovanjima
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+381638815544"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Pozovite nas
              </a>
              <a
                href="mailto:duhovni.kod@gmail.com"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Pošaljite email
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
