import { z } from "zod";

export const accountSchema = z.object({
  bankId: z.string().trim().min(1, "O banco é obrigatório"),

  description: z
    .string()
    .max(100, "A descrição deve ter no máximo 100 caracteres")
    .optional(),

  initialBalance: z
    .string()
    .trim()
    .min(1, "O saldo inicial é obrigatório")
    .refine((value) => !Number.isNaN(Number(value)), "Informe um saldo válido")
    .refine((value) => Number(value) >= 0, "O saldo não pode ser negativo"),
});
