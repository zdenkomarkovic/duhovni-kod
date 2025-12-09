import { defineField, defineType } from 'sanity'

export const blog = defineType({
  name: 'blog',
  title: 'Blog Postovi',
  type: 'document',
  fields: [
    defineField({
      name: 'naslov',
      title: 'Naslov',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'naslov',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'autor',
      title: 'Autor',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'datumObjavljivanja',
      title: 'Datum Objavljivanja',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'glavnaSlika',
      title: 'Glavna Slika',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required()
    }),
    defineField({
      name: 'kratakOpis',
      title: 'Kratak Opis',
      type: 'text',
      options: {
        rows: 3
      },
      validation: (Rule: any) => Rule.required().max(200)
    }),
    defineField({
      name: 'sadrzaj',
      title: 'Sadržaj',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ],
      validation: (Rule: any) => Rule.required()
    } as any),
    defineField({
      name: 'tagovi',
      title: 'Tagovi',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    } as any),
    defineField({
      name: 'objavljeno',
      title: 'Objavljeno',
      type: 'boolean',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'naslov',
      media: 'glavnaSlika',
      subtitle: 'autor'
    }
  }
})