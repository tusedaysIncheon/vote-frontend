import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const API = import.meta.env.VITE_BACKEND_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as (AxiosRequestConfig & {
      _retry?: boolean;
    });

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

      if (!originalRequest.headers) {
        originalRequest.headers = {};
      }
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);

    } catch (refreshError) {
      await useAuthStore.getState().logout({ skipServer: true });
      return Promise.reject(refreshError);
    }
  }
);
