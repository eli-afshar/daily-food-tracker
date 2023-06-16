import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BASE_URL
      : `${window.location.origin}/api`,
      headers:{Authorization:`Bearer ${token}` }
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem("token");
      window.location.reload();
    }

    return error;
  }
);

export default instance;
