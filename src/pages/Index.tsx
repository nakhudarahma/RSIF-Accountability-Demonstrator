import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              RSIF Accountability Demonstrator
            </h1>
            <p className="text-lg text-primary font-medium">
              Operationalizing Responsible and Sustainable AI Innovation
            </p>
          </div>

          <div className="border rounded-lg bg-card p-6 text-left space-y-3">
            <p className="text-sm text-foreground leading-relaxed">
              This is a conceptual academic prototype designed to demonstrate how AI accountability
              can be structured as a lifecycle-oriented governance process within startup ecosystems.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The prototype operationalizes the Responsible and Sustainable Innovation Framework (RSIF)
              through role-based access, sequential accountability stages, and simulated scoring —
              all without backend infrastructure or AI execution. Data is stored in-memory and resets on refresh.
            </p>
          </div>

          <Button onClick={() => navigate("/role")} size="lg" className="px-8">
            Start Demonstration
          </Button>

          <p className="text-xs text-muted-foreground">
            For academic research purposes only · No real data is collected or stored
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
