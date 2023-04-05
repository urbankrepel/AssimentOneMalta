import React, { useEffect } from "react";
import "./ClientForm.css";
import FormStepDisplay from "../../components/clientForm/formStepDisplay/FormStepDisplay";
import FormStep from "../../components/clientForm/formStep/FormStep";
import Buttons from "../../components/clientForm/buttons/Buttons";

interface Step {
  displayName: string;
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
    zip: "",
    country: "",
    dateOfBirth: "",
    id_card_number: "",
    tax_number: "",
    bank_account_number: "",
    vat_number: "",
  });

  const [step, setStep] = React.useState(1);
  const [maxInputs, setMaxInputs] = React.useState(0);

  const handleChange = (input: any) => (e: any) => {
    setData({ ...data, [input]: e.target.value });
  };

  const steps: Step[] = [
    {
      displayName: "Personal Details",
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
        {
          type: "date",
          placeholder: "Date of Birth",
          value: data.dateOfBirth,
          onChange: handleChange("dateOfBirth"),
        },
      ],
    },
    {
      displayName: "Contact Information",
      inputs: [
        {
          type: "text",
          placeholder: "Email",
          value: data.email,
          onChange: handleChange("email"),
        },
        {
          type: "text",
          placeholder: "Phone number",
          value: data.phone,
          onChange: handleChange("phone"),
        },
      ],
    },
    {
      displayName: "Address",
      inputs: [
        {
          type: "text",
          placeholder: "Address",
          value: data.address,
          onChange: handleChange("address"),
        },
        {
          type: "text",
          placeholder: "City",
          value: data.city,
          onChange: handleChange("city"),
        },
        {
          type: "text",
          placeholder: "Zip",
          value: data.zip,
          onChange: handleChange("zip"),
        },
        {
          type: "text",
          placeholder: "Country",
          value: data.country,
          onChange: handleChange("country"),
        },
      ],
    },
    {
      displayName: "Other Information",
      inputs: [
        {
          type: "text",
          placeholder: "ID Card Number",
          value: data.id_card_number,
          onChange: handleChange("id_card_number"),
        },
        {
          type: "text",
          placeholder: "Tax Number",
          value: data.tax_number,
          onChange: handleChange("tax_number"),
        },
        {
          type: "text",
          placeholder: "Bank Account Number",
          value: data.bank_account_number,
          onChange: handleChange("bank_account_number"),
        },
        {
          type: "text",
          placeholder: "VAT Number",
          value: data.vat_number,
          onChange: handleChange("vat_number"),
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

  const handleSubmit = () => {}

  useEffect(() => {
    let max = 0;
    steps.forEach((step) => {
      max = Math.max(max, step.inputs.length);
    });
    setMaxInputs(max);
  }, [steps]);

  return (
    <div className="clientForm">
      <div className="clientFormContainer">
        <p className="clientFormTitle">{steps[step - 1].displayName}</p>
        <FormStepDisplay currentStep={step} numberOfSteps={steps.length} />
        <FormStep step={steps[step - 1]} maxNumberOfInputs={maxInputs} />
        <Buttons
          handleNext={step < steps.length ? nextStep : handleSubmit}
          handleBack={prevStep}
          displayBack={step > 1}
          nextDisplayName={step < steps.length ? "Next" : "Submit" }
        />
      </div>
    </div>
  );
};

export default ClientForm;
export type { Step };
