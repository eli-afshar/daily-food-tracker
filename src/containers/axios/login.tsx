import axios from "./ApiAxios";
import { Inputs } from "../loginPage/LoginForm";

export const login = async (arg: Inputs) => {
  try {
    const response = await axios.post("/login", arg);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};
