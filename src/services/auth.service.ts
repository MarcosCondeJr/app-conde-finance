import { http } from "@/lib/http";
import type { LoginRequest } from "@/types/auth/LoginRequest";
import type { LoginResponse } from "@/types/auth/LoginResponse";

export const AuthService = {
    async login(payload: LoginRequest) {
        const res = await http.post<LoginResponse>("/login", payload);
        return res.data;
    }
}