import {defineArrayMember, defineField, defineType} from 'sanity'

import {isUniqueSlug} from './uniqueSlug'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The stable URL segment for the lesson.',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniqueSlug('lesson'),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description:
        'Use a YouTube, Vimeo, or Bunny video URL. The web player will derive the provider from this URL.',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'poster',
      title: 'Poster image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (Rule) => Rule.required().max(160),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration in seconds',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: 'isFreePreview',
      title: 'Free preview',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      title: 'Student count',
      type: 'number',
      description: 'Display-only count. Learner tracking is stored separately.',
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      description: 'Rich lesson notes for the learner-facing Notes tab.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [],
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key points',
      type: 'array',
      description: 'Short outcomes shown in the “In this lesson” section.',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (Rule) => Rule.required().max(180),
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(8),
    }),
    defineField({
      name: 'proTip',
      title: 'Pro tip',
      type: 'text',
      rows: 3,
      description: 'Optional short callout displayed alongside the lesson notes.',
      validation: (Rule) => Rule.max(320),
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [defineArrayMember({type: 'resource'})],
      validation: (Rule) => Rule.max(12),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'videoUrl',
      media: 'poster',
    },
  },
})
