import { useAuth } from "@/contexts/AuthContext";
import { PATHS } from "@/routes/paths";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATHS.home} replace />
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Outlet />
    </div>
  );
}