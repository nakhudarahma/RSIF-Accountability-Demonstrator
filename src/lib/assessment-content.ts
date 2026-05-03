import { LIKERT_MAP } from "./scoring";

export const LIKERT_OPTIONS = [
  "Not established",
  "Informally addressed",
  "Formally defined",
  "Consistently applied",
  "Embedded and periodically reviewed",
] as const;

export interface AssessmentItem {
  key: string;
  prompt: string;
  context: string;
  weakExplanation: string;
  partialExplanation: string;
  measure: string;
}

// ── Governance ──────────────────────────────────────────────────────────────

export const GOVERNANCE_ITEMS: AssessmentItem[] = [
  {
    key: "ethicalGuidelines",
    prompt: "Ethical guidelines for AI development and deployment are formally recognized",
    context: "Assesses whether the organization has established ethical principles that guide AI system design, development, and use.",
    weakExplanation: "Ethical guidelines for AI development are not yet formally established within the organization",
    partialExplanation: "Ethical guidelines exist in formal documentation but have not yet been consistently applied across projects",
    measure: "Establish and institutionalize ethical guidelines that are embedded into AI development workflows",
  },
  {
    key: "regulatoryObligations",
    prompt: "Applicable regulatory and legal obligations have been systematically reviewed",
    context: "Evaluates the extent to which relevant legal frameworks, industry standards, and compliance requirements have been identified and addressed.",
    weakExplanation: "Regulatory and legal obligations relevant to the AI system have not been systematically identified",
    partialExplanation: "Regulatory obligations have been reviewed but are not yet integrated into operational processes",
    measure: "Conduct a systematic regulatory mapping exercise and integrate findings into governance procedures",
  },
  {
    key: "responsibilityAssigned",
    prompt: "Responsibility for AI-related decisions is clearly assigned within the organization",
    context: "This includes clarity around who is accountable when AI systems fail, cause harm, or require escalation.",
    weakExplanation: "Accountability responsibilities are informally defined rather than institutionally enforced",
    partialExplanation: "Responsibility assignments exist formally but are not consistently followed across all AI initiatives",
    measure: "Introduce formally assigned accountability roles for AI system outcomes with clear escalation pathways",
  },
  {
    key: "documentationPolicy",
    prompt: "Documentation standards for AI system lifecycle are formally defined",
    context: "Assesses whether there are established policies governing the documentation of AI system design, development, testing, and deployment.",
    weakExplanation: "Documentation practices for the AI system lifecycle are absent or ad hoc",
    partialExplanation: "Documentation policies are defined but not consistently maintained across lifecycle stages",
    measure: "Define comprehensive documentation standards covering all stages of the AI system lifecycle",
  },
  {
    key: "stakeholderImpact",
    prompt: "Impact on affected stakeholders has been assessed and documented",
    context: "Evaluates whether potential effects on end users, communities, and other affected parties have been systematically considered.",
    weakExplanation: "Stakeholder impact assessment has not been conducted or is only informally considered",
    partialExplanation: "Stakeholder impacts are formally documented but the assessment process is not periodically revisited",
    measure: "Implement a structured stakeholder impact assessment process with periodic review cycles",
  },
];

// ── Technical ───────────────────────────────────────────────────────────────

export const TECHNICAL_ITEMS: AssessmentItem[] = [
  {
    key: "datasetDocumentation",
    prompt: "Training data sources, preprocessing steps, and known limitations are documented",
    context: "Assesses the extent to which data provenance, quality, and potential limitations are transparently recorded.",
    weakExplanation: "Training data documentation is absent or insufficient to support reproducibility and auditing",
    partialExplanation: "Dataset documentation exists but does not comprehensively cover preprocessing steps or known limitations",
    measure: "Establish comprehensive dataset documentation covering provenance, preprocessing, and known limitations",
  },
  {
    key: "biasAssessment",
    prompt: "Potential sources of bias have been identified and assessed across the AI lifecycle",
    context: "Evaluates whether systematic bias detection and mitigation strategies have been applied to data, model, and output stages.",
    weakExplanation: "Bias risk assessment has not been systematically performed across the AI lifecycle",
    partialExplanation: "Bias assessment has been formally conducted but is not consistently applied at all lifecycle stages",
    measure: "Implement systematic bias detection and mitigation strategies across data collection, training, and deployment",
  },
  {
    key: "explainability",
    prompt: "The approach to model explainability and interpretability is defined",
    context: "Assesses whether stakeholders can understand how AI-driven decisions are made and what factors influence outcomes.",
    weakExplanation: "No defined approach to explainability exists for the AI system's decision-making processes",
    partialExplanation: "An explainability framework is defined but not yet embedded into standard development practices",
    measure: "Define and implement explainability mechanisms appropriate to the system's risk level and stakeholder needs",
  },
  {
    key: "humanInLoop",
    prompt: "Human oversight mechanisms for AI-assisted decisions are established",
    context: "Evaluates the degree to which human judgment is integrated into critical decision points within the AI system.",
    weakExplanation: "Human-in-the-loop oversight mechanisms are not established for AI-assisted decision points",
    partialExplanation: "Human oversight is formally defined but not consistently applied across all critical decision pathways",
    measure: "Establish human oversight mechanisms at critical decision points proportionate to the system's impact level",
  },
  {
    key: "versioningPolicy",
    prompt: "Model versioning, update, and deprecation procedures are documented",
    context: "Assesses whether there are clear processes for tracking model changes, validating updates, and retiring outdated versions.",
    weakExplanation: "Model versioning and update procedures are undocumented or handled informally",
    partialExplanation: "Versioning policies exist formally but deprecation and rollback procedures require further development",
    measure: "Document comprehensive model versioning, validation, and deprecation procedures",
  },
];

