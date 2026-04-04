import { useAuth } from "@/contexts/AuthContext";
import { PATHS } from "@/routes/paths";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "../ui/spinner";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return <Navigate to={PATHS.home} replace />;
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Outlet />
    </div>
  );
}
