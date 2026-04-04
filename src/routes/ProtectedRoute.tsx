import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "./paths";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/spinner";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />
  }

  if (!isAuthenticated) {
    return <Navigate to={PATHS.login} replace />;
  }

  return <Outlet />;
}
