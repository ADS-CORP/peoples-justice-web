interface SchemaOrganizationProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export default function SchemaOrganization({
  name,
  url,
  logo,
  description,
  aggregateRating
}: SchemaOrganizationProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "url": url,
    ...(logo && { "logo": logo }),
    ...(description && { "description": description }),
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount
      }
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
