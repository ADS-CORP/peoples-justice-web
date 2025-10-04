import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  description: 'Multi-brand configuration for different legal directory sites',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      description: 'e.g., "People\'s Justice", "Justice League"',
    }),
    defineField({
      name: 'domain',
      title: 'Primary Domain',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^[a-z0-9.-]+\.[a-z]{2,}$/, {
        name: 'domain',
        invert: false,
      }),
      description: 'e.g., "peoplesjustice.com"',
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
      name: 'logo',
      title: 'Logo',
      type: 'object',
      fields: [
        { name: 'url', title: 'Logo URL', type: 'url' },
        { name: 'alt', title: 'Alt Text', type: 'string' },
        { name: 'width', title: 'Width (px)', type: 'number' },
        { name: 'height', title: 'Height (px)', type: 'number' },
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Brand Theme',
      type: 'object',
      fields: [
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Hex color for primary brand color (e.g., #2563eb)',
        },
        {
          name: 'secondaryColor',
          title: 'Secondary Color',
          type: 'string',
          description: 'Hex color for secondary/accent color',
        },
        {
          name: 'fontFamily',
          title: 'Font Family',
          type: 'string',
          description: 'CSS font-family value (use system fonts for performance)',
          initialValue: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'phone', title: 'Primary Phone', type: 'string' },
        { name: 'email', title: 'Primary Email', type: 'string' },
        { name: 'address', title: 'Business Address', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'legal',
      title: 'Legal & Compliance',
      type: 'object',
      fields: [
        {
          name: 'tcpaConsentText',
          title: 'TCPA Consent Text',
          type: 'text',
          rows: 4,
          description: 'Full consent text for lead forms (must be exact for compliance)',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'privacyPolicyUrl',
          title: 'Privacy Policy URL',
          type: 'string',
          description: 'Relative URL, e.g., "/privacy-policy"',
        },
        {
          name: 'termsOfServiceUrl',
          title: 'Terms of Service URL',
          type: 'string',
          description: 'Relative URL, e.g., "/terms-of-service"',
        },
        {
          name: 'disclaimerText',
          title: 'Footer Disclaimer',
          type: 'text',
          rows: 2,
          description: 'e.g., "This is an advertising and referral service. Not a law firm."',
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'twitter', title: 'Twitter/X URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        { name: 'ga4MeasurementId', title: 'GA4 Measurement ID', type: 'string' },
        { name: 'gtmContainerId', title: 'GTM Container ID', type: 'string' },
      ],
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Inactive brands will not be accessible',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'domain',
    },
  },
})
