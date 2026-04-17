import type { Category } from "./Category";
import type { CategoryRequest } from "./CategoryRequest";

export interface CategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category;
  onSave: (payload: CategoryRequest) => Promise<void>;
  onEdit: (id: string, payload: CategoryRequest) => Promise<void>;
}