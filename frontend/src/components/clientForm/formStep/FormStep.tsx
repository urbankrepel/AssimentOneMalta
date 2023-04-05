import React from "react";
import "./FormStep.css";
import { Step } from "../../../pages/clientForm/ClientForm";

const FormStep = ({ step }: { step: Step }) => {
  return (
    <div className="clientForm-step">
      {step.inputs.map((input, index) => (
        <input
          key={index}
          type={input.type}
          placeholder={input.placeholder}
          value={input.value}
          onChange={input.onChange}
        />
      ))}
    </div>
  );
};

export default FormStep;
