import type { ApiError } from "@/types/api/ApiError";
import axios, { AxiosError } from "axios";
import { authStorage } from "./authStorage";
import { PATHS } from "@/routes/paths";

const API_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

const AUTH_ROUTES = new Set([PATHS.login, PATHS.register]);
const AUTH_ENDPOINTS = ["/api/auth/login", "/api/auth/register"];

function toApiError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const e = err as AxiosError<any>;
    const data = e.response?.data;

    return {
      status: data?.status ?? e.response?.status ?? 0,
      title: data?.title ?? e.message ?? "Erro inesperado",
      timestamp: data?.timestamp,
      fields: data?.fields,
      raw: data,
    };
  }
  return { status: 0, title: "Erro inesperado", raw: err };
}

function shouldRedirectOnUnauthorized(err: AxiosError) {
  const token = authStorage.getToken();
  const requestUrl = err.config?.url ?? "";
  const currentPath = window.location.pathname;
  const isAuthRequest = AUTH_ENDPOINTS.some((endpoint) =>
    requestUrl.includes(endpoint),
  );
  const isAuthScreen = AUTH_ROUTES.has(currentPath);

  return Boolean(token) && !isAuthRequest && !isAuthScreen;
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      axios.isAxiosError(err) &&
      err.response?.status === 401 &&
      shouldRedirectOnUnauthorized(err)
    ) {
      authStorage.clear();
      window.location.replace(PATHS.login);
    }

    return Promise.reject(toApiError(err));
  },
);
