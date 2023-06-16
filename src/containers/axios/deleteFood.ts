
import axios from "./ApiAxios";



export const deleteFood = async (id:number) => {
  try {
    await axios.delete(`/foods/${id}`);
    return null
  } catch (error: any) {
    if (error.response.status === 403) {
      localStorage.removeItem("token");
    }
    return error
  }
};
