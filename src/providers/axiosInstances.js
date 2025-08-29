import axios from "axios";
import { BASE_URL } from "../common/constants";

const getAccessToken = "1234567890";

export const API_BASE_URL = BASE_URL;

export const axiosApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const axiosWithCredentials = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosWithCredentials.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
