import React from "react";
import "./ClientFormList.css";
import ClientFormItem from "../../../components/clientFormList/ClientFormItem";
import TableHeading from "../../../components/clientFormList/TableHeading";
import { fetchAllClientForms } from "../../../api/admin";
import useAlert from "../../../hooks/useAlert";

const ClientFromList = () => {
  const { show } = useAlert();

  const [data, setData] = React.useState<any>([]);

  const handleLoad = async () => {
    if (data.length > 0) return;
    const response = await fetchAllClientForms();
    if (response.status === 200) {
      console.log(response.data);
      setData(response.data);
    }
  };

  React.useEffect(() => {
    handleLoad();
  }, []);
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
                  {data && data.length > 0 ? (
                    data.map((item: any) => (
                      <ClientFormItem key={item.id} {...item} />
                    ))
                  ) : (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
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
