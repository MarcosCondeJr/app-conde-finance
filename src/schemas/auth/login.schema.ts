import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .trim()
    .min(1, "O login é obrigatório")
    .max(14, "Máximo de 14 caracteres"),
  password: z
    .string()
    .min(1, "A senha é obrigatória")
    .max(8, "Máximo de 8 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;