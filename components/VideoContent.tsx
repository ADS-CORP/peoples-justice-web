interface Video {
  title: string;
  description: string;
  category: 'Expert Interview' | 'Client Testimony' | 'Legal Explainer' | 'Documentary' | 'News Coverage';
  youtubeId: string;
  date: string;
}

const videos: Video[] = [
  {
    title: 'Roundup Cancer Lawsuits Explained',
    description: 'Comprehensive overview of Roundup cancer litigation, including eligibility, settlement tiers, and what to expect when filing a claim.',
    category: 'Legal Explainer',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
    date: 'March 2024'
  },
  {
    title: 'Understanding Glyphosate and Cancer Risk',
    description: 'Medical experts explain the scientific evidence linking glyphosate exposure to non-Hodgkin lymphoma and other cancers.',
    category: 'Expert Interview',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
    date: 'February 2024'
  },
  {
    title: 'Monsanto Papers: Internal Documents Exposed',
    description: 'Investigation reveals how Monsanto knew about cancer risks and worked to suppress evidence for decades.',
    category: 'Documentary',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
    date: 'January 2024'
  },
  {
    title: 'Roundup Lawsuit Victory: Client Story',
    description: 'A landscaper shares his journey from diagnosis to legal victory, including how he qualified and what his settlement covered.',
    category: 'Client Testimony',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
    date: 'December 2023'
  },
  {
    title: 'Bayer Settles Roundup Cases: What It Means for You',
    description: 'Legal analysis of Bayer\'s $15+ billion settlement fund and how it affects new claims being filed in 2024-2025.',
    category: 'News Coverage',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
    date: 'November 2023'
  },
  {
    title: 'How to Prove Your Roundup Exposure Case',
    description: 'Attorney explains what documentation you need, from medical records to proof of Roundup use, to build a strong case.',
    category: 'Legal Explainer',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
    date: 'October 2023'
  }
];

interface VideoContentProps {
  enabled?: boolean;
}

export default function VideoContent({ enabled = true }: VideoContentProps) {
  if (!enabled) return null;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Video Library: Roundup Lawsuit Information
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Watch expert interviews, legal explainers, and news coverage to better understand your Roundup case.
        Our video library covers everything from the science of glyphosate toxicity to real courtroom victories.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 transition-colors group">
            {/* YouTube Embed */}
            <div className="relative bg-gray-900 aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />

              {/* Category badge */}
              <div className="absolute top-2 left-2 z-10">
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                  video.category === 'Expert Interview' ? 'bg-purple-100 text-purple-800' :
                  video.category === 'Client Testimony' ? 'bg-green-100 text-green-800' :
                  video.category === 'Legal Explainer' ? 'bg-blue-100 text-blue-800' :
                  video.category === 'Documentary' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {video.category}
                </span>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                {video.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{video.date}</span>
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Watch on YouTube →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">🎥 Why Video Content Matters</h3>
        <p className="text-sm text-purple-900 leading-relaxed mb-3">
          <strong>Understanding your legal rights shouldn't require a law degree.</strong> Our video library makes
          complex legal and scientific concepts accessible. You'll hear directly from:
        </p>
        <ul className="grid md:grid-cols-2 gap-2 text-sm text-purple-900">
          <li className="flex items-start">
            <svg className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Experienced mass tort attorneys
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Medical experts and oncologists
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Real clients who won their cases
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Investigative journalists on Monsanto
          </li>
        </ul>
      </div>
    </div>
  );
}
