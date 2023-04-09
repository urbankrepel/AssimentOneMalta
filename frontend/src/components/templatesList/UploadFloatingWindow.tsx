import React, { ChangeEvent } from "react";
import { fetchUploadTemplate } from "../../api/admin";
import AddAdminInputs from "./AddAdminInputs";

const UploadFloatingWindow = ({
  setDisplayUpload,
  handleLoad,
}: {
  setDisplayUpload: any;
  handleLoad: any;
}) => {
  const [file, setFile] = React.useState<File>();
  const [templateId, setTemplateId] = React.useState<number>(0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onUploadProgress = (progressEvent: ProgressEvent) => {
    const { loaded, total } = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    if (percent < 100) {
      console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    fetchUploadTemplate(formData, onUploadProgress).then((response) => {
      setDisplayUpload(false);
      handleLoad();
      const templateId = response.data.template_id;
      setTemplateId(templateId);
    });
  };

  const handleClose = () => {
    setDisplayUpload(false);
  };

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
              Upload Template
            </h5>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="templateName">Template</label>
              <input
                type="file"
                className="form-control"
                id="templateName"
                onChange={handleFileChange}
              />
            </div>
            <AddAdminInputs templateId={templateId} />
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
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFloatingWindow;
