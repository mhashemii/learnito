import {defineField, defineType} from 'sanity'

export const learningOutcome = defineType({
  name: 'learningOutcome',
  title: 'Learning outcome',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon key',
      type: 'string',
      description:
        'A stable semantic key for the Learnito icon shown beside this outcome.',
      options: {
        list: [
          {title: 'Book', value: 'book'},
          {title: 'Code', value: 'code'},
          {title: 'Lightbulb', value: 'lightbulb'},
          {title: 'Rocket', value: 'rocket'},
          {title: 'Target', value: 'target'},
          {title: 'Check', value: 'check'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(240),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
