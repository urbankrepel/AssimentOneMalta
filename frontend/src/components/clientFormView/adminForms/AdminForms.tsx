import React from "react";
import "./AdminForms.css";
import { Step } from "../../../pages/clientForm/ClientForm";
import axios, { AxiosResponse } from "axios";
import { fetchAdminInputs } from "../../../api/admin";
import APIUrl from "../../../api/api";

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
  const [adminData, setAdminData] = React.useState<any>({});
  const [errors, setErrors] = React.useState<AdminInputError[]>([]);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    const newAdminData = adminData;
    newAdminData[name] = value;
    setAdminData(newAdminData);
  };

  const [inputs, setInputs] = React.useState<AdminInput[]>([]);

  const loadAdminInputs = async () => {
    const response = await fetchAdminInputs(templateId ?? "0");
    if (response.status !== 200) return;
    const data = response.data;
    const adminInputs: AdminInput[] = [];
    const newAdminData: any = {};
    data.map((input: any) => {
      adminInputs.push({
        type: input.type,
        placeholder: input.placeholder,
        value: newAdminData[input.name],
        onChange: onChange,
        name: input.name,
      });
    });
    setInputs(adminInputs);
    setAdminData(newAdminData);
  };

  React.useEffect(() => {
    loadAdminInputs();
  }, []);

  const handleValidation = () => {
    let isValid = true;
    const errors: AdminInputError[] = [];
    inputs.forEach((input) => {
      console.log(input.name);
      console.log(adminData);
      const dataValue = adminData[input.name] || "";
      if (dataValue === "" || dataValue === "0") {
        isValid = false;
        errors.push({ name: input.name, error: "This field is required" });
      } else if (input.type === "email") {
        if (!dataValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          isValid = false;
          errors.push({ name: input.name, error: "Invalid email address" });
        }
      }
    });
    setErrors(errors);
    return isValid;
  };

  const handleSubmission = () => {
    if (!handleValidation()) return;

    const url = `${APIUrl}/client/generate/admin/template/${templateId}/client/${clientId}`;
    axios
      .post(url, adminData, {
        responseType: "blob",
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        const href = window.URL.createObjectURL(res.data);

        console.log(res.headers);

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
