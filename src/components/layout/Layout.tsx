import { Building2, LayoutDashboard, Moon, Receipt, Sun, Tags, Wallet } from "lucide-react";
import { PATHS } from "../../routes/paths";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import {cn} from "@/lib/utils";

const navItems = [
  { path: PATHS.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { path: PATHS.banks, label: "Banks", icon: Building2 },
  { path: PATHS.accounts, label: "Accounts", icon: Wallet },
  { path: PATHS.categories, label: "Categories", icon: Tags },
  { path: PATHS.transactions, label: "Transactions", icon: Receipt },
];

export function Layout({children}: any) {
    const location = useLocation();
    const [theme, setTheme] = useState<String>("light");
    
    return (
        <div className="min-h-screen min-w-screen">
            <aside className="fixed left-0 top-0 h-screen w-64 border-r">
                <div className="flex h-16 items-center justify-center border-b px-6">
                    <h2 className="text-xl font-bold text-primary">Conde Finance</h2>
                </div>
                <nav className="space-y-1 flex flex-col gap-1 p-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <Link key={item.path} to={item.path}>
                                    <div
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                                            isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </div>
                                </Link>
                            );

                        })}
                </nav>
                <div>
                    <div></div>
                </div>
            </aside>

            <div className="ml-64 fix">
                <header className="flex h-16 items-center justify-between border-b px-8">
                    <div className="text-lg font-semibold">
                        {navItems.find((item) => item.path === location.pathname)?.label || "Dashboard"}
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5 text-primary" />
                        ) : (
                            <Moon className="h-5 w-5 text-primary" />
                        )}
                    </Button>
                </header>

                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}