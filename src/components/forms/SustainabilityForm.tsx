import { useAppState } from "@/context/AppContext";
import { StatusBadge } from "@/components/StatusBadge";
import { computeCheckboxScore, computeImpactRisk } from "@/lib/scoring";
import { SUSTAINABILITY_ITEMS } from "@/lib/assessment-content";
import { LikertField } from "./LikertField";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function SustainabilityForm({ onNext, onBack }: Props) {
  const { sustainability, setSustainability } = useAppState();

  const update = (key: string, value: string) => {
    setSustainability({ ...sustainability, [key]: value });
  };

  const answered = SUSTAINABILITY_ITEMS.filter((item) => sustainability[item.key as keyof typeof sustainability]).length;
  const isComplete = answered === SUSTAINABILITY_ITEMS.length;
  const score = computeCheckboxScore(sustainability);
  const impactRisk = isComplete ? computeImpactRisk(score) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Sustainability &amp; Long-Term Impact</h2>
        <p className="text-sm text-muted-foreground mt-1">Evaluate environmental and societal sustainability considerations.</p>
        <p className="text-xs text-muted-foreground mt-3 italic">
          Select the option that best reflects current practice, not intended future state.
        </p>
      </div>

      <div className="space-y-5">
        {SUSTAINABILITY_ITEMS.map((item) => (
          <LikertField
            key={item.key}
            name={`sustainability-${item.key}`}
            prompt={item.prompt}
            context={item.context}
            value={sustainability[item.key as keyof typeof sustainability]}
            onChange={(v) => update(item.key, v)}
          />
        ))}
      </div>

      {isComplete && (
        <div className="border rounded-lg bg-surface p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-surface-foreground font-medium">Sustainability Responsibility Index</span>
            <span className="font-bold text-foreground">{score}/100</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${score >= 70 ? "bg-success" : score >= 40 ? "bg-warning" : "bg-destructive"}`}
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <span className="text-muted-foreground">Impact Risk Flag</span>
            <StatusBadge status={impactRisk!} />
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button onClick={onBack} className="px-6 py-2 rounded-md text-sm font-medium border bg-card text-foreground hover:bg-accent transition-colors">Back</button>
        <button
          onClick={onNext}
          disabled={!isComplete}
          className="px-6 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
        >
          View Dashboard
        </button>
      </div>
    </div>
  );
}
