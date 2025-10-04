/**
 * Internal Linking System
 *
 * Per techSpec.md §3.5: Pillar → injuries → state → city → find list → firm profile
 * Components: By-State, Related Injuries, Nearby Clinics, Latest Updates
 */

import { createAdminClient } from '@/lib/supabase/server'

export interface InternalLink {
  url: string
  title: string
  description?: string
  type: 'pillar' | 'injury' | 'state' | 'city' | 'directory' | 'firm' | 'resource'
}

/**
 * Get related state links for a case pillar (T1 → T3)
 */
export async function getStateLinksForCase(
  caseSlug: string,
  brandId: number,
  limit = 10
): Promise<InternalLink[]> {
  const supabase = createAdminClient()

  // Get top states by population or firm count
  const topStates = [
    { code: 'ca', name: 'California', slug: 'california' },
    { code: 'tx', name: 'Texas', slug: 'texas' },
    { code: 'fl', name: 'Florida', slug: 'florida' },
    { code: 'ny', name: 'New York', slug: 'new-york' },
    { code: 'pa', name: 'Pennsylvania', slug: 'pennsylvania' },
    { code: 'il', name: 'Illinois', slug: 'illinois' },
    { code: 'oh', name: 'Ohio', slug: 'ohio' },
    { code: 'ga', name: 'Georgia', slug: 'georgia' },
    { code: 'nc', name: 'North Carolina', slug: 'north-carolina' },
    { code: 'mi', name: 'Michigan', slug: 'michigan' },
  ]

  // Get case type details
  const { data: caseType } = await supabase
    .from('case_types')
    .select('name, state_slug')
    .eq('pillar_slug', caseSlug)
    .eq('brand_id', brandId)
    .single()

  if (!caseType) return []

  return topStates.slice(0, limit).map(state => ({
    url: `/state/${state.slug}/${caseType.state_slug || caseSlug + '-lawsuit'}/`,
    title: `${caseType.name} in ${state.name}`,
    description: `File your ${caseType.name} claim in ${state.name}. Statute of limitations, local attorneys, free consultation.`,
    type: 'state' as const,
  }))
}

/**
 * Get related injuries for a case pillar (T1 → T2)
 */
export async function getRelatedInjuries(
  caseSlug: string,
  brandId: number,
  limit = 6
): Promise<InternalLink[]> {
  const supabase = createAdminClient()

  const { data: injuries } = await supabase
    .from('injuries')
    .select(`
      slug,
      name,
      case_types!inner(pillar_slug, brand_id)
    `)
    .eq('case_types.pillar_slug', caseSlug)
    .eq('case_types.brand_id', brandId)
    .limit(limit)

  if (!injuries) return []

  return injuries.map(injury => ({
    url: `/cases/${caseSlug}/${injury.slug}/`,
    title: injury.name,
    description: `Learn about ${injury.name} symptoms, diagnosis, and compensation.`,
    type: 'injury' as const,
  }))
}

/**
 * Get directory link for a case/location (T1/T3 → T6)
 */
export function getDirectoryLink(params: {
  caseSlug: string
  caseName: string
  state?: string
  city?: string
}): InternalLink {
  const { caseSlug, caseName, state, city } = params

  if (city && state) {
    return {
      url: `/find/${caseSlug}/${state}/${city}/`,
      title: `Find ${caseName} Lawyers in ${city}`,
      description: `Compare top-rated ${caseName} attorneys in ${city}. Free case review.`,
      type: 'directory',
    }
  }

  if (state) {
    return {
      url: `/find/${caseSlug}/${state}/`,
      title: `Find ${caseName} Lawyers in ${state}`,
      description: `Compare ${caseName} attorneys across ${state}. Free consultation.`,
      type: 'directory',
    }
  }

  return {
    url: `/find/${caseSlug}/`,
    title: `Find ${caseName} Lawyers`,
    description: `Connect with experienced ${caseName} attorneys nationwide.`,
    type: 'directory',
  }
}

/**
 * Get related cases (cross-linking T1 → T1)
 */
export async function getRelatedCases(
  currentCaseSlug: string,
  brandId: number,
  limit = 4
): Promise<InternalLink[]> {
  const supabase = createAdminClient()

  const { data: cases } = await supabase
    .from('case_types')
    .select('pillar_slug, name, category')
    .eq('brand_id', brandId)
    .eq('status', 'active')
    .neq('pillar_slug', currentCaseSlug)
    .limit(limit)

  if (!cases) return []

  return cases.map(caseType => ({
    url: `/cases/${caseType.pillar_slug}/`,
    title: caseType.name,
    description: `Explore ${caseType.name} eligibility, settlements, and filing process.`,
    type: 'pillar' as const,
  }))
}

/**
 * Get latest updates/resources (T1 → T8)
 */
export function getLatestUpdates(caseSlug: string, caseName: string): InternalLink[] {
  return [
    {
      url: `/resources/${caseSlug}-verdicts/`,
      title: `${caseName} Verdicts & Settlements`,
      description: `Searchable database of ${caseName} jury awards and settlement amounts.`,
      type: 'resource',
    },
    {
      url: `/resources/statute-of-limitations/`,
      title: 'Statute of Limitations by State',
      description: 'Filing deadlines for personal injury claims in all 50 states.',
      type: 'resource',
    },
  ]
}

/**
 * Get nearby clinics/facilities (for injury pages, state hubs)
 */
