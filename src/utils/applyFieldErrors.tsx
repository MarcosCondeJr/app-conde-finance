import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { ApiError } from "@/types/api/ApiError";

export function applyFieldErrors<TFieldValues extends FieldValues>(
  apiErr: ApiError,
  setError: UseFormSetError<TFieldValues>,
  fallbackField?: Path<TFieldValues>
) {
  if (apiErr.fields?.length) {
    for (const f of apiErr.fields) {
      setError(f.name as Path<TFieldValues>, { type: "server", message: f.message });
    }
    return;
  }

  const fallback = (fallbackField ?? ("root" as Path<TFieldValues>));
  setError(fallback, { type: "server", message: apiErr.title ?? "Erro inesperado" });
}