import React from "react";
import "./ClientForm.css";
import FormStepDisplay from "../../components/clientForm/formStepDisplay/FormStepDisplay";
import FormStep from "../../components/clientForm/formStep/FormStep";
import Buttons from "../../components/clientForm/buttons/Buttons";

interface Step {
  inputs: {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: any) => void;
  }[];
}

const ClientForm = () => {
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    company: "",
    website: "",
    notes: "",
  });

  const [step, setStep] = React.useState(1);

  const handleChange = (input: any) => (e: any) => {
    setData({ ...data, [input]: e.target.value });
  };

  const steps: Step[] = [
    {
      inputs: [
        {
          type: "text",
          placeholder: "First Name",
          value: data.firstName,
          onChange: handleChange("firstName"),
        },
        {
          type: "text",
          placeholder: "Last Name",
          value: data.lastName,
          onChange: handleChange("lastName"),
        },
      ],
    },
    {
      inputs: [
        {
          type: "text",
          placeholder: "City",
          value: data.firstName,
          onChange: handleChange("firstName"),
        },
        {
          type: "text",
          placeholder: "Last Name",
          value: data.lastName,
          onChange: handleChange("lastName"),
        },
      ],
    },
  ];

  const nextStep = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="clientForm">
      <div className="clientFormContainer">
        <p className="clientFormTitle">Customer Details</p>
        <FormStepDisplay currentStep={step} numberOfSteps={steps.length} />
        <FormStep step={steps[step - 1]} />
        <Buttons
          handleNext={nextStep}
          handleBack={prevStep}
          displayBack={step > 1}
        />
      </div>
    </div>
  );
};

export default ClientForm;
export type { Step };
