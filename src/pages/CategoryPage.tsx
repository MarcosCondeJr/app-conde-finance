import { CategoryFiltersForm } from "@/components/category/CategoryFiltersForm";
import { CategoryForm } from "@/components/category/CategoryForm";
import { CategoryList } from "@/components/category/CategoryList";
import DeleteConfirmDialog from "@/components/common/DeleteConfirmDialog";
import { Pagination } from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { useCategory } from "@/hooks/useCategory";
import type { ApiError } from "@/types/api/ApiError";
import type { Category } from "@/types/category/Category";
import type { CategoryRequest } from "@/types/category/CategoryRequest";
import { applyErrors } from "@/utils/applyErrors";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CategoryPage() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(
    undefined,
  );

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
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

  async function handleSubmit(payload: CategoryRequest) {
    await createCategory(payload);
  }

  async function handleEdit(id: string, payload: CategoryRequest) {
    await updateCategory({ id, payload });
  }

  function handleOpenCreate() {
    setSelectedCategory(undefined);
    setOpenForm(true);
  }

  function handleOpenEdit(category: Category) {
    setSelectedCategory(category);
    setOpenForm(true);
  }

  function handleDelete(category: Category) {
    setCategoryToDelete(category);
    setOpenDeleteDialog(true);
  }

  async function confirmDelete() {
    if (!categoryToDelete) return;

    try {
      setIsDeleting(true);
      await removeCategory(categoryToDelete.id);
      toast.success("Categoria excluida com sucesso!");
      setOpenDeleteDialog(false);
      setCategoryToDelete(null);
    } catch (error) {
      applyErrors(error as ApiError);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categorias</h1>
          <p className="text-muted-foreground">Gerencie suas categorias</p>
        </div>
        <div>
          <Button onClick={handleOpenCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Categoria
          </Button>
        </div>
      </div>

      <CategoryForm
        open={openForm}
        onOpenChange={setOpenForm}
        category={selectedCategory}
        onSave={handleSubmit}
        onEdit={handleEdit}
      />

      <CategoryFiltersForm filters={filters} onClear={clearFilters} />

      <CategoryList
        data={categories}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {categories && (
        <Pagination
          page={page}
          totalPages={totalPages}
          totalElements={totalElements}
        />
      )}

      <DeleteConfirmDialog
        open={openDeleteDialog}
        onOpenChange={(openDelete) => {
          setOpenDeleteDialog(openDelete);

          if (!openDelete) {
            setCategoryToDelete(null);
          }
        }}
        onConfirm={confirmDelete}
        title="Excluir categoria"
        itemName={categoryToDelete?.name}
        isLoading={isDeleting}
      />
    </div>
  );
}
