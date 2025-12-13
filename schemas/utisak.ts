import { defineField, defineType } from 'sanity'

export const utisak = defineType({
  name: 'utisak',
  title: 'Utisci Putnika',
  type: 'document',
  fields: [
    defineField({
      name: 'ime',
      title: 'Ime i Prezime',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'tekst',
      title: 'Utisak',
      type: 'text',
      options: {
        rows: 4
      },
      validation: (Rule: any) => Rule.required().max(500)
    }),
    defineField({
      name: 'ocena',
      title: 'Ocena (1-5)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5).integer()
    }),
    defineField({
      name: 'prikazano',
      title: 'Prikazano na sajtu',
      type: 'boolean',
      initialValue: true,
      description: 'Da li se ovaj utisak prikazuje na sajtu'
    }),
    defineField({
      name: 'istaknuto',
      title: 'Istaknuto',
      type: 'boolean',
      initialValue: false,
      description: 'Istaknuti utisci se prikazuju prvi'
    })
  ],
  preview: {
    select: {
      title: 'ime',
      subtitle: 'tekst'
    }
  },
  orderings: [
    {
      title: 'Istaknuto prvo',
      name: 'istaknutoPrvo',
      by: [
        {field: 'istaknuto', direction: 'desc'}
      ]
    }
  ]
})
