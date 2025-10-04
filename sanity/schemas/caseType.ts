import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseType',
  title: 'Case Type',
  type: 'document',
  description: 'Mass Action, MVA, Institutional Abuse, etc.',
  fields: [
    defineField({
      name: 'name',
      title: 'Case Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      description: 'e.g., "Roundup Lawsuits", "Car Accident Claims"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'brand' }],
      validation: (Rule) => Rule.required(),
      description: 'Which brand this case belongs to',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Mass Action', value: 'massAction' },
          { title: 'Single-Event PI (MVA)', value: 'singleEventPI' },
          { title: 'Institutional Abuse', value: 'institutionalAbuse' },
          { title: 'Consumer/Privacy', value: 'consumer' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'urlTokens',
      title: 'URL Tokens',
      type: 'object',
      description: 'URL patterns for different page types',
      fields: [
        {
          name: 'pillarSlug',
          title: 'Pillar Slug',
          type: 'string',
          description: 'e.g., "roundup" for /cases/roundup/',
        },
        {
          name: 'stateSlug',
          title: 'State Slug Pattern',
          type: 'string',
          description: 'e.g., "roundup-lawsuit" for /state/california/roundup-lawsuit/',
        },
        {
          name: 'citySlug',
          title: 'City Slug Pattern',
          type: 'string',
          description: 'e.g., "roundup-lawyer" for /city/los-angeles/roundup-lawyer/',
        },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active - Accepting Cases', value: 'active' },
          { title: 'Paused - Monitoring Only', value: 'paused' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      description: 'Shows in "Updated October 2025" badge',
    }),
    defineField({
      name: 'shortSummary_6g',
      title: 'Short Summary (Grade 4-6)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(250),
      description: 'Plain language summary for hero section. Target: 4th-6th grade reading level.',
    }),
    defineField({
      name: 'keyFacts',
      title: 'Key Facts',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(3).max(5),
      description: '3-5 bullet points for hero section',
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                ],
              },
            ],
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
      description: 'Main content (Grade 6-7 reading level)',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'injuries',
      title: 'Related Injuries',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'injury' }] }],
      description: 'Injuries/conditions linked to this case',
    }),
    defineField({
      name: 'topStates',
      title: 'Top States',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'California', value: 'CA' },
          { title: 'Texas', value: 'TX' },
          { title: 'Florida', value: 'FL' },
          { title: 'New York', value: 'NY' },
          { title: 'Pennsylvania', value: 'PA' },
          { title: 'Illinois', value: 'IL' },
          { title: 'Ohio', value: 'OH' },
          { title: 'Georgia', value: 'GA' },
          { title: 'North Carolina', value: 'NC' },
          { title: 'Michigan', value: 'MI' },
        ],
      },
      description: 'States to feature in state links grid',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faq' }] }],
      description: 'Frequently asked questions for this case type',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
          description: 'Leave empty to auto-generate from case name',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.max(155),
        },
        {
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Override default canonical (use for duplicate content)',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'brand.logo.url',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle || 'Uncategorized',
      }
    },
  },
})
