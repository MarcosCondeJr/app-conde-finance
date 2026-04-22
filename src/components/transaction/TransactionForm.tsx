import type { TransactionFormProps } from "@/types/transaction/TransactionFormProps";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { SelectWithSearch } from "../common/SelectWithSearch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import type { TransactionRequest } from "@/types/transaction/TransactionRequest";
import { transactionSchema } from "@/schemas/transaction/transaction.schema";

export function TransactionForm({
  open,
  onOpenChange,
  transaction,
  onSave,
  onEdit,
}: TransactionFormProps) {
  const defaultValues = useMemo<TransactionRequest>(
    () => ({
        accountId: transaction?.account.id || "",
        categoryId: transaction?.category.id || "",
        transactionDate: transaction?.transactionDate || "",
        description: transaction?.description || "",
        transactionType: transaction?.transactionType || "",
        paymentMethod: transaction?.paymentMethod || "",
        amount: transaction?.amount ? String(transaction.amount) : "",
    }),
    [transaction],
  );

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
  };

  const {
    handleSubmit,
    reset,
    setError,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormProps>({
    resolver: zodResolver(transactionSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {transaction ? "Editar Transação" : "Cadastrar Transação"}
          </DialogTitle>
          <DialogDescription>
            {transaction ? "Atualizar informações da transação" : "Crie uma nova transação"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            <Controller
              name="bankId"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="bankId">Banco</FieldLabel>

                  <SelectWithSearch
                    items={banksOptions}
                    value={field.value}
                    placeholder="Selecionar banco"
                    searchPlaceholder="Buscar banco..."
                    emptyMessage="Nenhum banco encontrado"
                    getValue={(bank) => String(bank.id)}
                    getLabel={(bank) => bank.name}
                    onChange={field.onChange}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field>
              <FieldLabel htmlFor="description">Descrição</FieldLabel>
              <Input
                {...register("description")}
                id="description"
                placeholder="Ex: Conta bancária principal"
                required={false}
              />
              {errors.description?.message && (
                <FieldError errors={[errors.description]} />
              )}
            </Field>

            <Controller
              name="initialBalance"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="initialBalance">
                    Saldo inicial
                  </FieldLabel>
                  <Input
                    id="initialBalance"
                    type="text"
                    inputMode="decimal"
                    maxLength={24}
                    autoComplete="off"
                    placeholder="Ex: 200,00"
                    value={maskCurrencyBRL(field.value ?? "")}
                    onChange={(e) => {
                      field.onChange(unmaskCurrencyToDecimal(e.target.value));
                    }}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

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
