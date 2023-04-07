import React from "react";

interface Props {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  country: string;
  setSelectForm: (id: number) => void;
}

const ClientFormItem = ({
  id,
  first_name,
  last_name,
  email,
  phone_number,
  address,
  city,
  country,
  setSelectForm,
}: Props) => {
  const handleSelectForm = () => {
    setSelectForm(id);
  };

  return (
    <tr>
      <td className="pl-4">{id ?? "1"}</td>
      <td>
        <h5 className="font-medium mb-0">{first_name + " " + last_name}</h5>
        <span className="text-muted">
          {city}, {country}
        </span>
      </td>
      <td>
        <span className="text-muted">{email}</span>
        <br />
        <span className="text-muted">{phone_number}</span>
      </td>
      <td>
        <span className="text-muted">15 Mar 1988</span>
        <br />
        <span className="text-muted">10: 55 AM</span>
      </td>
      <td>
        <button className="btn btn-primary" onClick={handleSelectForm}>
          Choose Template
        </button>
      </td>
    </tr>
  );
};

export default ClientFormItem;
