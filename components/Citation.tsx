interface CitationProps {
  text: string;
  url: string;
  publisher: string;
  date: string;
}

export default function Citation({ text, url, publisher, date }: CitationProps) {
  return (
    <sup className="ml-1">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 text-xs font-medium"
        title={`${text} - ${publisher}, ${date}`}
      >
        [source]
      </a>
    </sup>
  );
}
