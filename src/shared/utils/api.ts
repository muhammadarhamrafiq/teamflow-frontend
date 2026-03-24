import axios from "axios";

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

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

const api = axios.create();
const apiServer = import.meta.env.VITE_SERVER_URL;

api.interceptors.request.use((config) => {
  if (!config.url?.startsWith("http")) {
    config.url = `${apiServer}${config.url}`;
  }
  return config;
});

api.defaults.withCredentials = true;

export default api;
