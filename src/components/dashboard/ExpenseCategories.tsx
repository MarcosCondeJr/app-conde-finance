"use client"

import { useMemo } from "react"
import { Pie, PieChart, Cell } from "recharts"
import type { ChartConfig } from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

type Transaction = {
  id: string
  amount: number
  type: "receita" | "despesa"
  categoryId: string
}

type Category = {
  id: string
  name: string
  color?: string
}

interface ExpenseCategoriesProps {
  transactions: Transaction[]
  categories: Category[]
}

const CHART_COLORS = [
  "var(--dashboard-chart-category-1)",
  "var(--dashboard-chart-category-2)",
  "var(--dashboard-chart-category-3)",
  "var(--dashboard-chart-category-4)",
  "var(--dashboard-chart-category-5)",
]

export function ExpenseCategoriesChart({
  transactions,
  categories,
}: ExpenseCategoriesProps) {
  const { data, total, chartConfig } = useMemo(() => {
    const despesas = transactions.filter((t) => t.type === "despesa")

    const map: Record<string, number> = {}
    despesas.forEach((t) => {
      map[t.categoryId] = (map[t.categoryId] ?? 0) + t.amount
    })

    const sorted = Object.entries(map)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    const total = sorted.reduce((acc, [, v]) => acc + v, 0)

    const data = sorted.map(([catId, value], i) => {
      const cat = categories.find((c) => c.id === catId)
      return {
        name: cat?.name ?? catId,
        value: Math.round(value * 100) / 100,
        percent: total > 0 ? Math.round((value / total) * 100) : 0,
        fill: CHART_COLORS[i % CHART_COLORS.length],
      }
    })

    const chartConfig: ChartConfig = Object.fromEntries(
      data.map((d) => [
        d.name,
        { label: d.name, color: d.fill },
      ])
    )

    return { data, total, chartConfig }
  }, [transactions, categories])

  const totalFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
  }).format(total)

  if (!data.length || total <= 0) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        Nenhuma despesa encontrada para montar o gráfico.
      </div>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="h-[280px] w-full">
      <PieChart>
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => [
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(value)),
                name,
              ]}
            />
          }
        />

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={2}
          strokeWidth={0}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}

          <text
            x="50%"
            y="46%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: "20px",
              fontWeight: 500,
              fill: "var(--foreground)",
            }}
          >
            {totalFormatado}
          </text>
          <text
            x="50%"
            y="57%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: "12px",
              fill: "var(--muted-foreground)",
            }}
          >
            total em despesas
          </text>
        </Pie>

        <ChartLegend
          content={<ChartLegendContent nameKey="name" />}
          className="flex-wrap gap-2"
        />
      </PieChart>
    </ChartContainer>
  )
}
