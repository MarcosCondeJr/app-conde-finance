import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { maskCPF, unmask } from "@/utils/masks";
import {
  registerSchema,
  type RegisterFormData,
} from "@/schemas/auth/register.schema";
import { applyErrors } from "@/utils/applyErrors";
import type { ApiError } from "@/types/api/ApiError";
import { AuthService } from "@/services/auth.service";
import { toast } from "sonner";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function onResgister(data: RegisterFormData) {
    try {
      const { confirmPassword, ...payload } = data;
      await AuthService.register(payload);
      
      toast.success("Conta cadastrada")
      navigate(PATHS.login, { replace: true });
    } catch (err) {
      applyErrors(err as ApiError, setError);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-primary flex items-center justify-center p-6 text-primary-foreground">
            <div className="text-xl font-semibold">Conde Finance</div>
          </div>
          <form onSubmit={handleSubmit(onResgister)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Crie sua conta</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Insira as informações abaixo para criar sua conta.
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ex: Marcos Conde"
                  {...register("name")}
                  required
                />
                {errors.name?.message && (
                  <p className="text-xs text-red-500">{errors.name?.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="Ex: m@example.com"
                  {...register("email")}
                  required
                />
                {errors.email?.message && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="login">CPF</FieldLabel>
                <Controller
                  name="login"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="login"
                      type="text"
                      inputMode="numeric"
                      autoComplete="on"
                      placeholder="Ex: 878.989.989-24"
                      maxLength={14}
                      value={maskCPF(field.value ?? "")}
                      onChange={(e) => {
                        field.onChange(unmask(e.target.value));
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  )}
                />

                {errors.login?.message && (
                  <p className="text-xs text-red-500">{errors.login.message}</p>
                )}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      maxLength={8}
                      {...register("password")}
                      placeholder="Informe sua senha"
                    />
                    {errors.password?.message && (
                      <p className="text-xs text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirma Senha
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      maxLength={8}
                      {...register("confirmPassword")}
                      placeholder="Confirme sua senha"
                    />
                    {errors.confirmPassword?.message && (
                      <p className="text-xs text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </Field>
                </Field>
              </Field>
              <Field>
                <Button type="submit">Criar conta</Button>
              </Field>

              <FieldDescription className="text-center">
                Já tem uma conta? <Link to={PATHS.login}>Entrar</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
