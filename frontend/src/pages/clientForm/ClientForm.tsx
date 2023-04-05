import React, { useEffect } from "react";
import "./ClientForm.css";
import FormStepDisplay from "../../components/clientForm/formStepDisplay/FormStepDisplay";
import FormStep from "../../components/clientForm/formStep/FormStep";
import Buttons from "../../components/clientForm/buttons/Buttons";
import AllInfromations from "../../components/clientForm/allInformations/AllInfromations";

interface Step {
  displayName: string;
  inputs: {
    type: string;
    placeholder: string;
    value: string;
    required: boolean;
    fieldName:
      | "firstName"
      | "lastName"
      | "email"
      | "phone"
      | "address"
      | "city"
      | "zip"
      | "country"
      | "dateOfBirth"
      | "id_card_number"
      | "tax_number"
      | "bank_account_number"
      | "vat_number";
    onChange: (e: any) => void;
  }[];
}

interface StepError {
  fieldName: string;
  message: string;
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
  const [displayOverview, setDisplayOverview] = React.useState(false);
  const [stepErrors, setStepErrors] = React.useState<StepError[]>([]);
  const [informationSaved, setInformationSaved] = React.useState(false);

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
          required: true,
          fieldName: "firstName",
          onChange: handleChange("firstName"),
        },
        {
          type: "text",
          placeholder: "Last Name",
          value: data.lastName,
          required: true,
          fieldName: "lastName",
          onChange: handleChange("lastName"),
        },
        {
          type: "date",
          placeholder: "Date of Birth",
          value: data.dateOfBirth,
          required: true,
          fieldName: "dateOfBirth",
          onChange: handleChange("dateOfBirth"),
        },
      ],
    },
    {
      displayName: "Contact Information",
      inputs: [
        {
          type: "email",
          placeholder: "Email",
          value: data.email,
          required: true,
          fieldName: "email",
          onChange: handleChange("email"),
        },
        {
          type: "text",
          placeholder: "Phone number",
          value: data.phone,
          required: true,
          fieldName: "phone",
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
          required: true,
          fieldName: "address",
          onChange: handleChange("address"),
        },
        {
          type: "text",
          placeholder: "City",
          value: data.city,
          required: true,
          fieldName: "city",
          onChange: handleChange("city"),
        },
        {
          type: "text",
          placeholder: "Zip",
          value: data.zip,
          required: true,
          fieldName: "zip",
          onChange: handleChange("zip"),
        },
        {
          type: "text",
          placeholder: "Country",
          value: data.country,
          required: true,
          fieldName: "country",
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
          required: true,
          fieldName: "id_card_number",
          onChange: handleChange("id_card_number"),
        },
        {
          type: "text",
          placeholder: "Tax Number",
          value: data.tax_number,
          required: true,
          fieldName: "tax_number",
          onChange: handleChange("tax_number"),
        },
        {
          type: "text",
          placeholder: "Bank Account Number",
          value: data.bank_account_number,
          required: true,
          fieldName: "bank_account_number",
          onChange: handleChange("bank_account_number"),
        },
        {
          type: "text",
          placeholder: "VAT Number",
          value: data.vat_number,
          required: true,
          fieldName: "vat_number",
          onChange: handleChange("vat_number"),
        },
      ],
    },
  ];

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateStep = (): boolean => {
    const currentErros: StepError[] = [];
    const currentStep = steps[step - 1];
    currentStep.inputs.forEach((input) => {
      const dataValue = data[input.fieldName];
      if (input.required && dataValue === "") {
        currentErros.push({
          fieldName: input.fieldName,
          message: "This field is required",
        });
      } else if (input.type === "email" && !validateEmail(dataValue)) {
        currentErros.push({
          fieldName: input.fieldName,
          message: "Invalid email",
        });
      }
    });
    setStepErrors(currentErros);
    return currentErros.length === 0;
  };

  const nextStep = () => {
    if (step < steps.length && validateStep()) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const showOverview = () => {
    if (validateStep()) {
      setDisplayOverview(true);
      setInformationSaved(true);
    }
  };

  const editStep = (step: number) => {
    setStep(step);
    setDisplayOverview(false);
  };

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
        <p className="clientFormTitle">
          {!displayOverview
            ? steps[step - 1].displayName
            : "Check your information"}
        </p>
        {!displayOverview && (
          <FormStepDisplay currentStep={step} numberOfSteps={steps.length} />
        )}
        {!displayOverview && (
          <FormStep
            step={steps[step - 1]}
            maxNumberOfInputs={maxInputs}
            errors={stepErrors}
          />
        )}
        {!displayOverview && (
          <Buttons
            handleNext={
              step < steps.length && !informationSaved ? nextStep : showOverview
            }
            handleBack={prevStep}
            displayBack={step > 1}
            nextDisplayName={
              informationSaved
                ? "Save"
                : step < steps.length
                ? "Next"
                : "Check your information"
            }
          />
        )}
        {displayOverview && (
          <AllInfromations data={data} steps={steps} editStep={editStep} />
        )}
      </div>
    </div>
  );
};

export default ClientForm;
export type { Step, StepError };
