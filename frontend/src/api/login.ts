import axios from "axios";
import APIUrl from "./api";

const fetchLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${APIUrl}/admin/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export default fetchLogin;
