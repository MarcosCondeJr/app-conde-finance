import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "./paths";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={PATHS.login} replace />;
    }

    return <Outlet />
}