import { getCurrentDate } from "../../utils/dateFormat";
import { FoodDetailsForm } from "../pages/MainForm";
import axios from "./ApiAxios";

export interface GetRecordResponse{
  records:FoodDetailsForm[],
  dailyGoal?:number
}


export const getDailyRecords = async (date?:Date) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get<GetRecordResponse>(`/records/${getCurrentDate(date)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data ?? {records:[] , dailyGoal: 0};
  } catch (error) {
    return {records:[] , dailyGoal: 0};
  }
};
