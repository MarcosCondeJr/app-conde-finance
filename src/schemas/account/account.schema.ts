import { z } from "zod";

export const accountSchema = z.object({
  bankId: z
  .string()
  .trim(),
  
  description: z
    .string()
    .trim()
    .min(1, "A descrição é obrigatória")
    .max(100, "A descrição deve ter no máximo 100 caracteres")
    .optional(),

  initialBalance: z
    .number()
    .min(0, "O saldo não pode ser negativo"),
});