import { transactionSchema } from "@/schemas/transaction/transaction.schema";
import type { ApiError } from "@/types/api/ApiError";
import { PaymentMethod } from "@/types/transaction/PaymentMethod";
import type { TransactionFormProps } from "@/types/transaction/TransactionFormProps";
import type { TransactionRequest } from "@/types/transaction/TransactionRequest";
import { TransactionType } from "@/types/transaction/TransactionType";
import { applyErrors } from "@/utils/applyErrors";
import {
  maskCurrencyBRL,
  normalizeDecimalCurrency,
  unmaskCurrencyToDecimal,
} from "@/utils/masks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { SelectWithSearch } from "../common/SelectWithSearch";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";

export function TransactionForm({
  open,
  onOpenChange,
  transaction,
  onSave,
  onEdit,
  accountsOptions = [],
  categoriesOptions = [],
}: TransactionFormProps) {
  const defaultValues = useMemo<TransactionRequest>(
    () => ({
      accountId: transaction?.account.id ? String(transaction.account.id) : "",
      categoryId: transaction?.category.id
        ? String(transaction.category.id)
        : "",
      transactionDate: transaction?.transactionDate?.slice(0, 10) ?? "",
      description: transaction?.description ?? "",
      transactionType: transaction?.transactionType ?? "",
      paymentMethod: transaction?.paymentMethod ?? "",
      amount: normalizeDecimalCurrency(transaction?.amount),
    }),
    [transaction],
  );

  const {
    handleSubmit,
    reset,
    setError,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TransactionRequest>({
    resolver: zodResolver(transactionSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const resetCreateForm = () => {
    reset({
      accountId: "",
      categoryId: "",
      transactionDate: "",
      description: "",
      transactionType: "",
      paymentMethod: "",
      amount: "",
    });
  };

  const onSubmit = async (data: TransactionRequest) => {
    try {
      if (transaction) {
        await onEdit(transaction.id, data);
        toast.success("Transacao atualizada com sucesso!");
        onOpenChange(false);
        return;
      }

      await onSave(data);
      toast.success("Transacao cadastrada com sucesso!");
      onOpenChange(false);
      resetCreateForm();
    } catch (err) {
      applyErrors(err as ApiError, setError);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen && !transaction) {
      resetCreateForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {transaction ? "Editar Transação" : "Cadastrar Transação"}
          </DialogTitle>
          <DialogDescription>
            {transaction
              ? "Atualizar informacoes da transação"
              : "Crie uma nova transação"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="accountId"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="accountId">Conta</FieldLabel>

                  <SelectWithSearch
                    items={accountsOptions}
                    value={field.value}
                    placeholder="Selecionar conta"
                    searchPlaceholder="Buscar conta..."
                    emptyMessage="Nenhuma conta encontrada"
                    getValue={(account) => String(account.id)}
                    getLabel={(account) => 
                      account.bank.name + " - " + account.description
                    }
                    onChange={field.onChange}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="categoryId"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="categoryId">Categoria</FieldLabel>
                  <SelectWithSearch
                    items={categoriesOptions}
                    value={field.value}
                    placeholder="Selecionar categoria"
                    searchPlaceholder="Buscar categoria..."
                    emptyMessage="Nenhuma categoria encontrada"
                    getValue={(category) => String(category.id)}
                    getLabel={(category) => category.name}
                    onChange={field.onChange}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Controller
              name="transactionDate"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="transactionDate">Data</FieldLabel>
                  <Input
                    {...field}
                    id="transactionDate"
                    type="date"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="transactionType"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="transactionType">
                    Tipo de transação
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="transactionType"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TransactionType.REVENUE}>
                        Receita
                      </SelectItem>
                      <SelectItem value={TransactionType.EXPENSE}>
                        Despesa
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="paymentMethod"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="paymentMethod">
                    Método de pagamento
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="paymentMethod"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Selecione o método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PaymentMethod.PIX}>Pix</SelectItem>
                      <SelectItem value={PaymentMethod.DEBIT}>
                        Débito
                      </SelectItem>
                      <SelectItem value={PaymentMethod.CREDIT}>
                        Crédito
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Field>
            <FieldLabel htmlFor="description">Descrição</FieldLabel>
            <Input
              {...register("description")}
              id="description"
              placeholder="Ex: Supermercado"
              required={false}
            />
            {errors.description?.message && (
              <FieldError errors={[errors.description]} />
            )}
          </Field>

          <Controller
            name="amount"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="amount">Valor</FieldLabel>
                <Input
                  id="amount"
                  type="text"
                  inputMode="decimal"
                  maxLength={24}
                  autoComplete="off"
                  placeholder="Ex: 200,00"
                  value={maskCurrencyBRL(field.value ?? "")}
                  onChange={(e) =>
                    field.onChange(unmaskCurrencyToDecimal(e.target.value))
                  }
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              {!isSubmitting ? (
                <Button type="button" variant="outline" onClick={() => reset()}>
                  Cancelar
                </Button>
              ) : (
                ""
              )}
            </DialogClose>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? <Spinner /> : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
