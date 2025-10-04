/**
 * Firms Sitemap
 *
 * Includes:
 * - T7: Firm profiles (/firm/{slug}/)
 *
 * Dynamic generation from active firms in database
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
    // Get all active firms
    const { data: firms } = await supabase
      .from('firms')
      .select('slug, updated_at')
      .eq('active', true)
      .order('slug')

    if (firms && firms.length > 0) {
      firms.forEach(firm => {
        urls.push({
          loc: `${baseUrl}/firm/${firm.slug}/`,
          lastmod: firm.updated_at || new Date().toISOString(),
          changefreq: 'monthly',
          priority: 0.6,
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
    console.error('Firms sitemap generation error:', error)
    return new NextResponse('Error generating firms sitemap', { status: 500 })
  }
}
