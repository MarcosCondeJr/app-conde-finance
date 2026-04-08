import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function DashboardTotalsCard() {
  const totals = [
    {
      title: "Total de receitas",
      value: 12,
      icon: "TrendingUp",
      color: "text-primary",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total de despesas",
      value: 5,
      icon: "TrendingDown",
      color: "text-primary",
      bgColor: "bg-green-100",
    },
    {
      title: "Saldo total",
      value: "R$ 10.000,00",
      icon: "DollarSign",
      color: "text-primary",
      bgColor: "bg-purple-100",
    },
    {
      title: "Transações este mês",
      value: 45,
      icon: "Wallet2",
      color: "text-primary",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {totals.map((total) => {
        const Icon = total.icon;
        return (
          <Card key={total.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {total.title}
              </CardTitle>
              <div className={`${total.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${total.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${total.color}`}>
                {total.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
