import React from "react";
import useAlert from "../../hooks/useAlert";
import { fetchDeleteTemplate } from "../../api/admin";

interface Props {
  id: number;
  name: string;
}

const TemplateItem = ({ id, name }: Props) => {
  const { show } = useAlert();
  const handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this template?"
    );
    if (confirm) {
      const promise = fetchDeleteTemplate(id);
      show(promise, "Deleting template...", "Template deleted successfully");
    }
  };
  return (
    <tr>
      <td className="pl-4">{id ?? "1"}</td>
      <td>
        <p>{name}</p>
      </td>
      <td>
        <button className="btn btn-primary">Rename</button>
        <button
          className="btn btn-danger"
          style={{ marginLeft: "10px" }}
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TemplateItem;
