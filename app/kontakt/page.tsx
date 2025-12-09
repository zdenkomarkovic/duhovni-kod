"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Telefon",
    details: ["+38162 8197532"],
    href: "tel:+381628197532",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    details: ["putovanjapustoloviks@gmail.com"],
    href: "mailto:putovanjapustoloviks@gmail.com",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Adresa",
    details: ["Jakšićeva 19", "37000 Kruševac, Srbija"],
    href: "https://maps.app.goo.gl/3L5JULxxnAqbNHtA8",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Radno vreme",
    details: [
      "Pon - Pet: 09:00 - 17:00",
      "Subota: 09:00 - 14:00",
      "Nedelja: Zatvoreno",
    ],
  },
];

export default function KontaktPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form
        (e.target as HTMLFormElement).reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error("Greška pri slanju poruke");
      }
    } catch (error) {
      alert("Došlo je do greške. Molimo pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero sekcija */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <Link
              href="/"
              className="inline-flex items-center text-blue-100 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nazad na početnu
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Kontaktirajte Nas
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Spremni smo da odgovorimo na sva vaša pitanja i pomoćićemo vam da
              isplanirate savršenu pustolovinu
            </p>
          </div>
        </div>
      </section>

      {/* Kontakt informacije */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, i) => (
                      <p
                        key={i}
                        className="text-gray-600 break-words text-sm leading-relaxed"
                      >
                        {info.href && i === 0 ? (
                          <a
                            href={info.href}
                            className="text-blue-600 hover:text-blue-700 transition-colors break-all"
                            target={
                              info.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              info.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Kontakt forma */}
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  {isSubmitted
                    ? "Poruka je uspešno poslata!"
                    : "Pošaljite nam poruku"}
                </h2>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-green-800 font-medium">
                        Hvala vam na poruci!
                      </p>
                      <p className="text-green-700 text-sm">
                        Kontaktiraćemo vas u najkraćem mogućem roku.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Web3Forms access key */}
                  <input
                    type="hidden"
                    name="access_key"
                    value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}
                  />

                  {/* Honeypot spam protection */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: "none" }}
                  />

                  {/* Redirect after submission */}
                  <input type="hidden" name="redirect" value="false" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="ime"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Ime *
                      </label>
                      <Input
                        id="ime"
                        name="ime"
                        placeholder="Vaše ime"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="prezime"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Prezime *
                      </label>
                      <Input
                        id="prezime"
                        name="prezime"
                        placeholder="Vaše prezime"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email adresa *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="vasa@email.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="telefon"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Telefon
                    </label>
                    <Input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      placeholder="06x xxx xxxx"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="poruka"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Vaša poruka *
                    </label>
                    <Textarea
                      id="poruka"
                      name="message"
                      placeholder="Opišite kako možemo da vam pomognemo..."
                      rows={6}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-lg py-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Šalje se...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Pošaljite poruku
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Mapa i dodatne informacije */}
            <div className="space-y-8">
              {/* Google mapa */}
              <Card className="shadow-xl">
                <CardContent className="p-0">
                  <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18888.754472794808!2d21.311075146723187!3d43.58351181975881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475687e4f58e9a63%3A0x8ac12e987a85d16e!2z0IjQsNC60YjQuNGb0LXQstCwIDE5LCDQmtGA0YPRiNC10LLQsNGG!5e0!3m2!1ssr!2srs!4v1752677926930!5m2!1ssr!2srs"
                      width="100%"
                      height="256"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Pustolovi lokacija"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              {/* Dodatne informacije */}
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    Zašto izabrati Pustolove?
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>
                        Višegodišnje iskustvo u organizovanju putovanja
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Licencirana turistička agencija</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>24/7 podrška tokom putovanja</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Prilagođeni paketi prema vašim potrebama</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Najbolje cene na tržištu</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
