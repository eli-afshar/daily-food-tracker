import axios from "./ApiAxios";
import { FoodDetailsForm } from "../mainPage/MainForm";

export const recordApi = async (arg: FoodDetailsForm) => {
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

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
