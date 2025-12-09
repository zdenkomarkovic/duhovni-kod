import { defineField, defineType } from 'sanity'

export const klasifikacija = defineType({
  name: 'klasifikacija',
  title: 'Klasifikacije (Tagovi za pretragu)',
  type: 'document',
  fields: [
    defineField({
      name: 'naziv',
      title: 'Naziv',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Naziv klasifikacije za pretragu (npr: Hotel, Apartman, Avio prevoz, All Inclusive, Polupansion)'
    })
  ],
  preview: {
    select: {
      title: 'naziv'
    },
    prepare(selection: any) {
      const { title } = selection;
      return {
        title
      }
    }
  },
  orderings: [
    {
      title: 'Naziv A-Z',
      name: 'nazivAsc',
      by: [{ field: 'naziv', direction: 'asc' }]
    }
  ]
})