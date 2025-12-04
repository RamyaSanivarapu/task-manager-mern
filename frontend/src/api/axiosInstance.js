import axios from "axios";

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

AXIOS.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AXIOS;
