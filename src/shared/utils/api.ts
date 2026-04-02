<<<<<<< HEAD
import axios from "axios";
=======
import type { InternalAxiosRequestConfig } from "axios";
import axios, { AxiosError } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
    _retry?: boolean;
  }
}
>>>>>>> 6320c31 (chore: cleaned the architecture)

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

<<<<<<< HEAD
=======
/**
 * Api Handler
 */
>>>>>>> 6320c31 (chore: cleaned the architecture)
export const apiHandler = <T, A extends unknown[] = []>(
  fn: (...args: A) => Promise<T>,
) => {
  return async (...args: A): Promise<ApiResponse<T>> => {
    try {
      const data = await fn(...args);
      return { success: true, data };
    } catch (err: unknown) {
      let message = "Something went wrong";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      return { success: false, error: message };
    }
  };
};

<<<<<<< HEAD
const api = axios.create();
const apiServer = import.meta.env.VITE_SERVER_URL;

api.interceptors.request.use((config) => {
  if (!config.url?.startsWith("http")) {
=======
const apiServer = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  withCredentials: true,
});

const refreshApi = axios.create({
  baseURL: apiServer,
  withCredentials: true,
});

/**
 * Request interceptor: adds the base url
 */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.url && !config.url.startsWith("http")) {
>>>>>>> 6320c31 (chore: cleaned the architecture)
    config.url = `${apiServer}${config.url}`;
  }
  return config;
});

<<<<<<< HEAD
api.defaults.withCredentials = true;
=======
/**
 * Response interceptor: handle 401 + refresh token
 */
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest || originalRequest?.skipAuth) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Refresh token function (uses separate axios instance)
 */
async function refreshToken() {
  await refreshApi.post("/auth/refresh");
}
>>>>>>> 6320c31 (chore: cleaned the architecture)

export default api;
