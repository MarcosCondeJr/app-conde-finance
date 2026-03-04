import { http } from "@/lib/http";
import type { LoginRequest } from "@/types/auth/LoginRequest";
import type { LoginResponse } from "@/types/auth/LoginResponse";
import type { RegisterRequest } from "@/types/auth/RegisterRequest";
import type { RegisterResponse } from "@/types/auth/RegisterResponse";

export const AuthService = {
  async login(payload: LoginRequest) {
    return await http
      .post<LoginResponse>("/auth/login", payload)
      .then((res) => res.data);
  },

  async register(payload: RegisterRequest) {
    return await http
      .post<RegisterResponse>("/auth/register", payload)
      .then((res) => res.data);
  },
};
