import { z } from "zod";

export const transactionSchema = z.object({
  accountId: z.string().trim().min(1, "A conta é obrigatória"),
  categoryId: z.string().trim().min(1, "A categoria é obrigatória"),
  transactionDate: z.string().trim().min(1, "A data da transação é obrigatória"),
  transactionType: z.string().trim().min(1, "O tipo de transação é obrigatório"),
  paymentMethod: z.string().trim().min(1, "O método de pagamento é obrigatório"),
  description: z.string(),
  amount: z.string().trim().min(1, "O valor é obrigatório"),
});
