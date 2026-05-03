import { useNavigate } from "react-router-dom";
import { useAppState, Role } from "@/context/AppContext";
import { PageShell } from "@/components/PageShell";
import { cn } from "@/lib/utils";

const roles: { id: Role; label: string; description: string }[] = [
  { id: "founder", label: "Founder / Admin", description: "Full access to all accountability stages and the final dashboard." },
  { id: "developer", label: "Developer", description: "Access to technical, deployment stages and the accountability dashboard." },
  { id: "auditor", label: "Auditor (Read-only)", description: "Read-only view of the accountability dashboard and lifecycle overview." },
];

export default function RoleSelection() {
  const { role, setRole, setStep } = useAppState();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!role) return;
    setStep(0);
    if (role === "auditor") {
      navigate("/dashboard");
    } else {
      navigate("/workflow");
    }
  };

  return (
    <PageShell narrow>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Select Your Role</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your role determines which accountability stages are accessible.
          </p>
        </div>

        <div className="space-y-3">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className={cn(
                "w-full text-left border rounded-lg p-4 transition-colors",
                role === r.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              <p className="font-medium text-foreground">{r.label}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{r.description}</p>
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!role}
          className={cn(
            "w-full py-2.5 rounded-md text-sm font-medium transition-colors",
            role
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Continue
        </button>
      </div>
    </PageShell>
  );
}
