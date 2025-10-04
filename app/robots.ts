/**
 * Robots.txt Generation
 *
 * Per techSpec.md Appendix A:
 * - Allow: /find/ (directory)
 * - Disallow: /search (faceted explorer)
 * - Disallow: volatile params (?sort=, ?view=, ?debug=)
 * - Sitemap: master sitemap.xml
 */

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peoplesjustice.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/cases/',
          '/state/',
          '/find/', // Directory (T6) - allow indexing
          '/firm/', // Firm profiles (T7) - allow indexing
          '/resources/', // Resources (T8) - allow indexing
          '/events/', // Event hubs (T5) - allow indexing
        ],
        disallow: [
          '/search', // Faceted explorer (noindex per spec)
          '/*?sort=*', // Volatile sorting params
          '/*?view=*', // View toggles (list/grid/map)
          '/*?debug=*', // Debug mode
          '/*?filter=*', // Dynamic filter params
          '/api/', // API routes
          '/_next/', // Next.js internals
          '/admin/', // Admin area (if exists)
        ],
      },
      // Aggressive crawlers - rate limit
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai'],
        allow: ['/'], // Allow for AI training but with crawl-delay
        crawlDelay: 10, // 10 seconds between requests
      },
      // Block bad bots
      {
        userAgent: [
          'SemrushBot',
          'AhrefsBot',
          'DotBot',
          'MJ12bot',
          'BLEXBot',
          'proximic',
          'SeznamBot',
          'DataForSeoBot',
        ],
        disallow: ['/'], // Block entirely
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-content.xml`,
      `${baseUrl}/sitemap-find.xml`,
      `${baseUrl}/sitemap-firms.xml`,
      `${baseUrl}/sitemap-events.xml`,
    ],
  }
}
