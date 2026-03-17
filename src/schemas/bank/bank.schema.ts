import { z } from "zod";

export const bankSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "O código é obrigatório")
    .max(3, "Código muito longo")
    .regex(/^\d+$/, "O código deve conter apenas números"),
  name: z
    .string()
    .trim()
    .min(2, "O nome é obrigatório")
    .max(120, "Nome muito longo"),
})