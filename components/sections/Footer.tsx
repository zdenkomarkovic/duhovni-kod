"use client";

import logo from "../../public/android-chrome-192x192.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import { client, projectId } from "@/lib/sanity";
import Image from "@/node_modules/next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";

interface Kategorija {
  _id: string;
  naziv: string;
  slug: { current: string };
}

const KATEGORIJE_QUERY = `*[_type == "kategorija" && !defined(roditeljskaKategorija)] {
  _id,
  naziv,
  slug,
  redosled
} | order(redosled asc, naziv asc)`;

const staticLinks = [
  { name: "Почетна", href: "/" },
  { name: "О Удружењу", href: "/o-udruzenju" },
  { name: "Одаберите путовања", href: "/putovanja" },
  { name: "Галерија", href: "/galerija" },
];

const contactInfo = [
  {
    text: "+38163 8815544",
    href: "tel:+381638815544",
    type: "phone",
  },
  {
    text: "duhovni.kod@gmail.com",
    href: "mailto:duhovni.kod@gmail.com",
    type: "email",
  },
  // {
  //   text: "Jakšićeva 19, Kruševac",
  //   href: "https://maps.app.goo.gl/icP136FDaEpYtKc59",
  //   type: "address",
  // },
];

export default function Footer() {
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

  // Kombinuj statičke linkove sa kategorijama
  const allNavigationLinks = [
    ...staticLinks,
    ...kategorije.map((kat) => ({
      name: kat.naziv,
      href: `/kategorija/${kat.slug.current}`,
    })),
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mx-auto">
          {/* Brand */}
          <div className=" text-center mx-auto">
            <p className="text-2xl font-bold">Духовни Код</p>

            <Image
              src={logo}
              width={120}
              height={100}
              alt="туристичка агенција"
              className="mx-auto"
            />
          </div>

          {/* Navigacija */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Навигација</h4>
            {loading ? (
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-700 rounded w-24 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <ul className="space-y-2 text-gray-400">
                {allNavigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакт инфо</h4>
            <ul className="space-y-2 text-gray-400">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a
                    href={info.href}
                    className="hover:text-white transition-colors "
                    target={info.type === "address" ? "_blank" : undefined}
                    rel={
                      info.type === "address"
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {info.type === "email" ? (
                      <span className="break-all text-sm">{info.text}</span>
                    ) : (
                      info.text
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-4 justify-center mt-4">
              <a
                href=""
                target={"_blank"}
                className="hover:text-gray-400 transition-colors"
              >
                <Facebook />
              </a>
              <a
                href=""
                target={"_blank"}
                className="hover:text-gray-400 transition-colors"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center border-t border-gray-400 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Духовни Код. Сва права задржана.</p>
          <a href="https://www.manikamwebsolutions.com/" target="_blank">
            израда сајта:{" "}
            <span className="font-bold text-white hover:text-gray-400 transition-colors">
              {" "}
              ManikamWebSolutions
            </span>
          </a>{" "}
        </div>
      </div>
    </footer>
  );
}
