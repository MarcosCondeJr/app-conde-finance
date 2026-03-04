import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Mínimo de 3 caractres")
      .max(80, "Máximo de 80 caractres"),

    login: z
      .string()
      .trim()
      .min(1, "O CPF é obrigatório")
      .max(14, "Máximo de 14 caracteres")
      .transform((val) => val.replace(/\D/g, "")),

    email: z
      .string()
      .trim()
      .email("Endereço de email inválido")
      .min(5, "Mínino de 5 caracteres")
      .max(100, "Máximo de 100 caracteres"),

    password: z
      .string()
      .min(8, "A senha precisa conter 8 caracteres")
      .max(8, "Máximo de 8 caracteres"),

    confirmPassword: z
      .string()
      .min(1, "Confirme sua senha"), 
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;