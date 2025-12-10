"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Mail } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ""
    );
    formData.append("email", email);
    formData.append("message", `Newsletter prijava: ${email}`);
    formData.append("subject", "Nova newsletter prijava - Pustolovi");
    formData.append("from_name", "Newsletter Pustolovi");
    formData.append("redirect", "false");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error("Greška pri prijavi");
      }
    } catch (error) {
      setError("Došlo je do greške. Molimo pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {isSubmitted ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Uspešno ste se prijavili!
              </h2>
              <p className="text-blue-100">
                Hvala vam! Uskoro ćete dobijati naše najnovije ponude za
                putovanja.
              </p>
            </div>
          </div>
        ) : (
          <>
            <Mail className="w-16 h-16 text-blue-200 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Budite Informisani o Našim Putovanjima
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Prijavite se za naš newsletter i prvi dobijajte ponude o našim
              putovanjima
            </p>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Vaša email adresa"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="flex-1 bg-white border-white/20 focus:border-white"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="bg-white text-blue-600 hover:bg-gray-100 disabled:opacity-50 px-8"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Šalje se...
                    </>
                  ) : (
                    "Prijavite se"
                  )}
                </Button>
              </div>

              {error && (
                <p className="text-red-200 text-sm mt-4 bg-red-500/20 p-3 rounded-lg">
                  {error}
                </p>
              )}
            </form>

            <p className="text-blue-200 text-sm mt-4">
              Poštujemo vašu privatnost. Možete se odjaviti u bilo kom trenutku.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
