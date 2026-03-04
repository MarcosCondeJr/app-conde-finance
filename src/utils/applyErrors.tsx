import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { ApiError } from "@/types/api/ApiError";
import { toast } from "sonner";

export function applyErrors<TFieldValues extends FieldValues>(
  apiErr: ApiError,
  setError: UseFormSetError<TFieldValues>,
) {
  if (apiErr.fields?.length) {
    for (const f of apiErr.fields) {
      setError(f.name as Path<TFieldValues>, { type: "server", message: f.message });
    }
    return;
  }

  toast.error(apiErr?.title ?? "Erro inesperado");
}