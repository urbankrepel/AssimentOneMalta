import React from "react";
import "./FormStep.css";
import { Step } from "../../../pages/clientForm/ClientForm";

const FormStep = ({
  step,
  maxNumberOfInputs,
}: {
  step: Step;
  maxNumberOfInputs: number;
}) => {
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
      {maxNumberOfInputs - step.inputs.length > 0
        ? Array.from(Array(maxNumberOfInputs - step.inputs.length).keys()).map(
            (index) => <input key={index} type="text" placeholder="" disabled />
          )
        : null}
    </div>
  );
};

export default FormStep;
