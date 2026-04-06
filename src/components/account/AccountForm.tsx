import { accountSchema } from "@/schemas/account/account.schema";
import type { AccountFormProps } from "@/types/account/AccountFormProps";
import type { AccountRequest } from "@/types/account/AccountRequest";
import type { ApiError } from "@/types/api/ApiError";
import { applyErrors } from "@/utils/applyErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AccountForm({
  open,
  onOpenChange,
  account,
  onSave,
  onEdit,
}: AccountFormProps) {
  const defaultValues = useMemo<AccountRequest>(
    () => ({
      bankId: Number(account?.bank.id) ?? "",
      description: account?.description ?? "",
      initialBalance: account?.initialBalance ?? 0,
    }),
    [account],
  );

  const {
    handleSubmit,
    reset,
    setError,
    control,
    formState: { isSubmitting },
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
        toast.success("Banco atualizado com sucesso!");
        onOpenChange(false);
        return;
      }
      await onSave(data);

      toast.success("Banco cadastrado com sucesso!");
      onOpenChange(false);
      reset({ bankId: undefined, description: "", initialBalance: 0 });
    } catch (err) {
      applyErrors(err as ApiError, setError);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen && !account) {
      reset({ bankId: undefined, description: "", initialBalance: 0 });
    }
  };

  
}
