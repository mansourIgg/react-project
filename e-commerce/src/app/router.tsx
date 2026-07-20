// src/app/router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom"
import LoginPage from "@/pages/auth/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage"
import DashboardPage from "@/pages/dashboard/DashboardPage"
import CategoryPage from "@/pages/category/CategoryPage"
import CartPage from "@/pages/cart/CartPage"
import { RequireNonEmptyCart } from "@/features/cart/components/RequireNonEmptyCart"
import CheckoutPage from "@/pages/checkout/CheckoutPage"
import ProfilePage from "@/pages/profile/ProfilePage"
import { RequireAuth } from "@/features/auth/components/RequireAuth"

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/products/:slug", element: <CategoryPage /> },
  { path: "/cart", element: <CartPage /> },
  {
    element: <RequireNonEmptyCart />,
    children: [{ path: "/checkout", element: <CheckoutPage /> }],
  },
  {
    element: <RequireAuth />,
    children: [{ path: "/profile", element: <ProfilePage /> }],
  },
  { path: "/", element: <Navigate to="/dashboard" replace /> },
])