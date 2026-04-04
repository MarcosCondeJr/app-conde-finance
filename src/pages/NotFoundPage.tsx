import { Button } from "@/components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6 overflow-hidden">
      <div className=" inset-0 -z-10 bg-gradient-to-br from-muted/40 via-background to-muted/20" />

      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Página não encontrada
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Parece que você se perdeu no caminho... a página que você está
          tentando acessar não existe ou foi movida.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Ir para a home
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
