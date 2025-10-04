/**
 * Content Sitemap
 *
 * Includes:
 * - T1: Case pillars (/cases/{slug}/)
 * - T2: Injuries (/cases/{case}/{injury}/)
 * - T3: State hubs (/state/{state}/{slug}/)
 * - T4: City pages (/state/{state}/{city}/{slug}/)
 * - T8: Resources (/resources/{slug}/)
 *
 * Dynamic generation from Supabase
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
    // T1: Case Pillars (high priority, daily updates)
    const { data: casePillars } = await supabase
      .from('case_types')
      .select('pillar_slug, updated_at')
      .eq('status', 'active')

    if (casePillars) {
      casePillars.forEach(caseType => {
        urls.push({
          loc: `${baseUrl}/cases/${caseType.pillar_slug}/`,
          lastmod: caseType.updated_at || new Date().toISOString(),
          changefreq: 'daily',
          priority: 1.0,
        })
      })
    }

    // T2: Injuries (medium-high priority, weekly updates)
    const { data: injuries } = await supabase
      .from('injuries')
      .select(`
        slug,
        case_types!inner(pillar_slug),
        updated_at
      `)

    if (injuries) {
      injuries.forEach(injury => {
        const caseSlug = (injury.case_types as any)?.pillar_slug
        if (caseSlug) {
          urls.push({
            loc: `${baseUrl}/cases/${caseSlug}/${injury.slug}/`,
            lastmod: injury.updated_at || new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.8,
          })
        }
      })
    }

    // T3: State Hubs (medium priority, ISR cached)
    // Note: In production, this would query state_hubs table
    // For now, generate for top states × case types
    const topStates = ['california', 'texas', 'florida', 'new-york', 'pennsylvania']

    if (casePillars) {
      topStates.forEach(state => {
        casePillars.forEach(caseType => {
          urls.push({
            loc: `${baseUrl}/state/${state}/${caseType.pillar_slug}-lawsuit/`,
            changefreq: 'weekly',
            priority: 0.7,
          })
        })
      })
    }

    // T4: City PI pages (lower priority, ISR cached)
    const topCities = [
      { state: 'california', city: 'los-angeles' },
      { state: 'california', city: 'san-francisco' },
      { state: 'texas', city: 'houston' },
      { state: 'texas', city: 'dallas' },
      { state: 'florida', city: 'miami' },
      { state: 'new-york', city: 'new-york' },
    ]

    topCities.forEach(({ state, city }) => {
      urls.push({
        loc: `${baseUrl}/state/${state}/${city}/car-accident-lawyer/`,
        changefreq: 'monthly',
        priority: 0.6,
      })
    })

    // T8: Resources (high value, infrequent updates)
    urls.push(
      {
        loc: `${baseUrl}/resources/roundup-verdicts/`,
        changefreq: 'monthly',
        priority: 0.8,
      },
      {
        loc: `${baseUrl}/resources/statute-of-limitations/`,
        changefreq: 'monthly',
        priority: 0.8,
      }
    )

    // Generate XML
    const sitemapXML = generateSitemapXML(urls)

    return new NextResponse(sitemapXML, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // 1 hour cache
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
