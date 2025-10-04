/**
 * Brand Configuration System
 *
 * Multi-brand support for legal directory platform
 * - Domain-based brand detection
 * - Theme customization
 * - Legal compliance text per brand
 */

export interface BrandTheme {
  primaryColor: string
  secondaryColor: string
  fontFamily: string
}

export interface BrandContact {
  phone: string | null
  email: string | null
  address: string | null
}

export interface BrandLegal {
  tcpaConsentText: string
  privacyPolicyUrl: string
  termsOfServiceUrl: string
  disclaimerText: string
}

export interface BrandSocialMedia {
  facebook?: string
  twitter?: string
  linkedin?: string
}

export interface BrandAnalytics {
  ga4MeasurementId?: string
  gtmContainerId?: string
}

export interface BrandConfig {
  id: number
  slug: string
  name: string
  domain: string
  logo: {
    url: string
    alt: string
    width?: number
    height?: number
  }
  theme: BrandTheme
  contact: BrandContact
  legal: BrandLegal
  socialMedia?: BrandSocialMedia
  analytics?: BrandAnalytics
  active: boolean
}

// Default brand configuration (People's Justice)
export const DEFAULT_BRAND: BrandConfig = {
  id: 1,
  slug: 'peoples-justice',
  name: "People's Justice",
  domain: 'peoplesjustice.com',
  logo: {
    url: '/logo.png',
    alt: "People's Justice Logo",
    width: 200,
    height: 50,
  },
  theme: {
    primaryColor: '#2563eb', // blue-600
    secondaryColor: '#4f46e5', // indigo-600
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  },
  contact: {
    phone: '1-800-555-0100',
    email: 'info@peoplesjustice.com',
    address: null,
  },
  legal: {
    tcpaConsentText: `By clicking Submit, you agree to be contacted by one or more attorneys or their agents at the phone number and/or email provided, including through automated calls, texts, and prerecorded messages. Consent is not required as a condition of service. Message and data rates may apply. You also agree to our Privacy Policy and Terms of Service.`,
    privacyPolicyUrl: '/privacy-policy',
    termsOfServiceUrl: '/terms-of-service',
    disclaimerText: 'This is an advertising and referral service. Not a law firm.',
  },
  socialMedia: {
    facebook: 'https://facebook.com/peoplesjustice',
    twitter: 'https://twitter.com/peoplesjustice',
    linkedin: 'https://linkedin.com/company/peoplesjustice',
  },
  analytics: {
    ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    gtmContainerId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
  },
  active: true,
}

// Brand registry (in production, this would come from database)
const BRAND_REGISTRY: Record<string, BrandConfig> = {
  'peoplesjustice.com': DEFAULT_BRAND,
  'localhost:3000': DEFAULT_BRAND, // Development
  'localhost': DEFAULT_BRAND,
}

/**
 * Get brand configuration by domain
 * In production, this would query the database
 */
export async function getBrandByDomain(domain: string): Promise<BrandConfig | null> {
  // Remove port if present
  const cleanDomain = domain.split(':')[0]

  // Check registry
  const brand = BRAND_REGISTRY[cleanDomain] || BRAND_REGISTRY[domain]

  if (brand) {
    return brand
  }

  // TODO: Query database for brand
  // const dbBrand = await db.getBrandByDomain(cleanDomain)
  // if (dbBrand) return mapDbBrandToBrandConfig(dbBrand)

  return null
}

/**
 * Get brand configuration from request headers
 */
export async function getBrandFromRequest(headers: Headers): Promise<BrandConfig> {
  const host = headers.get('host') || 'peoplesjustice.com'
  const brand = await getBrandByDomain(host)
  return brand || DEFAULT_BRAND
}

/**
 * Generate CSS variables from brand theme
 */
export function generateThemeCSSVariables(theme: BrandTheme): Record<string, string> {
  return {
    '--brand-primary': theme.primaryColor,
    '--brand-secondary': theme.secondaryColor,
    '--brand-font-family': theme.fontFamily,
  }
}

/**
 * Map database brand to BrandConfig
 * (For use when integrating with database)
 */
export function mapDbBrandToBrandConfig(dbBrand: any): BrandConfig {
  return {
    id: dbBrand.id,
    slug: dbBrand.slug,
    name: dbBrand.name,
    domain: dbBrand.domain,
    logo: dbBrand.logo || DEFAULT_BRAND.logo,
    theme: dbBrand.theme || DEFAULT_BRAND.theme,
    contact: dbBrand.contact || DEFAULT_BRAND.contact,
    legal: dbBrand.legal || DEFAULT_BRAND.legal,
    socialMedia: dbBrand.socialMedia,
    analytics: dbBrand.analytics,
    active: dbBrand.active,
  }
}

export default {
  getBrandByDomain,
  getBrandFromRequest,
  generateThemeCSSVariables,
  DEFAULT_BRAND,
}
