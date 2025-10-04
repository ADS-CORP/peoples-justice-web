import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'qualifierSet',
  title: 'Qualifier Set',
  type: 'document',
  description: 'Mini-qualifier questions (2-3 Qs) for lead forms',
  fields: [
    defineField({
      name: 'key',
      title: 'Unique Key',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^[a-z0-9_-]+$/),
      description: 'e.g., "roundup_v1", "mva_basic"',
    }),
    defineField({
      name: 'caseType',
      title: 'Case Type',
      type: 'reference',
      to: [{ type: 'caseType' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locale',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Spanish', value: 'es' },
        ],
      },
      initialValue: 'en',
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      validation: (Rule) => Rule.required().min(2).max(3),
      description: '2-3 qualifying questions (Grade 4-6 language)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Question ID',
              type: 'string',
              validation: (Rule) => Rule.required().regex(/^[a-z0-9_]+$/),
              description: 'e.g., "used_regularly", "diagnosed_lymphoma"',
            },
            {
              name: 'label',
              title: 'Question Text',
              type: 'string',
              validation: (Rule) => Rule.required().max(150),
              description: 'Plain language (Grade 4-6)',
            },
            {
              name: 'type',
              title: 'Input Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Yes/No', value: 'boolean' },
                  { title: 'Single Choice', value: 'single' },
                  { title: 'Multiple Choice', value: 'multi' },
                  { title: 'Number', value: 'number' },
                  { title: 'Text', value: 'text' },
                  { title: 'Date/Year', value: 'date' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'options',
              title: 'Options',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'id', title: 'Option ID', type: 'string' },
                    { name: 'label', title: 'Option Label', type: 'string' },
                  ],
                },
              ],
              description: 'For single/multi choice only',
            },
            {
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'help',
              title: 'Help Text',
              type: 'string',
              description: 'Optional clarification (shown below question)',
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'type',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'contactStep',
      title: 'Contact Step Configuration',
      type: 'object',
      fields: [
        {
          name: 'fields',
          title: 'Contact Fields',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Name', value: 'name' },
              { title: 'Phone', value: 'phone' },
              { title: 'Email', value: 'email' },
              { title: 'ZIP Code', value: 'zip' },
            ],
          },
          initialValue: ['name', 'phone', 'email', 'zip'],
        },
        {
          name: 'consentText',
          title: 'TCPA Consent Text Override',
          type: 'text',
          rows: 4,
          description: 'Leave empty to use brand default',
        },
      ],
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'number',
      initialValue: 1,
      description: 'Increment when making significant changes',
    }),
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'caseType.name',
      locale: 'locale',
    },
    prepare({ title, subtitle, locale }) {
      return {
        title: `${title} (${locale})`,
        subtitle: subtitle || 'No case type',
      }
    },
  },
})
