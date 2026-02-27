import type { ApiFieldError } from "./ApiFieldError";

export interface ApiError {
  status: number;
  title: string;              
  timestamp?: string;
  fields?: ApiFieldError[];    
  raw?: unknown;
};