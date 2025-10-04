import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'formConfig',
  title: 'Form Configuration',
  type: 'document',
  description: 'Per-route form provider configuration (Forms SDK)',
  fields: [
    defineField({
      name: 'routePattern',
      title: 'Route Pattern',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "/cases/roundup/", "/state/:state/:case/"',
    }),
    defineField({
      name: 'provider',
      title: 'Form Provider',
      type: 'string',
      options: {
        list: [
          { title: 'Native (Default)', value: 'native' },
          { title: 'Typeform', value: 'typeform' },
          { title: 'Jotform', value: 'jotform' },
          { title: 'HubSpot', value: 'hubspot' },
          { title: 'FormAssembly', value: 'formassembly' },
          { title: 'Custom iFrame', value: 'custom_iframe' },
        ],
      },
      initialValue: 'native',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Form Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Short (2-step)', value: 'short' },
          { title: 'Long (multi-step)', value: 'long' },
        ],
      },
      initialValue: 'short',
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
      name: 'qualifierSet',
      title: 'Qualifier Set',
      type: 'reference',
      to: [{ type: 'qualifierSet' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'routingProfile',
      title: 'Routing Profile',
      type: 'string',
      description: 'Lead routing logic identifier (e.g., "massaction_default", "mva_highvolume")',
    }),
    defineField({
      name: 'embedProps',
      title: 'Embed Properties (JSON)',
      type: 'text',
      rows: 4,
      description: 'Provider-specific configuration as JSON, e.g., {"theme":"auto","typeformId":"xyz"}',
    }),
    defineField({
      name: 'fallbackProvider',
      title: 'Fallback Provider',
      type: 'string',
      options: {
        list: [
          { title: 'Native', value: 'native' },
          { title: 'HubSpot', value: 'hubspot' },
        ],
      },
      initialValue: 'native',
      description: 'Provider to use if primary fails',
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'routePattern',
      provider: 'provider',
      locale: 'locale',
    },
    prepare({ title, provider, locale }) {
      return {
        title: title || 'Untitled route',
        subtitle: `${provider} (${locale})`,
      }
    },
  },
})