export async function getNearbyClinics(params: {
  state?: string
  city?: string
  injuryType?: string
  limit?: number
}): Promise<InternalLink[]> {
  const { state, city, injuryType, limit = 5 } = params

  // Placeholder: In production, query facilities table
  // For now, return structured data for future implementation
  if (!state) return []

  return [
    {
      url: `/resources/diagnostic-centers/${state}/`,
      title: `${injuryType || 'Diagnostic'} Centers in ${state}`,
      description: `Find testing facilities for ${injuryType || 'diagnosis'} near you.`,
      type: 'resource',
    },
  ]
}

/**
 * Build contextual breadcrumb trail
 */
export function buildBreadcrumbs(params: {
  pageType: 'pillar' | 'injury' | 'state' | 'city' | 'directory' | 'firm' | 'resource'
  caseSlug?: string
  caseName?: string
  injurySlug?: string
  injuryName?: string
  state?: string
  stateName?: string
  city?: string
  cityName?: string
  firmSlug?: string
  firmName?: string
  resourceSlug?: string
  resourceName?: string
}): Array<{ name: string; url: string }> {
  const crumbs: Array<{ name: string; url: string }> = [
    { name: 'Home', url: '/' },
  ]

  const { pageType, caseSlug, caseName, injurySlug, injuryName, state, stateName, city, cityName, firmSlug, firmName, resourceSlug, resourceName } = params

  switch (pageType) {
    case 'pillar':
      crumbs.push({ name: 'Cases', url: '/cases/' })
      if (caseName) crumbs.push({ name: caseName, url: `/cases/${caseSlug}/` })
      break

    case 'injury':
      crumbs.push({ name: 'Cases', url: '/cases/' })
      if (caseName) crumbs.push({ name: caseName, url: `/cases/${caseSlug}/` })
      if (injuryName) crumbs.push({ name: injuryName, url: `/cases/${caseSlug}/${injurySlug}/` })
      break

    case 'state':
      crumbs.push({ name: 'Cases', url: '/cases/' })
      if (caseName) crumbs.push({ name: caseName, url: `/cases/${caseSlug}/` })
      if (stateName) crumbs.push({ name: stateName, url: `/state/${state}/${caseSlug}-lawsuit/` })
      break

    case 'city':
      crumbs.push({ name: 'Cases', url: '/cases/' })
      if (stateName) crumbs.push({ name: stateName, url: `/state/${state}/` })
      if (cityName) crumbs.push({ name: cityName, url: `/state/${state}/${city}/` })
      break

    case 'directory':
      crumbs.push({ name: 'Find Lawyers', url: '/find/' })
      if (caseName) crumbs.push({ name: caseName, url: `/find/${caseSlug}/` })
      if (stateName) crumbs.push({ name: stateName, url: `/find/${caseSlug}/${state}/` })
      if (cityName) crumbs.push({ name: cityName, url: `/find/${caseSlug}/${state}/${city}/` })
      break

    case 'firm':
      crumbs.push({ name: 'Find Lawyers', url: '/find/' })
      if (firmName) crumbs.push({ name: firmName, url: `/firm/${firmSlug}/` })
      break

    case 'resource':
      crumbs.push({ name: 'Resources', url: '/resources/' })
      if (resourceName) crumbs.push({ name: resourceName, url: `/resources/${resourceSlug}/` })
      break
  }

  return crumbs
}

/**
 * Anchor text optimization for internal links
 * Returns SEO-friendly anchor text with keyword variations
 */
export function optimizeAnchorText(params: {
  targetUrl: string
  linkType: 'pillar' | 'injury' | 'state' | 'city' | 'directory' | 'firm' | 'resource'
  primaryKeyword: string
  variation?: 'exact' | 'partial' | 'branded' | 'generic'
}): string {
  const { linkType, primaryKeyword, variation = 'exact' } = params

  const variations = {
    exact: primaryKeyword,
    partial: `Learn about ${primaryKeyword}`,
    branded: `${primaryKeyword} at People's Justice`,
    generic: 'Click here for more information',
  }

  // Avoid over-optimization: use exact match sparingly
  // Prefer partial/branded for better natural linking
  if (linkType === 'pillar' || linkType === 'injury') {
    return variation === 'exact' ? variations.exact : variations.partial
  }

  if (linkType === 'directory') {
    return variation === 'exact' ? `Find ${primaryKeyword} Lawyers` : `Compare ${primaryKeyword} Attorneys`
  }

  return variations[variation] || variations.exact
}

/**
 * Calculate internal link distribution for a page
 * Ensures 3-10 internal links per spec §3.5
 */
export function validateInternalLinks(links: InternalLink[]): {
  count: number
  isCompliant: boolean
  recommendation: string
} {
  const count = links.length

  if (count < 3) {
    return {
      count,
      isCompliant: false,
      recommendation: `Add ${3 - count} more internal links (recommend 3-10 per page)`,
    }
  }

  if (count > 20) {
    return {
      count,
      isCompliant: false,
      recommendation: `Remove ${count - 10} internal links (recommend 3-10 per page, max 20)`,
    }
  }

  if (count > 10) {
    return {
      count,
      isCompliant: true,
      recommendation: 'Link count acceptable but on high side (recommend 3-10)',
    }
  }

  return {
    count,
    isCompliant: true,
    recommendation: 'Internal linking optimal (3-10 links)',
  }
}
