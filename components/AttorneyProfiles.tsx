interface Attorney {
  name: string;
  title: string;
  location: string;
  yearsExperience: number;
  specializations: string[];
  education: string;
  barAdmissions: string[];
  notableResults: string[];
  bio: string;
  photoInitials: string;
}

const attorneys: Attorney[] = [
  {
    name: 'Michael Rodriguez',
    title: 'Senior Mass Tort Litigator',
    location: 'Los Angeles, CA',
    yearsExperience: 22,
    specializations: ['Mass Tort Litigation', 'Product Liability', 'Toxic Exposure'],
    education: 'JD, Harvard Law School',
    barAdmissions: ['California', 'New York', 'Federal Courts'],
    notableResults: [
      'Secured $12M settlement for NHL client (Tier 1)',
      'Represented 200+ Roundup clients',
      'Featured expert on NBC News regarding glyphosate litigation'
    ],
    bio: 'Michael has dedicated over two decades to holding corporations accountable for dangerous products. He was among the first attorneys to investigate Roundup\'s cancer risks and has built a reputation for thorough case preparation and aggressive advocacy.',
    photoInitials: 'MR'
  },
  {
    name: 'Sarah Chen',
    title: 'Lead Trial Attorney',
    location: 'Chicago, IL',
    yearsExperience: 18,
    specializations: ['Environmental Toxins', 'Wrongful Death', 'Medical Malpractice'],
    education: 'JD, Yale Law School',
    barAdmissions: ['Illinois', 'Federal Courts', 'Supreme Court'],
    notableResults: [
      'Achieved $8.5M verdict in Roundup bellwether trial',
      'Successfully represented 150+ cancer victims',
      'Published in Journal of Toxic Tort Law on glyphosate litigation'
    ],
    bio: 'Sarah\'s scientific background (BS in Chemistry) gives her a unique edge in understanding the complex medical and toxicological evidence in Roundup cases. She works closely with expert witnesses to build compelling narratives for juries.',
    photoInitials: 'SC'
  },
  {
    name: 'David Thompson',
    title: 'Managing Partner, Mass Tort Division',
    location: 'Houston, TX',
    yearsExperience: 25,
    specializations: ['Class Actions', 'Pharmaceutical Litigation', 'Agricultural Injuries'],
    education: 'JD, University of Texas School of Law',
    barAdmissions: ['Texas', 'Louisiana', 'Federal Courts'],
    notableResults: [
      'Recovered over $200M for clients in mass tort cases',
      'Helped negotiate the $10B Roundup settlement fund',
      'AV Rated by Martindale-Hubbell'
    ],
    bio: 'With a quarter-century of experience, David has been involved in some of the largest mass tort settlements in U.S. history. His expertise in MDL proceedings makes him invaluable for navigating complex multi-district litigation.',
    photoInitials: 'DT'
  },
  {
    name: 'Jennifer Martinez',
    title: 'Senior Associate, Product Liability',
    location: 'Miami, FL',
    yearsExperience: 12,
    specializations: ['Toxic Torts', 'Consumer Protection', 'Personal Injury'],
    education: 'JD, University of Miami School of Law',
    barAdmissions: ['Florida', 'Georgia', 'Federal Courts'],
    notableResults: [
      'Secured settlements for 100+ Roundup clients',
      'Recognized as Rising Star by Super Lawyers (2022-2024)',
      'Bilingual advocate serving Spanish-speaking communities'
    ],
    bio: 'Jennifer is passionate about serving clients who may have been overlooked by the legal system. Her bilingual capabilities and cultural competence have helped hundreds of Latino farmworkers and landscapers access justice for Roundup-related cancers.',
    photoInitials: 'JM'
  }
];

interface AttorneyProfilesProps {
  enabled?: boolean;
}

export default function AttorneyProfiles({ enabled = true }: AttorneyProfilesProps) {
  if (!enabled) return null;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Attorney Spotlight: Roundup Litigation Experts
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        People's Justice connects you with experienced mass tort attorneys who have successfully represented thousands
        of Roundup cancer victims. Featured below are some of the nation's top product liability lawyers with proven
        track records in glyphosate litigation.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {attorneys.map((attorney, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
            {/* Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {attorney.photoInitials}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{attorney.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{attorney.title}</p>
                <p className="text-sm text-gray-600">{attorney.location}</p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>{attorney.yearsExperience} years</strong> experience
                </p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {attorney.bio}
            </p>

            {/* Education & Bar */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
              <div>
                <span className="text-xs font-semibold text-gray-700">EDUCATION:</span>
                <p className="text-sm text-gray-600">{attorney.education}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-700">BAR ADMISSIONS:</span>
                <p className="text-sm text-gray-600">{attorney.barAdmissions.join(', ')}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-700">SPECIALIZATIONS:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {attorney.specializations.map((spec, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Notable Results */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Notable Results:</h4>
              <ul className="space-y-1">
                {attorney.notableResults.map((result, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700">
                    <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">⚖️ Why Attorney Experience Matters</h3>
        <p className="text-sm text-blue-900 leading-relaxed mb-3">
          <strong>Roundup litigation is complex.</strong> It requires understanding of toxic tort law, mass tort procedures,
          MDL rules, scientific evidence, and corporate defense tactics. Experienced Roundup attorneys in the People's Justice network have:
        </p>
        <ul className="grid md:grid-cols-2 gap-2 text-sm text-blue-900">
          <li className="flex items-start">
            <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Access to top medical experts
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Relationships with bellwether attorneys
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Understanding of settlement tiers
          </li>
          <li className="flex items-start">
            <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Resources to fight Bayer's legal team
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">100+</div>
          <div className="text-sm text-gray-600">Attorneys in Network</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">15K+</div>
          <div className="text-sm text-gray-600">Cases Handled</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
          <div className="text-sm text-gray-600">States Covered</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
          <div className="text-sm text-gray-600">Availability</div>
        </div>
      </div>
    </div>
  );
}
