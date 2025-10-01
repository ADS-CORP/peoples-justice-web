import { Metadata } from 'next';
import MiniQualifierForm from '@/components/MiniQualifierForm';
import AuthorByline from '@/components/AuthorByline';
import Citation from '@/components/Citation';

export const metadata: Metadata = {
  title: 'Roundup Lawsuits (Updated October 2025) — Eligibility, Deadlines & Payouts',
  description: 'Roundup weedkiller has been linked to non-Hodgkin lymphoma. Find out if you qualify for compensation, what evidence helps, and how to connect with experienced attorneys.',
};

export default function RoundupCasePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">People's Justice</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/cases" className="text-gray-700 hover:text-blue-600">Cases</a>
              <a href="/find" className="text-gray-700 hover:text-blue-600">Find a Lawyer</a>
              <a href="/resources" className="text-gray-700 hover:text-blue-600">Resources</a>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
              Get Help Now
            </button>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
            <span className="text-gray-400">/</span>
            <a href="/cases" className="text-gray-500 hover:text-gray-700">Cases</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Roundup Lawsuits</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <article className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              {/* Updated Badge */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  ✓ Updated October 2025
                </span>
                <span className="text-gray-500 text-sm">5 min read</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Roundup Lawsuits: What You Need to Know
              </h1>

              <AuthorByline
                name="Dr. Sarah Martinez"
                credentials="JD, Environmental Law Specialist"
                date="October 1, 2025"
                photoUrl="/authors/sarah-martinez.jpg"
              />

              {/* Summary Box (Grade 4-6) */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 rounded-r-lg">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">Quick Summary</h2>
                <p className="text-gray-700 leading-relaxed">
                  Roundup weedkiller contains glyphosate, which has been linked to non-Hodgkin lymphoma and other cancers.
                  If you used Roundup regularly and were later diagnosed with lymphoma, you may be able to get compensation.
                  Thousands of people have filed claims, and billions have been paid out. Getting help is free—lawyers only
                  get paid if you win.
                </p>
              </div>

              {/* Key Facts */}
              <div className="bg-gray-50 rounded-lg p-6 my-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Facts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Over 100,000 claims filed against Bayer (Roundup's maker)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">$10+ billion paid in settlements so far</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">WHO classified glyphosate as "probably carcinogenic"</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Cases still being accepted (time limits apply)</span>
                  </li>
                </ul>
              </div>

              {/* Body Content (Grade 6-7) */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Is Roundup?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Roundup is one of the most widely used weedkillers in the United States. Its main ingredient is glyphosate,
                  a chemical that kills weeds and unwanted plants. For decades, Monsanto (now owned by Bayer) marketed Roundup
                  as safe for home and farm use.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  However, research has shown that glyphosate may cause cancer. In 2015, the World Health Organization's
                  International Agency for Research on Cancer (IARC) classified glyphosate as "probably carcinogenic to humans."
                  <Citation
                    text="IARC Monographs Volume 112: Glyphosate"
                    url="https://www.iarc.who.int/featured-news/media-centre-iarc-news-glyphosate/"
                    publisher="World Health Organization"
                    date="2015-03-20"
                  />
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Injuries Are Linked to Roundup?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The primary health concern is non-Hodgkin lymphoma (NHL), a type of blood cancer. Studies have found that
                  people who used Roundup regularly were more likely to develop:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Non-Hodgkin lymphoma (NHL)</li>
                  <li>Chronic lymphocytic leukemia (CLL)</li>
                  <li>Diffuse large B-cell lymphoma (DLBCL)</li>
                  <li>Mantle cell lymphoma</li>
                  <li>T-cell lymphoma</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Who Qualifies for a Claim?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You may qualify if you meet these criteria:
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-3">Eligibility Checklist</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="font-medium mr-2">✓</span>
                      You used Roundup regularly (at least once a month for a year or more)
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">✓</span>
                      You were diagnosed with non-Hodgkin lymphoma or related cancer
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">✓</span>
                      Your diagnosis came after you started using Roundup
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium mr-2">✓</span>
                      You filed within your state's time limit (statute of limitations)
                    </li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Evidence Helps Your Case?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The stronger your evidence, the better your chances of getting compensation. Helpful documents include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li><strong>Medical records</strong> showing your lymphoma diagnosis and treatment</li>
                  <li><strong>Purchase receipts</strong> for Roundup products (if available)</li>
                  <li><strong>Employment records</strong> if you used Roundup at work (farmers, landscapers, groundskeepers)</li>
                  <li><strong>Photos or videos</strong> showing Roundup use</li>
                  <li><strong>Witness statements</strong> from family or coworkers who saw you use Roundup</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Don't worry if you don't have all of these—an attorney can help you gather evidence.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How Much Compensation Can You Get?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Settlement amounts vary widely based on factors like:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Severity of your cancer (stage, treatment required, prognosis)</li>
                  <li>How long you used Roundup</li>
                  <li>How much Roundup you were exposed to</li>
                  <li>Your medical bills and lost wages</li>
                  <li>Pain and suffering</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some jury verdicts have awarded tens of millions of dollars. Settlement amounts typically range from
                  $50,000 to $500,000 or more, but each case is unique.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Important Deadlines</h2>
                <div className="bg-red-50 border-l-4 border-red-600 p-6 my-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">⚠️ Time Limits Apply</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Each state has a "statute of limitations"—a deadline for filing your claim. This is usually 1-3 years
                    from your diagnosis date, but it varies by state. If you miss the deadline, you lose your right to
                    compensation. Contact an attorney as soon as possible to protect your rights.
                  </p>
                </div>
              </div>
            </article>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="font-medium text-gray-900">Do I have to pay upfront to hire a lawyer?</span>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 px-4 text-gray-700">
                    No. Most Roundup attorneys work on a "contingency fee" basis. This means you don't pay anything unless you win.
                    The lawyer takes a percentage of your settlement (usually 30-40%). If you don't get money, you don't owe anything.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="font-medium text-gray-900">How long does a Roundup case take?</span>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 px-4 text-gray-700">
                    Most cases settle within 12-18 months, but it can vary. Some settle sooner if the evidence is strong.
                    Cases that go to trial can take 2-3 years. Your attorney will give you a better estimate based on your situation.
                  </p>
                </details>

                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="font-medium text-gray-900">What if I used other weedkillers too?</span>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 px-4 text-gray-700">
                    That's okay. You can still file a claim if you used Roundup regularly, even if you also used other products.
                    Tell your attorney about all products you used so they can build the strongest case.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Mini-Qualifier Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <MiniQualifierForm caseType="roundup" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">People's Justice</h3>
              <p className="text-gray-400 text-sm">
                Connecting injured people with experienced attorneys nationwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Cases</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/cases/roundup" className="hover:text-white">Roundup</a></li>
                <li><a href="/cases/talc" className="hover:text-white">Talcum Powder</a></li>
                <li><a href="/cases/camp-lejeune" className="hover:text-white">Camp Lejeune</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/resources/statute-tracker" className="hover:text-white">Statute Tracker</a></li>
                <li><a href="/editorial-policy" className="hover:text-white">Editorial Policy</a></li>
                <li><a href="/authors" className="hover:text-white">Our Authors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400">
            <p>© 2025 People's Justice. This is an advertising and referral service. Not a law firm.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
