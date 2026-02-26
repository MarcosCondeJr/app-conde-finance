import BankForm from "@/components/banks/BankForm";
import { BankList } from "@/components/banks/BankList";
import { Button } from "@/components/ui/button";
import type { Bank } from "@/types/bank/Bank";
import { Plus } from "lucide-react";

export const banks: Bank[] = [
  { id: "1", code: "001", name: "Banco do Brasil S.A." },
  { id: "2", code: "237", name: "Banco Bradesco S.A." },
  { id: "3", code: "341", name: "Itaú Unibanco S.A." },
  { id: "4", code: "104", name: "Caixa Econômica Federal" },
  { id: "5", code: "260", name: "Nu Pagamentos S.A. (Nubank)" },
  { id: "6", code: "077", name: "Banco Inter S.A." },
];

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
        <BankList data={banks}/>

    </div>
  );
}