import axios from "axios";

const fetchAllClientForms = async () => {
  try {
    const response = await axios.get("http://localhost:3000/client/all", {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

const fetchAllTemplates = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/admin/template/all",
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

const fetchUploadTemplate = (formData: FormData, onUploadProgress: any) => {
  return axios.post("http://localhost:3000/admin/template/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
    withCredentials: true,
  });
};

const fetchDeleteTemplate = async (id: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/admin/template/${id}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

const fetchClientForm = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/client/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};
export {
  fetchAllClientForms,
  fetchAllTemplates,
  fetchUploadTemplate,
  fetchDeleteTemplate,
  fetchClientForm,
};
