/**
 * Master Sitemap Index
 *
 * Per techSpec.md §3.4: Partitioned sitemaps for:
 * - Content pages (pillars, injuries, state, city, resources)
 * - Directory lists (find pages)
 * - Firm profiles
 * - Event hubs
 *
 * Each sub-sitemap limited to 50,000 URLs
 */

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peoplesjustice.com'

  // Return sitemap index pointing to partitioned sitemaps
  return [
    {
      url: `${baseUrl}/sitemap-content.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sitemap-find.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sitemap-firms.xml`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/sitemap-events.xml`,
      lastModified: new Date(),
    },
  ]
}
