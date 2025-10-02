interface FAQItem {
  question: string;
  answer: string;
}

interface SchemaFAQProps {
  faqs: FAQItem[];
  pageUrl: string;
}

export default function SchemaFAQ({ faqs, pageUrl }: SchemaFAQProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Default FAQ data for Roundup lawsuits (20+ questions)
export const roundupFAQs: FAQItem[] = [
  // Eligibility & Diagnosis (5 questions)
  {
    question: "Do I have to pay upfront to hire a lawyer?",
    answer: "No. Most Roundup attorneys work on a contingency fee basis. This means you don't pay anything unless you win. The lawyer takes a percentage of your settlement (usually 30-40%). If you don't get money, you don't owe anything."
  },
  {
    question: "Can I file if I only used Roundup a few times?",
    answer: "Most cases require regular use—at least once a month for a year or more. If you only used it a few times, you likely won't qualify. However, every case is unique. An attorney can review your specific situation during a free consultation."
  },
  {
    question: "What if the person who used Roundup died?",
    answer: "Family members may be able to file a wrongful death lawsuit on behalf of the deceased. Eligible family members typically include spouses, children, or parents. Contact an attorney to discuss your options and state-specific deadlines."
  },
  {
    question: "Can I sue if I'm still healthy but used Roundup?",
    answer: "No. You must have a confirmed diagnosis of non-Hodgkin lymphoma or related cancer to file a claim. Roundup lawsuits are for people who were injured, not for those worried about future health problems."
  },
  {
    question: "Do I need proof of purchase?",
    answer: "Proof of purchase helps but is not always required. You can provide other evidence like employment records (if you used Roundup at work), photos, witness statements from family or coworkers, or receipts if available. An attorney can help you gather evidence."
  },

  // Legal Process & Timeline (5 questions)
  {
    question: "How long does a Roundup case take?",
    answer: "Most cases settle within 12-18 months, but it can vary. Some settle sooner if the evidence is strong. Cases that go to trial can take 2-3 years. Your attorney will give you a better estimate based on your situation."
  },
  {
    question: "Will I have to go to court?",
    answer: "Most Roundup cases settle out of court, so you likely won't have to testify at trial. However, you may need to give a deposition (answering questions under oath) or attend mediation. Your attorney will guide you through the process."
  },
  {
    question: "What is an MDL?",
    answer: "MDL stands for Multidistrict Litigation. It's when similar cases from different courts are grouped together for efficiency. Roundup cases are part of an MDL, which helps speed up the process. Your case is still yours—you don't share your settlement with others."
  },
  {
    question: "Are there class action lawsuits for Roundup?",
    answer: "No. Roundup cases are individual lawsuits, not class actions. Each person's case is unique based on their exposure, diagnosis, and damages. You file your own claim and receive your own settlement—you don't share it with a large group."
  },
  {
    question: "Can I switch attorneys?",
    answer: "Yes. You have the right to change attorneys at any time if you're unhappy with your representation. However, you may owe your previous attorney for work already done. Discuss this with a new attorney before switching."
  },

  // Compensation & Settlements (5 questions)
  {
    question: "What is the average Roundup settlement payout?",
    answer: "Settlement amounts vary widely based on your case. Typical settlements range from $50,000 to $500,000 or more. Factors include cancer severity, treatment required, Roundup exposure duration, and medical bills. Some jury verdicts have awarded tens of millions of dollars."
  },
  {
    question: "What if I used other weedkillers too?",
    answer: "That's okay. You can still file a claim if you used Roundup regularly, even if you also used other products. Tell your attorney about all products you used so they can build the strongest case."
  },
  {
    question: "What happens if I lose my case?",
    answer: "If you lose, you don't pay attorney fees (if you hired on contingency). However, you may be responsible for case expenses like expert witness fees or court filing costs. Discuss this with your attorney upfront—many cover these costs and only collect if you win."
  },
  {
    question: "What is Bayer's settlement point system?",
    answer: "Bayer uses a point system to calculate settlement amounts. Cases are scored based on factors like cancer type, treatment severity, exposure duration, and age. Higher points mean higher settlements. Your attorney can estimate your point value during a case review."
  },
  {
    question: "How much will my attorney take?",
    answer: "Most Roundup attorneys charge a contingency fee of 30-40% of your settlement. For example, if you receive $100,000, your attorney might take $33,000-$40,000. The percentage should be agreed upon in writing before you hire them."
  },

  // Deadlines & State-Specific (5 questions)
  {
    question: "What states have the most Roundup cases?",
    answer: "California, Illinois, Missouri, and Pennsylvania have filed the most Roundup cases. However, cases have been filed in all 50 states. You can file no matter where you live—what matters is your exposure and diagnosis, not your location."
  },
  {
    question: "Can veterans file Roundup claims?",
    answer: "Yes. Many veterans were exposed to Roundup during military service (landscaping, grounds maintenance, agricultural work). Veterans can file claims just like anyone else. VA benefits don't prevent you from filing a lawsuit against Bayer."
  },
  {
    question: "What if I used generic glyphosate, not Roundup brand?",
    answer: "You may still have a claim. Roundup lawsuits focus on glyphosate, the active ingredient. If you used a generic glyphosate product (like Ranger Pro, Touchdown, or others) and developed cancer, consult an attorney to see if you qualify."
  },
  {
    question: "How do I know if I missed the deadline?",
    answer: "Deadlines (statutes of limitations) vary by state—usually 1-3 years from your diagnosis date. Some states have a discovery rule that extends the deadline. Contact an attorney immediately to check your state's deadline. Missing it means you lose your right to compensation."
  },
  {
    question: "Can I still use Roundup in my yard?",
    answer: "Roundup is still sold in stores, but many experts recommend avoiding it due to cancer risks. Safer alternatives include vinegar-based weedkillers, manual weeding, or organic herbicides. If you choose to use Roundup, wear protective gear and follow safety instructions."
  },

  // Additional High-Value Questions (2 more)
  {
    question: "What is non-Hodgkin lymphoma?",
    answer: "Non-Hodgkin lymphoma (NHL) is a type of blood cancer that affects the lymphatic system. It starts in white blood cells called lymphocytes. Symptoms include swollen lymph nodes, fever, night sweats, and weight loss. NHL is the primary cancer linked to Roundup exposure."
  },
  {
    question: "Did Monsanto know Roundup caused cancer?",
    answer: "Evidence suggests Monsanto (now Bayer) knew about cancer risks but hid them from the public. Internal documents revealed during trials showed Monsanto influenced research and pressured regulators. This is why juries have awarded large punitive damages in some cases."
  }
];
