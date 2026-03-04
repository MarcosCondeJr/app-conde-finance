import type { UserRole } from "../user/UserRole";

export type RegisterResponse = {
  id: number;
  name: string;
  email: string;
  login: string;
  role: UserRole;
}