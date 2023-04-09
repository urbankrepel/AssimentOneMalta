import React, { useEffect } from "react";
import AdminInput from "./AdminInput";
import { createAdminInputs } from "../../api/admin";

const AddAdminInputs = ({ templateId }: { templateId: number }) => {
  const [inputs, setInputs] = React.useState<any>([]);

  const handleChange = (
    id: number,
    name_of_field: string,
    newValue: string
  ) => {
    const newInputs = inputs.map((input: any) => {
      if (input.id === id) {
        input[name_of_field] = newValue;
        if (name_of_field === "placeholder") {
          const newInputName = newValue.toLowerCase().replace(/ /g, "_");
          input.name = newInputName;
        }
      }
      return input;
    });
    setInputs(newInputs);
  };

  const removeInput = (id: number) => {
    const newInputs = inputs.filter((input: any) => input.id !== id);
    setInputs(newInputs);
  };

  const addInput = () => {
    const newInput = {
      id: inputs.length,
      type: "text",
      placeholder: "",
      name: "",
    };
    setInputs([...inputs, newInput]);
  };

  const handleSubmit = async () => {
    await createAdminInputs(templateId, inputs);
  };

  useEffect(() => {
    if (templateId) {
      handleSubmit();
    }
  }, [templateId]);

  return (
    <div className="form-group" style={{ paddingTop: "10px" }}>
      <button type="button" className="btn btn-primary" onClick={addInput}>
        Add Input
      </button>
      <div id="inputs" style={{ paddingTop: "10px" }}>
        {inputs.map((input: any) => (
          <AdminInput
            key={input.id}
            input={input}
            handleChange={handleChange}
            remove={removeInput}
          />
        ))}
      </div>
    </div>
  );
};

export default AddAdminInputs;
