import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BACKEND_URL}/api`,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration and refresh automatically
// api.interceptors.response.use(
//   (response) => response, // Return response if successful
//   async (error) => {
//     if (error.response && error.response.status === 401) {
//       try {
//         const refreshResponse = await axios.post(
//           "http://127.0.0.1:8000/api/refresh",
//           null,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
//             },
//           }
//         );

//         // Update token
//         localStorage.setItem("auth_token", refreshResponse.data.access_token);
//         api.defaults.headers.Authorization = `Bearer ${refreshResponse.data.access_token}`;

//         // Retry original request with new token
//         error.config.headers.Authorization = `Bearer ${refreshResponse.data.access_token}`;
//         return axios(error.config);
//       } catch (refreshError) {
//         console.error("Session expired, please log in again.");
//         localStorage.removeItem("token");
//         window.location.href = "/login"; // Redirect to login page
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
