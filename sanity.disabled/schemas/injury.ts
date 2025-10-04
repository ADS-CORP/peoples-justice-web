import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'injury',
  title: 'Injury/Condition',
  type: 'document',
  description: 'Specific injuries or conditions linked to case types',
  fields: [
    defineField({
      name: 'name',
      title: 'Injury Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Non-Hodgkin Lymphoma", "Traumatic Brain Injury"',
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
      name: 'caseType',
      title: 'Case Type',
      type: 'reference',
      to: [{ type: 'caseType' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'synonyms',
      title: 'Synonyms',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Alternative names (for search/SEO)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Plain language description (Grade 6-7)',
    }),
    defineField({
      name: 'symptoms',
      title: 'Common Symptoms',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'diagnosisCriteria',
      title: 'Diagnosis Criteria',
      type: 'text',
      rows: 3,
      description: 'How this condition is diagnosed',
    }),
    defineField({
      name: 'recordsNeeded',
      title: 'Medical Records Needed',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., "Pathology report", "CT scan", "Audiogram"',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'caseType.name',
    },
  },
})
