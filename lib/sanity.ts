import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Export projectId for components to check
export { projectId };

export const client = createClient({
  projectId,
  dataset,
  useCdn: false, // Disabled CDN to get fresh data from Sanity
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export const PONUDE_QUERY = `*[_type == "ponuda"] {
  _id,
  naziv,
  slug,
  kratakOpis,
  glavnaSlika,
  cena,
  ocena,
  istaknuto,
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
  kategorije[]-> {
    naziv,
    slug,
    boja,
    roditeljskaKategorija-> {
      naziv,
      slug
    }
  }
}`;

export const KATEGORIJE_QUERY = `*[_type == "kategorija" && !defined(roditeljskaKategorija)] {
  _id,
  naziv,
  slug,
  opis,
  slika,
  ikona,
  boja,
  redosled
} | order(redosled asc, naziv asc)`;

export const UTISCI_QUERY = `*[_type == "utisak" && prikazano == true] {
  _id,
  ime,
  tekst,
  ocena,
  istaknuto
} | order(istaknuto desc)`;