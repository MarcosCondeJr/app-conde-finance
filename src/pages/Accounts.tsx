import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Accounts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contas</h1>
          <p className="text-muted-foreground">
            Gerencie suas contas
          </p>
        </div>
        <div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Conta
            </Button>
        </div>
      </div>
    </div>
  );
}