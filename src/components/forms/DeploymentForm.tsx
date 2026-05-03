import { useAppState } from "@/context/AppContext";
import { StatusBadge } from "@/components/StatusBadge";
import { computeCheckboxScore, computeDeploymentStatus, computeEscalationIndicator, computeRiskLevel } from "@/lib/scoring";
import { DEPLOYMENT_ITEMS } from "@/lib/assessment-content";
import { LikertField } from "./LikertField";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function DeploymentForm({ onNext, onBack }: Props) {
  const { deployment, setDeployment, governance, useCase } = useAppState();

  const update = (key: string, value: string) => {
    setDeployment({ ...deployment, [key]: value });
  };

  const score = computeCheckboxScore(deployment);
  const status = computeDeploymentStatus(score);
  const governanceScore = computeCheckboxScore(governance);
  const riskLevel = computeRiskLevel(useCase.dataSensitivity, useCase.userImpact, useCase.regulatoryExposure);
  const escalation = computeEscalationIndicator(governanceScore, riskLevel);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Deployment &amp; Monitoring</h2>
        <p className="text-sm text-muted-foreground mt-1">Assess readiness for responsible AI deployment.</p>
        <p className="text-xs text-muted-foreground mt-3 italic">
          Select the option that best reflects current practice, not intended future state.
        </p>
      </div>

      <div className="space-y-5">
        {DEPLOYMENT_ITEMS.map((item) => (
          <LikertField
            key={item.key}
            name={`deployment-${item.key}`}
            prompt={item.prompt}
            context={item.context}
            value={deployment[item.key as keyof typeof deployment]}
            onChange={(v) => update(item.key, v)}
          />
        ))}
      </div>

      <div className="border rounded-lg bg-surface p-4 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-surface-foreground font-medium">Deployment Readiness</span>
          <StatusBadge status={status} />
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-surface-foreground font-medium">Governance Escalation</span>
          <StatusBadge status={escalation} />
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-6 py-2 rounded-md text-sm font-medium border bg-card text-foreground hover:bg-accent transition-colors">Back</button>
        <button onClick={onNext} className="px-6 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Next</button>
      </div>
    </div>
  );
}
