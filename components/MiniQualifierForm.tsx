'use client';

import { useState } from 'react';

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

  const handleQualifierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('contact');
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
        <div className="bg-blue-600 text-white text-center py-3 px-4 rounded-lg mb-6">
          <h3 className="font-bold text-lg">Do You Qualify?</h3>
          <p className="text-sm text-blue-100 mt-1">Free case review • 2-minute form</p>
        </div>

        <form onSubmit={handleQualifierSubmit} className="space-y-5">
          {/* Question 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Did you use Roundup® regularly?
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="usedRegularly"
                  value="yes"
                  checked={answers.usedRegularly === 'yes'}
                  onChange={(e) => setAnswers({ ...answers, usedRegularly: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                  required
                />
                <span className="ml-3 text-gray-900">Yes, at least once a month for a year or more</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="usedRegularly"
                  value="no"
                  checked={answers.usedRegularly === 'no'}
                  onChange={(e) => setAnswers({ ...answers, usedRegularly: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3 text-gray-900">No or only a few times</span>
              </label>
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Have you been diagnosed with lymphoma?
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="diagnosed"
                  value="nhl"
                  checked={answers.diagnosed === 'nhl'}
                  onChange={(e) => setAnswers({ ...answers, diagnosed: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                  required
                />
                <span className="ml-3 text-gray-900">Yes, non-Hodgkin lymphoma (NHL)</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="diagnosed"
                  value="other"
                  checked={answers.diagnosed === 'other'}
                  onChange={(e) => setAnswers({ ...answers, diagnosed: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3 text-gray-900">Yes, other type of lymphoma</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="diagnosed"
                  value="no"
                  checked={answers.diagnosed === 'no'}
                  onChange={(e) => setAnswers({ ...answers, diagnosed: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3 text-gray-900">No</span>
              </label>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Enter a 4-digit year</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Continue →
          </button>

          <p className="text-xs text-gray-500 text-center">
            Free case review • No upfront costs
          </p>
        </form>
      </div>
    );
  }

  // Step 2: Contact Form
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-100">
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

      <form onSubmit={handleFinalSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={contactData.name}
            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="(555) 123-4567"
            value={contactData.phone}
            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={contactData.email}
            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-900 mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            id="zip"
            placeholder="12345"
            pattern="[0-9]{5}"
            value={contactData.zip}
            onChange={(e) => setContactData({ ...contactData, zip: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* TCPA Consent */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={contactData.consent}
              onChange={(e) => setContactData({ ...contactData, consent: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded mt-0.5 flex-shrink-0"
              required
            />
            <span className="ml-3 text-xs text-gray-700 leading-relaxed">
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
          className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
        >
          Get My Free Case Review
        </button>

        <p className="text-xs text-gray-500 text-center">
          🔒 Your information is confidential and secure
        </p>
      </form>
    </div>
  );
}
