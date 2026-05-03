import { useAppState } from "@/context/AppContext";
import { StatusBadge } from "@/components/StatusBadge";
import { computeRiskLevel, computeGovernanceReadiness } from "@/lib/scoring";

interface Props {
  onNext: () => void;
}

const domains = ["Healthcare", "Finance", "Education", "HR", "General"];
const useCaseTypes = ["Decision Support", "Prediction", "Recommendation", "Automation"];
const levels3 = ["Low", "Medium", "High"];
const regLevels = ["None", "Moderate", "High"];

export function UseCaseForm({ onNext }: Props) {
  const { useCase, setUseCase } = useAppState();

  const update = (field: string, value: string) => {
    setUseCase({ ...useCase, [field]: value });
  };

  const isComplete = useCase.domain && useCase.useCaseType && useCase.dataSensitivity && useCase.userImpact && useCase.regulatoryExposure;

  const riskLevel = isComplete ? computeRiskLevel(useCase.dataSensitivity, useCase.userImpact, useCase.regulatoryExposure) : null;
  const readiness = isComplete ? computeGovernanceReadiness(useCase.dataSensitivity, useCase.regulatoryExposure) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">AI Use-Case &amp; Domain Context</h2>
        <p className="text-sm text-muted-foreground mt-1">Define the context of the AI application under assessment.</p>
      </div>

      <div className="space-y-4">
        <SelectField label="AI Application Domain" value={useCase.domain} options={domains} onChange={(v) => update("domain", v)} />
        <SelectField label="AI Use-Case Type" value={useCase.useCaseType} options={useCaseTypes} onChange={(v) => update("useCaseType", v)} />
        <SelectField label="Data Sensitivity" value={useCase.dataSensitivity} options={levels3} onChange={(v) => update("dataSensitivity", v)} />
        <SelectField label="User Impact Level" value={useCase.userImpact} options={levels3} onChange={(v) => update("userImpact", v)} />
        <SelectField label="Regulatory Exposure" value={useCase.regulatoryExposure} options={regLevels} onChange={(v) => update("regulatoryExposure", v)} />
      </div>

      {isComplete && (
        <div className="border rounded-lg bg-surface p-4 space-y-2">
          <p className="text-sm font-medium text-surface-foreground">Auto-Generated Indicators</p>
          <div className="flex gap-4 text-sm">
            <span className="text-muted-foreground">Contextual Risk Level:</span>
            <StatusBadge status={riskLevel!} />
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-muted-foreground">Governance Readiness:</span>
            <StatusBadge status={readiness!} />
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!isComplete}
          className="px-6 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
