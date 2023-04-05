import axios from "axios";

const fetchAllClientForms = async () => {
  try {
    const response = await axios.get("http://localhost:3000/client/all", {
      withCredentials: true,
    });
    return response;
  } catch (e) {
    throw e;
  }
};

export { fetchAllClientForms };
