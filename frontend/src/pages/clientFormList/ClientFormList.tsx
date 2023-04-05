import React from "react";
import "./ClientFormList.css";
import ClientFormItem from "../../components/clientFormList/ClientFormItem";
import TableHeading from "../../components/clientFormList/TableHeading";

const ClientFromList = () => {
  return (
    <div className="clientPage">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-uppercase mb-0">Manage Users</h5>
            </div>
            <div className="table-responsive">
              <table className="table no-wrap user-table mb-0">
                <thead>
                  <TableHeading />
                </thead>
                <tbody>
                  <ClientFormItem />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFromList;
