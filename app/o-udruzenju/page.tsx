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
          {/* Херо секција */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              О Удружењу Духовни kод
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>

          {/* Садржај */}
          <Card className="shadow-xl mb-12">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Удружење организује путовања на{" "}
                  <strong>Косово и Метохију</strong> уз стручно вођење.
                  Придружите нам се на путовању различитом од свих других, уз
                  дружење, приче из историје и духовно надахнуће.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Као потомци треба да сачувамо све што смо добили, и тиме
                  потврдимо себе као појединце и као народ. Косово је наше
                  огледало и наш одраз, Косово и Метохија то смо ми сами.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Проверите зашто се наша путовања разликују од других, зашто се
                  путници враћају и препоручују нас.
                </p>

                {/* Истакнута порука */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
                  <p className="text-xl font-semibold text-blue-900 mb-2">
                    Наша мисија
                  </p>
                  <p className="text-gray-700">
                    Очување културне и духовне баштине кроз организована
                    путовања на Косово и Метохију, где сваки учесник може
                    доживети аутентично искуство наше историје и традиције.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Стручно вођење
                    </h3>
                    <p className="text-gray-700">
                      Наша путовања воде искусни водичи који деле знање о
                      историји, култури и духовном значају сваког места које
                      посетимо.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Духовно надахнуће
                    </h3>
                    <p className="text-gray-700">
                      Свако путовање је прилика за духовно освежење и повезивање
                      са нашим коренима кроз посете манастирима и светињама.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Позив на акцију */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-teal-600 text-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-4">
              Придружите се нашем следећем путовању
            </h2>
            <p className="text-xl mb-6">
              Контактирајте нас и сазнајте више о предстојећим путовањима
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+381638815544"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Позовите нас
              </a>
              <a
                href="mailto:duhovni.kod@gmail.com"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Пошаљите емаил
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
