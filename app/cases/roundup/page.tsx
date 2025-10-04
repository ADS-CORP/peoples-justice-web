import { Metadata } from 'next';
import MiniQualifierForm from '@/components/MiniQualifierForm';
import AuthorByline from '@/components/AuthorByline';
import Citation from '@/components/Citation';
import LitigationUpdateHeader from '@/components/LitigationUpdateHeader';
import SettlementTierExplainer from '@/components/SettlementTierExplainer';
import StatuteTable from '@/components/StatuteTable';
import CaseTimeline from '@/components/CaseTimeline';
import NotableVerdicts from '@/components/NotableVerdicts';
import HowRoundupCausesCancer from '@/components/HowRoundupCausesCancer';
import ScientificStudies from '@/components/ScientificStudies';
import MonsantoPapers from '@/components/MonsantoPapers';
import OccupationRisk from '@/components/OccupationRisk';
import RoundupBanStatus from '@/components/RoundupBanStatus';
import BayerFinancialImpact from '@/components/BayerFinancialImpact';
import RelatedCases from '@/components/RelatedCases';
import TrustBadges from '@/components/TrustBadges';
import ClientTestimonials from '@/components/ClientTestimonials';
import AttorneyProfiles from '@/components/AttorneyProfiles';
import VideoContent from '@/components/VideoContent';
import FloatingCTA from '@/components/FloatingCTA';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import SchemaFAQ, { roundupFAQs } from '@/components/schema/SchemaFAQ';
import SchemaHowTo, { settlementCalculationSteps } from '@/components/schema/SchemaHowTo';
import SchemaOrganization from '@/components/schema/SchemaOrganization';

// Dynamic date formatting for current month/year
const getCurrentMonthYear = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export const metadata: Metadata = {
  title: `Roundup Lawsuits (Updated ${getCurrentMonthYear()}) — Eligibility, Deadlines & Payouts`,
  description: 'Roundup weedkiller has been linked to non-Hodgkin lymphoma. Find out if you qualify for compensation, what evidence helps, and how to connect with experienced attorneys.',
};

