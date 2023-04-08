import React from "react";
import "./AdminForms.css";
import { Step } from "../../../pages/clientForm/ClientForm";
import axios from "axios";

interface AdminInput {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  name: string;
}

interface AdminInputError {
  name: string;
  error: string;
}

interface Props {
  templateId: string | undefined;
  clientId: string | undefined;
}

const AdminForms = ({ templateId, clientId }: Props) => {
  const [adminData, setAdminData] = React.useState<any>({
    referenc_number: "",
    commencement_date: "",
    service: "",
    service_fee_vat: "",
    service_fee: "",
    payment_terms: "",
  });
  const [errors, setErrors] = React.useState<AdminInputError[]>([]);

  const onChange = (e: any) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const inputs: AdminInput[] = [
    {
      type: "text",
      placeholder: "Reference number",
      value: adminData.referenc_number,
      name: "referenc_number",
      onChange: onChange,
    },
    {
      type: "text",
      placeholder: "Service",
      value: adminData.service,
      onChange: onChange,
      name: "service",
    },
    {
      type: "date",
      placeholder: "Commencement date",
      value: adminData.commencement_date,
      onChange: onChange,
      name: "commencement_date",
    },
    {
      type: "number",
      placeholder: "Service fee",
      value: adminData.service_fee,
      onChange: onChange,
      name: "service_fee",
    },
    {
      type: "number",
      placeholder: "Service fee VAT",
      value: adminData.service_fee_vat,
      onChange: onChange,
      name: "service_fee_vat",
    },
    {
      type: "number",
      placeholder: "Payment terms",
      value: adminData.payment_terms,
      name: "payment_terms",
      onChange: onChange,
    },
  ];

  const handleValidation = () => {
    let isValid = true;
    const errors: AdminInputError[] = [];
    inputs.forEach((input) => {
      const dataValue = adminData[input.name] || "";
      if (dataValue === "" || dataValue === "0") {
        isValid = false;
        errors.push({ name: input.name, error: "This field is required" });
      } else if (input.type === "email") {
        if (!dataValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          isValid = false;
          errors.push({ name: input.name, error: "Invalid email address" });
        }
      } else if (input.type === "number") {
        if (!dataValue.match(/^[0-9]+$/)) {
          isValid = false;
          errors.push({ name: input.name, error: "Invalid number" });
        }
      }
    });
    setErrors(errors);
    return isValid;
  };

  const handleSubmission = () => {
    if (!handleValidation()) return;

    const url = `http://localhost:3000/client/generate/admin/template/${templateId}/client/${clientId}`;
    axios
      .post(url, adminData, {
        responseType: "blob",
        withCredentials: true,
      })
      .then((res) => {
        const href = window.URL.createObjectURL(res.data);

        const link = document.createElement("a");
        link.href = href;
        link.download = "admin.pdf";
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
  };

  return (
    <div className="clientFormViewer-admin-form">
      <p>Admin Forms</p>
      <div className="clientFormViewer-admin-form-inputs">
        {inputs.map((input, index) => (
          <div className="clientFormViewer-admin-form-input" key={index}>
            <input
              type={input.type}
              placeholder={input.placeholder}
              value={input.value}
              name={input.name}
              onChange={input.onChange}
            />
            {errors.map((error) => {
              if (error.name === input.name) {
                return <p className="error">{error.error}</p>;
              }
            })}
          </div>
        ))}
      </div>
      <button className="btn btn-success" onClick={handleSubmission}>
        Download as PDF
      </button>
    </div>
  );
};

export default AdminForms;
