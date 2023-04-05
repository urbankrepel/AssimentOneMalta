import React from "react";
import "./FormStep.css";
import { Step, StepError } from "../../../pages/clientForm/ClientForm";

const FormStep = ({
  step,
  maxNumberOfInputs,
  errors
}: {
  step: Step;
  maxNumberOfInputs: number;
  errors: StepError[];
}) => {
  return (
    <div className="clientForm-step">
      {step.inputs.map((input, index) => (
        <div className="clientForm-step-input">
        <input
          key={index}
          type={input.type}
          placeholder={input.placeholder}
          value={input.value}
          onChange={input.onChange}
        />

        {errors.map((error) => {
          if (error.fieldName === input.fieldName) {
            return <p className="clientForm-step-error">{error.message}</p>;
          }
        })}
        </div>
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
