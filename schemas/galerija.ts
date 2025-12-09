import { defineField, defineType } from 'sanity'

export const galerija = defineType({
  name: 'galerija',
  title: 'Galerija',
  type: 'document',
  fields: [
    defineField({
      name: 'naziv',
      title: 'Naziv Galerije',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'opis',
      title: 'Opis',
      type: 'text',
      options: {
        rows: 2
      }
    }),
    defineField({
      name: 'slike',
      title: 'Slike',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt tekst'
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Opis slike'
            }
          ]
        }
      ]
    } as any),
    defineField({
      name: 'kategorija',
      title: 'Kategorija Galerije',
      type: 'string',
      options: {
        list: [
          { title: 'Destinacije', value: 'destinacije' },
          { title: 'Aktivnosti', value: 'aktivnosti' },
          { title: 'Smeštaj', value: 'smestaj' },
          { title: 'Hrana', value: 'hrana' },
          { title: 'Kultura', value: 'kultura' }
        ]
      }
    })
  ],
  preview: {
    select: {
      title: 'naziv',
      media: 'slike.0'
    }
  }
})