import { getCurrentDate } from "../../utils/dateFormat";
import axios from "./ApiAxios";


export const getDailyRecords = async (date?:Date) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`/records/${getCurrentDate(date)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data ?? [];
  } catch (error) {
    return [];
  }
};
