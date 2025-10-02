interface VideoEmbedProps {
  videoId: string;
  provider?: 'youtube' | 'vimeo';
  title: string;
  thumbnail?: string;
  transcript?: string;
}

export default function VideoEmbed({
  videoId,
  provider = 'youtube',
  title,
  thumbnail,
  transcript
}: VideoEmbedProps) {
  const embedUrl = provider === 'youtube'
    ? `https://www.youtube.com/embed/${videoId}`
    : `https://player.vimeo.com/video/${videoId}`;

  const defaultThumbnail = provider === 'youtube'
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : thumbnail;

  return (
    <div className="my-6">
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        ></iframe>
      </div>

      {transcript && (
        <details className="mt-4 bg-gray-50 rounded-lg p-4">
          <summary className="cursor-pointer font-medium text-gray-900 hover:text-blue-600">
            📄 View Transcript
          </summary>
          <div className="mt-3 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {transcript}
          </div>
        </details>
      )}
    </div>
  );
}
