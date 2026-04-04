import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATHS } from "./paths";
import Login from "../pages/Login";
import AuthLayout from "../components/layout/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import { Layout } from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import Banks from "../pages/BankPage";
import Accounts from "../pages/Accounts";
import Categories from "../pages/Categories";
import Transactions from "../pages/Transactions";
import Register from "@/pages/Register";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
    { path: "/", element: <Navigate to={PATHS.home} replace /> },

    {
        element: <AuthLayout />,
        children: [
            { path: PATHS.login, element: <Login /> },
            { path: PATHS.register, element: <Register /> },
        ],
    },

    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <Layout />,
                children: [
                    { path: PATHS.home, element: <Dashboard /> },
                    { path: PATHS.banks, element: <Banks /> },
                    { path: PATHS.accounts, element: <Accounts /> },
                    { path: PATHS.categories, element: <Categories /> },
                    { path: PATHS.transactions, element: <Transactions /> },
                ]
            }
        ]
    },

    { path: "*", element: <NotFoundPage />},
])