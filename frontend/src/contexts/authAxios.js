import axios from "axios";

const API = "http://127.0.0.1:8000"; // Your API base URL

const authAxios = axios.create({
  baseURL: API,
});

// Request Interceptor: Add access token to headers
authAxios.interceptors.request.use(async (config) => {
  const token = JSON.parse(localStorage.getItem("tokens"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to refresh token directly (no React hooks)
async function refreshAccessToken() {
  const refreshToken = JSON.parse(localStorage.getItem("tokens_refresh"));
  if (!refreshToken) return null;

  try {
    const res = await axios.post(`${API}/auth/token/refresh/`, {
      refresh: refreshToken,
    });
    const newAccessToken = res.data.access;
    localStorage.setItem("tokens", JSON.stringify(newAccessToken));
    return newAccessToken;
  } catch (err) {
    console.error("Token refresh failed:", err);
    return null;
  }
}

// Response Interceptor: Handle token expiration
authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("tokens_refresh")
    ) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authAxios(originalRequest); // Retry with new token
      }
    }

    return Promise.reject(error);
  }
);

export default authAxios;
