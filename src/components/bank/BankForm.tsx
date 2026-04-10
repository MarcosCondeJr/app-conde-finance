import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import type { BankFormProps } from "@/types/bank/BankFormProps";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { BankRequest } from "@/types/bank/BankRequest";
import { applyErrors } from "@/utils/applyErrors";
import type { ApiError } from "@/types/api/ApiError";
import { Spinner } from "../ui/spinner";
import { bankSchema } from "@/schemas/bank/bank.schema";

export default function BankForm({
  open,
  onOpenChange,
  bank,
  onSave,
  onEdit,
}: BankFormProps) {

  const defaultValues = useMemo<BankRequest>(
      () => ({
      code: bank?.code ?? "",
      name: bank?.name ?? "",
    }),
    [bank],
  );

  const {
    handleSubmit,
    reset,
    setError,
    control,
    formState: { isSubmitting },
  } = useForm<BankRequest>({
    resolver: zodResolver(bankSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (data: BankRequest) => {
    try {
      if (bank) {
        await onEdit(bank.id, data);
        toast.success("Banco atualizado com sucesso!");
        onOpenChange(false);
        return;
      }
      await onSave(data);

      toast.success("Banco cadastrado com sucesso!");
      onOpenChange(false);
      reset({ code: "", name: "" });
    } catch (err) {
      applyErrors(err as ApiError, setError);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen && !bank) {
      reset({ code: "", name: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{bank ? "Editar Banco" : "Cadastrar Banco"}</DialogTitle>
          <DialogDescription>
            {bank ? "Atualizar informações bancárias" : "Crie um novo banco "}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            <Controller
              name="code"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="code">Código</FieldLabel>
                  <Input
                    {...field}
                    id="code"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: 001"
                    maxLength={3}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Nome</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: Banco do Brasil S.A."
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
