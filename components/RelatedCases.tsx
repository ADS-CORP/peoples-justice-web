interface RelatedCase {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  caseStat: string;
  settlementStat: string;
  accentColor: string;
  iconBg: string;
}

const relatedCases: RelatedCase[] = [
  {
    slug: 'paraquat',
    title: 'Paraquat Lawsuits',
    subtitle: 'Herbicide linked to Parkinson\'s Disease',
    description: 'Agricultural workers and farmers exposed to Paraquat herbicide may develop Parkinson\'s disease. Lawsuits allege manufacturers knew of neurological risks.',
    caseStat: '4,000+ cases filed',
    settlementStat: 'Active litigation',
    accentColor: 'purple',
    iconBg: 'from-purple-500 to-indigo-600'
  },
  {
    slug: 'talc',
    title: 'Talcum Powder Lawsuits',
    subtitle: 'Baby powder linked to ovarian cancer',
    description: 'Women who used talc-based products (Johnson\'s Baby Powder, Shower to Shower) for feminine hygiene may have developed ovarian cancer or mesothelioma from asbestos contamination.',
    caseStat: '50,000+ claims filed',
    settlementStat: '$10B+ in settlements',
    accentColor: 'pink',
    iconBg: 'from-pink-500 to-rose-600'
  },
  {
    slug: 'camp-lejeune',
    title: 'Camp Lejeune Water Contamination',
    subtitle: 'Toxic water exposure at Marine base',
    description: 'Veterans and families stationed at Camp Lejeune (1953-1987) were exposed to contaminated water linked to cancer, birth defects, and neurological conditions. PACT Act opens claims.',
    caseStat: '100,000+ eligible veterans',
    settlementStat: 'PACT Act deadline: 2024',
    accentColor: 'blue',
    iconBg: 'from-blue-500 to-cyan-600'
  }
];

const getCaseIcon = (slug: string) => {
  switch (slug) {
    case 'paraquat':
      // Sparkles icon representing chemical exposure/toxicity
      return (
        <svg className="w-7 h-7 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
        </svg>
      );
    case 'talc':
      // Cube representing powder/product
      return (
        <svg className="w-7 h-7 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
      );
    case 'camp-lejeune':
      // Water droplet icon for water contamination
      return (
        <svg className="w-7 h-7 text-white mx-auto" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function RelatedCases() {
  return (
    <div className="my-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 gradient-text">
        Related Mass Tort Cases
      </h2>
      <p className="text-gray-700 mb-8 leading-relaxed">
        If you or a loved one were harmed by Roundup, you may also have been exposed to other dangerous products.
        Explore related cases below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedCases.map((relatedCase) => (
          <a
            key={relatedCase.slug}
            href={`/cases/${relatedCase.slug}`}
            className="block bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-400 shadow-sm hover:shadow-lg transition-all group"
          >
            {/* Header with icon */}
            <div className="p-6 pb-4">
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${relatedCase.iconBg} flex items-center justify-center mb-4`}>
                {getCaseIcon(relatedCase.slug)}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {relatedCase.title}
              </h3>
              <p className="text-sm text-gray-600">{relatedCase.subtitle}</p>
            </div>

            {/* Description */}
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {relatedCase.description}
              </p>
            </div>

            {/* Stats - Clean minimal design */}
            <div className="px-6 pb-4 space-y-2">
              <div className="flex items-center text-xs">
                <svg className="w-3.5 h-3.5 mr-2 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">{relatedCase.caseStat}</span>
              </div>
              <div className="flex items-center text-xs">
                <svg className="w-3.5 h-3.5 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium">{relatedCase.settlementStat}</span>
              </div>
            </div>

            {/* Learn more footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                <span>Learn more</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-r-lg p-6">
        <p className="text-sm text-blue-900 leading-relaxed">
          <strong>Note:</strong> Each case has different eligibility requirements and deadlines. If you've been exposed
          to multiple harmful products, you may be able to file claims for each one separately. Consult an attorney to
          explore all your legal options.
        </p>
      </div>
    </div>
  );
}
