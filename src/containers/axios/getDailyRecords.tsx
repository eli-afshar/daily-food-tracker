import axios from "./ApiAxios";
import { getCurrentDate } from "./submitRecords";

export const getDailyRecords = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`/records/${getCurrentDate()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
