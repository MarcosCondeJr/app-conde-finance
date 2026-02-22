import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import type { BankFormProps } from "@/types/bank/BankFormProps";
import { useEffect, useMemo, useState } from "react"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const bankSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "O código é obrigatório")
    .max(3, "Código muito longo")
    .regex(/^\d+$/, "O código deve conter apenas números"),
  name: z
    .string()
    .trim()
    .min(2, "O nome é obrigatório")
    .max(120, "Nome muito longo"),
})

type BankFormValues = z.infer<typeof bankSchema>

export default function BankForm({ bank, trigger }: BankFormProps) {
    const [open, setOpen] = useState(false)

    const defaultValues = useMemo<BankFormValues>(
        () => ({
            code: bank?.code ?? "",
            name: bank?.name ?? "",
        }),
        [bank]
    )

    const form = useForm<BankFormValues>({
        resolver: zodResolver(bankSchema),
        defaultValues,
        mode: "onSubmit", 
    })

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = form
    
    useEffect(() => {
        reset(defaultValues)
    }, [defaultValues, reset])

    const onSubmit = async (values: BankFormValues) => {
        if (bank) {
        // updateBank(bank.id, values)
        setOpen(false)
        return
        }

        // addBank(values.code, values.name)
        setOpen(false)
        reset({ code: "", name: "" })
    }

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen)

        if (!nextOpen && !bank) {
            reset({ code: "", name: "" })
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger || <Button>Adicionar Banco</Button>}
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>{bank ? "Editar Banco" : "Cadastrar Banco"}</DialogTitle>
                    <DialogDescription>
                        {bank ? "Atualizar informações bancárias": "Crie um novo banco "}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FieldGroup>

                        <Controller
                            name="code"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="code">
                                    Código
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="code"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Ex: 001"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="name">
                                    Nome
                                </FieldLabel>
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
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Cancelar
                        </Button>
                        </DialogClose>
                        <Button type="submit">
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}