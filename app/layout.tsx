import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duhovni Kod - Putovanja na Kosovo i Metohiju",
  description:
    "Udruženje Duhovni Kod organizuje putovanja na Kosovo i Metohiju uz stručno vođenje. Pridružite nam se na putovanju različitom od svih drugih, uz dружење, priče iz istorije i duhovno nadahnuće.",
  keywords:
    "kosovo i metohija, duhovna putovanja, kulturna baština, manastiri, putovanja srbija, srpske svetinje",
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
