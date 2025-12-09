import { defineField, defineType } from "sanity";

export const kategorija = defineType({
  name: "kategorija",
  title: "Kategorije Putovanja",
  type: "document",
  fields: [
    defineField({
      name: "naziv",
      title: "Naziv Kategorije",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "naziv",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "opis",
      title: "Opis Kategorije",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      description: "Detaljan opis kategorije sa formatiranjem",
    } as any),
    defineField({
      name: "slika",
      title: "Slika Kategorije",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Glavna slika koja predstavlja kategoriju",
    }),
    defineField({
      name: "ikona",
      title: "Ikona",
      type: "string",
      description: "Lucide React ikona naziv (npr: Plane, MapPin, Mountain)",
    }),
    defineField({
      name: "boja",
      title: "Boja Teme",
      type: "string",
      options: {
        list: [
          { title: "Plava", value: "blue" },
          { title: "Zelena", value: "green" },
          { title: "Narandžasta", value: "orange" },
          { title: "Ljubičasta", value: "purple" },
          { title: "Crvena", value: "red" },
          { title: "Teal", value: "teal" },
        ],
      },
    }),
    defineField({
      name: "roditeljskaKategorija",
      title: "Roditeljska Kategorija",
      type: "reference",
      to: [{ type: "kategorija" }],
      description:
        "Ostavite prazno za glavnu kategoriju, ili izaberite roditeljsku kategoriju",
      initialValue: undefined,
    } as any),
    defineField({
      name: "redosled",
      title: "Redosled Prikaza",
      type: "number",
      description: "Broj za sortiranje kategorija (manji broj = viši u listi)",
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: "naziv",
      subtitle: "opis",
      media: "slika",
      roditeljska: "roditeljskaKategorija.naziv",
    },
    prepare(selection: any) {
      const { title, subtitle, media, roditeljska } = selection;
      return {
        title,
        subtitle: roditeljska
          ? `${roditeljska} → ${title}`
          : subtitle
            ? subtitle[0]?.children?.[0]?.text
            : "",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Redosled",
      name: "redosled",
      by: [
        { field: "redosled", direction: "asc" },
        { field: "naziv", direction: "asc" },
      ],
    },
    {
      title: "Naziv A-Z",
      name: "nazivAsc",
      by: [{ field: "naziv", direction: "asc" }],
    },
  ],
});
