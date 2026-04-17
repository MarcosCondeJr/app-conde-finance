import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

export function CategoryListSkeleton() {
    return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>

          <TableCell>
              <Skeleton className="h-4 w-60" />
          </TableCell>

          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Skeleton className="h-9 w-20 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}