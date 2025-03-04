import axios from "axios";
const API_Base_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_Base_URL,
  // baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true, // Ensures cookies are sent with requests
});

export default api;
