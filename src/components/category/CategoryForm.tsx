import { categorySchema } from "@/schemas/category/category.schema";
import type { ApiError } from "@/types/api/ApiError";
import type { CategoryFormProps } from "@/types/category/CategoryFormProps";
import type { CategoryRequest } from "@/types/category/CategoryRequest";
import { CategoryType } from "@/types/category/CategoryType";
import { applyErrors } from "@/utils/applyErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";

export function CategoryForm({
  open,
  onOpenChange,
  category,
  onSave,
  onEdit,
}: CategoryFormProps) {
  const defaultValues = useMemo<CategoryRequest>(
    () => ({
      name: category?.name ?? "",
      categoryType: category?.categoryType ?? CategoryType.REVENUE,
    }),
    [category],
  );

  const {
    handleSubmit,
    reset,
    setError,
    control,
    formState: { isSubmitting },
  } = useForm<CategoryRequest>({
    resolver: zodResolver(categorySchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (data: CategoryRequest) => {
    try {
      if (category) {
        await onEdit(category.id, data);
        toast.success("Categoria atualizada com sucesso!");
        onOpenChange(false);
        return;
      }

      await onSave(data);
      toast.success("Categoria cadastrada com sucesso!");
      onOpenChange(false);
      reset({ name: "", categoryType: CategoryType.REVENUE });
    } catch (err) {
      applyErrors(err as ApiError, setError);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen && !category) {
      reset({ name: "", categoryType: CategoryType.REVENUE });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {category ? "Editar Categoria" : "Cadastrar Categoria"}
          </DialogTitle>
          <DialogDescription>
            {category
              ? "Atualizar informacoes da categoria"
              : "Crie uma nova categoria"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
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
                    placeholder="Ex: Salario, Alimentacao"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="categoryType"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="categoryType">Tipo de categoria</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="categoryType"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CategoryType.REVENUE}>Receita</SelectItem>
                      <SelectItem value={CategoryType.EXPENSE}>Despesa</SelectItem>
                    </SelectContent>
                  </Select>
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
