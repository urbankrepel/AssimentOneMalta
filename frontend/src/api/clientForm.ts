import axios, { AxiosPromise } from "axios";
import APIUrl from "./api";

const fetchClientForm = async (data: any):AxiosPromise => {
  try {
    const response = await axios.post(`${APIUrl}/client/create`, data);
    return response;
  } catch (error: any) {
    throw error;
  }
};

export default fetchClientForm;