import axios from "./ApiAxios";
import { FoodDetailsForm } from "../mainPage/MainForm";
import { getCurrentDate } from "../../utils/dateFormat";

export const submitRecords = async (arg: FoodDetailsForm) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`/records/${getCurrentDate()}`, arg, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return error;
  }
};
