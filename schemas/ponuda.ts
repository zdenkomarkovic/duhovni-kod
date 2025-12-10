import { defineField, defineType } from "sanity";

export const ponuda = defineType({
  name: "ponuda",
  title: "Ponude Putovanja",
  type: "document",
  fields: [
    defineField({
      name: "naziv",
      title: "Naziv Destinacije",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "naziv",
        maxLength: 96,
        auto: true,
      },
    }),
    defineField({
      name: "kratakOpis",
      title: "Kratak Opis",
      type: "text",
      options: {
        rows: 3,
      },
    }),
    defineField({
      name: "detaljniOpis",
      title: "Detaljan Opis",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "glavnaSlika",
      title: "Glavna Slika",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "galerija",
      title: "Galerija Slika",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "cena",
      title: "Cena (EUR)",
      type: "number",
    }),
    defineField({
      name: "cenaRSD",
      title: "Cena (RSD)",
      type: "number",
      description: "Iznos u dinarima (opciono)",
    }),
    defineField({
      name: "kategorije",
      title: "Kategorije",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "kategorija" }],
        },
      ],
      validation: (Rule) =>
        Rule.max(5).warning("Preporučujemo maksimalno 5 kategorija"),
    }),
    defineField({
      name: "ocena",
      title: "Ocena (1-5)",
      type: "number",
    }),
    defineField({
      name: "dostupno",
      title: "Dostupno za Rezervaciju",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "istaknuto",
      title: "Istaknuta Ponuda",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ukluceno",
      title: "Šta je Uključeno",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "prikaziTabelu",
      title: "Prikaži Tabelu",
      type: "boolean",
      initialValue: false,
      description: "Uključi/isključi prikaz tabele na stranici",
    }),
    defineField({
      name: "tabela",
      title: "Tabela Podataka",
      type: "tabela", // custom tip moraš da definšeš u posebnom fajlu
      hidden: ({ parent }) => !parent?.prikaziTabelu,
    }),
    defineField({
      name: "napomeneTabele",
      title: "Napomene za Tabelu",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Dodatne napomene ili objašnjenja za tabelu sa formatiranjem (opciono) - prikazuje se ispod tabele",
    }),
    defineField({
      name: "stilTabele",
      title: "Stil Tabele",
      type: "string",
      options: {
        list: [
          { title: "Standardni", value: "standard" },
          { title: "Kompaktni", value: "compact" },
          { title: "Prošireni", value: "expanded" },
        ],
      },
      initialValue: "standard",
    }),
    defineField({
      name: "datumKreiranja",
      title: "Datum Kreiranja",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "naziv",
      media: "glavnaSlika",
      kategorije: "kategorije",
    },
    prepare(selection) {
      const { title, media, kategorije } = selection;
      const kategorijeNames =
        kategorije?.map((kat) => kat.naziv).join(", ") || "Bez kategorije";
      return {
        title,
        media,
        subtitle: kategorijeNames,
      };
    },
  },
});
