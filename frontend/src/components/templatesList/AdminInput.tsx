import React from "react";

const AdminInput = ({
  input,
  handleChange,
  remove,
}: {
  input: any;
  handleChange: any;
  remove: any;
}) => {
  const { id, type, placeholder, name } = input;
  const onChange = (e: any) => {
    handleChange(id, e.target.name, e.target.value);
  };
  const removeInput = () => {
    remove(id);
  };
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        name="placeholder"
        placeholder="Placeholder"
        onChange={onChange}
        value={placeholder}
        aria-describedby="basic-addon2"
      />
      <input
        type="text"
        className="form-control"
        placeholder="Name"
        onChange={onChange}
        value={name}
        name="name"
        aria-describedby="basic-addon2"
      />
      <select
        className="custom-select"
        id="inputGroupSelect02"
        name="type"
        onChange={onChange}
        value={type}
      >
        <option defaultValue={"text"} value={"text"}>
          Text
        </option>
        <option value={"number"}>Number</option>
        <option value={"date"}>Date</option>
        <option value={"time"}>Time</option>
        <option value={"checkbox"}>Checkbox</option>
      </select>
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={removeInput}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default AdminInput;
