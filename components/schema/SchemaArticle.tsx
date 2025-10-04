/**
 * Article Schema (schema.org/Article)
 *
 * Required for T1-T5 templates per techSpec.md §3.6
 * Optimized for Google rich results and AI Overviews
 */

interface SchemaArticleProps {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  author: {
    name: string
    url?: string
    credentials?: string // JD, MD, etc.
  }
  publisher: {
    name: string
    logo: string
  }
  image?: {
    url: string
    width?: number
    height?: number
  }
  articleSection?: string // e.g., "Mass Torts", "Personal Injury"
  keywords?: string[]
  wordCount?: number
  inLanguage?: string
}

export default function SchemaArticle({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author,
  publisher,
  image,
  articleSection,
  keywords = [],
  wordCount,
  inLanguage = 'en-US',
}: SchemaArticleProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
      jobTitle: author.credentials,
    },
    publisher: {
      '@type': 'Organization',
      name: publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo,
      },
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image.url,
        width: image.width || 1200,
        height: image.height || 630,
      },
    }),
    ...(articleSection && { articleSection }),
    ...(keywords.length > 0 && { keywords: keywords.join(', ') }),
    ...(wordCount && { wordCount }),
    inLanguage,
    isAccessibleForFree: true,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
