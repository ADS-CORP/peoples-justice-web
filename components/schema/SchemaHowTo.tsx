interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface SchemaHowToProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  estimatedCost?: string;
}

export default function SchemaHowTo({
  name,
  description,
  steps,
  totalTime,
  estimatedCost
}: SchemaHowToProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    ...(totalTime && { "totalTime": totalTime }),
    ...(estimatedCost && { "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": estimatedCost } }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image })
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Default HowTo for settlement calculation
export const settlementCalculationSteps: HowToStep[] = [
  {
    name: "Determine Cancer Severity",
    text: "Identify your cancer diagnosis type and stage. Mild cases (in remission 2+ years) fall in Tier 1. Moderate cases (aggressive treatment, remission 1-2 years) fall in Tier 2. Severe cases (Stage 4, ongoing treatment, poor prognosis) fall in Tier 3."
  },
  {
    name: "Calculate Exposure Duration",
    text: "Document how long you used Roundup. Cases with 10+ years of exposure typically receive higher settlements than those with 1-2 years. Include employment records if you used Roundup at work."
  },
  {
    name: "Assess Treatment Costs",
    text: "Total your medical bills including chemotherapy, radiation, hospital stays, medications, and ongoing care. Higher treatment costs generally result in higher settlements."
  },
  {
    name: "Factor in Lost Wages",
    text: "Calculate lost income due to your illness. Include time off work, reduced capacity to work, or permanent disability. Document with pay stubs and employer statements."
  },
  {
    name: "Apply Point System",
    text: "Bayer's settlement system assigns points based on severity, exposure, treatment, and damages. Tier 1 cases (mild): $50K-$200K. Tier 2 cases (moderate): $200K-$500K. Tier 3 cases (severe): $500K-$2M+."
  },
  {
    name: "Consult an Attorney",
    text: "Get a free case evaluation from an experienced Roundup attorney. They will review your specific circumstances and provide a more accurate settlement estimate. Remember: No upfront fees, attorneys only get paid if you win."
  }
];
