import React from "react";
import useAlert from "../../hooks/useAlert";
import { fetchDeleteTemplate, fetchRenameTemplate } from "../../api/admin";

interface Props {
  id: number;
  name: string;
  reload: () => void;
}

const TemplateItem = ({ id, name, reload }: Props) => {
  const { show } = useAlert();
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this template?"
    );
    if (confirm) {
      const promise = fetchDeleteTemplate(id);
      await show(
        promise,
        "Deleting template...",
        "Template deleted successfully"
      );
      await reload();
    }
  };
  const handleRename = async () => {
    const newName = window.prompt("Enter new name");
    if (newName) {
      const promise = fetchRenameTemplate(id, newName);
      await show(
        promise,
        "Renaming template...",
        "Template renamed successfully"
      );
      await reload();
    }
  };
  return (
    <tr>
      <td className="pl-4">{id ?? "1"}</td>
      <td>
        <p>{name}</p>
      </td>
      <td>
        <button className="btn btn-primary" onClick={handleRename}>
          Rename
        </button>
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
