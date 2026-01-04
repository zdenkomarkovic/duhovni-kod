import { defineField, defineType } from 'sanity'

export const heroSlider = defineType({
  name: 'heroSlider',
  title: 'Hero Slider',
  type: 'document',
  fields: [
    defineField({
      name: 'naziv',
      title: 'Naziv Slidera',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Interni naziv za identifikaciju slidera (npr. "Glavni Hero Slider")'
    }),
    defineField({
      name: 'aktivan',
      title: 'Aktivan',
      type: 'boolean',
      description: 'Da li je ovaj slider trenutno aktivan',
      initialValue: true
    }),
    defineField({
      name: 'slike',
      title: 'Slike',
      type: 'array',
      validation: Rule => Rule.required().min(1),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'slika',
              title: 'Slika',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'objectPosition',
              type: 'string',
              title: 'Pozicija Objekta',
              description: 'CSS object-position vrednost (npr. "center 70%", "center 100%"). Ostavite prazno za default.',
              placeholder: 'center center'
            }
          ],
          preview: {
            select: {
              media: 'slika'
            },
            prepare({ media }) {
              return {
                title: 'Hero Slika',
                media
              }
            }
          }
        }
      ]
    }),
    defineField({
      name: 'intervalRotacije',
      title: 'Interval Rotacije (sekunde)',
      type: 'number',
      description: 'Koliko sekundi traje jedna slika pre nego što se promeni',
      initialValue: 5,
      validation: Rule => Rule.required().min(1).max(60)
    })
  ],
  preview: {
    select: {
      title: 'naziv',
      aktivan: 'aktivan',
      media: 'slike.0.slika'
    },
    prepare({ title, aktivan, media }) {
      return {
        title,
        subtitle: aktivan ? 'Aktivan' : 'Neaktivan',
        media
      }
    }
  }
})
