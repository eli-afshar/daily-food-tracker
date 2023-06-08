import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BASE_URL
      : `${window.location.origin}/api`,
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
