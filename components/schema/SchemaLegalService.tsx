/**
 * LegalService Schema (schema.org/LegalService)
 *
 * Required for T7 (firm profiles) and T4 (city PI pages) per techSpec.md §3.6
 * Displays rich results for legal service providers
 */

interface SchemaLegalServiceProps {
  name: string
  description: string
  url: string
  telephone?: string
  email?: string
  address?: {
    streetAddress: string
    addressLocality: string // city
    addressRegion: string // state
    postalCode: string
    addressCountry?: string
  }
  geo?: {
    latitude: number
    longitude: number
  }
  image?: string
  priceRange?: string // e.g., "Free Consultation"
  openingHours?: string[] // e.g., ["Mo-Fr 09:00-17:00", "Sa 09:00-12:00"]
  areaServed?: string[] // States or cities served
  practiceArea?: string[] // e.g., ["Personal Injury", "Mass Torts"]
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
    bestRating?: number
    worstRating?: number
  }
  reviews?: Array<{
    author: string
    datePublished: string
    reviewBody: string
    reviewRating: number
  }>
  hasOfferCatalog?: {
    name: string
    itemListElement: Array<{
      name: string
      description: string
    }>
  }
}

export default function SchemaLegalService({
  name,
  description,
  url,
  telephone,
  email,
  address,
  geo,
  image,
  priceRange = 'Free Consultation',
  openingHours,
  areaServed = [],
  practiceArea = [],
  aggregateRating,
  reviews = [],
  hasOfferCatalog,
}: SchemaLegalServiceProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name,
    description,
    url,
    ...(telephone && { telephone }),
    ...(email && { email }),
    ...(address && { address: { '@type': 'PostalAddress', ...address } }),
    ...(geo && { geo: { '@type': 'GeoCoordinates', ...geo } }),
    ...(image && { image }),
    priceRange,
    ...(openingHours && openingHours.length > 0 && { openingHours }),
    ...(areaServed.length > 0 && { areaServed }),
    ...(practiceArea.length > 0 && {
      knowsAbout: practiceArea,
      serviceType: practiceArea,
    }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
        bestRating: aggregateRating.bestRating || 5,
        worstRating: aggregateRating.worstRating || 1,
      },
    }),
    ...(reviews.length > 0 && {
      review: reviews.map(review => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: review.author },
        datePublished: review.datePublished,
        reviewBody: review.reviewBody,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.reviewRating,
          bestRating: 5,
        },
      })),
    }),
    ...(hasOfferCatalog && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: hasOfferCatalog.name,
        itemListElement: hasOfferCatalog.itemListElement.map(item => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: item.name,
            description: item.description,
          },
        })),
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
