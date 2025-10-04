/**
 * SEO Meta Tag Generation System
 *
 * Comprehensive meta tag generation for:
 * - Title optimization (60 chars, keywords front-loaded)
 * - Description optimization (155-160 chars)
 * - Open Graph (Facebook, LinkedIn)
 * - Twitter Cards
 * - Canonical URLs
 * - Alternate language versions (hreflang)
 * - Schema.org integration
 */

import type { Metadata } from 'next'

export interface SEOMetaConfig {
  // Core meta
  title: string
  description: string
  keywords?: string[]

  // URLs
  url: string
  canonicalUrl?: string
  alternateUrls?: { locale: string; url: string }[]

  // Open Graph
  ogType?: 'website' | 'article' | 'profile'
  ogImage?: {
    url: string
    width?: number
    height?: number
    alt?: string
  }
  ogLocale?: string

  // Twitter
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterSite?: string
  twitterCreator?: string

  // Article-specific (for blog/content pages)
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string[]
    section?: string
    tags?: string[]
  }

  // Robots directives
  robots?: {
    index?: boolean
    follow?: boolean
    maxSnippet?: number
    maxImagePreview?: 'none' | 'standard' | 'large'
    maxVideoPreview?: number
  }

  // Brand/site info
  siteName?: string
  brandName?: string
}

/**
 * Generate comprehensive meta tags for Next.js App Router
 */
export function generateMetaTags(config: SEOMetaConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    url,
    canonicalUrl,
    alternateUrls = [],
    ogType = 'website',
    ogImage,
    ogLocale = 'en_US',
    twitterCard = 'summary_large_image',
    twitterSite = '@PeoplesJustice',
    twitterCreator,
    article,
    robots = { index: true, follow: true },
    siteName = "People's Justice",
    brandName,
  } = config

  // Optimize title (60 chars max, keywords front-loaded)
  const optimizedTitle = title.length <= 60 ? title : title.slice(0, 57) + '...'
  const fullTitle = brandName ? `${optimizedTitle} | ${brandName}` : optimizedTitle

  // Optimize description (155-160 chars)
  const optimizedDescription = description.length <= 160
    ? description
    : description.slice(0, 157) + '...'

  // Build robots directive
  const robotsDirectives: string[] = []
  if (robots.index === false) robotsDirectives.push('noindex')
  if (robots.follow === false) robotsDirectives.push('nofollow')
  if (robots.maxSnippet) robotsDirectives.push(`max-snippet:${robots.maxSnippet}`)
  if (robots.maxImagePreview) robotsDirectives.push(`max-image-preview:${robots.maxImagePreview}`)
  if (robots.maxVideoPreview) robotsDirectives.push(`max-video-preview:${robots.maxVideoPreview}`)

  const metadata: Metadata = {
    // Basic meta
    title: fullTitle,
    description: optimizedDescription,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,

    // Canonical
    alternates: {
      canonical: canonicalUrl || url,
      languages: alternateUrls.reduce((acc, alt) => {
        acc[alt.locale] = alt.url
        return acc
      }, {} as Record<string, string>),
    },

    // Open Graph
    openGraph: {
      title: optimizedTitle,
      description: optimizedDescription,
      url: canonicalUrl || url,
      siteName: siteName,
      locale: ogLocale,
      type: ogType,
      images: ogImage ? [
        {
          url: ogImage.url,
          width: ogImage.width || 1200,
          height: ogImage.height || 630,
          alt: ogImage.alt || optimizedTitle,
        }
      ] : undefined,
      ...(article && ogType === 'article' && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        authors: article.author,
        section: article.section,
        tags: article.tags,
      }),
    },

    // Twitter
    twitter: {
      card: twitterCard,
      site: twitterSite,
      creator: twitterCreator,
      title: optimizedTitle,
      description: optimizedDescription,
      images: ogImage ? [ogImage.url] : undefined,
    },

    // Robots
    robots: robotsDirectives.length > 0 ? robotsDirectives.join(', ') : undefined,

    // Additional meta tags
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
    },
  }

  return metadata
}

