import {defineArrayMember, defineField, defineType} from 'sanity'

export const courseModule = defineType({
  name: 'module',
  title: 'Module',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      description:
        'Add and reorder lesson documents. Module and lesson numbers are derived from this order.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'lesson'}],
          options: {disableNew: true},
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(50).unique(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
    },
  },
})
