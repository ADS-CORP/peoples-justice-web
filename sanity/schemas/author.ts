import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  description: 'Content authors and legal reviewers (E-E-A-T)',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'credentials',
      title: 'Credentials',
      type: 'string',
      description: 'e.g., "JD", "MD", "Legal Researcher, Mass Tort Specialist"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'object',
      fields: [
        { name: 'url', title: 'Photo URL', type: 'url' },
        { name: 'alt', title: 'Alt Text', type: 'string' },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'Plain language bio (Grade 6-7, 80-150 words)',
    }),
    defineField({
      name: 'expertise',
      title: 'Areas of Expertise',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., "Mass Torts", "Medical Malpractice", "Environmental Law"',
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'degree', title: 'Degree', type: 'string' },
            { name: 'institution', title: 'Institution', type: 'string' },
            { name: 'year', title: 'Year', type: 'number' },
          ],
        },
      ],
    }),
    defineField({
      name: 'schemaPerson',
      title: 'Schema.org Person Properties',
      type: 'object',
      description: 'For structured data markup',
      fields: [
        { name: 'jobTitle', title: 'Job Title', type: 'string' },
        { name: 'worksFor', title: 'Organization', type: 'string' },
        { name: 'url', title: 'Personal Website', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'credentials',
      media: 'photo.url',
    },
  },
})