/**
 * Title template builders per page type (from techSpec.md §14)
 */
export const titleTemplates = {
  // T1 - Case Pillar
  casePillar: (caseType: string, updatedMonth: string) =>
    `${caseType} Lawsuit (Updated ${updatedMonth}) — Who Qualifies & Typical Payouts`,

  // T2 - Injury in Case
  injuryInCase: (injury: string, caseType: string, updatedMonth: string) =>
    `${injury} from ${caseType} — Symptoms, Proof & Compensation (${updatedMonth})`,

  // T3 - State Hub
  stateHub: (caseType: string, state: string, updatedMonth: string) =>
    `${caseType} Lawsuit in ${state} — Statute of Limitations & Filing Deadline (${updatedMonth})`,

  // T4 - City PI (MVA example)
  cityPI: (practiceArea: string, city: string, state: string) =>
    `${practiceArea} Lawyer ${city}, ${state} — Free Consultation, No Upfront Fees`,

  // T5 - Event Hub
  eventHub: (event: string, state: string, updatedMonth: string) =>
    `${event} ${state} Claims — Deadlines, FEMA Help & How to File (${updatedMonth})`,

  // T6 - Directory List
  directoryList: (caseType: string, location: string) =>
    `Find ${caseType} Lawyers in ${location} — Top-Rated Attorneys, Free Case Review`,

  // T7 - Firm Profile
  firmProfile: (firmName: string, location: string, practiceArea: string) =>
    `${firmName} — ${practiceArea} Lawyer in ${location} | Client Reviews & Results`,

  // T8 - Resource/Tracker
  resource: (resourceType: string, updatedMonth: string) =>
    `${resourceType} Database (${updatedMonth}) — Searchable, Exportable Data`,
}

/**
 * Description templates optimized for CTR and AI Overviews
 */
export const descriptionTemplates = {
  // T1 - Case Pillar (answers: Who qualifies? Deadline? Payout?)
  casePillar: (caseType: string, qualifyBullets: string[], deadline: string, payoutRange: string) =>
    `Who qualifies for ${caseType} lawsuit? ${qualifyBullets.join(', ')}. File by ${deadline}. Settlements: ${payoutRange}. Free case review, no upfront cost.`,

  // T2 - Injury in Case
  injuryInCase: (injury: string, caseType: string, symptoms: string) =>
    `${injury} linked to ${caseType}. Symptoms: ${symptoms}. Get medical records help, file your claim. Free legal review, no fees unless you win.`,

  // T3 - State Hub
  stateHub: (caseType: string, state: string, solYears: string, filingDeadline: string) =>
    `${state} ${caseType} statute of limitations: ${solYears}. Filing deadline: ${filingDeadline}. Local attorneys, free consultation. Evidence checklist & claim help.`,

  // T4 - City PI
  cityPI: (practiceArea: string, city: string, languages: string) =>
    `${city} ${practiceArea} lawyer. 24/7 availability, ${languages} spoken. Free crash report help, hospital lien negotiation. No fee unless you win.`,

  // T5 - Event Hub
  eventHub: (event: string, state: string, affectedCounties: string) =>
    `${state} ${event} victims: File claims for property damage, lost wages. Counties: ${affectedCounties}. FEMA deadlines, insurance help, free legal review.`,

  // T6 - Directory List
  directoryList: (caseType: string, location: string, firmCount: number) =>
    `${firmCount}+ ${caseType} attorneys in ${location}. Compare experience, reviews, success rates. Free case evaluation, contingency fees. Find your lawyer today.`,

  // T7 - Firm Profile
  firmProfile: (firmName: string, yearsExp: number, casesWon: number, acceptanceRate: number) =>
    `${firmName}: ${yearsExp}+ years, ${casesWon}+ cases won, ${acceptanceRate}% acceptance rate. Free consultation, no upfront fees. Bilingual staff, 24/7 intake.`,

  // T8 - Resource/Tracker
  resource: (resourceType: string, recordCount: number, lastUpdated: string) =>
    `${resourceType}: ${recordCount}+ records. Searchable by defendant, court, amount, date. Updated ${lastUpdated}. Export data, cite in claims. Free access.`,
}

