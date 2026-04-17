import { CategoryFiltersForm } from "@/components/category/CategoryFiltersForm";
import { CategoryList } from "@/components/category/CategoryList";
import { Button } from "@/components/ui/button";
import { useCategory } from "@/hooks/useCategory";
import type { Category } from "@/types/category/Category";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CategoryPage() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedCategry, setSelectedCategory] = useState<Category | undefined>(
    undefined,
  );

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [CategoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    categories,
    page,
    totalPages,
    totalElements,
    isLoading,
    filters,
    clearFilters,
    createCategory,
    updateCategory,
    removeCategory,
  } = useCategory();

  function handleOpenEdit(category: Category) {
    setSelectedCategory(category);
    setOpenForm(true);
  }

  function handleDelete(category: Category) {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categorias</h1>
          <p className="text-muted-foreground">Gerencie suas categorias</p>
        </div>
        <div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Categoria
          </Button>
        </div>
      </div>

      <CategoryFiltersForm 
        filters={filters} 
        onClear={clearFilters} 
      />

      <CategoryList
        data={categories}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
