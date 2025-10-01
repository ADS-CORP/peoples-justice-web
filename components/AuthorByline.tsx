interface AuthorBylineProps {
  name: string;
  credentials: string;
  date: string;
  photoUrl?: string;
}

export default function AuthorByline({ name, credentials, date, photoUrl }: AuthorBylineProps) {
  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200 mb-6">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">{name}</span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">{credentials}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
          <span>Reviewed {date}</span>
        </div>
      </div>
    </div>
  );
}
