import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Categories() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categorias</h1>
          <p className="text-muted-foreground">
            Gerencie suas categorias
          </p>
        </div>
        <div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Categoria
            </Button>
        </div>
      </div>
    </div>
  );
}