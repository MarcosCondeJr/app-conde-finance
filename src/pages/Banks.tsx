import BankForm from "@/components/banks/BankForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Banks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bancos</h1>
          <p className="text-muted-foreground">
            Gerencie suas instituições bancárias
          </p>
        </div>
        <div>
          <BankForm
            trigger={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Banco
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}