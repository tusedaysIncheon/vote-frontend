import axios from "axios";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const API = import.meta.env.VITE_BACKEND_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig{
  skipAuth?: boolean;
  _retry?: boolean;
}

axiosInstance.interceptors.request.use(
  (config: ExtendedAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;

  if (token && !config.skipAuth) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
},
(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (!originalRequest) return Promise.reject(error);

    const requestUrl = originalRequest.url ?? "";

    if (error.response?.status !== 401) return Promise.reject(error);

    if (originalRequest._retry || requestUrl.includes("/jwt/refresh")) {
      await useAuthStore.getState().logout({ skipServer: true });
      return Promise.reject(error);
    }

    if (requestUrl.includes("/login")) return Promise.reject(error);

    originalRequest._retry = true;

    try {
      const refreshResponse = await axios.post(
        `${API}/jwt/refresh`,
        {}, 
        { withCredentials: true }
      );

      const newAccessToken = refreshResponse.data.accessToken;
      const currentUser = useAuthStore.getState().user;

      useAuthStore.getState().setToken(newAccessToken, currentUser);

      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);

    } catch (refreshError) {
      await useAuthStore.getState().logout({ skipServer: true });
      return Promise.reject(refreshError);
    }
  }
);
