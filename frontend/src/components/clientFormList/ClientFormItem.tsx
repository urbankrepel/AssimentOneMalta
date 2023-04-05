import React from "react";



const ClientFormItem = () => {
  return (
    <tr>
      <td className="pl-4">1</td>
      <td>
        <h5 className="font-medium mb-0">Daniel Kristeen</h5>
        <span className="text-muted">Texas, Unitedd states</span>
      </td>
      <td>
        <span className="text-muted">Visual Designer</span>
        <br />
        <span className="text-muted">Past : teacher</span>
      </td>
      <td>
        <span className="text-muted">daniel@website.com</span>
        <br />
        <span className="text-muted">999 - 444 - 555</span>
      </td>
      <td>
        <span className="text-muted">15 Mar 1988</span>
        <br />
        <span className="text-muted">10: 55 AM</span>
      </td>
      <td>
        <select
          className="form-control category-select"
          id="exampleFormControlSelect1"
        >
          <option>Modulator</option>
          <option>Admin</option>
          <option>User</option>
          <option>Subscriber</option>
        </select>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-outline-info btn-circle btn-lg btn-circle"
        >
          <i className="fa fa-key"></i>{" "}
        </button>
        <button
          type="button"
          className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
        >
          <i className="fa fa-trash"></i>{" "}
        </button>
        <button
          type="button"
          className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
        >
          <i className="fa fa-edit"></i>{" "}
        </button>
        <button
          type="button"
          className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"
        >
          <i className="fa fa-upload"></i>{" "}
        </button>
      </td>
    </tr>
  );
};

export default ClientFormItem;
