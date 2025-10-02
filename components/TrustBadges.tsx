interface TrustBadge {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface TrustBadgesProps {
  variant?: 'compact' | 'detailed';
}

export default function TrustBadges({ variant = 'compact' }: TrustBadgesProps) {
  const badges: TrustBadge[] = [
    {
      label: 'Attorney Network',
      value: '15,000+ Nationwide',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      label: 'Clients Helped',
      value: '100,000+',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'No Upfront Fees',
      value: '100% Contingency',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap gap-4 items-center justify-center my-6">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            <div className="text-blue-600">{badge.icon}</div>
            <div>
              <span className="font-bold text-gray-900">{badge.value}</span>
              <span className="text-gray-600 ml-1">{badge.label}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
      {badges.map((badge, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div className="flex justify-center text-blue-600 mb-3">
            {badge.icon}
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{badge.value}</div>
          <div className="text-sm text-gray-600">{badge.label}</div>
        </div>
      ))}
    </div>
  );
}
