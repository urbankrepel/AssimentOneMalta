import axios from "axios";

const fetchLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/admin/login",
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