/**
 * Generate structured FAQ schema for AI Overviews optimization (§3.7)
 */
export function generateFAQForAI(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.slice(0, 10).map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Optimize content for AI Overviews (first 120-180 words)
 * Per spec §3.7: Answer "Who qualifies / Deadline / Valuation factors" in bullets
 */
export function generateAIOverviewIntro(params: {
  whoQualifies: string[]
  deadline: string
  valuationFactors: string[]
  citations?: string[]
}): string {
  const { whoQualifies, deadline, valuationFactors, citations = [] } = params

  const intro = `
**Who Qualifies:**
${whoQualifies.map(q => `• ${q}`).join('\n')}

**Filing Deadline:** ${deadline}

**What Affects Your Settlement:**
${valuationFactors.map(v => `• ${v}`).join('\n')}

${citations.length > 0 ? `**Sources:** ${citations.join(', ')}` : ''}
`.trim()

  return intro
}

/**
 * Calculate Flesch-Kincaid Grade Level (spec §3.8 requires G4-6 for microcopy, G6-7 for body)
 */
export function calculateReadability(text: string): {
  gradeLevel: number
  readingEase: number
  avgSentenceLength: number
  avgSyllablesPerWord: number
  isCompliant: boolean
  targetGrade: string
} {
  // Remove HTML tags
  const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

  // Count sentences (. ! ? followed by space or end)
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const sentenceCount = sentences.length || 1

  // Count words
  const words = cleanText.split(/\s+/).filter(w => w.length > 0)
  const wordCount = words.length || 1

  // Count syllables (rough approximation)
  const syllableCount = words.reduce((total, word) => {
    const vowels = word.toLowerCase().match(/[aeiouy]+/g)
    const syllables = vowels ? vowels.length : 1
    // Adjust for silent 'e'
    if (word.endsWith('e') && syllables > 1) return total + syllables - 1
    return total + syllables
  }, 0)

  const avgSentenceLength = wordCount / sentenceCount
  const avgSyllablesPerWord = syllableCount / wordCount

  // Flesch Reading Ease: 206.835 - 1.015(total words / total sentences) - 84.6(total syllables / total words)
  const readingEase = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord)

  // Flesch-Kincaid Grade Level: 0.39(total words / total sentences) + 11.8(total syllables / total words) - 15.59
  const gradeLevel = (0.39 * avgSentenceLength) + (11.8 * avgSyllablesPerWord) - 15.59

  // Determine target and compliance based on grade level
  let targetGrade = 'G6-7 (body copy)'
  let isCompliant = gradeLevel >= 6 && gradeLevel <= 7.5

  if (gradeLevel <= 6) {
    targetGrade = 'G4-6 (microcopy/summaries)'
    isCompliant = true
  } else if (gradeLevel > 7.5 && gradeLevel <= 9) {
    targetGrade = 'G7-9 (deep dives)'
    isCompliant = true // Acceptable for technical sections
  } else if (gradeLevel > 9) {
    targetGrade = 'Too complex (simplify)'
    isCompliant = false
  }

  return {
    gradeLevel: Math.round(gradeLevel * 10) / 10,
    readingEase: Math.round(readingEase * 10) / 10,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
    isCompliant,
    targetGrade,
  }
}

/**
 * Validate SEO compliance for a page
 */
