/**
 * ItemList Schema (schema.org/ItemList)
 *
 * Required for T1 state links and T6 directory listings per techSpec.md §3.6
 * Displays list items in rich results
 */

interface ListItem {
  name: string
  url: string
  image?: string
  description?: string
}

interface SchemaItemListProps {
  items: ListItem[]
  name?: string
  description?: string
}

export default function SchemaItemList({
  items,
  name = 'Related Items',
  description,
}: SchemaItemListProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    ...(name && { name }),
    ...(description && { description }),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: item.name,
        url: item.url,
        ...(item.image && { image: item.image }),
        ...(item.description && { description: item.description }),
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Schema for directory/lawyer listings (T6, T7)
 */
interface DirectoryListingItem {
  name: string
  url: string
  image?: string
  description?: string
  address?: {
    city: string
    state: string
  }
  rating?: number
  reviewCount?: number
  practiceAreas?: string[]
}

interface SchemaDirectoryListProps {
  items: DirectoryListingItem[]
  totalResults: number
  name: string
  description?: string
}

export function SchemaDirectoryList({
  items,
  totalResults,
  name,
  description,
}: SchemaDirectoryListProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    ...(description && { description }),
    numberOfItems: totalResults,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LegalService',
        name: item.name,
        url: item.url,
        ...(item.image && { image: item.image }),
        ...(item.description && { description: item.description }),
        ...(item.address && {
          address: {
            '@type': 'PostalAddress',
            addressLocality: item.address.city,
            addressRegion: item.address.state,
          },
        }),
        ...(item.rating && item.reviewCount && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: item.rating,
            reviewCount: item.reviewCount,
            bestRating: 5,
          },
        }),
        ...(item.practiceAreas && item.practiceAreas.length > 0 && {
          serviceType: item.practiceAreas,
        }),
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
