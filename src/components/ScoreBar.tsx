import { cn } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  value: number;
  max?: number;
}

export function ScoreBar({ label, value, max = 100 }: ScoreBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{label}</span>
        <span className="text-muted-foreground">{value}/{max}</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            pct >= 70 ? "bg-success" : pct >= 40 ? "bg-warning" : "bg-destructive"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
