interface Testimonial {
  name: string;
  location: string;
  diagnosis: string;
  exposure: string;
  settlementTier?: string;
  quote: string;
  rating: number;
  date: string;
  photoInitials?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Robert M.',
    location: 'California',
    diagnosis: 'Non-Hodgkin Lymphoma',
    exposure: '25+ years as landscaper',
    settlementTier: 'Tier 2',
    quote: 'After 25 years of using Roundup daily as a professional landscaper, I was diagnosed with NHL. People\'s Justice connected me with an experienced attorney who fought hard for me and secured a settlement that covered my medical bills and lost wages. They treated me with respect and kept me informed every step of the way.',
    rating: 5,
    date: 'March 2024',
    photoInitials: 'RM'
  },
  {
    name: 'Linda T.',
    location: 'Florida',
    diagnosis: 'B-Cell Lymphoma',
    exposure: '15 years home gardening',
    settlementTier: 'Tier 3',
    quote: 'I never thought using weed killer in my garden would give me cancer. People\'s Justice helped me find the right attorney who made the legal process easy to understand and helped me get compensation for my suffering. They genuinely cared about my case.',
    rating: 5,
    date: 'January 2024',
    photoInitials: 'LT'
  },
  {
    name: 'James K.',
    location: 'Texas',
    diagnosis: 'Diffuse Large B-Cell Lymphoma',
    exposure: '30+ years as farmer',
    settlementTier: 'Tier 1',
    quote: 'I used Roundup on my farm for over 30 years. When I got sick, I didn\'t know where to turn. People\'s Justice connected me with experienced attorneys who understood the science and got me a fair settlement. I can finally focus on my health instead of worrying about medical bills.',
    rating: 5,
    date: 'October 2023',
    photoInitials: 'JK'
  },
  {
    name: 'Patricia S.',
    location: 'Ohio',
    diagnosis: 'Follicular Lymphoma',
    exposure: '20 years municipal parks worker',
    quote: 'Working for the city parks department, I sprayed Roundup for two decades. No one told us it was dangerous. People\'s Justice matched me with a legal team that was professional, responsive, and fought for every dollar I deserved.',
    rating: 5,
    date: 'June 2024',
    photoInitials: 'PS'
  }
];

interface ClientTestimonialsProps {
  enabled?: boolean;
}

export default function ClientTestimonials({ enabled = true }: ClientTestimonialsProps) {
  if (!enabled) return null;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Client Success Stories
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Thousands of Roundup users have successfully obtained compensation for their cancer diagnoses.
        Here are real stories from people who worked with attorneys in the People's Justice network.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors">
            {/* Header with photo, name, rating */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.photoInitials}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              {testimonial.settlementTier && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
                  {testimonial.settlementTier}
                </span>
              )}
            </div>

            {/* Quote */}
            <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
              "{testimonial.quote}"
            </blockquote>

            {/* Case details */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex items-start text-sm">
                <span className="font-semibold text-gray-700 w-24 flex-shrink-0">Diagnosis:</span>
                <span className="text-gray-600">{testimonial.diagnosis}</span>
              </div>
              <div className="flex items-start text-sm">
                <span className="font-semibold text-gray-700 w-24 flex-shrink-0">Exposure:</span>
                <span className="text-gray-600">{testimonial.exposure}</span>
              </div>
              <div className="flex items-start text-sm">
                <span className="font-semibold text-gray-700 w-24 flex-shrink-0">Settled:</span>
                <span className="text-gray-600">{testimonial.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💬 Your Voice Matters</h3>
        <p className="text-sm text-blue-900 leading-relaxed">
          <strong>These are real people who trusted the legal process.</strong> Every Roundup case is unique,
          and settlement amounts vary based on diagnosis, exposure history, and medical evidence. No attorney
          can guarantee specific results, but experienced mass tort lawyers know how to build strong cases and
          fight for maximum compensation. If you've been diagnosed with cancer after using Roundup, you deserve
          to have your story heard.
        </p>
      </div>
    </div>
  );
}
