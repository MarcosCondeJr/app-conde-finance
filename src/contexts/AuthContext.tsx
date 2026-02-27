import { authStorage } from "@/lib/authStorage";
import { AuthService } from "@/services/auth.service";
import type { ApiError } from "@/types/api/ApiError";
import type { LoginRequest } from "@/types/auth/LoginRequest";
import type { LoginResponse } from "@/types/auth/LoginResponse";
import type { UserResponse } from "@/types/user/UserResponse";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type AuthContextType = {
  user: UserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginResponse) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode}) {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = authStorage.getToken();
        const storedUser = authStorage.getUser();

        if (token && storedUser) setUser(storedUser);
        else authStorage.clear();

        setIsLoading(false);
    }, []);

    async function login(data: LoginRequest) {
        const res = await AuthService.login(data);
        authStorage.set(res.token, res.user);
        setUser(res.user);
    }

    function logout() {
        authStorage.clear();
        setUser(null);
    }

    function handleAuthError(err: ApiError) {
        if (err.status === 401) logout();
    }

    const value = useMemo(
        () => ({
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            logout,
            }),
            [user, isLoading]
        );

    return <AuthContext.Provider  value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}