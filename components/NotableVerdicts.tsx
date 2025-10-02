interface Verdict {
  amount: string;
  plaintiff: string;
  date: string;
  description: string;
  outcome?: string;
  rank: number;
}

const notableVerdicts: Verdict[] = [
  {
    rank: 1,
    amount: '$2.055 Billion',
    plaintiff: 'Pilliod v. Monsanto',
    date: 'May 2019',
    description: 'Alva and Alberta Pilliod, a married couple in their 70s, both developed non-Hodgkin lymphoma after decades of using Roundup in their yard. Jury awarded $55M compensatory and $2B punitive damages.',
    outcome: 'Reduced to $87M on appeal; still largest sustained Roundup verdict'
  },
  {
    rank: 2,
    amount: '$1.56 Billion',
    plaintiff: 'Shelton, Clark, Stevick, Langford',
    date: 'November 2023',
    description: 'Four Missouri plaintiffs won combined verdict including $1.25 billion in punitive damages. All developed NHL after residential or occupational Roundup exposure.',
    outcome: 'Bayer filed appeal; case pending'
  },
  {
    rank: 3,
    amount: '$289 Million',
    plaintiff: 'Johnson v. Monsanto',
    date: 'August 2018',
    description: 'Dewayne "Lee" Johnson, a school groundskeeper with terminal NHL, won the first Roundup trial. Landmark case exposed internal Monsanto documents showing company knew of cancer risks.',
    outcome: 'Reduced to $78M on appeal; opened floodgates for thousands of claims'
  },
  {
    rank: 4,
    amount: '$80 Million',
    plaintiff: 'Hardeman v. Monsanto',
    date: 'March 2019',
    description: 'Edwin Hardeman used Roundup for 26 years to control weeds and poison oak on his property. First federal bellwether trial in MDL litigation.',
    outcome: 'Reduced to $25.2M on appeal'
  },
  {
    rank: 5,
    amount: '$25 Million',
    plaintiff: 'Donnetta Stephens',
    date: 'July 2021',
    description: 'Donnetta Stephens developed non-Hodgkin lymphoma from occupational exposure as a groundskeeper. One of the first post-settlement verdicts showing cases still proceeding to trial.',
    outcome: 'Bayer appealed; demonstrates ongoing litigation risk'
  }
];

export default function NotableVerdicts() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Top 5 Largest Roundup Verdicts
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        While most cases settle confidentially, some have gone to trial with significant jury awards. Here are the
        five largest Roundup verdicts (many were reduced on appeal, but still demonstrate the strength of plaintiffs' cases).
      </p>

      <div className="space-y-6">
        {notableVerdicts.map((verdict) => (
          <div key={verdict.rank} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  #{verdict.rank}
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{verdict.amount}</div>
                  <div className="text-sm text-gray-600">{verdict.date}</div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {verdict.plaintiff}
            </h3>

            <p className="text-gray-700 leading-relaxed mb-3">
              {verdict.description}
            </p>

            {verdict.outcome && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-900">Outcome:</strong> {verdict.outcome}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <p className="text-sm text-yellow-900">
          <strong>Note:</strong> Verdict amounts often get reduced on appeal, but they demonstrate that juries consistently
          find Monsanto/Bayer liable for failing to warn about cancer risks. Even reduced awards are substantial, and most
          cases settle to avoid trial risk.
        </p>
      </div>
    </div>
  );
}
