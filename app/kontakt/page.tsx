"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Send, ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Telefon",
    details: ["+38163 8815544"],
    href: "tel:+381638815544",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    details: ["duhovni.kod@gmail.com"],
    href: "mailto:duhovni.kod@gmail.com",
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
              isplanirate savršeno putovanje
            </p>
          </div>
        </div>
      </section>

      {/* Kontakt informacije */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="grid  gap-8 mb-16">
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
