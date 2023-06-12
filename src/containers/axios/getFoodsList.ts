
import axios from "./ApiAxios";

export interface FoodDetails {
  id?: number;
  name: string;
  caloriesPer100g?: number ;
  defaultWeight?: number ;
}


export const getFoodsList = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get<FoodDetails[]>("/foods", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response)
    return response.data ?? [];
  } catch (error: any) {
    if (error.response.status === 403) {
      localStorage.removeItem("token");
    }
  }
};
