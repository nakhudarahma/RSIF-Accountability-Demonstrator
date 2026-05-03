/** Likert scale mapping: string response → numeric value (0–4) */
export const LIKERT_MAP: Record<string, number> = {
  "": 0,
  "Not established": 0,
  "Informally addressed": 1,
  "Formally defined": 2,
  "Consistently applied": 3,
  "Embedded and periodically reviewed": 4,
};

/**
 * Computes a 0–100 score from Likert-scale string values.
 * Score = (sum of mapped values) / (item count × 4) × 100
 */
export function computeCheckboxScore(values: { [key: string]: string }): number {
  const entries = Object.values(values);
  const total = entries.reduce((sum, v) => sum + (LIKERT_MAP[v] || 0), 0);
  const max = entries.length * 4;
  return max > 0 ? Math.round((total / max) * 100) : 0;
}

export function computeRiskLevel(dataSensitivity: string, userImpact: string, regulatoryExposure: string): string {
  const map: Record<string, number> = { "": 0, Low: 1, None: 0, Medium: 2, Moderate: 2, High: 3 };
  const score = (map[dataSensitivity] || 0) + (map[userImpact] || 0) + (map[regulatoryExposure] || 0);
  if (score <= 3) return "Low";
  if (score <= 6) return "Medium";
  return "High";
}

export function computeGovernanceReadiness(dataSensitivity: string, regulatoryExposure: string): string {
  const map: Record<string, number> = { "": 0, Low: 1, None: 0, Medium: 2, Moderate: 2, High: 3 };
  const score = (map[dataSensitivity] || 0) + (map[regulatoryExposure] || 0);
  if (score <= 2) return "Basic";
  if (score <= 4) return "Moderate";
  return "Enhanced";
}

export function computeDeploymentStatus(score: number): string {
  if (score === 100) return "Ready";
  if (score >= 50) return "Conditionally Ready";
  return "Not Ready";
}

export function computeEscalationIndicator(governanceScore: number, riskLevel: string): "Green" | "Amber" | "Red" {
  if (governanceScore >= 80 && riskLevel !== "High") return "Green";
  if (governanceScore >= 40) return "Amber";
  return "Red";
}

/**
 * Sustainability score now uses the same Likert-based computation.
 * Kept as a named function for semantic clarity in the Dashboard.
 */
export function computeSustainabilityScore(data: { [key: string]: string }): number {
  return computeCheckboxScore(data);
}

/**
 * Impact risk based on sustainability score alone.
 * Higher sustainability score → lower impact risk.
 */
export function computeImpactRisk(sustainabilityScore: number): string {
  if (sustainabilityScore >= 70) return "Low";
  if (sustainabilityScore >= 40) return "Medium";
  return "High";
}

export function computeMaturityScore(governance: number, technical: number, deployment: number, sustainability: number): number {
  return Math.round(0.3 * governance + 0.3 * technical + 0.2 * deployment + 0.2 * sustainability);
}
