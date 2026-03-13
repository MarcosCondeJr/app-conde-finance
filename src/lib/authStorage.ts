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

  getUser(): UserResponse | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) as UserResponse : null;
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}