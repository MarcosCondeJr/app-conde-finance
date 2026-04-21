import type { Category } from "@/types/category/Category";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CategoryListSkeleton } from "./CategoryListSkeleton";
import { MoreHorizontalIcon, Pen, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CategoryTypeBadge } from "../common/CategoryTypeBadge";
import type { TableProps } from "@/types/common/TableProps";

export function CategoryList({
  data,
  isLoading,
  onEdit,
  onDelete,
}: TableProps<Category>) {
  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo de categoria</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <CategoryListSkeleton />
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-15 text-center">
                Nenhuma categoria encontrada.
              </TableCell>
            </TableRow>
          ) : (
            data.map((category) => {
              return ( 
                <TableRow key={category.id} className="h-14">
                  <TableCell className="font-medium">
                    {category.name}
                  </TableCell>
                  <TableCell>
                    <CategoryTypeBadge type={category.categoryType} />
                  </TableCell>
                  <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit?.(category)}>
                        <Pen />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onDelete?.(category)}
                      >
                        <Trash2 />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
