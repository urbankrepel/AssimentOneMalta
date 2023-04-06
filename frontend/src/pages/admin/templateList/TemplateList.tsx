import React from "react";
import "./TemplateList.css";
import TemplateItem from "../../../components/templatesList/TemplateItem";
import { fetchAllTemplates } from "../../../api/admin";
import UploadFloatingWindow from "../../../components/templatesList/UploadFloatingWindow";

const TemplateList = () => {
  const [templates, setTemplates] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [displayUpload, setDisplayUpload] = React.useState<boolean>(false);

  const handleLoad = async () => {
    if (templates.length > 0) return;
    setLoading(true);
    const response: any = await fetchAllTemplates();

    if (response.status === 200) {
      setTemplates(response.data);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className="templateList">
      <button
        type="button"
        className="btn btn-success"
        onClick={() => setDisplayUpload(true)}
      >
        Upload
      </button>
      {displayUpload && (
        <UploadFloatingWindow
          setDisplayUpload={setDisplayUpload}
          handleLoad={handleLoad}
        />
      )}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-uppercase mb-0">
                Manage Templates
              </h5>
            </div>
            <div className="table-responsive">
              <table className="table no-wrap user-table mb-0">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="border-0 text-uppercase font-medium pl-4"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="border-0 text-uppercase font-medium"
                    >
                      Template Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!loading ? (
                    templates.map((item: any) => (
                      <TemplateItem key={item.id} {...item} />
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

export default TemplateList;
