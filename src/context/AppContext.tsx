import React, { createContext, useContext, useState, ReactNode } from "react";

export type Role = "founder" | "developer" | "auditor" | null;

export interface UseCaseData {
  domain: string;
  useCaseType: string;
  dataSensitivity: string;
  userImpact: string;
  regulatoryExposure: string;
}

export interface GovernanceData {
  [key: string]: string;
  ethicalGuidelines: string;
  regulatoryObligations: string;
  responsibilityAssigned: string;
  documentationPolicy: string;
  stakeholderImpact: string;
}

export interface TechnicalData {
  [key: string]: string;
  datasetDocumentation: string;
  biasAssessment: string;
  explainability: string;
  humanInLoop: string;
  versioningPolicy: string;
}

export interface DeploymentData {
  [key: string]: string;
  monitoringStrategy: string;
  feedbackMechanism: string;
  incidentReporting: string;
  rollbackPlan: string;
}

export interface SustainabilityData {
  [key: string]: string;
  computeIntensity: string;
  energyOptimization: string;
  accessibility: string;
  societalRisks: string;
}

interface AppState {
  role: Role;
  setRole: (r: Role) => void;
  step: number;
  setStep: (s: number) => void;
  useCase: UseCaseData;
  setUseCase: (d: UseCaseData) => void;
  governance: GovernanceData;
  setGovernance: (d: GovernanceData) => void;
  technical: TechnicalData;
  setTechnical: (d: TechnicalData) => void;
  deployment: DeploymentData;
  setDeployment: (d: DeploymentData) => void;
  sustainability: SustainabilityData;
  setSustainability: (d: SustainabilityData) => void;
  resetDemo: () => void;
}

const defaultUseCase: UseCaseData = {
  domain: "",
  useCaseType: "",
  dataSensitivity: "",
  userImpact: "",
  regulatoryExposure: "",
};

const defaultGovernance: GovernanceData = {
  ethicalGuidelines: "",
  regulatoryObligations: "",
  responsibilityAssigned: "",
  documentationPolicy: "",
  stakeholderImpact: "",
};

const defaultTechnical: TechnicalData = {
  datasetDocumentation: "",
  biasAssessment: "",
  explainability: "",
  humanInLoop: "",
  versioningPolicy: "",
};

const defaultDeployment: DeploymentData = {
  monitoringStrategy: "",
  feedbackMechanism: "",
  incidentReporting: "",
  rollbackPlan: "",
};

const defaultSustainability: SustainabilityData = {
  computeIntensity: "",
  energyOptimization: "",
  accessibility: "",
  societalRisks: "",
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [step, setStep] = useState(0);
  const [useCase, setUseCase] = useState<UseCaseData>(defaultUseCase);
  const [governance, setGovernance] = useState<GovernanceData>(defaultGovernance);
  const [technical, setTechnical] = useState<TechnicalData>(defaultTechnical);
  const [deployment, setDeployment] = useState<DeploymentData>(defaultDeployment);
  const [sustainability, setSustainability] = useState<SustainabilityData>(defaultSustainability);
  const resetDemo = () => {
    setRole(null);
    setStep(0);
    setUseCase(defaultUseCase);
    setGovernance(defaultGovernance);
    setTechnical(defaultTechnical);
    setDeployment(defaultDeployment);
    setSustainability(defaultSustainability);
  };

  return (
    <AppContext.Provider
      value={{
        role, setRole,
        step, setStep,
        useCase, setUseCase,
        governance, setGovernance,
        technical, setTechnical,
        deployment, setDeployment,
        sustainability, setSustainability,
        resetDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
}
