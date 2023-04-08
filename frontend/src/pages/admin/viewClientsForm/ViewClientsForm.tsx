import React from "react";
import "./ViewClientsForm.css";
import { useParams } from "react-router-dom";
import { fetchClientForm } from "../../../api/admin";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import AdminForms from "../../../components/clientFormView/adminForms/AdminForms";

const ViewClientsForm = () => {
  const { template_id, client_id } = useParams();
  const [clientForm, setClientForm] = React.useState<any>(null);

  React.useEffect(() => {
    if (!template_id || !client_id) return;
    setClientForm({
      uri: `http://localhost:3000/client/generate/template/${template_id}/client/${client_id}`,
    });
  }, [template_id, client_id]);

  return (
    <div className="clientFormViewer">
      <h1>Client Form</h1>
      <div className="clientFormViewer-devider">
        <AdminForms templateId={template_id} clientId={client_id} />
        <DocViewer
          documents={[clientForm]}
          pluginRenderers={DocViewerRenderers}
          className="clientFormViewer-docViewer"
          activeDocument={clientForm}
        />
      </div>
    </div>
  );
};

export default ViewClientsForm;
