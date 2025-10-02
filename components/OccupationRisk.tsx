interface OccupationProfile {
  title: string;
  icon: string;
  riskLevel: 'High' | 'Moderate' | 'Low';
  exposureType: string;
  commonTasks: string[];
  statistics?: string;
}

const occupations: OccupationProfile[] = [
  {
    title: 'Farmers & Agricultural Workers',
    icon: '🚜',
    riskLevel: 'High',
    exposureType: 'Occupational - Heavy, repeated exposure',
    commonTasks: [
      'Mixing and loading Roundup concentrate',
      'Spraying crops (corn, soy, wheat)',
      'Equipment cleaning and maintenance',
      'Working in recently sprayed fields'
    ],
    statistics: 'Agricultural Health Study found 41% increased NHL risk among highest-exposure farmers'
  },
  {
    title: 'Landscapers & Groundskeepers',
    icon: '🌿',
    riskLevel: 'High',
    exposureType: 'Occupational - Daily exposure',
    commonTasks: [
      'Weed control on commercial properties',
      'Lawn maintenance with Roundup applications',
      'Landscape bed preparation',
      'Athletic field and park maintenance'
    ],
    statistics: 'Dewayne Johnson (school groundskeeper) won first landmark $289M verdict'
  },
  {
    title: 'Golf Course Maintenance Staff',
    icon: '⛳',
    riskLevel: 'High',
    exposureType: 'Occupational - Regular exposure',
    commonTasks: [
      'Greens and fairway weed control',
      'Cart path and bunker maintenance',
      'Early morning spraying operations',
      'Equipment handling and storage'
    ]
  },
  {
    title: 'Nursery & Garden Center Employees',
    icon: '🌱',
    riskLevel: 'Moderate',
    exposureType: 'Occupational - Handling product daily',
    commonTasks: [
      'Stocking and selling Roundup products',
      'Demonstration spraying for customers',
      'Mixing custom solutions',
      'Cleaning up spills and damaged containers'
    ]
  },
  {
    title: 'Parks & Recreation Workers',
    icon: '🏞️',
    riskLevel: 'Moderate',
    exposureType: 'Occupational - Seasonal exposure',
    commonTasks: [
      'Public park weed control',
      'Playground and facility maintenance',
      'Trail and pathway clearing',
      'Athletic field preparation'
    ]
  },
  {
    title: 'Home Gardeners & DIY Users',
    icon: '🏡',
    riskLevel: 'Moderate',
    exposureType: 'Residential - Regular home use',
    commonTasks: [
      'Backyard and garden weed control',
      'Driveway and patio crack treatment',
      'Vegetable garden bed preparation',
      'Annual spring/summer yard maintenance'
    ],
    statistics: 'Pilliod couple (home gardeners) awarded $2.055 billion for decades of residential use'
  }
];

const riskColors = {
  'High': 'bg-red-100 text-red-800 border-red-300',
  'Moderate': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Low': 'bg-green-100 text-green-800 border-green-300'
};

export default function OccupationRisk() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Who's Most at Risk? Occupation & Exposure Profiles
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Roundup exposure varies widely depending on how you used it. Occupational users—especially those who mixed,
        sprayed, or worked with Roundup regularly—face the highest cancer risks. But even home gardeners who used
        Roundup for years have developed non-Hodgkin lymphoma.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {occupations.map((occupation, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{occupation.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{occupation.title}</h3>
                  <p className="text-sm text-gray-600">{occupation.exposureType}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${riskColors[occupation.riskLevel]}`}>
                {occupation.riskLevel} Risk
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Common Exposure Tasks:</p>
              <ul className="space-y-1">
                {occupation.commonTasks.map((task, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {occupation.statistics && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-900">📊 Key Statistic:</strong> {occupation.statistics}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">🔍 How Much Exposure Matters</h3>
        <p className="text-blue-900 text-sm leading-relaxed mb-3">
          Studies show a dose-response relationship: <strong>the more you used Roundup, the higher your cancer risk.</strong>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="font-bold text-gray-900 mb-1">Low Exposure</div>
            <div className="text-sm text-gray-700">Occasional use (&lt;1x/month)</div>
            <div className="text-xs text-gray-600 mt-2">May not meet case thresholds</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="font-bold text-gray-900 mb-1">Moderate Exposure</div>
            <div className="text-sm text-gray-700">Regular use (1-2x/month, 1+ years)</div>
            <div className="text-xs text-gray-600 mt-2">Typical qualifying threshold</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="font-bold text-gray-900 mb-1">High Exposure</div>
            <div className="text-sm text-gray-700">Daily/weekly use (5+ years)</div>
            <div className="text-xs text-gray-600 mt-2">Strongest cases, highest risk</div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <p className="text-sm text-yellow-900">
          <strong>Important:</strong> Even if your occupation isn't listed, you may still qualify. If you used Roundup regularly
          for a year or more and developed non-Hodgkin lymphoma, consult an attorney. Cases have succeeded for residential users,
          highway workers, railroad employees, and many other occupations.
        </p>
      </div>
    </div>
  );
}
