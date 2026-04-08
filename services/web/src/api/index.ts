import axios, { AxiosError, type AxiosResponse } from "axios";
import camelcaseKeys from "camelcase-keys";
import LocalStorage from "common/helpers/LocalStorage";

const BASE_URL = "/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

type ErrorResponse = AxiosError & {
  response: AxiosResponse<{
    statusCode: number;
    path: string;
    message: string;
  }>;
};

api.interceptors.response.use(
  (response) => {
    const unwrapped = response.data.data;
    return camelcaseKeys(unwrapped, { deep: true });
  },
  (error: ErrorResponse) => {
    return Promise.reject(error.response.data.message || error.message);
  },
);

api.interceptors.request.use((config) => {
  const token = LocalStorage.getAccessToken();
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
