interface RelatedCase {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

const relatedCases: RelatedCase[] = [
  {
    slug: 'paraquat',
    title: 'Paraquat Lawsuits',
    subtitle: 'Herbicide linked to Parkinson\'s Disease',
    description: 'Agricultural workers and farmers exposed to Paraquat herbicide may develop Parkinson\'s disease. Lawsuits allege manufacturers knew of neurological risks.',
    icon: '🧠'
  },
  {
    slug: 'talc',
    title: 'Talcum Powder Lawsuits',
    subtitle: 'Baby powder linked to ovarian cancer',
    description: 'Women who used talc-based products (Johnson\'s Baby Powder, Shower to Shower) for feminine hygiene may have developed ovarian cancer or mesothelioma from asbestos contamination.',
    icon: '🧴'
  },
  {
    slug: 'camp-lejeune',
    title: 'Camp Lejeune Water Contamination',
    subtitle: 'Toxic water exposure at Marine base',
    description: 'Veterans and families stationed at Camp Lejeune (1953-1987) were exposed to contaminated water linked to cancer, birth defects, and neurological conditions. PACT Act opens claims.',
    icon: '💧'
  }
];

export default function RelatedCases() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Related Mass Tort Cases
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        If you or a loved one were harmed by Roundup, you may also have been exposed to other dangerous products.
        Explore related cases below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedCases.map((relatedCase) => (
          <a
            key={relatedCase.slug}
            href={`/cases/${relatedCase.slug}`}
            className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start mb-4">
              <span className="text-4xl mr-4">{relatedCase.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {relatedCase.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{relatedCase.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              {relatedCase.description}
            </p>

            <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
              Learn more
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> Each case has different eligibility requirements and deadlines. If you've been exposed
          to multiple harmful products, you may be able to file claims for each one separately. Consult an attorney to
          explore all your legal options.
        </p>
      </div>
    </div>
  );
}
