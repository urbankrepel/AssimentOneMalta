import React from "react";
import { fetchAllTemplates } from "../../api/admin";
import { useNavigate } from "react-router-dom";

interface Props {
  setSelectedForm: (id: null) => void;
  selectedForm: number | null;
}

const ChooseTemplate = ({ setSelectedForm, selectedForm }: Props) => {
  const [templates, setTemplates] = React.useState<any>([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState<number | null>(
    null
  );
  const navigate = useNavigate();

  const handleClose = () => {
    setSelectedForm(null);
  };

  const handleLoad = async () => {
    if (templates.length > 0) return;
    const response: any = await fetchAllTemplates();
    if (response.status === 200) {
      const { data } = response;
      setTemplates(data);
      if (data.length > 0) {
        setSelectedTemplate(data[0].id);
      }
    }
  };

  const handleSubmit = () => {
    const urlToViewer = `/client-form-view/${selectedTemplate}/${selectedForm}`;
    navigate(urlToViewer);
  };

  const handleSelectTemplate = (e: any) => {
    setSelectedTemplate(e.target.value);
  };

  React.useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div
      className="modal fade show"
      id="exampleModalCenter"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Choose Template
            </h5>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="templateName">Choose Template</label>
              <select
                className="form-control"
                id="templateName"
                onChange={handleSelectTemplate}
              >
                {templates &&
                  templates.length > 0 &&
                  templates.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Choose Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseTemplate;
