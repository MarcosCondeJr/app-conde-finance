import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "./paths";

function hasToken(): boolean {
    // return Boolean(localStorage.getItem("token"));
    return true;
}

export default function ProtectedRoute() {
    if (!hasToken()) {
        return <Navigate to={PATHS.login} replace/>
    }
    return <Outlet />
}