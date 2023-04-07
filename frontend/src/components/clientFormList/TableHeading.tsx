import React from "react";

const TableHeading = () => {
  return (
    <tr>
      <th scope="col" className="border-0 text-uppercase font-medium pl-4">
        #
      </th>
      <th scope="col" className="border-0 text-uppercase font-medium">
        Name
      </th>
      <th scope="col" className="border-0 text-uppercase font-medium">
        Email
      </th>
      <th scope="col" className="border-0 text-uppercase font-medium">
        Filled Date
      </th>
    </tr>
  );
};

export default TableHeading;
