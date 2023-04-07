import React from "react";
import "./ClientFormList.css";
import ClientFormItem from "../../../components/clientFormList/ClientFormItem";
import TableHeading from "../../../components/clientFormList/TableHeading";
import { fetchAllClientForms } from "../../../api/admin";
import useAlert from "../../../hooks/useAlert";
import { useNavigate } from "react-router-dom";
import ChooseTemplate from "../../../components/clientFormList/ChooseTemplate";

const ClientFromList = () => {
  const { showError } = useAlert();
  const navigate = useNavigate();

  const [data, setData] = React.useState<any>([]);
  const [selectedForm, setSelectedForm] = React.useState<number | null>(null);

  const handleLoad = async () => {
    if (data.length > 0) return;
    const response: any = await fetchAllClientForms();
    if (response.status === 200) {
      setData(response.data);
    } else if (response.status === 403) {
      navigate("/login");
      showError("You are not authorized to view this page!");
    }
  };

  React.useEffect(() => {
    handleLoad();
  }, []);
  return (
    <div className="clientPage">
      {selectedForm != null && (
        <ChooseTemplate setSelectedForm={setSelectedForm} selectedForm={selectedForm}/>
      )}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-uppercase mb-0">Clients Forms</h5>
            </div>
            <div className="table-responsive">
              <table className="table no-wrap user-table mb-0">
                <thead>
                  <TableHeading />
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
                    data.map((item: any) => (
                      <ClientFormItem
                        key={item.id}
                        {...item}
                        setSelectForm={setSelectedForm}
                      />
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
