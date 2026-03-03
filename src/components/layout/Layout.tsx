import {
  Building2,
  LayoutDashboard,
  Moon,
  Receipt,
  Sun,
  Tags,
  Wallet,
} from "lucide-react";
import { PATHS } from "../../routes/paths";
import {
  Link,
  Outlet,
  replace,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NavUser } from "../NavUser";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { path: PATHS.home, label: "Dashboard", icon: LayoutDashboard },
  { path: PATHS.banks, label: "Bancos", icon: Building2 },
  { path: PATHS.accounts, label: "Contas", icon: Wallet },
  { path: PATHS.categories, label: "Categorias", icon: Tags },
  { path: PATHS.transactions, label: "Transações", icon: Receipt },
];

export function Layout({ children }: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<String>("light");
  const { user, logout } = useAuth();

  function onLogout() {
    logout();
    navigate(PATHS.login, { replace: true });
  }

  return (
    <div className="min-h-screen min-w-screen">
      <aside className="fixed left-0 top-0 h-screen w-64 border-r flex flex-col">
        <div className="flex h-16 items-center justify-center border-b px-6 shrink-0">
          <h2 className="text-xl font-bold text-primary">Conde Finance</h2>
        </div>

        <nav className="flex-1 space-y-1 flex flex-col gap-1 p-4 overflow-y-auto">
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
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto border-t p-2">
          <NavUser user={user} logout={onLogout} />
        </div>
      </aside>

      <div className="ml-64 fix">
        <header className="flex h-16 items-center justify-between border-b px-8">
          <div className="text-lg font-semibold text-muted-foreground">
            {navItems.find((item) => item.path === location.pathname)?.label ||
              "Dashboard"}
          </div>
          <Button variant="ghost" size="icon">
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
