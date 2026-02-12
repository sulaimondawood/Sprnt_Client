import axios, { AxiosError } from "axios";

const baseURL = import.meta.env.BASE_URL;

export const TOKEN = "_token";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const request = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (confiq) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(TOKEN);
      const tenant = localStorage.getItem("x-tenant");
      if (token) {
        confiq.headers.Authorization = `Bearer ${token}`;
      }

      if (tenant) {
        confiq.headers["X-Tenant-ID"] = tenant;
      }
    }
    return confiq;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (error: AxiosError<any>) => {
    if (!error.response) {
      console.error("Network Error:", error);
      return Promise.reject(new Error("Network error occurred"));
    }

    const { status, data } = error.response;

    if (status === 401) {
      clearToken();
      window.location.href = "/";
      return Promise.reject(new Error("Unauthorized: Please log in again"));
    }

    if (status === 403) {
      return Promise.reject(
        new Error("Forbidden: You do not have access to this resource"),
      );
    }

    if (status >= 500) {
      console.error("Server Error:", data?.message || error.message);
      return Promise.reject(
        new Error("Server error occurred. Please try again later"),
      );
    }

    return Promise.reject(error);
  },
);

export function clearToken() {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN);
      window.location.replace("/");
    }
  } catch (error) {
    console.error("Error clearing token:", error);
  }
}
