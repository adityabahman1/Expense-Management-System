import axios from "axios";
import { BASE_URL } from "./apiPath";
// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Change to your backend URL
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔐 Request Interceptor: Add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Response Interceptor: Handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized! Token may be invalid or expired.");
        // Optionally redirect to login or logout user
      } else if (error.response.status === 500) {
        console.error("Server error:", error.response.data.message);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
