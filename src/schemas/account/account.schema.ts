import { z } from "zod";

export const accountSchema = z.object({
  bankId: z
    .string()
    .trim()
    .min(1, "O banco é obrigatório")
    .regex(/^\d+$/, "O banco deve conter apenas números"),

  description: z
    .string()
    .trim()
    .min(1, "A descrição é obrigatória")
    .max(100, "A descrição deve ter no máximo 100 caracteres")
    .optional(),

  initialBalance: z
    .coerce
    .number()
    .min(0, "O saldo não pode ser negativo"),
});