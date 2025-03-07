import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BACKEND_URL}/api`,
  headers: {
    // "Content-Type": "application/json",
    // Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default api;