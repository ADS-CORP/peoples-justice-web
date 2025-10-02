interface DocumentEvidence {
  title: string;
  date: string;
  source: string;
  revelation: string;
  impact: string;
  link?: string;
}

const keyDocuments: DocumentEvidence[] = [
  {
    title: 'Internal Email: "Glyphosate is a Carcinogen"',
    date: '1983',
    source: 'EPA Scientist Marion Copley to Jess Rowland',
    revelation: 'EPA toxicologist Marion Copley wrote to her supervisor: "Glyphosate is a carcinogen...Any one of these mechanisms alone listed can cause tumors, but glyphosate causes all of them simultaneously."',
    impact: 'Showed EPA scientists internally recognized cancer risks decades before public disclosure.',
    link: 'https://usrtk.org/wp-content/uploads/2017/03/1-Marion-Copley-Letter-to-Jess-Rowland.pdf'
  },
  {
    title: 'Ghostwritten Studies',
    date: '2015-2016',
    source: 'Monsanto internal communications',
    revelation: 'Emails revealed Monsanto scientists wrote full studies, then recruited outside experts to put their names on them as "independent research." One employee wrote: "We would be keeping the cost down by us doing the writing and they would just edit & sign their names."',
    impact: 'Demonstrated systematic deception to create false appearance of independent scientific support.',
    link: 'https://usrtk.org/pesticides/mdl-monsanto-glyphosate-cancer-case-key-documents-analysis/'
  },
  {
    title: '"Let Nothing Go" Strategy',
    date: '2015',
    source: 'Monsanto strategic communications plan',
    revelation: 'After IARC classification, Monsanto launched "Let Nothing Go" campaign to discredit IARC scientists. Internal memo: "Orchestrate outcry with IARC decision...We have not historically let things go."',
    impact: 'Revealed coordinated campaign to attack independent scientists rather than address safety concerns.',
    link: 'https://usrtk.org/pesticides/mdl-monsanto-glyphosate-cancer-case-key-documents-analysis/'
  },
  {
    title: 'EPA Official Jess Rowland Collaboration',
    date: '2016',
    source: 'Text messages between Monsanto executive and EPA official',
    revelation: 'EPA official Jess Rowland allegedly told Monsanto: "If I can kill this [cancer review], I should get a medal." He later retired from EPA and was accused of coordinating with Monsanto to suppress cancer findings.',
    impact: 'Suggested regulatory capture—EPA official working to protect Monsanto instead of public health.',
    link: 'https://usrtk.org/pesticides/mdl-monsanto-glyphosate-cancer-case-key-documents-analysis/'
  },
  {
    title: 'Suppressed Tumor Data',
    date: '1980s-1990s',
    source: 'Animal studies submitted to regulators',
    revelation: 'Independent re-analysis of Monsanto\'s own animal studies found statistically significant tumor increases that Monsanto had dismissed as "not treatment-related." Monsanto characterized tumors as "rare" when they appeared in test animals.',
    impact: 'Showed company minimized its own evidence of carcinogenicity in regulatory submissions.',
    link: 'https://usrtk.org/pesticides/mdl-monsanto-glyphosate-cancer-case-key-documents-analysis/'
  }
];

export default function MonsantoPapers() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        The Monsanto Papers: Evidence of Deception
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        During litigation, thousands of internal Monsanto documents were unsealed, revealing a decades-long pattern of
        cover-ups, ghostwritten studies, and efforts to suppress cancer research. These "Monsanto Papers" became crucial
        evidence in proving the company knew about Roundup's cancer risks and actively concealed them from the public.
      </p>

      <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6 rounded-r-lg">
        <h3 className="text-lg font-semibold text-red-900 mb-3">🚨 What the Documents Revealed</h3>
        <p className="text-red-900 text-sm leading-relaxed">
          Internal emails, scientific studies, and strategic communications exposed a coordinated effort to:
          <strong> manufacture doubt about glyphosate's cancer risks, discredit independent scientists, and influence
          regulatory agencies.</strong> These documents were so damaging that juries awarded billions in punitive damages
          to punish Monsanto's "malice" and "oppression."
        </p>
      </div>

      <div className="space-y-6">
        {keyDocuments.map((doc, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-red-500 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {doc.title}
                </h3>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <span className="font-semibold">{doc.date}</span>
                  <span className="text-gray-400">•</span>
                  <span>{doc.source}</span>
                </div>
              </div>
              <div className="flex-shrink-0 ml-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-300">
                  📄 Evidence
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">What It Said:</p>
                <p className="text-gray-800 italic leading-relaxed">"{doc.revelation}"</p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-1">Impact:</p>
                <p className="text-gray-700 leading-relaxed">{doc.impact}</p>
              </div>

              {doc.link && (
                <div className="pt-3">
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    📎 View Document
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <p className="text-sm text-yellow-900 mb-3">
          <strong>Legal Significance:</strong> Judges allowed these documents as evidence of "malice, oppression, and fraud,"
          justifying punitive damages. Multiple juries concluded Monsanto <strong>knew or should have known</strong> about
          cancer risks and deliberately failed to warn consumers. This evidence was central to billion-dollar verdicts and
          Bayer's eventual settlement of over $15 billion.
        </p>
        <div className="pt-3 border-t border-yellow-200">
          <p className="text-sm text-yellow-900 mb-2"><strong>Access the Full Database:</strong></p>
          <a
            href="https://usrtk.org/pesticides/mdl-monsanto-glyphosate-cancer-case-key-documents-analysis/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-yellow-900 hover:text-yellow-700 underline"
          >
            U.S. Right to Know - Monsanto Papers Database
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">1,000s</div>
          <div className="text-sm text-blue-900">Internal Documents Unsealed</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">40+ Years</div>
          <div className="text-sm text-blue-900">Cover-Up Timeline (1980s-2020s)</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">$2B+</div>
          <div className="text-sm text-blue-900">Punitive Damages Awarded (Pre-Reduction)</div>
        </div>
      </div>
    </div>
  );
}
