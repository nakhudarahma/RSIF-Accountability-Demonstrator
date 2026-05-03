import { useAppState } from "@/context/AppContext";
import { PageShell } from "@/components/PageShell";
import { RadarChart } from "@/components/RadarChart";
import { ScoreBar } from "@/components/ScoreBar";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  computeCheckboxScore,
  computeRiskLevel,
  computeEscalationIndicator,
  computeMaturityScore,
  computeDeploymentStatus,
  computeImpactRisk,
} from "@/lib/scoring";
import {
  GOVERNANCE_ITEMS,
  TECHNICAL_ITEMS,
  DEPLOYMENT_ITEMS,
  SUSTAINABILITY_ITEMS,
  getExplanations,
  getMeasures,
} from "@/lib/assessment-content";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { role, governance, technical, deployment, sustainability, useCase, resetDemo } = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) navigate("/role");
  }, [role, navigate]);

  const govScore = computeCheckboxScore(governance);
  const techScore = computeCheckboxScore(technical);
  const deployScore = computeCheckboxScore(deployment);
  const sustScore = computeCheckboxScore(sustainability);
  const maturity = computeMaturityScore(govScore, techScore, deployScore, sustScore);

  const riskLevel = computeRiskLevel(useCase.dataSensitivity, useCase.userImpact, useCase.regulatoryExposure);
  const escalation = computeEscalationIndicator(govScore, riskLevel);
  const deployStatus = computeDeploymentStatus(deployScore);
  const impactRisk = computeImpactRisk(sustScore);

  // Lifecycle coverage: count completed stages
  const stagesCompleted = [
    useCase.domain ? 1 : 0,
    govScore > 0 ? 1 : 0,
    techScore > 0 ? 1 : 0,
    deployScore > 0 ? 1 : 0,
    sustScore > 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);
  const coveragePct = Math.round((stagesCompleted / 5) * 100);

  const radarData = [
    { label: "Governance", value: govScore },
    { label: "Technical", value: techScore },
    { label: "Deployment", value: deployScore },
    { label: "Sustainability", value: sustScore },
  ];

  // Generate explanations and measures for each dimension
  const govExplanations = getExplanations(GOVERNANCE_ITEMS, governance);
  const govMeasures = getMeasures(GOVERNANCE_ITEMS, governance);
  const techExplanations = getExplanations(TECHNICAL_ITEMS, technical);
  const techMeasures = getMeasures(TECHNICAL_ITEMS, technical);
  const deployExplanations = getExplanations(DEPLOYMENT_ITEMS, deployment);
  const deployMeasures = getMeasures(DEPLOYMENT_ITEMS, deployment);
  const sustExplanations = getExplanations(SUSTAINABILITY_ITEMS, sustainability);
  const sustMeasures = getMeasures(SUSTAINABILITY_ITEMS, sustainability);

  return (
    <PageShell>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Accountability Dashboard</h2>
            <p className="text-sm text-muted-foreground mt-1">
              RSIF lifecycle assessment summary
              {role === "auditor" && " · Read-only view"}
            </p>
          </div>
          {role !== "auditor" && (
            <button
              onClick={() => navigate("/workflow")}
              className="px-4 py-2 text-sm border rounded-md bg-card text-foreground hover:bg-accent transition-colors"
            >
              ← Edit Stages
            </button>
          )}
        </div>

        {/* Top metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetricCard label="Maturity Score" value={`${maturity}/100`} />
          <MetricCard label="Risk Level" badge={riskLevel || "N/A"} />
          <MetricCard label="Escalation" badge={escalation} />
          <MetricCard label="Lifecycle Coverage" value={`${coveragePct}%`} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="border rounded-lg bg-card p-6">
            <h3 className="text-base font-semibold mb-4">RSIF Dimension Scores</h3>
            <RadarChart data={radarData} />
          </div>

          {/* Score Bars */}
          <div className="border rounded-lg bg-card p-6 space-y-5">
            <h3 className="text-base font-semibold mb-2">Individual Scores</h3>
            <ScoreBar label="Governance Accountability" value={govScore} />
            <ScoreBar label="Technical Accountability" value={techScore} />
            <ScoreBar label="Deployment Readiness" value={deployScore} />
            <ScoreBar label="Sustainability Index" value={sustScore} />

            <div className="pt-3 border-t space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Deployment Status</span>
                <StatusBadge status={deployStatus} />
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Impact Risk</span>
                <StatusBadge status={impactRisk} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Dimension Explanations & RSIF Measures ──────────────────────── */}
        <DimensionAnalysis
          title="Governance Accountability"
          score={govScore}
          explanations={govExplanations}
          measures={govMeasures}
        />
        <DimensionAnalysis
          title="Technical Accountability"
          score={techScore}
          explanations={techExplanations}
          measures={techMeasures}
        />
        <DimensionAnalysis
          title="Deployment & Monitoring"
          score={deployScore}
          explanations={deployExplanations}
          measures={deployMeasures}
        />
        <DimensionAnalysis
          title="Sustainability & Long-Term Impact"
          score={sustScore}
          explanations={sustExplanations}
          measures={sustMeasures}
        />

        {/* Lifecycle Progress */}
        <div className="border rounded-lg bg-card p-6">
          <h3 className="text-base font-semibold mb-3">Accountability Lifecycle Coverage</h3>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${coveragePct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{stagesCompleted} of 5 stages completed</p>
        </div>

        {/* Formula explanation */}
        <div className="border rounded-lg bg-surface p-4 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-surface-foreground text-sm">Scoring Methodology</p>
          <p>Overall Maturity = 0.3 × Governance + 0.3 × Technical + 0.2 × Deployment + 0.2 × Sustainability</p>
          <p>Individual scores are computed from a five-level maturity scale (0–4 per item), normalized to 0–100. No AI/ML models are used.</p>
        </div>

        {/* Begin a New Demonstration */}
        <Separator />
        <div className="flex flex-col items-center gap-2 py-4">
          <Button
            variant="outline"
            onClick={() => {
              resetDemo();
              navigate("/");
            }}
          >
            Begin a New Demonstration
          </Button>
          <p className="text-xs text-muted-foreground">
            This will clear the current assessment and start a fresh demonstration.
          </p>
        </div>
      </div>
    </PageShell>
  );
}

function MetricCard({ label, value, badge }: { label: string; value?: string; badge?: string }) {
  return (
    <div className="border rounded-lg bg-card p-4 space-y-1">
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
      {value && <p className="text-2xl font-bold text-foreground">{value}</p>}
      {badge && <StatusBadge status={badge} />}
    </div>
  );
}

/** Renders "Why this score" explanations and "RSIF-Aligned Improvement Measures" for a single dimension */
function DimensionAnalysis({
  title,
  score,
  explanations,
  measures,
}: {
  title: string;
  score: number;
  explanations: string[];
  measures: string[];
}) {
  return (
    <div className="border rounded-lg bg-card p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{title}</h3>
        <span className="text-sm font-bold text-foreground">{score}/100</span>
      </div>

      {/* Why this score */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Why this score appears at this level</p>
        <ul className="space-y-1.5">
          {explanations.map((text, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* RSIF-Aligned Improvement Measures — only if there are gaps */}
      {measures.length > 0 && (
        <div className="space-y-2 pt-3 border-t">
          <p className="text-sm font-medium text-foreground">RSIF-Aligned Improvement Measures</p>
          <p className="text-xs text-muted-foreground">
            The following measures illustrate how accountability gaps identified above could be addressed within the RSIF framework. These are illustrative and non-prescriptive.
          </p>
          <ul className="space-y-1.5 mt-1">
            {measures.map((text, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
