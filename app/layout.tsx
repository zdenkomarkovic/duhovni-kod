import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pustolovi - Vaš Vodič kroz Nezaboravne Avanture",
  description:
    "Avanturna turistička agencija koja kreira jedinstvene pustolove. Otkrijte svet kroz naše nezaboravne avanture i ekspedicije.",
  keywords:
    "pustolovi, avanture, ekspedicije, avanturna putovanja, outdoor aktivnosti, ekstremni sportovi",
  icons: {
    icon: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
