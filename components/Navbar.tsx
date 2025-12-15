"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { client, projectId } from "@/lib/sanity";
import logo from "../public/android-chrome-192x192.png";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import Image from "@/node_modules/next/image";

interface Kategorija {
  _id: string;
  naziv: string;
  slug: { current: string };
  roditeljskaKategorija?: {
    naziv: string;
    slug: { current: string };
  };
}

const KATEGORIJE_QUERY = `*[_type == "kategorija"] {
  _id,
  naziv,
  slug,
  redosled,
  slika,
  roditeljskaKategorija-> {
    naziv,
    slug
  }
} | order(redosled asc, naziv asc)`;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [kategorije, setKategorije] = useState<Kategorija[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKategorije() {
      // Don't fetch if using placeholder project ID
      if (
        projectId === "your-project-id-here" ||
        !projectId ||
        projectId.length < 5
      ) {
        setLoading(false);
        return;
      }

      try {
        const data = await client.fetch(KATEGORIJE_QUERY);
        setKategorije(data);
      } catch (error) {
        console.warn("Sanity not configured yet - using demo mode");
      } finally {
        setLoading(false);
      }
    }

    fetchKategorije();
  }, []);

  // Grupiši kategorije - glavne kategorije (bez roditeljske)
  const glavneKategorije = kategorije.filter(
    (kat) => !kat.roditeljskaKategorija
  );

  return (
    <nav className="fixed top-0 w-full bg-white backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logo}
              width={60}
              height={60}
              alt="туристичка агенција"
            />
            <span className="text-2xl font-bold text-gray-900">
              Духовни Код
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Почетна
            </Link>

            <Link
              href="/o-udruzenju"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              О Удружењу
            </Link>

            {/* Kategorije */}
            {!loading &&
              glavneKategorije.length > 0 &&
              glavneKategorije.map((kategorija) => (
                <Link
                  key={kategorija._id}
                  href={`/kategorija/${kategorija.slug.current}`}
                  className="text-gray-700 hover:text-blue-600 transition-colors lowercase first-letter:uppercase"
                >
                  {kategorija.naziv}
                </Link>
              ))}
            <Link
              href="/galerija"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Галерија
            </Link>
            {/* Call Button */}
            <div>
              <a
                href="tel:+381638815544"
                className="flex px-3 items-center space-x-2 text-green-600 hover:text-green-700 transition-colors font-medium"
                title="Позови нас"
              >
                <Phone className="w-4 h-4" />
                <span>+38163 8815544</span>
              </a>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href="/kontakt">Контакт</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 py-4 shadow-lg">
            <div className="flex flex-col space-y-4 px-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Почетна
              </Link>

              <Link
                href="/o-udruzenju"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                О Удружењу
              </Link>

              <Link
                href="/putovanja"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Одаберите путовања
              </Link>

              <Link
                href="/galerija"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Галерија
              </Link>

              {/* Mobile Kategorije */}
              {!loading && glavneKategorije.length > 0 && (
                <>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Категорије
                  </div>
                  {glavneKategorije.map((kategorija) => (
                    <Link
                      key={kategorija._id}
                      href={`/kategorija/${kategorija.slug.current}`}
                      className="text-gray-700 hover:text-blue-600 transition-colors pl-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {kategorija.naziv}
                    </Link>
                  ))}
                </>
              )}

              {/* Mobile Call Button */}
              <a
                href="tel:+381638815544"
                className="flex items-center space-x-3 text-green-600 hover:text-green-700 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-5 h-5" />
                <span>063 8815544</span>
              </a>

              <Button
                className="bg-blue-600 hover:bg-blue-700 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/kontakt">Контакт</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
