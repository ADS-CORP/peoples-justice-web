export default function BayerFinancialImpact() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Bayer's Acquisition of Monsanto: A $63 Billion Gamble
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        In 2018, German pharmaceutical giant Bayer AG acquired Monsanto for $63 billion—one of the largest corporate
        acquisitions in history. Within months, the first Roundup verdicts landed, and Bayer inherited a liability
        nightmare that has cost the company over $16 billion and counting.
      </p>

      {/* Timeline */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acquisition Timeline & Financial Fallout</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-600">June 2018</div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">Bayer Closes Monsanto Acquisition</p>
              <p className="text-sm text-gray-700">$63 billion deal finalized. Bayer becomes world's largest seeds and pesticides company.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-600">Aug 2018</div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">First Roundup Verdict: $289M</p>
              <p className="text-sm text-gray-700">Johnson v. Monsanto verdict rocks markets. Bayer stock drops 10% in a single day.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-600">2019</div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">Stock Collapse Accelerates</p>
              <p className="text-sm text-gray-700">Three massive verdicts ($289M, $80M, $2B). Bayer stock down 40% from pre-acquisition peak.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-600">June 2020</div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">$10 Billion Settlement Announced</p>
              <p className="text-sm text-gray-700">Bayer agrees to pay up to $10.9B to settle ~100,000 claims. Does not admit liability.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-600">2024</div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">Additional $2.25B Allocated</p>
              <p className="text-sm text-gray-700">New settlement fund for post-2020 cases. Total Roundup liability exceeds $16 billion.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-red-600 mb-1">-44%</div>
          <div className="text-sm text-red-900">Stock Price Decline</div>
          <div className="text-xs text-red-700 mt-1">(2018 peak to 2024 low)</div>
        </div>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-red-600 mb-1">$16B+</div>
          <div className="text-sm text-red-900">Total Roundup Costs</div>
          <div className="text-xs text-red-700 mt-1">(Settlements + reserves)</div>
        </div>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-red-600 mb-1">$30B+</div>
          <div className="text-sm text-red-900">Market Cap Lost</div>
          <div className="text-xs text-red-700 mt-1">(Since acquisition)</div>
        </div>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-5 text-center">
          <div className="text-3xl font-bold text-red-600 mb-1">61,000+</div>
          <div className="text-sm text-red-900">Active Claims Remain</div>
          <div className="text-xs text-red-700 mt-1">(As of Oct 2025)</div>
        </div>
      </div>

      {/* Shareholder Backlash */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6 rounded-r-lg">
        <h3 className="text-lg font-semibold text-yellow-900 mb-3">📉 Shareholder Revolt</h3>
        <p className="text-yellow-900 text-sm leading-relaxed mb-3">
          Bayer shareholders have sued the company's leadership for failing to conduct adequate due diligence before
          acquiring Monsanto. Critics argue Bayer executives ignored obvious litigation risks.
        </p>
        <ul className="space-y-2 text-sm text-yellow-900">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>2019:</strong> 55% of shareholders vote "no confidence" in management at annual meeting</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>2020:</strong> CEO Werner Baumann pressured to resign over Monsanto deal</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>2024:</strong> Multiple shareholder derivative lawsuits alleging breach of fiduciary duty</span>
          </li>
        </ul>
      </div>

      {/* Credit Ratings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Rating Downgrades</h3>
        <p className="text-gray-700 text-sm mb-4">
          Major credit agencies downgraded Bayer's debt rating due to Roundup liabilities, increasing borrowing costs
          and limiting financial flexibility.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="font-bold text-gray-900 mb-2">Moody's</div>
            <div className="text-sm text-gray-700">Downgraded from A2 to A3 (2020)</div>
            <div className="text-xs text-gray-600 mt-1">Cited "significant litigation risk"</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="font-bold text-gray-900 mb-2">S&P Global</div>
            <div className="text-sm text-gray-700">Negative outlook assigned (2019-2024)</div>
            <div className="text-xs text-gray-600 mt-1">Warned of "ongoing Roundup uncertainty"</div>
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
        <p className="text-sm text-blue-900 leading-relaxed">
          <strong>Why This Matters for Your Case:</strong> Bayer's financial pain demonstrates the company's ongoing
          liability for Roundup injuries. Despite paying over $16 billion, Bayer continues to face tens of thousands
          of active claims. The company's willingness to settle—rather than fight every case in court—shows it recognizes
          the strength of plaintiffs' evidence and the risk of additional massive verdicts.
        </p>
      </div>
    </div>
  );
}
