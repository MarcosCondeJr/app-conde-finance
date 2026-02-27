import type { UserRole } from "./UserRole";

export type UserResponse = {
  id: number;
  name: string;
  email: string;
  login: string;
  role: UserRole;
};