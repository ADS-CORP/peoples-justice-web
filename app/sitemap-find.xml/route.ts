/**
 * Directory Sitemap
 *
 * Includes:
 * - T6: Directory lists (/find/{case}/{state}/, /find/{case}/{state}/{city}/)
 *
 * Dynamic generation from active case types and geos
 */

import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

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
  const supabase = createAdminClient()
  const urls: SitemapUrl[] = []

  try {
    // Get active case types
    const { data: casePillars } = await supabase
      .from('case_types')
      .select('pillar_slug')
      .eq('status', 'active')

    // Get top states (in production, query from geos table with firm counts)
    const topStates = [
      { code: 'ca', name: 'california' },
      { code: 'tx', name: 'texas' },
      { code: 'fl', name: 'florida' },
      { code: 'ny', name: 'new-york' },
      { code: 'pa', name: 'pennsylvania' },
      { code: 'il', name: 'illinois' },
      { code: 'oh', name: 'ohio' },
      { code: 'ga', name: 'georgia' },
      { code: 'nc', name: 'north-carolina' },
      { code: 'mi', name: 'michigan' },
    ]

    // Get top cities per state (in production, query from geos table)
    const topCities = [
      { state: 'california', city: 'los-angeles' },
      { state: 'california', city: 'san-diego' },
      { state: 'california', city: 'san-francisco' },
      { state: 'texas', city: 'houston' },
      { state: 'texas', city: 'dallas' },
      { state: 'texas', city: 'austin' },
      { state: 'florida', city: 'miami' },
      { state: 'florida', city: 'tampa' },
      { state: 'florida', city: 'orlando' },
      { state: 'new-york', city: 'new-york' },
    ]

    if (casePillars) {
      // T6: State-level directory lists
      casePillars.forEach(caseType => {
        topStates.forEach(state => {
          urls.push({
            loc: `${baseUrl}/find/${caseType.pillar_slug}/${state.name}/`,
            changefreq: 'daily',
            priority: 0.8,
          })
        })
      })

      // T6: City-level directory lists
      casePillars.forEach(caseType => {
        topCities.forEach(({ state, city }) => {
          urls.push({
            loc: `${baseUrl}/find/${caseType.pillar_slug}/${state}/${city}/`,
            changefreq: 'weekly',
            priority: 0.7,
          })
        })
      })
    }

    const sitemapXML = generateSitemapXML(urls)

    return new NextResponse(sitemapXML, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Directory sitemap generation error:', error)
    return new NextResponse('Error generating directory sitemap', { status: 500 })
  }
}
