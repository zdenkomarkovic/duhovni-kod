import { defineField, defineType } from "sanity";

export const tabela = defineType({
  name: "tabela",
  title: "Tabela Podataka",
  type: "object",
  fields: [
    defineField({
      name: "naslovTabele",
      title: "Naslov Tabele",
      type: "string",
      description: "Opcioni naslov koji se prikazuje iznad tabele",
    }),
    defineField({
      name: "kolone",
      title: "Kolone (Zaglavlja)",
      type: "array",
      of: [
        defineField({
          name: "kolona",
          type: "object",
          fields: [
            defineField({
              name: "naziv",
              title: "Naziv Kolone",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "naziv" },
          },
        }),
      ],
    }),
    defineField({
      name: "redovi",
      title: "Redovi Podataka",
      description:
        "Dodajte redove podataka. Broj celija u svakom redu treba da odgovara broju kolona.",
      type: "array",
      of: [
        defineField({
          name: "red",
          type: "object",
          title: "Red",
          fields: [
            defineField({
              name: "celije",
              title: "Celije u Redu",
              description:
                "Dodajte celije za ovaj red. Redosled treba da odgovara redosledu kolona.",
              type: "array",
              of: [
                defineField({
                  name: "celija",
                  type: "object",
                  title: "Celija",
                  fields: [
                    defineField({
                      name: "sadrzaj",
                      title: "Sadržaj Celije",
                      type: "text",
                      options: { rows: 2 },
                      description: "Unesite sadržaj za ovu celiju",
                    }),
                  ],
                  preview: {
                    select: { title: "sadrzaj" },
                    prepare(selection: any) {
                      const { title } = selection;
                      return { title: title || "Prazna celija" };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { celije: "celije" },
            prepare(selection: any) {
              const { celije } = selection;
              const sadrzaj =
                celije?.map((celija: any) => celija.sadrzaj).join(" | ") ||
                "Prazan red";
              const brojCelija = celije?.length || 0;
              return {
                title:
                  sadrzaj.length > 50
                    ? sadrzaj.substring(0, 50) + "..."
                    : sadrzaj,
                subtitle: `${brojCelija} ${
                  brojCelija === 1
                    ? "celija"
                    : brojCelija >= 2 && brojCelija <= 4
                      ? "celije"
                      : "celija"
                }`,
              };
            },
          },
        }),
      ],
    }),
  ],
});
