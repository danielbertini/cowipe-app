import axios from "axios";
import i18n from "../i18n";

const api = axios.create({
  headers: {
    Accept: "application/json; charset=UTF-8",
    "Content-Type": "application/json; charset=UTF-8",
  },
  withCredentials: true,
  baseURL: process.env.REACT_APP_API,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = i18n.language;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
