// Osnovni tipovi za aplikaciju

export interface Kategorija {
  _id: string;
  naziv: string;
  slug: { current: string };
  opis?: any[];
  slika?: any;
  ikona?: string;
  boja?: string;
  redosled?: number;
  roditeljskaKategorija?: {
    naziv: string;
    slug: { current: string };
  };
}

export interface Ponuda {
  _id: string;
  naziv: string;
  slug: { current: string };
  kratakOpis?: string;
  detaljniOpis?: any[];
  glavnaSlika?: any;
  galerija?: any[];
  cena?: number;
  ocena?: number;
  istaknuto?: boolean;
  dostupno?: boolean;
  ukluceno?: string[];
  prikaziTabelu?: boolean;
  tabela?: {
    naslovTabele?: string;
    kolone?: Array<{ naziv: string }>;
    redovi?: Array<{
      celije: Array<{ sadrzaj: string }>;
    }>;
  };
  napomeneTabele?: any[];
  stilTabele?: string;
  kategorije?: Kategorija[];
  datumKreiranja?: string;
}

export interface BlogPost {
  _id: string;
  naslov: string;
  slug: { current: string };
  autor: string;
  datumObjavljivanja: string;
  glavnaSlika: any;
  kratakOpis: string;
  sadrzaj: any[];
  tagovi?: string[];
  objavljeno: boolean;
}

export interface Galerija {
  _id: string;
  naziv: string;
  opis?: string;
  slike: Array<{
    asset: any;
    alt?: string;
    caption?: string;
  }>;
}