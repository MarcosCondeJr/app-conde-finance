import type { ApiError } from "@/types/api/ApiError";

export function getFieldErrors(err: unknown) {
  const e = err as Partial<ApiError>;
  const map: Record<string, string> = {};

  if (e.fields?.length) {
    for (const f of e.fields) {
      if (f?.name) map[f.name] = f.message ?? "Campo inválido";
    }
  }

  return map;
}

export function getGlobalError(err: unknown) {
  const e = err as Partial<ApiError>;
  return e.title ?? "Não foi possível concluir a operação.";
}