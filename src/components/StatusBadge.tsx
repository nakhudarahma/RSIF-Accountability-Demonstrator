import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "escalation";
}

const colorMap: Record<string, string> = {
  Low: "bg-success/10 text-success",
  Medium: "bg-warning/10 text-warning",
  High: "bg-destructive/10 text-destructive",
  Green: "bg-success/10 text-success",
  Amber: "bg-warning/10 text-warning",
  Red: "bg-destructive/10 text-destructive",
  Ready: "bg-success/10 text-success",
  "Conditionally Ready": "bg-warning/10 text-warning",
  "Not Ready": "bg-destructive/10 text-destructive",
  Basic: "bg-muted text-muted-foreground",
  Moderate: "bg-info/10 text-info",
  Enhanced: "bg-primary/10 text-primary",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium", colorMap[status] || "bg-muted text-muted-foreground")}>
      {status}
    </span>
  );
}
