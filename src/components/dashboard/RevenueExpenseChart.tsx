import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import type { ChartConfig } from "@/components/ui/chart"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type Transaction = {
  id: string
  amount: number
  type: "receita" | "despesa"
  date: string // ISO string
}

interface RevenueExpenseChartProps {
  transactions: Transaction[]
}

const chartConfig = {
  receita: {
    label: "Receita",
    color: "var(--dashboard-chart-revenue)",
  },
  despesa: {
    label: "Despesa",
    color: "var(--dashboard-chart-expense)",
  },
} satisfies ChartConfig

function aggregateByMonth(transactions: Transaction[]) {
  const map: Record<string, { mes: string; receita: number; despesa: number }> = {}

  transactions.forEach((t) => {
    const date = new Date(t.date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    const label = date.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" })

    if (!map[key]) map[key] = { mes: label, receita: 0, despesa: 0 }

    if (t.type === "receita") map[key].receita += t.amount
    else map[key].despesa += t.amount
  })

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => ({
      ...v,
      receita: Math.round(v.receita * 100) / 100,
      despesa: Math.round(v.despesa * 100) / 100,
    }))
}

export function RevenueExpenseChart({ transactions }: RevenueExpenseChartProps) {
  const data = useMemo(() => aggregateByMonth(transactions), [transactions])

  if (!data.length) {
    return (
      <div className="flex h-[260px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        Nenhuma transação encontrada para montar o gráfico.
      </div>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="fillReceita" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-receita)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="var(--color-receita)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillDespesa" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-despesa)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="var(--color-despesa)" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.4} />

        <XAxis
          dataKey="mes"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 12 }}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 12 }}
          tickFormatter={(v) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              notation: "compact",
            }).format(v)
          }
        />

        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) =>
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(value))
              }
            />
          }
        />

        <ChartLegend content={<ChartLegendContent />} />

        <Area
          dataKey="receita"
          type="monotone"
          fill="url(#fillReceita)"
          stroke="var(--color-receita)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />

        <Area
          dataKey="despesa"
          type="monotone"
          fill="url(#fillDespesa)"
          stroke="var(--color-despesa)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </AreaChart>
    </ChartContainer>
  )
}