// ── Deployment ──────────────────────────────────────────────────────────────

export const DEPLOYMENT_ITEMS: AssessmentItem[] = [
  {
    key: "monitoringStrategy",
    prompt: "A strategy for ongoing monitoring of AI system performance is defined",
    context: "Evaluates whether continuous monitoring mechanisms are in place to detect drift, degradation, or unexpected behavior.",
    weakExplanation: "No defined strategy exists for ongoing monitoring of AI system performance in production",
    partialExplanation: "A monitoring strategy is formally defined but does not yet cover all critical performance dimensions",
    measure: "Define a comprehensive monitoring strategy covering performance drift, accuracy degradation, and behavioral anomalies",
  },
  {
    key: "feedbackMechanism",
    prompt: "Mechanisms for collecting and acting on user feedback are in place",
    context: "Assesses whether affected users have accessible channels to report concerns, errors, or unintended outcomes.",
    weakExplanation: "User feedback mechanisms are absent or not systematically connected to improvement processes",
    partialExplanation: "Feedback collection mechanisms exist but the pathway from feedback to system improvement is not formalized",
    measure: "Establish accessible user feedback channels with defined pathways for incorporating feedback into system updates",
  },
  {
    key: "incidentReporting",
    prompt: "Processes for reporting and responding to AI-related incidents exist",
    context: "Evaluates whether there are defined escalation pathways and response protocols for AI system failures or harms.",
    weakExplanation: "Incident reporting and response processes for AI-related failures are not established",
    partialExplanation: "Incident reporting processes are defined but escalation pathways and response timelines require strengthening",
    measure: "Implement incident reporting protocols with clear escalation pathways and defined response timelines",
  },
  {
    key: "rollbackPlan",
    prompt: "Rollback and mitigation plans for deployment failures are documented",
    context: "Assesses preparedness for reverting or containing AI system issues when they arise in production environments.",
    weakExplanation: "Rollback and mitigation plans for deployment failures have not been documented",
    partialExplanation: "Rollback plans are formally documented but have not been tested or periodically reviewed",
    measure: "Document and periodically test rollback and mitigation procedures for production deployment failures",
  },
];

// ── Sustainability ──────────────────────────────────────────────────────────

export const SUSTAINABILITY_ITEMS: AssessmentItem[] = [
  {
    key: "computeIntensity",
    prompt: "The computational resource requirements have been assessed for environmental impact",
    context: "Evaluates whether the energy consumption and carbon footprint of AI training and inference have been considered.",
    weakExplanation: "Environmental impact of computational resource usage has not been assessed",
    partialExplanation: "Computational resource assessment has been conducted but environmental impact mitigation strategies are not yet in place",
    measure: "Conduct an environmental impact assessment of computational resources and identify optimization opportunities",
  },
  {
    key: "energyOptimization",
    prompt: "Energy efficiency optimization strategies have been considered in system design",
    context: "Assesses whether deliberate steps have been taken to minimize the environmental cost of AI operations.",
    weakExplanation: "Energy efficiency has not been considered as a design objective for the AI system",
    partialExplanation: "Energy optimization strategies are formally considered but not consistently embedded in design decisions",
    measure: "Integrate energy efficiency considerations into system architecture and deployment decisions",
  },
  {
    key: "accessibility",
    prompt: "Accessibility and inclusivity considerations have been incorporated",
    context: "Evaluates whether the AI system has been designed to be usable by diverse populations, including those with disabilities.",
    weakExplanation: "Accessibility and inclusivity considerations have not been incorporated into the AI system design",
    partialExplanation: "Accessibility considerations are formally documented but not yet validated through diverse user testing",
    measure: "Incorporate accessibility standards and conduct inclusivity assessments with diverse user groups",
  },
  {
    key: "societalRisks",
    prompt: "Long-term societal risks and unintended consequences have been reviewed",
    context: "Assesses whether potential downstream effects on social equity, employment, and community wellbeing have been examined.",
    weakExplanation: "Long-term societal risks and unintended consequences have not been systematically reviewed",
    partialExplanation: "Societal risk review has been conducted but is not periodically updated as the system evolves",
    measure: "Establish a periodic societal risk review process that evolves with the AI system and its deployment context",
  },
];

// ── Explanation & Measure Generators ────────────────────────────────────────

/**
 * Returns explanation strings for fields scoring below "Consistently applied" (value < 3).
 * Weak (0–1) → weakExplanation; Partial (2) → partialExplanation.
 */
export function getExplanations(items: AssessmentItem[], data: { [key: string]: string }): string[] {
  const results: string[] = [];
  for (const item of items) {
    const val = LIKERT_MAP[data[item.key] || ""] || 0;
    if (val <= 1) {
      results.push(item.weakExplanation);
    } else if (val === 2) {
      results.push(item.partialExplanation);
    }
    // val >= 3 means "Consistently applied" or "Embedded" → no explanation needed
  }
  if (results.length === 0) {
    results.push("Practices across all assessed dimensions are well-established and consistently applied");
  }
  return results;
}

/**
 * Returns RSIF-aligned improvement measures for fields scoring below "Consistently applied" (value < 3).
 */
export function getMeasures(items: AssessmentItem[], data: { [key: string]: string }): string[] {
  const results: string[] = [];
  for (const item of items) {
    const val = LIKERT_MAP[data[item.key] || ""] || 0;
    if (val < 3) {
      results.push(item.measure);
    }
  }
  return results;
}
