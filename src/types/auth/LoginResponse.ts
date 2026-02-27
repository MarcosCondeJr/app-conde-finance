import type { UserResponse } from "../user/UserResponse";

export type LoginResponse = {
  user: UserResponse;
  token: string;
};