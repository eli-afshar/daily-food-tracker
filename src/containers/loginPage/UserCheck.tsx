import axios from "./ApiAxios";
import { Inputs } from "./LoginForm";

export const userCheck = async (arg: Inputs) => {
  try {
    const response = await axios.post("/login", arg);
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    return error;
  }
};
