import { notFound } from "next/navigation";
import { client, urlFor, projectId } from "@/lib/sanity";
import { Metadata } from "next";
import PonudaClient from "./components/PonudaClient";

interface PonudaDetail {
  _id: string;
  naziv: string;
  slug: { current: string };
  kratakOpis: string;
  detaljniOpis: any[];
  glavnaSlika: any;
  galerija: any[];
  cena: number;
  cenaRSD?: number;
  ocena: number;
  istaknuto: boolean;
  dostupno: boolean;
  ukluceno: string[];
  prikaziTabelu?: boolean;
  tabela?: {
    naslovTabele?: string;
    kolone?: Array<{ naziv: string }>;
    redovi?: Array<{
      celije: Array<{ sadrzaj: string }>;
    }>;
  };
  napomeneTabele?: any[];
  kategorije: Array<{
    naziv: string;
    slug: { current: string };
    boja: string;
    roditeljskaKategorija?: {
      naziv: string;
      slug: { current: string };
    };
  }>;
  datumKreiranja: string;
}

const PONUDA_DETAIL_QUERY = `*[_type == "ponuda" && slug.current == $slug][0] {
  _id,
  naziv,
  slug,
  kratakOpis,
  detaljniOpis,
  glavnaSlika,
  galerija,
  cena,
  cenaRSD,
  ocena,
  istaknuto,
  dostupno,
  ukluceno,
  prikaziTabelu,
  tabela {
    naslovTabele,
    kolone[] {
      naziv
    },
    redovi[] {
      celije[] {
        sadrzaj
      }
    }
  },
  napomeneTabele,
  stilTabele,
  kategorije[]-> {
    naziv,
    slug,
    boja,
    roditeljskaKategorija-> {
      naziv,
      slug
    }
  },
  datumKreiranja
}`;

async function getPonuda(slug: string): Promise<PonudaDetail | null> {
  // Don't fetch if using placeholder project ID
  if (
    projectId === "your-project-id-here" ||
    !projectId ||
    projectId.length < 5
  ) {
    return null;
  }

  try {
    const data = await client.fetch(PONUDA_DETAIL_QUERY, { slug });
    return data;
  } catch (error) {
    console.warn("Sanity not configured yet");
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const ponuda = await getPonuda(params.slug);

  if (!ponuda) {
    return {
      title: "Понуда није пронађена",
    };
  }

  const imageUrl = ponuda.glavnaSlika?.asset
    ? urlFor(ponuda.glavnaSlika).width(1200).height(630).url()
    : undefined;

  return {
    title: `${ponuda.naziv} - Duhovni Kod`,
    description: ponuda.kratakOpis || `Pogledajte ponudu: ${ponuda.naziv}`,
    openGraph: {
      title: ponuda.naziv,
      description: ponuda.kratakOpis || `Pogledajte ponudu: ${ponuda.naziv}`,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: ponuda.naziv,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ponuda.naziv,
      description: ponuda.kratakOpis || `Pogledajte ponudu: ${ponuda.naziv}`,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function PonudaPage({
  params,
}: {
  params: { slug: string };
}) {
  const ponuda = await getPonuda(params.slug);

  if (!ponuda) {
    notFound();
  }

  return <PonudaClient ponuda={ponuda} />;
}
