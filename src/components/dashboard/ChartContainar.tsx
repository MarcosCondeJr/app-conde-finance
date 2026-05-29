import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChartContainarProps {
  title: string;
  description?: string;
  isLoading?: boolean;
  children: ReactNode;
}

export function ChartContainar({
  title,
  description,
  isLoading = false,
  children,
}: ChartContainarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-65 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
            Carregando dados do gráfico...
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
