export default function HowRoundupCausesCancer() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        How Does Roundup Cause Cancer?
      </h2>

      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-700 mb-4">
          Roundup's active ingredient, <strong>glyphosate</strong>, has been linked to non-Hodgkin lymphoma and other cancers through several biological mechanisms:
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            The Simple Explanation
          </h3>
          <ol className="space-y-3 text-gray-700">
            <li>
              <strong>1. DNA Damage:</strong> Glyphosate causes breaks and mutations in your DNA, which can lead to cancer cells forming.
            </li>
            <li>
              <strong>2. Oxidative Stress:</strong> It creates harmful molecules called "free radicals" that damage cells and weaken your body's ability to repair itself.
            </li>
            <li>
              <strong>3. Hormone Disruption:</strong> Glyphosate interferes with your hormone system, which can trigger abnormal cell growth.
            </li>
            <li>
              <strong>4. Immune System Damage:</strong> It weakens your immune system's ability to find and destroy cancer cells before they spread.
            </li>
          </ol>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">⚠️ What Makes It Dangerous</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Absorbs through skin during use</li>
              <li>• Can be inhaled as spray mist</li>
              <li>• Builds up in body over time</li>
              <li>• Effects worsen with repeated exposure</li>
              <li>• No "safe" exposure level established</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">🔬 Scientific Consensus</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• WHO classified as "probable carcinogen" (2015)</li>
              <li>• 41% increased NHL risk in heavy users</li>
              <li>• Over 800 peer-reviewed studies</li>
              <li>• Internal Monsanto emails confirm risks</li>
              <li>• Banned in 20+ countries worldwide</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">
            💡 Why This Matters for Your Case
          </h4>
          <p className="text-sm text-gray-700 mb-0">
            Monsanto knew about these cancer risks as early as the 1980s but hid the evidence from the public.
            Internal documents (the "Monsanto Papers") revealed the company ghostwrote research claiming Roundup
            was safe, attacked scientists who found harm, and worked with EPA officials to suppress cancer findings.
            This pattern of deception is why juries have awarded billions in punitive damages.
          </p>
        </div>
      </div>
    </div>
  );
}
