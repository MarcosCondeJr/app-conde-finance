"use client"

import { useMemo } from "react"
import { Bar, BarChart, Cell, XAxis, YAxis, ReferenceLine } from "recharts"
import type { ChartConfig } from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type Account = {
  id: string
  name: string
  balance: number
  type?: string
}

interface BalanceAccountChartProps {
  accounts: Account[]
}

const chartConfig = {
  balance: {
    label: "Saldo",
    color: "var(--dashboard-chart-balance-positive)",
  },
} satisfies ChartConfig

export function BalanceAccountChart({ accounts }: BalanceAccountChartProps) {
  const data = useMemo(
    () =>
      [...accounts]
        .sort((a, b) => b.balance - a.balance)
        .map((acc) => ({
          name: acc.name,
          balance: Math.round(acc.balance * 100) / 100,
        })),
    [accounts]
  )

  const maxAbs = Math.max(...data.map((d) => Math.abs(d.balance)), 1)

  if (!data.length) {
    return (
      <div className="flex h-[260px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        Nenhuma conta encontrada para montar o gráfico.
      </div>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
        barCategoryGap="30%"
      >
        <XAxis
          type="number"
          domain={[-maxAbs * 1.1, maxAbs * 1.1]}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 11 }}
          tickFormatter={(v) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              notation: "compact",
            }).format(v)
          }
        />

        <YAxis
          type="category"
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 13 }}
          width={90}
        />

        <ReferenceLine x={0} stroke="var(--border)" strokeWidth={1} />

        <ChartTooltip
          cursor={false}
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

        <Bar dataKey="balance" radius={[0, 4, 4, 0]} maxBarSize={28}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={
                entry.balance >= 0
                  ? "var(--dashboard-chart-balance-positive)"
                  : "var(--dashboard-chart-balance-negative)"
              }
              fillOpacity={0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
