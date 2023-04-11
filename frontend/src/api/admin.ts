import axios from "axios";
import APIUrl from "./api";

const fetchAllClientForms = async () => {
  try {
    const response = await axios.get(`${APIUrl}/client/all`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

const fetchAllTemplates = async () => {
  try {
    const response = await axios.get(`${APIUrl}/admin/template/all`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

const fetchUploadTemplate = (formData: FormData, onUploadProgress: any) => {
  return axios.post(`${APIUrl}/admin/template/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
    withCredentials: true,
  });
};

const fetchDeleteTemplate = async (id: number) => {
  try {
    const response = await axios.delete(`${APIUrl}/admin/template/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

const fetchRenameTemplate = async (id: number, name: string) => {
  try {
    const response = await axios.put(
      `${APIUrl}/admin/template/${id}`,
      {
        name,
      },
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
    const response = await axios.get(`${APIUrl}/client/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

const fetchAdmin = async () => {
  try {
    const response = await axios.get(`${APIUrl}/admin`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

const fetchAdminLogout = async () => {
  try {
    const response = await axios.get(`${APIUrl}/admin/logout`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

const createAdminInputs = (inputs: any, templateId: number) => {
  try {
    const response = axios.post(
      `${APIUrl}/admin/input/add`,
      {
        inputs,
        templateId,
      },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

const fetchAdminInputs = async (templateId: string) => {
  try {
    const response = await axios.get(`${APIUrl}/admin/input/${templateId}`, {
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
  fetchAdmin,
  fetchRenameTemplate,
  fetchAdminLogout,
  createAdminInputs,
  fetchAdminInputs,
};
