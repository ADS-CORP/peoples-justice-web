interface LitigationUpdateHeaderProps {
  lastUpdated: string;
  activeCases: number;
  totalSettled: string;
  updateSummary?: string;
}

export default function LitigationUpdateHeader({
  lastUpdated,
  activeCases,
  totalSettled,
  updateSummary
}: LitigationUpdateHeaderProps) {
  return (
    <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6 rounded-r-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-900">
            <span className="font-bold">Updated {lastUpdated}:</span>{' '}
            {activeCases.toLocaleString()}+ active claims, {totalSettled} paid in settlements
          </p>
          {updateSummary && (
            <p className="mt-1 text-sm text-green-800">
              {updateSummary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
