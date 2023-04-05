import React from "react";
import "./FormStepDisplay.css";

interface Props {
  currentStep: number;
  numberOfSteps: number;
}

const FormStepDisplay = ({ currentStep, numberOfSteps }: Props) => {
  return (
    <div className="formStepDisplay">
      {Array.from(Array(numberOfSteps).keys()).map((step) => (
        <FormStep key={step} active={step + 1 <= currentStep} />
      ))}
    </div>
  );
};

const FormStep = ({ active }: { active: boolean }) => {
  return <div className={`formStep ${active ? "formStepActive" : ""}`}></div>;
};

export default FormStepDisplay;
