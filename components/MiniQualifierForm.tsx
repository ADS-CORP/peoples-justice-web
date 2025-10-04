'use client';

import { useState, useEffect } from 'react';

interface MiniQualifierFormProps {
  caseType: string;
}

export default function MiniQualifierForm({ caseType }: MiniQualifierFormProps) {
  const [step, setStep] = useState<'qualifiers' | 'contact'>('qualifiers');
  const [answers, setAnswers] = useState({
    usedRegularly: '',
    diagnosed: '',
    diagnosisYear: '',
  });
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    zip: '',
    consent: false,
  });

  // Dynamic social proof number (starts random daily, increments hourly)
  const [checkedToday, setCheckedToday] = useState(0);

  useEffect(() => {
    const today = new Date();
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    // Starting number for the day (45-150)
    const dailyStart = 45 + (dateSeed % 106);

    // Add increments for each hour that has passed today
    const currentHour = today.getHours();
    let hourlyIncrements = 0;

    for (let hour = 0; hour < currentHour; hour++) {
      // Each hour gets a random increment between 1-5 (seeded by date + hour)
      const hourSeed = dateSeed + hour;
      const increment = 1 + (hourSeed % 5);
      hourlyIncrements += increment;
    }

    setCheckedToday(dailyStart + hourlyIncrements);
  }, []);

  const handleQualifierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('contact');
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Increment the counter when user submits
    setCheckedToday(prev => prev + 1);

    // In production, this would POST to /api/intake/lead
    console.log('Lead submission:', {
      caseType,
      qualifiers: answers,
      contact: contactData,
      consentSnapshot: {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      },
    });

    alert('Thank you! An attorney will contact you within 24 hours.');
  };

  if (step === 'qualifiers') {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-elevated-xl p-1">
        <div className="bg-white rounded-xl p-6 shadow-inner">
          {/* Urgency Banner - Sleeker */}
          <div className="bg-orange-500 text-white text-center py-2 px-4 rounded-t-xl -mx-6 -mt-6 mb-4">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold">Filing deadlines apply — Check now</span>
            </div>
          </div>

          {/* Step Indicators - Simplified */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</div>
              <span className="text-xs font-medium text-gray-700 hidden sm:inline">Qualifiers</span>
            </div>
            <div className="w-12 h-1 bg-gray-200">
              <div className="h-full bg-gray-300 transition-all" style={{width: '0%'}}></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm">2</div>
              <span className="text-xs font-medium text-gray-500 hidden sm:inline">Contact</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-3 px-4 rounded-lg mb-4">
            <h3 className="font-bold text-lg">Do You Qualify?</h3>
            <p className="text-sm text-blue-100 mt-1">Free case review • 2-minute form</p>
          </div>

          {/* Social Proof Ticker - Below header, less prominent */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 mb-4">
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex -space-x-1.5">
                <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white"></div>
                <div className="w-5 h-5 rounded-full bg-green-500 border-2 border-white"></div>
                <div className="w-5 h-5 rounded-full bg-purple-500 border-2 border-white"></div>
              </div>
              <p className="text-green-800">
                <span className="font-bold">{checkedToday || '127'}</span> checked today
              </p>
            </div>
          </div>

        <form onSubmit={handleQualifierSubmit} className="space-y-4">
          {/* Question 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Did you use Roundup® regularly?
            </label>
            <div className="space-y-2">
              <label className={`flex items-center p-2.5 border-2 rounded-lg cursor-pointer transition-all ${
                answers.usedRegularly === 'yes'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name="usedRegularly"
                  value="yes"
                  checked={answers.usedRegularly === 'yes'}
                  onChange={(e) => setAnswers({ ...answers, usedRegularly: e.target.value })}
                  className="w-4 h-4 text-blue-600 sr-only"
                  required
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  answers.usedRegularly === 'yes'
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-400'
                }`}>
                  {answers.usedRegularly === 'yes' && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`ml-3 text-sm ${
                  answers.usedRegularly === 'yes' ? 'text-blue-900 font-medium' : 'text-gray-900'
                }`}>Yes, at least once a month for a year or more</span>
              </label>
              <label className={`flex items-center p-2.5 border-2 rounded-lg cursor-pointer transition-all ${
                answers.usedRegularly === 'no'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name="usedRegularly"
                  value="no"
                  checked={answers.usedRegularly === 'no'}
                  onChange={(e) => setAnswers({ ...answers, usedRegularly: e.target.value })}
                  className="w-4 h-4 text-blue-600 sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  answers.usedRegularly === 'no'
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-400'
                }`}>
                  {answers.usedRegularly === 'no' && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`ml-3 text-sm ${
                  answers.usedRegularly === 'no' ? 'text-blue-900 font-medium' : 'text-gray-900'
                }`}>No or only a few times</span>
              </label>
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Have you been diagnosed with lymphoma?
            </label>
            <div className="space-y-2">
              {['nhl', 'other', 'no'].map((value) => {
                const labels = {
                  nhl: 'Yes, non-Hodgkin lymphoma (NHL)',
                  other: 'Yes, other type of lymphoma',
                  no: 'No'
                };
                return (
                  <label key={value} className={`flex items-center p-2.5 border-2 rounded-lg cursor-pointer transition-all ${
                    answers.diagnosed === value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="diagnosed"
                      value={value}
                      checked={answers.diagnosed === value}
                      onChange={(e) => setAnswers({ ...answers, diagnosed: e.target.value })}
                      className="w-4 h-4 text-blue-600 sr-only"
                      required={value === 'nhl'}
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      answers.diagnosed === value
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-400'
                    }`}>
                      {answers.diagnosed === value && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`ml-3 text-sm ${
                      answers.diagnosed === value ? 'text-blue-900 font-medium' : 'text-gray-900'
                    }`}>{labels[value as keyof typeof labels]}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <label htmlFor="diagnosisYear" className="block text-sm font-medium text-gray-900 mb-2">
              What year were you diagnosed?
            </label>
            <input
              type="number"
              id="diagnosisYear"
              min="1990"
              max={new Date().getFullYear()}
              placeholder="e.g., 2018"
              value={answers.diagnosisYear}
              onChange={(e) => setAnswers({ ...answers, diagnosisYear: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Enter a 4-digit year</p>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-elevated-lg hover:shadow-elevated-xl transform hover:-translate-y-0.5"
          >
            Continue →
          </button>

          <p className="text-xs text-gray-500 text-center">
            Free case review • No upfront costs
          </p>
        </form>
        </div>
      </div>
    );
  }

  // Step 2: Contact Form
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-elevated-xl p-1">
      <div className="bg-white rounded-xl p-6 shadow-inner">
      {/* Step Indicators - Simplified */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">✓</div>
          <span className="text-xs font-medium text-gray-500 hidden sm:inline">Qualifiers</span>
        </div>
        <div className="w-12 h-1 bg-blue-600">
          <div className="h-full bg-blue-600 transition-all" style={{width: '100%'}}></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</div>
          <span className="text-xs font-medium text-gray-700 hidden sm:inline">Contact</span>
        </div>
      </div>

      <button
        onClick={() => setStep('qualifiers')}
        className="text-blue-600 hover:text-blue-700 text-sm mb-4 flex items-center"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6 rounded-r-lg">
        <p className="text-green-900 font-medium">✓ You may qualify!</p>
        <p className="text-green-800 text-sm mt-1">Enter your info to connect with an attorney.</p>
      </div>

      <form onSubmit={handleFinalSubmit} className="space-y-3">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={contactData.name}
            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="(555) 123-4567"
            value={contactData.phone}
            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1.5">
            Email *
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={contactData.email}
            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-900 mb-1.5">
            ZIP Code *
          </label>
          <input
            type="text"
            id="zip"
            placeholder="12345"
            pattern="[0-9]{5}"
            value={contactData.zip}
            onChange={(e) => setContactData({ ...contactData, zip: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            required
          />
        </div>

        {/* TCPA Consent */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={contactData.consent}
              onChange={(e) => setContactData({ ...contactData, consent: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded mt-0.5 flex-shrink-0"
              required
            />
            <span className="ml-2.5 text-xs text-gray-700 leading-relaxed">
              By clicking Submit, you agree to be contacted by one or more attorneys or their agents at the
              phone number and/or email provided, including through automated calls, texts, and prerecorded
              messages. Consent is not required as a condition of service. Message and data rates may apply.
              You also agree to our{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
              <a href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</a>.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-elevated-lg hover:shadow-elevated-xl transform hover:-translate-y-0.5"
        >
          Get My Free Case Review
        </button>

        <p className="text-xs text-gray-500 text-center">
          🔒 Your information is confidential and secure
        </p>
      </form>
      </div>
    </div>
  );
}
