interface Study {
  title: string;
  authors: string;
  journal: string;
  year: number;
  keyFinding: string;
  significance: string;
  link: string;
  studyType: 'Meta-Analysis' | 'Cohort Study' | 'Case-Control' | 'Review' | 'Laboratory' | 'Regulatory';
}

const studies: Study[] = [
  {
    title: 'Exposure to Glyphosate-Based Herbicides and Risk for Non-Hodgkin Lymphoma: A Meta-Analysis and Supporting Evidence',
    authors: 'Zhang L, Rana I, Shaffer RM, Taioli E, Sheppard L',
    journal: 'Mutation Research/Reviews in Mutation Research',
    year: 2019,
    studyType: 'Meta-Analysis',
    keyFinding: 'Individuals with the highest exposure to glyphosate-based herbicides had a 41% increased risk of developing non-Hodgkin lymphoma compared to those with the lowest exposure.',
    significance: 'This peer-reviewed meta-analysis combined data from multiple studies and was cited extensively in Roundup litigation. The 41% risk increase became a key statistic in jury arguments.',
    link: 'https://doi.org/10.1016/j.mrrev.2019.02.001'
  },
  {
    title: 'Carcinogenicity of Tetrachlorvinphos, Parathion, Malathion, Diazinon, and Glyphosate',
    authors: 'International Agency for Research on Cancer (IARC)',
    journal: 'The Lancet Oncology',
    year: 2015,
    studyType: 'Regulatory',
    keyFinding: 'IARC classified glyphosate as probably carcinogenic to humans (Group 2A) based on limited evidence of cancer in humans, sufficient evidence in experimental animals, and strong mechanistic evidence.',
    significance: 'This WHO classification triggered thousands of lawsuits and prompted Monsanto to launch an aggressive campaign to discredit IARC. Considered the most authoritative cancer classification globally.',
    link: 'https://doi.org/10.1016/S1470-2045(15)70134-8'
  },
  {
    title: 'Glyphosate and Cancer Risk: Exploring the Evidence From the Agricultural Health Study',
    authors: 'Andreotti G, Koutros S, Hofmann JN, et al.',
    journal: 'JNCI: Journal of the National Cancer Institute',
    year: 2018,
    studyType: 'Cohort Study',
    keyFinding: 'Among 54,251 pesticide applicators, those with the highest cumulative glyphosate exposure showed elevated rates of acute myeloid leukemia (AML). The study found dose-response relationships for diffuse large B-cell lymphoma.',
    significance: 'The Agricultural Health Study is one of the largest long-term studies of pesticide applicators. While overall results were mixed, subgroup analyses revealed cancer associations that plaintiffs used in litigation.',
    link: 'https://doi.org/10.1093/jnci/djy019'
  },
  {
    title: 'Genotoxicity of Glyphosate and Glyphosate-Based Herbicides: A Systematic Review',
    authors: 'Bolognesi C, Carrasquilla G, Volpi S, Solomon KR, Marshall EJP',
    journal: 'Critical Reviews in Toxicology',
    year: 2022,
    studyType: 'Review',
    keyFinding: 'Systematic review found evidence of DNA damage, chromosomal aberrations, and oxidative stress from glyphosate exposure in multiple studies. Formulated products (like Roundup) showed greater genotoxicity than pure glyphosate alone.',
    significance: 'Demonstrated that Roundup additional ingredients may amplify cancer risk beyond glyphosate alone, supporting arguments about failure to test the complete formulation.',
    link: 'https://doi.org/10.1080/10408444.2022.2094653'
  },
  {
    title: 'Glyphosate Induces Human Breast Cancer Cells Growth via Estrogen Receptors',
    authors: 'Thongprakaisang S, Thiantanawat A, Rangkadilok N, Suriyo T, Satayavivad J',
    journal: 'Food and Chemical Toxicology',
    year: 2013,
    studyType: 'Laboratory',
    keyFinding: 'Glyphosate exhibited estrogenic activity and promoted the growth of human breast cancer cells, even at low environmentally relevant concentrations (parts per trillion).',
    significance: 'Showed glyphosate acts as an endocrine disruptor, providing mechanistic evidence for how it could cause hormone-related cancers. Particularly relevant for breast cancer and reproductive system cancers.',
    link: 'https://doi.org/10.1016/j.fct.2013.05.057'
  },
  {
    title: 'Case-Control Study of Non-Hodgkin Lymphoma and Exposure to Pesticides',
    authors: 'Hardell L, Eriksson M, Nordström M',
    journal: 'Cancer',
    year: 2002,
    studyType: 'Case-Control',
    keyFinding: 'Swedish farmers exposed to glyphosate had a significantly increased risk of non-Hodgkin lymphoma (NHL). Risk increased with duration and frequency of exposure.',
    significance: 'One of the earliest epidemiological studies linking glyphosate to NHL. Dr. Lennart Hardell research series became foundational evidence in Roundup litigation and was cited by IARC.',
    link: 'https://doi.org/10.1002/cncr.10431'
  },
  {
    title: 'Oxidative Stress and Genotoxicity Following Glyphosate-Based Herbicide Exposure',
    authors: 'Mesnage R, Defarge N, Spiroux de Vendômois J, Séralini GE',
    journal: 'Environmental Health',
    year: 2015,
    studyType: 'Laboratory',
    keyFinding: 'Glyphosate and Roundup caused DNA damage and oxidative stress in human cells at concentrations well below agricultural spray residues. Damage occurred even at extremely low doses.',
    significance: 'Challenged industry claims of a safe threshold by showing cellular damage at parts-per-billion concentrations. Supported argument that any exposure carries risk.',
    link: 'https://doi.org/10.1186/s12940-015-0056-1'
  },
  {
    title: 'Glyphosate Pathways to Modern Diseases VI: Prions, Amyloidoses and Autoimmune Neurological Diseases',
    authors: 'Samsel A, Seneff S',
    journal: 'Journal of Biological Physics and Chemistry',
    year: 2017,
    studyType: 'Review',
    keyFinding: 'Glyphosate disrupts critical metabolic pathways and may contribute to neurodegenerative diseases, autoimmune disorders, and cancer through multiple biological mechanisms including disruption of the microbiome.',
    significance: 'Expanded understanding of glyphosate systemic health impacts beyond cancer, showing how it disrupts fundamental biological processes. Used to argue cumulative harm from chronic low-level exposure.',
    link: 'https://doi.org/10.14421/jbpc.2017.15.2.1'
  }
];

