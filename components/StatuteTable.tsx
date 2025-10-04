'use client';

import { useState, useMemo } from 'react';
import statuteData from '@/data/statute-of-limitations.json';

interface StatuteEntry {
  state: string;
  code: string;
  deadline: string;
  discoveryRule: boolean;
  notes: string;
}

export default function StatuteTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'state' | 'deadline'>('state');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedData = useMemo(() => {
    let filtered = statuteData.filter((entry: StatuteEntry) =>
      entry.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a: StatuteEntry, b: StatuteEntry) => {
      if (sortBy === 'state') {
        return sortOrder === 'asc'
          ? a.state.localeCompare(b.state)
          : b.state.localeCompare(a.state);
      } else {
        // Sort by deadline (convert to numbers for comparison)
        const aYears = parseInt(a.deadline);
        const bYears = parseInt(b.deadline);
        return sortOrder === 'asc' ? aYears - bYears : bYears - aYears;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, sortOrder]);

  const toggleSort = (column: 'state' | 'deadline') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Understanding Filing Deadlines for Roundup Cases
      </h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Most states use a "discovery rule" that extends filing deadlines for toxic exposure cases. The clock typically starts when you discovered (or reasonably should have discovered) that Roundup caused your cancer—not when you were diagnosed.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">How the Discovery Rule Works - Real Examples:</h3>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-gray-900 mb-1">California Example:</p>
            <p className="text-sm text-gray-700 mb-2">Diagnosed with NHL in 2017, but only learned about the Roundup-cancer connection in 2023 after seeing news coverage.</p>
            <p className="text-sm text-blue-900">
              <strong>→ Your 2-year deadline likely starts from 2023 (when you discovered the link), not 2017.</strong>
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-gray-900 mb-1">Illinois Example:</p>
            <p className="text-sm text-gray-700 mb-2">Diagnosed in 2019, but didn't connect it to decades of Roundup use until the 2024 trial verdicts brought widespread attention.</p>
            <p className="text-sm text-blue-900">
              <strong>→ Discovery rule may extend your deadline to 2026 or later, depending on when you made the connection.</strong>
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-gray-900 mb-1">Pennsylvania Example:</p>
            <p className="text-sm text-gray-700 mb-2">Used Roundup for 20+ years, diagnosed in 2016, recently discovered the link through a family member's lawsuit.</p>
            <p className="text-sm text-blue-900">
              <strong>→ Even with an older diagnosis, you may still qualify if you only recently discovered the Roundup connection.</strong>
            </p>
          </div>
        </div>

        <p className="text-sm text-blue-900 font-semibold mt-4 pt-4 border-t border-blue-200">
          Bottom line: Submit your information regardless of diagnosis date. An attorney will review your specific timeline and state laws to determine if you qualify.
        </p>
      </div>

      {/* Collapsible State-by-State Table */}
      <details className="group mt-6">
        <summary className="cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-300 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-base font-semibold text-gray-900">Advanced: See State-by-State Reference Table</span>
              <p className="text-sm text-gray-600 mt-1">General statute of limitations by state (with important caveats)</p>
            </div>
            <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </summary>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-r-lg">
            <p className="text-sm text-yellow-900">
              <strong>⚠️ Important Disclaimer:</strong> This table shows general statute of limitations periods for personal injury claims. These deadlines often DO NOT apply to Roundup cases due to the discovery rule. Do not self-disqualify based on these numbers. Contact an attorney for a free case review.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <label htmlFor="state-search" className="sr-only">Search for your state</label>
            <input
              id="state-search"
              type="text"
              placeholder="Search for your state (e.g., California, CA)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSort('state')}
              >
                <div className="flex items-center">
                  State
                  {sortBy === 'state' && (
                    <svg className={`ml-2 w-4 h-4 ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSort('deadline')}
              >
                <div className="flex items-center">
                  Deadline
                  {sortBy === 'deadline' && (
                    <svg className={`ml-2 w-4 h-4 ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discovery Rule
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedData.map((entry: StatuteEntry) => (
              <tr key={entry.code} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{entry.state}</div>
                  <div className="text-sm text-gray-500">{entry.code}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    entry.deadline === '1 year' ? 'bg-red-100 text-red-800' :
                    entry.deadline === '2 years' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {entry.deadline}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {entry.discoveryRule ? (
                    <span className="flex items-center text-green-700">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Yes
                    </span>
                  ) : (
                    <span className="flex items-center text-red-700">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      No / Limited
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {entry.notes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

          {filteredAndSortedData.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No states found matching "{searchTerm}"</p>
          )}

          <div className="mt-4 text-sm text-gray-600">
            <p>
              <strong>Showing {filteredAndSortedData.length} of {statuteData.length} states.</strong>
              {' '}Discovery Rule = Deadline extends to when you discovered or should have discovered your injury.
            </p>
          </div>
        </div>
      </details>
    </div>
  );
}
