import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "O nome é obrigatório"),
  categoryType: z
    .string()
    .trim()
    .min(1, "O tipo de categoria é obrigatório")
})