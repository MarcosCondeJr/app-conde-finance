import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";

export function BankListSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-14" />
          </TableCell>

          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </TableCell>

          <TableCell>
            <Skeleton className="h-6 w-20 rounded-full" />
          </TableCell>

          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Skeleton className="h-9 w-20 rounded-md" />
              <Skeleton className="h-9 w-20 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}