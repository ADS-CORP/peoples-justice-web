interface SchemaVideoProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string; // ISO 8601 format (e.g., "PT2M30S" for 2 min 30 sec)
  contentUrl?: string;
  embedUrl?: string;
  transcript?: string;
}

export default function SchemaVideo({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  transcript
}: SchemaVideoProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    ...(contentUrl && { "contentUrl": contentUrl }),
    ...(embedUrl && { "embedUrl": embedUrl }),
    ...(transcript && { "transcript": transcript })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
