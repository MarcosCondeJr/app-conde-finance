import { Badge } from "@/components/ui/badge"
import { CategoryType } from "@/types/category/CategoryType"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"

export function CategoryTypeBadge({ type }: { type: CategoryType }) {
  if (type === CategoryType.EXPENSE) {
    return (
      <Badge  className="gap-1 border-red-300 bg-red-50 text-red-700 hover:bg-red-50">
        <ArrowDownCircle className="size-3" />
        Despesa
      </Badge>
    )
  }

  return (
    <Badge className="gap-1 border-green-300 bg-green-50 text-green-700 hover:bg-green-50">
      <ArrowUpCircle className="size-3" />
      Receita
    </Badge>
  )
}