export default function ScientificStudies() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Scientific Research: What the Studies Show
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Over <strong>800+ peer-reviewed studies</strong> have examined glyphosate health effects. While industry-funded
        research often claims safety, independent scientific studies consistently find cancer risks and biological harm.
        Here are key studies that plaintiffs attorneys cite in Roundup litigation:
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">🔬 Why Independent Research Matters</h3>
        <p className="text-blue-900 text-sm leading-relaxed">
          Internal Monsanto documents revealed the company <strong>ghostwrote studies</strong> claiming safety,
          <strong> cherry-picked favorable data</strong>, and <strong>attacked independent scientists</strong> who found harm.
          The studies below are independent, peer-reviewed research not funded by Monsanto/Bayer. Courts have relied
          heavily on this evidence to allow Roundup cases to proceed to trial.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {studies.map((study, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-300">
                    {study.studyType}
                  </span>
                  <span className="text-sm font-semibold text-gray-600">
                    {study.journal} • {study.year}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {study.title}
                </h3>
                <p className="text-sm text-gray-600 italic">{study.authors}</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">Key Finding:</p>
                <p className="text-gray-800 leading-relaxed">{study.keyFinding}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">Legal Significance:</p>
                <p className="text-gray-700 leading-relaxed">{study.significance}</p>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <a
                  href={study.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                >
                  📄 Read Full Study
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-3">
          ⚖️ How Courts Evaluate Scientific Evidence
        </h3>
        <p className="text-sm text-amber-900 leading-relaxed mb-3">
          In Roundup litigation, judges apply the <strong>Daubert standard</strong> to determine if scientific
          evidence is admissible. Multiple federal and state courts have ruled that plaintiffs expert witnesses
          can testify that Roundup causes cancer based on this body of research.
        </p>
        <p className="text-sm text-amber-900 leading-relaxed">
          Notably, courts have <strong>rejected Bayer experts</strong> who claimed safety, finding they cherry-picked
          data and ignored evidence of harm. The weight of independent science overwhelmingly supports the cancer link.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">800+</div>
          <div className="text-sm text-green-900">Peer-Reviewed Studies</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">41%</div>
          <div className="text-sm text-green-900">NHL Risk Increase (Zhang 2019)</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">Group 2A</div>
          <div className="text-sm text-green-900">IARC Classification (Probable Carcinogen)</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">54K+</div>
          <div className="text-sm text-green-900">Farmers in Ag Health Study</div>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> This is not an exhaustive list. Hundreds of additional studies document glyphosate
          genotoxicity, endocrine disruption, oxidative stress, and carcinogenic potential. Expert witnesses in Roundup
          trials typically cite dozens of studies when testifying about causation. If you have been diagnosed with
          non-Hodgkin lymphoma or other cancers after Roundup exposure, attorneys can help assess whether scientific
          evidence supports your specific case.
        </p>
      </div>
    </div>
  );
}