export default function RoundupCasePage() {
  const currentMonthYear = getCurrentMonthYear();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Trust Bar Above Fold */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-6 text-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>15,000+ Attorneys</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>$15B+ Recovered</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No Upfront Fees</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                People's Justice
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/cases" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Cases</a>
              <a href="/find" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Find a Lawyer</a>
              <a href="/resources" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Resources</a>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mobile Form - Shows first on mobile */}
          <div className="lg:hidden">
            <div id="qualifier-form-mobile">
              <MiniQualifierForm caseType="roundup" />
            </div>
          </div>

          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <article className="bg-white rounded-2xl shadow-blue-lg hover:shadow-blue-xl transition-all p-8 border border-gray-100 bg-pattern-dots">
              {/* Litigation Update Header - NEW */}
              <LitigationUpdateHeader
                lastUpdated={currentMonthYear}
                activeCases={61000}
                totalSettled="$15+ billion"
                updateSummary="Latest MDL bellwether trials scheduled for Q1 2026. Bayer continues settlement negotiations."
              />

              {/* Updated Badge */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 shadow-soft">
                  ✓ Updated {currentMonthYear}
                </span>
                <span className="text-gray-500 text-sm">5 min read</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight gradient-text drop-shadow-sm">
                Roundup Lawsuits: What You Need to Know
              </h1>

              <AuthorByline
                name="Michael Thompson"
                credentials="Legal Researcher, Mass Tort Specialist"
                date="October 1, 2025"
                photoUrl="/authors/MichaelThompsonAuthor.png"
              />

              {/* Summary Box (Grade 4-6) */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl shadow-elevated-lg">
                <h2 className="text-xl font-bold text-blue-900 mb-3">Quick Summary</h2>
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

              {/* Trust Badges - NEW */}
              <TrustBadges variant="compact" />

              {/* Body Content (Grade 6-7) */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 gradient-text">What Is Roundup?</h2>
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

                {/* How Roundup Causes Cancer - NEW */}
                <HowRoundupCausesCancer />

                {/* Notable Verdicts - NEW */}
                <NotableVerdicts />

                {/* Case Timeline - NEW */}
                <CaseTimeline />

                {/* The Monsanto Papers - Phase 3A */}
                <MonsantoPapers />

                {/* Bayer Financial Impact - Phase 3A */}
                <BayerFinancialImpact />

                {/* Scientific Studies - NEW */}
                <ScientificStudies />

                {/* Scientific Evidence Deep Dive - EXISTING */}
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Science Behind Roundup's Cancer Link</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The connection between glyphosate (Roundup's active ingredient) and non-Hodgkin lymphoma is supported by multiple
                  scientific studies and regulatory findings. Here's what the research shows:
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">IARC Classification (2015)</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The International Agency for Research on Cancer (IARC), part of the World Health Organization, classified
                  glyphosate as "Group 2A: Probably carcinogenic to humans" based on:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li><strong>Limited evidence in humans:</strong> Epidemiological studies showed increased NHL risk among agricultural workers</li>
                  <li><strong>Sufficient evidence in animals:</strong> Laboratory studies demonstrated tumor formation in mice and rats</li>
                  <li><strong>Strong mechanistic evidence:</strong> Genotoxicity (DNA damage) and oxidative stress in human cells</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Epidemiological Studies</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Zhang et al. Meta-Analysis (2019):</strong> Pooled analysis of six epidemiological studies found a
                  <strong> 41% increased risk of non-Hodgkin lymphoma</strong> among individuals with the highest glyphosate exposure
                  compared to those with no exposure.
                  <Citation
                    text="Exposure to Glyphosate-Based Herbicides and Risk for Non-Hodgkin Lymphoma"
                    url="https://www.sciencedirect.com/science/article/pii/S1383574218300887"
                    publisher="Mutation Research/Reviews in Mutation Research"
                    date="2019-02-10"
                  />
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Agricultural Health Study (AHS):</strong> Long-term study of 89,000+ farmers and pesticide applicators
                  found elevated NHL rates among those using glyphosate-based herbicides, particularly diffuse large B-cell lymphoma.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">EPA vs. IARC Controversy</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The U.S. Environmental Protection Agency (EPA) disagreed with IARC's findings, classifying glyphosate as
                  "not likely to be carcinogenic." However, internal documents revealed during litigation showed:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>Monsanto ghostwrote favorable studies and pressured regulators</li>
                  <li>EPA officials allegedly collaborated with Monsanto to delay cancer reviews</li>
                  <li>Independent scientists raised concerns about EPA's methodology and industry influence</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">How Glyphosate Causes Cancer</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Research suggests glyphosate may cause non-Hodgkin lymphoma through several mechanisms:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li><strong>DNA damage:</strong> Genotoxic effects can lead to mutations in lymphocytes (white blood cells)</li>
                  <li><strong>Oxidative stress:</strong> Reactive oxygen species damage cells and DNA</li>
                  <li><strong>Immune system disruption:</strong> Impaired immune function may allow cancerous cells to proliferate</li>
                  <li><strong>Formulation co-factors:</strong> "Inert" ingredients (surfactants like POEA) may increase glyphosate's toxicity</li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Bottom line:</strong> While regulatory agencies debate glyphosate's safety, courts have consistently found
                  that Monsanto/Bayer knew or should have known about cancer risks and failed to warn consumers. Thousands of plaintiffs
                  have successfully proven the link between Roundup and their lymphoma diagnoses.
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

                {/* Who's Most at Risk - Phase 3A */}
                <OccupationRisk />

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
                  </ul>
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900 font-medium">
                      <strong>Note on Timing:</strong> While most cases are for recent diagnoses (2024-2025), we encourage you to submit your information regardless of when you were diagnosed. The "discovery rule" may extend filing deadlines, and each case is unique. Let an attorney review your situation—you may still qualify even if your diagnosis was years ago.
                    </p>
                  </div>
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

                {/* Settlement Tier Explainer - NEW */}
                <SettlementTierExplainer />

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Important Deadlines</h2>
                <div className="bg-red-50 border-l-4 border-red-600 p-6 my-6 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">⚠️ Time Limits Apply</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Each state has a "statute of limitations"—a deadline for filing your claim. This is usually 1-3 years
                    from your diagnosis date, but it varies by state. If you miss the deadline, you lose your right to
                    compensation.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>The Discovery Rule:</strong> Many states use a "discovery rule" that can extend these deadlines. The clock may start when you discovered (or should have discovered) the connection between Roundup and your cancer—not necessarily when you were diagnosed. Because cancer can develop 10-15 years after exposure, you may still qualify even if your diagnosis was years ago. Contact an attorney immediately to review your specific situation and state deadlines.
                  </p>
                </div>

                {/* State Statute Table - NEW */}
                <StatuteTable />
              </div>
            </article>

            {/* FAQ Section - EXPANDED */}
            <div className="bg-white rounded-2xl shadow-blue-lg hover:shadow-blue-xl transition-all p-8 border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {roundupFAQs.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-3 px-4 text-gray-700">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            {/* Roundup Ban Status - Phase 3A */}
            <div className="bg-white rounded-2xl shadow-blue-lg hover:shadow-blue-xl transition-all p-8 border border-gray-100">
              <RoundupBanStatus />
            </div>

            {/* Client Testimonials - NEW */}
            <div className="bg-white rounded-2xl shadow-blue-lg hover:shadow-blue-xl transition-all p-8 border border-gray-100">
              <ClientTestimonials enabled={true} />
            </div>

            {/* Attorney Profiles - NEW */}
            <div className="bg-white rounded-2xl shadow-blue-lg hover:shadow-blue-xl transition-all p-8 border border-gray-100">
              <AttorneyProfiles enabled={true} />
            </div>

            {/* Related Cases - NEW */}
            <RelatedCases />
          </div>

          {/* Right Sidebar - Mini-Qualifier Form - Desktop only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto" id="qualifier-form">
              <MiniQualifierForm caseType="roundup" />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Mobile CTA */}
      <FloatingCTA />

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

      {/* Schema Markup */}
      <SchemaFAQ faqs={roundupFAQs} pageUrl="https://peoplesjustice.com/cases/roundup" />
      <SchemaHowTo
        name="How to Calculate Your Roundup Settlement Amount"
        description="Learn how Bayer's settlement point system works and estimate your potential compensation based on cancer severity, exposure duration, and treatment costs."
        steps={settlementCalculationSteps}
        totalTime="PT15M"
      />
      <SchemaOrganization
        name="People's Justice"
        url="https://peoplesjustice.com"
        description="Connecting injured people with experienced mass tort attorneys nationwide. No upfront fees, free case reviews."
        aggregateRating={{
          ratingValue: 4.8,
          reviewCount: 1250
        }}
      />
    </div>
  );
}
