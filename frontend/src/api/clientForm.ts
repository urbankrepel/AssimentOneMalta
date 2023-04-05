import axios, { AxiosPromise } from "axios";

const fetchClientForm = async (data: any):AxiosPromise => {
  try {
    const response = await axios.post("http://localhost:3000/client/create", data);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export default fetchClientForm;