export function validateSEOCompliance(params: {
  title: string
  description: string
  h1: string
  content: string
  hasCanonical: boolean
  hasOGTags: boolean
  hasTwitterTags: boolean
  hasSchemaMarkup: boolean
  hasAltTextOnImages: boolean
  internalLinksCount: number
  externalLinksCount: number
}): {
  score: number // 0-100
  issues: string[]
  warnings: string[]
  passes: string[]
} {
  const issues: string[] = []
  const warnings: string[] = []
  const passes: string[] = []
  let score = 100

  // Title checks
  if (params.title.length === 0) {
    issues.push('Missing title tag')
    score -= 15
  } else if (params.title.length > 60) {
    warnings.push(`Title too long (${params.title.length} chars, recommend ≤60)`)
    score -= 5
  } else if (params.title.length < 30) {
    warnings.push(`Title too short (${params.title.length} chars, recommend 30-60)`)
    score -= 3
  } else {
    passes.push('Title length optimal (30-60 chars)')
  }

  // Description checks
  if (params.description.length === 0) {
    issues.push('Missing meta description')
    score -= 15
  } else if (params.description.length > 160) {
    warnings.push(`Description too long (${params.description.length} chars, recommend ≤160)`)
    score -= 5
  } else if (params.description.length < 120) {
    warnings.push(`Description too short (${params.description.length} chars, recommend 120-160)`)
    score -= 3
  } else {
    passes.push('Description length optimal (120-160 chars)')
  }

  // H1 checks
  if (!params.h1) {
    issues.push('Missing H1 tag')
    score -= 10
  } else if (params.h1 !== params.title && !params.title.includes(params.h1)) {
    warnings.push('H1 and title tag should align for keyword consistency')
    score -= 3
  } else {
    passes.push('H1 tag present and aligned with title')
  }

  // Canonical URL
  if (!params.hasCanonical) {
    issues.push('Missing canonical URL')
    score -= 10
  } else {
    passes.push('Canonical URL set')
  }

  // Open Graph
  if (!params.hasOGTags) {
    warnings.push('Missing Open Graph tags (impacts social sharing)')
    score -= 5
  } else {
    passes.push('Open Graph tags present')
  }

  // Twitter Cards
  if (!params.hasTwitterTags) {
    warnings.push('Missing Twitter Card tags (impacts social sharing)')
    score -= 3
  } else {
    passes.push('Twitter Card tags present')
  }

  // Schema markup
  if (!params.hasSchemaMarkup) {
    issues.push('Missing schema.org structured data')
    score -= 10
  } else {
    passes.push('Schema.org markup present')
  }

  // Images
  if (!params.hasAltTextOnImages) {
    warnings.push('Some images missing alt text (accessibility & SEO issue)')
    score -= 5
  } else {
    passes.push('All images have alt text')
  }

  // Internal linking
  if (params.internalLinksCount < 3) {
    warnings.push(`Low internal links (${params.internalLinksCount}, recommend 3-10)`)
    score -= 5
  } else if (params.internalLinksCount > 20) {
    warnings.push(`Too many internal links (${params.internalLinksCount}, recommend 3-10)`)
    score -= 3
  } else {
    passes.push(`Good internal linking (${params.internalLinksCount} links)`)
  }

  // External citations (E-E-A-T)
  if (params.externalLinksCount < 2) {
    warnings.push(`Low external citations (${params.externalLinksCount}, recommend 2-5 authoritative sources)`)
    score -= 3
  } else {
    passes.push(`Good external citations (${params.externalLinksCount} sources)`)
  }

  // Readability check
  const readability = calculateReadability(params.content)
  if (!readability.isCompliant) {
    warnings.push(`Readability: ${readability.targetGrade} (Grade ${readability.gradeLevel})`)
    score -= 5
  } else {
    passes.push(`Readability compliant: ${readability.targetGrade} (Grade ${readability.gradeLevel})`)
  }

  return {
    score: Math.max(0, score),
    issues,
    warnings,
    passes,
  }
}
