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
        State Filing Deadlines (Statute of Limitations)
      </h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        Each state has different deadlines for filing a Roundup lawsuit. This table shows the general statute of
        limitations by state. Many states have a "discovery rule" that extends the deadline to when you discovered
        (or should have discovered) your injury.
      </p>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
        <p className="text-sm text-yellow-900">
          <strong>⚠️ Important:</strong> This table provides general information only. Statute of limitations laws are complex
          and have many exceptions. Consult an attorney immediately to check your specific deadline. Missing your deadline
          means you lose your right to compensation—no exceptions.
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
  );
}
