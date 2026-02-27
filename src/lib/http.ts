import type { ApiError } from "@/types/api/ApiError";
import axios, { AxiosError } from "axios";

const API_URL = 'http://localhost:3000';

export const http = axios.create({
    baseURL: API_URL,
    timeout: 15000
})

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
        }
    }
    return { status: 0, title: "Erro inesperado", raw: err };
}

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(toApiError(err))
)