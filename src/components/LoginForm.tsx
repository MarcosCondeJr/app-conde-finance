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
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/paths";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bem vindo</h1>
                <p className="text-muted-foreground text-balance">
                  Faça login na sua conta da Conde Finance.
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="login">Login</FieldLabel>
                <Input
                  id="login"
                  type="text"
                  placeholder=""
                  maxLength={14}
                  required
                />
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
                <Input id="password" type="password" maxLength={8} required />
              </Field>
              <Field>
                <Button type="submit">Entrar</Button>
              </Field>
              <FieldDescription className="text-center">
                Não tem uma conta? <Link to={PATHS.signup}> Cadastre-se</Link>
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
