import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATHS } from "./paths";
import Login from "../pages/Login";
import AuthLayout from "../components/layout/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import { Layout } from "../components/layout/Layout";
import DashboardPage from "../pages/DashboardPage";
import Categories from "../pages/Categories";
import Transactions from "../pages/Transactions";
import Register from "@/pages/Register";
import NotFoundPage from "@/pages/NotFoundPage";
import BanksPage from "@/pages/BankPage";
import AccountPage from "@/pages/AccountPage";

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
                    { path: PATHS.home, element: <DashboardPage /> },
                    { path: PATHS.banks, element: <BanksPage /> },
                    { path: PATHS.accounts, element: <AccountPage /> },
                    { path: PATHS.categories, element: <Categories /> },
                    { path: PATHS.transactions, element: <Transactions /> },
                ]
            }
        ]
    },

    { path: "*", element: <NotFoundPage />},
])