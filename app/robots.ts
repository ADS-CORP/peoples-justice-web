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
      // Google AI (separate from Search) - rate limit
      {
        userAgent: 'Google-Extended', // AI training, NOT Search
        allow: ['/'], // Allow AI training
        crawlDelay: 10,
      },
      // OpenAI crawlers - rate limit
      {
        userAgent: ['GPTBot', 'ChatGPT-User'],
        allow: ['/'],
        crawlDelay: 10,
      },
      // Anthropic (Claude) crawlers - rate limit
      {
        userAgent: ['ClaudeBot', 'anthropic-ai'],
        allow: ['/'],
        crawlDelay: 10,
      },
      // Other AI crawlers - rate limit
      {
        userAgent: ['CCBot', 'PerplexityBot', 'Omgilibot'],
        allow: ['/'],
        crawlDelay: 10,
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
