'use client';

import { useState } from 'react';

interface BanEntry {
  location: string;
  type: 'country' | 'state' | 'city' | 'retailer';
  status: 'Full Ban' | 'Partial Ban' | 'Restricted' | 'Considering Ban';
  effectiveDate: string;
  details: string;
}

const banData: BanEntry[] = [
  // Countries
  {
    location: 'Austria',
    type: 'country',
    status: 'Full Ban',
    effectiveDate: '2020',
    details: 'First EU country to completely ban glyphosate. Overturned by EU courts in 2023 due to regulatory conflicts, but ban sentiment remains strong.'
  },
  {
    location: 'Germany',
    type: 'country',
    status: 'Full Ban',
    effectiveDate: '2023',
    details: 'Phased out glyphosate for home and garden use. Agricultural use heavily restricted with goal of complete elimination.'
  },
  {
    location: 'Vietnam',
    type: 'country',
    status: 'Full Ban',
    effectiveDate: '2019',
    details: 'Banned import and use of glyphosate-based herbicides citing health risks.'
  },
  {
    location: 'European Union',
    type: 'country',
    status: 'Restricted',
    effectiveDate: '2023',
    details: 'Re-approved glyphosate for 10 years (2023-2033) with restrictions. Several member states oppose and may implement national bans. Pre-harvest desiccation banned in many countries.'
  },
  {
    location: 'Mexico',
    type: 'country',
    status: 'Considering Ban',
    effectiveDate: '2024 (proposed)',
    details: 'Presidential decree to phase out glyphosate by 2024, but implementation delayed due to trade disputes with US. Ban on GM corn imports linked to glyphosate use.'
  },
  {
    location: 'Sri Lanka',
    type: 'country',
    status: 'Partial Ban',
    effectiveDate: '2014-2015',
    details: 'Banned in certain regions after links to chronic kidney disease in agricultural communities. Later partially lifted with restrictions.'
  },
  // US States/Cities
  {
    location: 'California (Prop 65)',
    type: 'state',
    status: 'Restricted',
    effectiveDate: '2017',
    details: 'Listed glyphosate as chemical known to cause cancer under Proposition 65. Requires warning labels on Roundup products sold in California.'
  },
  {
    location: 'Los Angeles, CA',
    type: 'city',
    status: 'Full Ban',
    effectiveDate: '2022',
    details: 'Banned glyphosate use on city property including parks, playgrounds, and sports fields. One of first major US cities to ban.'
  },
  {
    location: 'Miami, FL',
    type: 'city',
    status: 'Full Ban',
    effectiveDate: '2019',
    details: 'Prohibited glyphosate use on all city-owned property after public pressure.'
  },
  {
    location: 'Portland, OR',
    type: 'city',
    status: 'Full Ban',
    effectiveDate: '2015',
    details: 'One of earliest US cities to ban glyphosate on city property.'
  },
  // Retailers
  {
    location: 'Costco (Canada)',
    type: 'retailer',
    status: 'Full Ban',
    effectiveDate: '2022',
    details: 'Removed all glyphosate products from Canadian stores. US stores still carry Roundup.'
  },
  {
    location: 'Home Depot / Lowe\'s',
    type: 'retailer',
    status: 'Restricted',
    effectiveDate: '2019',
    details: 'Major retailers reduced Roundup shelf space, added warning signage, and promoted alternative products following lawsuits.'
  },
  // School Districts
  {
    location: 'Los Angeles Unified (LAUSD)',
    type: 'city',
    status: 'Full Ban',
    effectiveDate: '2019',
    details: 'Second-largest school district in US banned glyphosate on all school grounds, sports fields, and playgrounds.'
  },
  {
    location: 'Chicago Public Schools',
    type: 'city',
    status: 'Full Ban',
    effectiveDate: '2021',
    details: 'Switched to organic alternatives for all school property maintenance.'
  }
];

const typeColors = {
  country: 'bg-purple-100 text-purple-800',
  state: 'bg-blue-100 text-blue-800',
  city: 'bg-green-100 text-green-800',
  retailer: 'bg-orange-100 text-orange-800'
};

const statusColors = {
  'Full Ban': 'bg-red-100 text-red-800 border-red-300',
  'Partial Ban': 'bg-orange-100 text-orange-800 border-orange-300',
  'Restricted': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Considering Ban': 'bg-gray-100 text-gray-800 border-gray-300'
};

export default function RoundupBanStatus() {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredData = filterType === 'all'
    ? banData
    : banData.filter(entry => entry.type === filterType);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Where Is Roundup Banned or Restricted?
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Growing recognition of Roundup's cancer risks has led many countries, states, cities, and retailers to ban or
        restrict glyphosate products. Here's a snapshot of jurisdictions taking action to protect public health.
      </p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterType === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({banData.length})
        </button>
        <button
          onClick={() => setFilterType('country')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterType === 'country'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Countries ({banData.filter(e => e.type === 'country').length})
        </button>
        <button
          onClick={() => setFilterType('state')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterType === 'state'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          US States ({banData.filter(e => e.type === 'state').length})
        </button>
        <button
          onClick={() => setFilterType('city')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterType === 'city'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Cities/Schools ({banData.filter(e => e.type === 'city').length})
        </button>
        <button
          onClick={() => setFilterType('retailer')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterType === 'retailer'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Retailers ({banData.filter(e => e.type === 'retailer').length})
        </button>
      </div>

      {/* Ban List */}
      <div className="space-y-4">
        {filteredData.map((entry, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-500 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{entry.location}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeColors[entry.type]}`}>
                    {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[entry.status]}`}>
                    {entry.status}
                  </span>
                  <span className="text-xs text-gray-600">Effective: {entry.effectiveDate}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{entry.details}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg">
        <p className="text-sm text-green-900 leading-relaxed">
          <strong>Global Trend:</strong> Over 20 countries have banned or restricted glyphosate, with more considering action.
          In the US, hundreds of cities and school districts have stopped using Roundup on public property. This growing
          international consensus supports the link between Roundup and cancer—the same link that's led to billions in
          lawsuit settlements.
        </p>
      </div>
    </div>
  );
}
