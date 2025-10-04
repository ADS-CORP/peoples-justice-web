/**
 * Events Sitemap
 *
 * Includes:
 * - T5: Event hubs (/events/{slug}/{state}/{county}/)
 *
 * Dynamic generation from events table
 */

import { NextResponse } from 'next/server'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

function generateSitemapXML(urls: SitemapUrl[]): string {
  const urlEntries = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urlEntries}
</urlset>`
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peoplesjustice.com'
  const urls: SitemapUrl[] = []

  // Placeholder: In production, query events table
  // For now, add example events
  const exampleEvents = [
    { slug: 'maui-wildfire-2023', state: 'hawaii', county: 'maui' },
    { slug: 'east-palestine-train-derailment', state: 'ohio', county: 'columbiana' },
  ]

  exampleEvents.forEach(event => {
    urls.push({
      loc: `${baseUrl}/events/${event.slug}/${event.state}/${event.county}/`,
      changefreq: 'weekly',
      priority: 0.7,
    })
  })

  const sitemapXML = generateSitemapXML(urls)

  return new NextResponse(sitemapXML, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
