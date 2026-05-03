import { useAppState } from "@/context/AppContext";
import { computeCheckboxScore } from "@/lib/scoring";
import { GOVERNANCE_ITEMS } from "@/lib/assessment-content";
import { LikertField } from "./LikertField";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function GovernanceForm({ onNext, onBack }: Props) {
  const { governance, setGovernance } = useAppState();

  const update = (key: string, value: string) => {
    setGovernance({ ...governance, [key]: value });
  };

  const score = computeCheckboxScore(governance);
  const answered = GOVERNANCE_ITEMS.filter((item) => governance[item.key as keyof typeof governance]).length;
  const unanswered = GOVERNANCE_ITEMS.length - answered;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Governance Accountability</h2>
        <p className="text-sm text-muted-foreground mt-1">Assess organizational governance readiness for AI deployment.</p>
        <p className="text-xs text-muted-foreground mt-3 italic">
          Select the option that best reflects current practice, not intended future state.
        </p>
      </div>

      <div className="space-y-5">
        {GOVERNANCE_ITEMS.map((item) => (
          <LikertField
            key={item.key}
            name={`governance-${item.key}`}
            prompt={item.prompt}
            context={item.context}
            value={governance[item.key as keyof typeof governance]}
            onChange={(v) => update(item.key, v)}
          />
        ))}
      </div>

      <div className="border rounded-lg bg-surface p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-surface-foreground font-medium">Governance Accountability Score</span>
          <span className="font-bold text-foreground">{score}/100</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${score >= 80 ? "bg-success" : score >= 40 ? "bg-warning" : "bg-destructive"}`}
            style={{ width: `${score}%` }}
          />
        </div>
        {unanswered > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            ⚠ {unanswered} item{unanswered > 1 ? "s" : ""} not yet assessed
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-6 py-2 rounded-md text-sm font-medium border bg-card text-foreground hover:bg-accent transition-colors">Back</button>
        <button onClick={onNext} className="px-6 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Next</button>
      </div>
    </div>
  );
}
