import { authStorage } from "@/lib/authStorage";
import { isTokenValid } from "@/lib/token";
import { AuthService } from "@/services/auth.service";
import type { LoginRequest } from "@/types/auth/LoginRequest";
import type { UserResponse } from "@/types/user/UserResponse";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthContextType = {
  user: UserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = authStorage.getToken();
    const user = authStorage.getUser();

    if (token && user && isTokenValid(token)) {
      setUser(user);
    } else {
      authStorage.clear();
      setUser(null);
    }

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

  const isAuthenticated = useMemo(() => {
    const token = authStorage.getToken();
    return !!user && isTokenValid(token);
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
