import { LIKERT_OPTIONS } from "@/lib/assessment-content";

interface LikertFieldProps {
  prompt: string;
  context: string;
  value: string;
  name: string;
  onChange: (value: string) => void;
}

export function LikertField({ prompt, context, value, name, onChange }: LikertFieldProps) {
  return (
    <div className="border rounded-lg bg-card p-5 space-y-3">
      <div>
        <p className="text-sm font-semibold text-foreground leading-snug">{prompt}</p>
        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{context}</p>
      </div>
      <div className="space-y-1.5 pl-1">
        {LIKERT_OPTIONS.map((option) => (
          <label
            key={option}
            className="flex items-start gap-3 py-1.5 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              checked={value === option}
              onChange={() => onChange(option)}
              className="mt-0.5 w-4 h-4 accent-primary shrink-0"
            />
            <span
              className={`text-sm leading-snug ${
                value === option
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
