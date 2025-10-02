interface SettlementTier {
  name: string;
  severity: string;
  factors: string[];
  estimatedRange: string;
  color: 'blue' | 'yellow' | 'red';
}

const settlementTiers: SettlementTier[] = [
  {
    name: 'Tier 1',
    severity: 'Mild NHL',
    factors: [
      'In remission for more than 2 years',
      'Minimal treatment required',
      'Good prognosis',
      'Younger age at diagnosis'
    ],
    estimatedRange: '$50,000 - $200,000',
    color: 'blue'
  },
  {
    name: 'Tier 2',
    severity: 'Moderate NHL',
    factors: [
      'Aggressive treatment required (chemotherapy, radiation)',
      'In remission for 1-2 years',
      'Some ongoing health issues',
      'Middle age at diagnosis'
    ],
    estimatedRange: '$200,000 - $500,000',
    color: 'yellow'
  },
  {
    name: 'Tier 3',
    severity: 'Severe NHL',
    factors: [
      'Stage 4 cancer or terminal diagnosis',
      'Ongoing treatment or refractory disease',
      'Poor prognosis or reduced life expectancy',
      'Older age or significant disability'
    ],
    estimatedRange: '$500,000 - $2,000,000+',
    color: 'red'
  }
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    title: 'text-blue-900',
    badge: 'bg-blue-100 text-blue-800'
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    title: 'text-yellow-900',
    badge: 'bg-yellow-100 text-yellow-800'
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    title: 'text-red-900',
    badge: 'bg-red-100 text-red-800'
  }
};

export default function SettlementTierExplainer() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Understanding Bayer's Settlement Point System
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Bayer uses a point-based system to calculate settlement amounts. Your case is scored based on factors
        like cancer type, treatment severity, exposure duration, and age. Higher points typically result in
        higher settlements. Here's a general breakdown:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {settlementTiers.map((tier) => (
          <div
            key={tier.name}
            className={`${colorClasses[tier.color].bg} ${colorClasses[tier.color].border} border-2 rounded-lg p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${colorClasses[tier.color].title}`}>
                {tier.name}
              </h3>
              <span className={`${colorClasses[tier.color].badge} px-3 py-1 rounded-full text-sm font-medium`}>
                {tier.severity}
              </span>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Typical Factors:</h4>
              <ul className="space-y-2">
                {tier.factors.map((factor, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Estimated Range
              </p>
              <p className={`text-xl font-bold ${colorClasses[tier.color].title}`}>
                {tier.estimatedRange}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Important Disclaimer:</strong> These are general estimates based on publicly available settlement information.
          Actual settlement amounts vary significantly based on individual circumstances, evidence strength, jurisdiction, and
          negotiation. Some cases have settled for less than $50,000, while exceptional cases (especially jury verdicts) have
          resulted in millions. This information does not constitute legal advice. Consult a qualified attorney for a
          personalized case evaluation.
        </p>
      </div>
    </div>
  );
}
