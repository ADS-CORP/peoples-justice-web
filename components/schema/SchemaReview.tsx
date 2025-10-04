/**
 * Review Schema with Pros/Cons (schema.org/Review)
 *
 * New 2025 requirement: Add pros/cons properties for better AI extraction
 * Per Google guidance: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
 */

interface SchemaReviewProps {
  itemReviewed: {
    type: 'Product' | 'Service' | 'Organization' | 'LegalService'
    name: string
    url?: string
    image?: string
  }
  author: {
    name: string
    url?: string
  }
  reviewRating: {
    ratingValue: number
    bestRating?: number
    worstRating?: number
  }
  reviewBody: string
  datePublished: string

  // NEW: Pros/Cons for AI extraction
  positiveNotes?: {
    itemProp: 'positiveNotes'
    itemType: 'ItemList'
    itemListElement: string[]
  }
  negativeNotes?: {
    itemProp: 'negativeNotes'
    itemType: 'ItemList'
    itemListElement: string[]
  }
}

export default function SchemaReview({
  itemReviewed,
  author,
  reviewRating,
  reviewBody,
  datePublished,
  positiveNotes,
  negativeNotes,
}: SchemaReviewProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': itemReviewed.type,
      name: itemReviewed.name,
      ...(itemReviewed.url && { url: itemReviewed.url }),
      ...(itemReviewed.image && { image: itemReviewed.image }),
    },
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: reviewRating.ratingValue,
      bestRating: reviewRating.bestRating || 5,
      worstRating: reviewRating.worstRating || 1,
    },
    reviewBody,
    datePublished,
    ...(positiveNotes && {
      positiveNotes: {
        '@type': 'ItemList',
        itemListElement: positiveNotes.itemListElement.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item,
        })),
      },
    }),
    ...(negativeNotes && {
      negativeNotes: {
        '@type': 'ItemList',
        itemListElement: negativeNotes.itemListElement.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item,
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

/**
 * Visual Pros/Cons component (renders HTML + Schema)
 */
export function ProsConsReview({
  pros,
  cons,
  includeSchema = true,
}: {
  pros: string[]
  cons: string[]
  includeSchema?: boolean
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      {/* Pros */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Pros
        </h3>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-700">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          Cons
        </h3>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start">
              <span className="text-red-600 mr-2">✗</span>
              <span className="text-gray-700">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
