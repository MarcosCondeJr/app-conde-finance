import type { LoginRequest } from "@/types/auth/LoginRequest";
import { http } from "./http";
import type { LoginResponse } from "@/types/auth/LoginResponse";
import type { UserResponse } from "@/types/user/UserResponse";

const TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";

export const authStorage = {
  set(token: string, user: UserResponse) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser(): UserResponse {
    const raw = localStorage.getItem(USER_KEY);

    if (!raw) return null;

    try {
        return JSON.parse(raw) as UserResponse
    } catch {
        return null;
    }
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}