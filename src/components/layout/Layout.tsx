import { Building2, CreditCard, LayoutDashboard, Receipt, Tags, Wallet } from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/banks", label: "Banks", icon: Building2 },
  { path: "/accounts", label: "Accounts", icon: Wallet },
  { path: "/cards", label: "Cards", icon: CreditCard },
  { path: "/categories", label: "Categories", icon: Tags },
  { path: "/transactions", label: "Transactions", icon: Receipt },
];

export function Layout() {
    
    return (
        <div className="min-h-screen">
            <aside className="fixed left-0 top-0 h-screen w-64 border-r">
                <div className="flex h-16 items-center justify-center border-b px-6">
                    <h1 className="text-xl font-bold">Conde Finance</h1>
                </div>
            </aside>
            <nav className="space-y-1 p-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <div className={(
                            
                            isActive
                            ? "bg-primary text-primary-foreground flex items-center gap-3 rounded-lg px-3 py-2 transition-colors"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 transition-colors"
                        )} >

                            <Icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}