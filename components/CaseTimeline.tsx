'use client';

import { useState } from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  outcome?: string;
  type: 'filing' | 'verdict' | 'settlement' | 'regulatory' | 'mdl';
}

interface YearGroup {
  year: string;
  events: TimelineEvent[];
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'October 2025',
    title: 'Current Status: 61,000+ Active Claims',
    description: 'Approximately 61,000 claims remain active in MDL and state courts. Bayer reports $15+ billion paid in settlements to date. New bellwether trials scheduled for Q1 2026.',
    outcome: 'Cases still being filed; time limits vary by state.',
    type: 'mdl'
  },
  {
    date: 'January 2025',
    title: 'EPA Re-Evaluates Glyphosate',
    description: 'EPA announces interim review of glyphosate registration following continued public health concerns and new epidemiological studies.',
    type: 'regulatory'
  },
  {
    date: 'June 2024',
    title: 'Additional $2.25 Billion Settlement',
    description: 'Bayer announces additional $2.25 billion settlement allocation for cases filed after June 2020, bringing total settlements to ~$12+ billion.',
    type: 'settlement'
  },
  {
    date: 'November 2023',
    title: 'Shelton Verdict: $1.56 Billion',
    description: 'Four plaintiffs (Shelton, Clark, Stevick, Langford) win combined $1.56 billion verdict in Missouri state court, including $1.25 billion in punitives.',
    outcome: 'Largest verdict since Pilliod case; Bayer appeals.',
    type: 'verdict'
  },
  {
    date: 'February 2022',
    title: 'MDL Bellwether Trials Resume',
    description: 'Federal MDL (In re: Roundup Products Liability Litigation, MDL No. 2741) schedules new bellwether trials after pandemic delays.',
    type: 'mdl'
  },
  {
    date: 'July 2021',
    title: 'Donnetta Stephens Verdict: $25 Million',
    description: 'Donnetta Stephens awarded $25 million in California state court after developing NHL from occupational Roundup exposure.',
    outcome: 'One of several post-settlement verdicts; Bayer appeals.',
    type: 'verdict'
  },
  {
    date: 'June 2020',
    title: 'Bayer Announces $10 Billion Settlement Fund',
    description: 'Bayer (which acquired Monsanto in 2018) announces agreement to pay $10.1-10.9 billion to settle approximately 100,000 Roundup lawsuits.',
    outcome: 'Settlement covers 75% of pending cases, does not admit liability.',
    type: 'settlement'
  },
  {
    date: 'May 2019',
    title: 'Pilliod v. Monsanto: $2 Billion Verdict',
    description: 'Alva and Alberta Pilliod awarded $2.055 billion ($55M compensatory, $2B punitive) after both developed NHL from decades of Roundup use.',
    outcome: 'Reduced to $87 million on appeal, still largest sustained award.',
    type: 'verdict'
  },
  {
    date: 'March 2019',
    title: 'Hardeman v. Monsanto: $80 Million Verdict',
    description: 'Edwin Hardeman wins $80 million ($5M compensatory, $75M punitive) after using Roundup for 26 years. First federal bellwether trial in MDL.',
    outcome: 'Reduced to $25.2 million on appeal.',
    type: 'verdict'
  },
  {
    date: 'August 2018',
    title: 'Johnson v. Monsanto: First Major Verdict',
    description: 'Dewayne "Lee" Johnson, a school groundskeeper, wins $289 million verdict against Monsanto. Jury finds Roundup caused his terminal non-Hodgkin lymphoma and that Monsanto acted with "malice."',
    outcome: 'Verdict reduced to $78 million on appeal, but landmark case stands.',
    type: 'verdict'
  },
  {
    date: 'March 2015',
    title: 'IARC Classifies Glyphosate as "Probably Carcinogenic"',
    description: 'The World Health Organization\'s International Agency for Research on Cancer (IARC) classifies glyphosate as "probably carcinogenic to humans" based on evidence of non-Hodgkin lymphoma risk.',
    type: 'regulatory'
  }
];

const typeColors = {
  filing: 'bg-gray-100 text-gray-800 border-gray-300',
  verdict: 'bg-blue-100 text-blue-800 border-blue-300',
  settlement: 'bg-green-100 text-green-800 border-green-300',
  regulatory: 'bg-purple-100 text-purple-800 border-purple-300',
  mdl: 'bg-yellow-100 text-yellow-800 border-yellow-300'
};

const typeIcons = {
  filing: '📋',
  verdict: '⚖️',
  settlement: '💰',
  regulatory: '🏛️',
  mdl: '📊'
};

// Group events by year (descending)
function groupEventsByYear(events: TimelineEvent[]): YearGroup[] {
  const yearMap = new Map<string, TimelineEvent[]>();

  events.forEach(event => {
    const year = event.date.split(' ').pop() || ''; // Extract year from date string
    if (!yearMap.has(year)) {
      yearMap.set(year, []);
    }
    yearMap.get(year)?.push(event);
  });

  const yearGroups: YearGroup[] = [];
  yearMap.forEach((events, year) => {
    yearGroups.push({ year, events });
  });

  return yearGroups;
}

export default function CaseTimeline() {
  const yearGroups = groupEventsByYear(timelineEvents);
  const [expandedYears, setExpandedYears] = useState<Set<string>>(
    new Set([yearGroups[0]?.year]) // Only expand most recent year by default
  );

  const toggleYear = (year: string) => {
    setExpandedYears(prev => {
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
      } else {
        next.add(year);
      }
      return next;
    });
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Roundup Litigation Timeline (2015-2025)
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Here's a chronological overview of major events in the Roundup litigation, from the IARC classification
        through the latest verdicts and settlements. Click on any year to expand or collapse events.
      </p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

        <div className="space-y-2">
          {yearGroups.map((yearGroup) => (
            <div key={yearGroup.year}>
              {/* Year Header - Collapsible */}
              <button
                onClick={() => toggleYear(yearGroup.year)}
                className="w-full text-left relative pl-20 py-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="absolute left-6 top-4 w-5 h-5 rounded-full bg-gray-400 border-4 border-white ring-2 ring-gray-300"></div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">{yearGroup.year}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandedYears.has(yearGroup.year) ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mt-1">{yearGroup.events.length} event{yearGroup.events.length > 1 ? 's' : ''}</p>
              </button>

              {/* Year Events - Collapsible */}
              {expandedYears.has(yearGroup.year) && (
                <div className="space-y-4 mt-2">
                  {yearGroup.events.map((event, index) => (
                    <div key={index} className="relative pl-20">
                      {/* Timeline dot */}
                      <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-blue-600 border-4 border-white ring-2 ring-gray-300"></div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-600">{event.date}</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${typeColors[event.type]}`}>
                            <span className="mr-1">{typeIcons[event.type]}</span>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {event.title}
                        </h4>

                        <p className="text-gray-700 leading-relaxed mb-2">
                          {event.description}
                        </p>

                        {event.outcome && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                              <strong>Outcome:</strong> {event.outcome}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> This timeline includes major public verdicts and regulatory actions. Many cases settle confidentially
          with undisclosed amounts. Settlement negotiations are ongoing, and Bayer continues to accept claims from qualified plaintiffs.
        </p>
      </div>
    </div>
  );
}
