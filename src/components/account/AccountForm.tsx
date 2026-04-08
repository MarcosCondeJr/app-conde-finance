import { accountSchema } from "@/schemas/account/account.schema";
import type { AccountFormProps } from "@/types/account/AccountFormProps";
import type { AccountRequest } from "@/types/account/AccountRequest";
import type { ApiError } from "@/types/api/ApiError";
import { applyErrors } from "@/utils/applyErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";
import { SelectWithSearch } from "../common/SelectWithSearch";

export default function AccountForm({
  open,
  onOpenChange,
  account,
  onSave,
  onEdit,
  banksOptions,
}: AccountFormProps) {
  const defaultValues = useMemo<AccountRequest>(
    () => ({
      bankId: account?.bank.id ?? "",
      description: account?.description ?? "",
      initialBalance: account?.initialBalance ?? 0,
    }),
    [account],
  );

  const {
    handleSubmit,
    reset,
    setError,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AccountRequest>({
    resolver: zodResolver(accountSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (data: AccountRequest) => {
    try {
      if (account) {
        await onEdit(account.id, data);
        toast.success("Conta atualizado com sucesso!");
        onOpenChange(false);
        return;
      }
      await onSave(data);

      toast.success("Conta cadastrado com sucesso!");
      onOpenChange(false);
      reset({ description: "", initialBalance: 0 });
    } catch (err) {
      applyErrors(err as ApiError, setError);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen && !account) {
      reset({ description: "", initialBalance: 0 });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {account ? "Editar Conta" : "Cadastrar Conta"}
          </DialogTitle>
          <DialogDescription>
            {account ? "Atualizar informações da conta" : "Crie uma nova conta"}
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
                    portalled={false}
                    placeholder="Selecionar banco"
                    searchPlaceholder="Buscar banco..."
                    emptyMessage="Nenhum banco encontrado"
                    getValue={(bank) => bank.id}
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
              />
              {errors.description?.message && (
                <FieldError errors={[errors.description?.message]} />
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="initialBalance">Saldo inicial</FieldLabel>
              <Input
                type="number"
                step="0.01"
                {...register("initialBalance", { valueAsNumber: true })}
                id="initialBalance"
                placeholder="Ex: 200,00"
              />
              {errors.initialBalance?.message && (
                <FieldError errors={[errors.initialBalance?.message]} />
              )}
            </Field>
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
