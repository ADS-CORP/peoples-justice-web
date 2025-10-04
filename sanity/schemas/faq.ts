import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  description: 'Frequently Asked Questions',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: 'Plain language answer (Grade 6-7, 40-80 words)',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Eligibility & Diagnosis', value: 'eligibility' },
          { title: 'Legal Process & Timeline', value: 'legal' },
          { title: 'Compensation & Settlements', value: 'compensation' },
          { title: 'Attorney & Case Management', value: 'attorney' },
          { title: 'General', value: 'general' },
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 999,
    }),
    defineField({
      name: 'caseTypes',
      title: 'Applicable Case Types',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseType' }] }],
      description: 'Leave empty to show on all case types',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
    prepare({ title, subtitle }) {
      return {
        title: title?.length > 60 ? title.substring(0, 60) + '...' : title,
        subtitle: subtitle || 'General',
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
