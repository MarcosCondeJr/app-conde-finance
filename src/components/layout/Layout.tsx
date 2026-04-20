import {
  Building2,
  LayoutDashboard,
  Laptop,
  Moon,
  Receipt,
  Sun,
  Tags,
  Wallet,
} from "lucide-react";
import { PATHS } from "../../routes/paths";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NavUser } from "../NavUser";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const navItems = [
  { path: PATHS.home, label: "Dashboard", icon: LayoutDashboard },
  { path: PATHS.banks, label: "Bancos", icon: Building2 },
  { path: PATHS.accounts, label: "Contas", icon: Wallet },
  { path: PATHS.categories, label: "Categorias", icon: Tags },
  { path: PATHS.transactions, label: "Transações", icon: Receipt },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function onLogout() {
    logout();
    navigate(PATHS.login, { replace: true });
  }

  const selectedTheme = mounted ? (theme ?? "system") : "system";
  const activeTheme = mounted ? (resolvedTheme ?? "light") : "light";

  return (
    <div className="min-h-screen max-w-screen">
      <aside className="fixed left-0 top-0 h-screen w-64 border-r flex flex-col">
        <div className="flex h-16 items-center justify-center border-b px-6 shrink-0">
          {activeTheme === "dark" ? (
            <img
              src="/LOGO-CONDE-FINANCE-VIOLETA.png"
              alt="Logo"
              className="ml-2"
              width={80}
            />
          ) : (
            <img
              src="ICON-CONDE-FINANCE.png"
              alt="Logo"
              className="ml-2"
              width={100}
            />
          )}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Alterar tema">
                {selectedTheme === "system" ? (
                  <Laptop className="text-primary" />
                ) : activeTheme === "dark" ? (
                  <Moon className="text-primary" />
                ) : (
                  <Sun className="text-primary" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                // value={theme ?? "system"}
                onValueChange={(value) =>
                  setTheme(value as "light" | "dark" | "system")
                }
              >
                <DropdownMenuRadioItem value="light" className="text-end">
                  <Sun className="text-primary" />
                  Claro
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <Moon className="text-primary" />
                  Escuro
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  <Laptop className="text-primary" />
                  Sistema
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
