import { useAppState } from "@/context/AppContext";
import { PageShell } from "@/components/PageShell";
import { StepIndicator } from "@/components/StepIndicator";
import { UseCaseForm } from "@/components/forms/UseCaseForm";
import { GovernanceForm } from "@/components/forms/GovernanceForm";
import { TechnicalForm } from "@/components/forms/TechnicalForm";
import { DeploymentForm } from "@/components/forms/DeploymentForm";
import { SustainabilityForm } from "@/components/forms/SustainabilityForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const allSteps = ["Context", "Governance", "Technical", "Deployment", "Sustainability"];

export default function Workflow() {
  const { step, setStep, role } = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) navigate("/role");
  }, [role, navigate]);

  // Developer skips Context and Governance (steps 0,1)
  const visibleSteps = role === "developer"
    ? allSteps.filter((_, i) => i >= 2)
    : allSteps;

  const actualStep = role === "developer" ? step + 2 : step;

  const handleNext = () => {
    const maxSteps = role === "developer" ? 3 : 5;
    if (step + 1 >= maxSteps) {
      navigate("/dashboard");
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderForm = () => {
    switch (actualStep) {
      case 0: return <UseCaseForm onNext={handleNext} />;
      case 1: return <GovernanceForm onNext={handleNext} onBack={handleBack} />;
      case 2: return <TechnicalForm onNext={handleNext} onBack={handleBack} />;
      case 3: return <DeploymentForm onNext={handleNext} onBack={handleBack} />;
      case 4: return <SustainabilityForm onNext={handleNext} onBack={handleBack} />;
      default: return null;
    }
  };

  return (
    <PageShell narrow>
      <StepIndicator steps={visibleSteps} currentStep={step} />
      {renderForm()}
    </PageShell>
  );
}
