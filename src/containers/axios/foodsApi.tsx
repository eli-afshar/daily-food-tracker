import axios from "./ApiAxios";

export const foodsApi = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("/foods", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error: any) {
    if (error.response.status === 403) {
      localStorage.removeItem("token");
    }
  }
};
