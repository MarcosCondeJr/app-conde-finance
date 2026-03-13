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
import { useAuth } from "@/contexts/AuthContext";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth/login.schema";
import type { ApiError } from "@/types/api/ApiError";
import type { LoginRequest } from "@/types/auth/LoginRequest";
import { maskCPF, unmask } from "@/utils/masks";
import { Toaster } from "./ui/sonner";
import { applyErrors } from "@/utils/applyErrors";
import { toast } from "sonner";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginRequest) {
    try {
      await login(data)
      toast.success("Login efetuado com sucesso!")
      navigate(PATHS.home, {replace: true});
    } catch (err) {
      applyErrors(err as ApiError, setError);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bem vindo</h1>
                <p className="text-muted-foreground text-balance">
                  Faça login na sua conta da Conde Finance.
                </p>
              </div>

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
                      placeholder="Informe seu CPF"
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  maxLength={8}
                  {...register("password")}
                  placeholder="Informe sua senha"
                />
                {errors.password?.message && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
                {errors.root?.message && (
                  <p className="text-sm text-red-500">{errors.root.message}</p>
                )}
              </Field>

              <Field>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Não tem uma conta? <Link to={PATHS.register}> Cadastre-se</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="bg-primary flex items-center justify-center p-6 text-primary-foreground">
            <div className="text-xl font-semibold">Conde Finance</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
