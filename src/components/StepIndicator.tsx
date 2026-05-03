import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center">
          <button
            onClick={() => onStepClick?.(i)}
            disabled={!onStepClick}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors",
              i === currentStep
                ? "bg-primary text-primary-foreground font-medium"
                : i < currentStep
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs font-medium">
              {i + 1}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </button>
          {i < steps.length - 1 && (
            <div className={cn("w-6 h-px mx-1", i < currentStep ? "bg-primary" : "bg-border")} />
          )}
        </div>
      ))}
    </div>
  );
}
