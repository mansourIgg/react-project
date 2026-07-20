// src/features/cart/components/RequireNonEmptyCart.tsx
import { Navigate, Outlet } from "react-router-dom"
import { useCart } from "../context/CartContext"

export function RequireNonEmptyCart() {
  const { items, isLoading } = useCart()

  if (isLoading) return null // or a spinner

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  return <Outlet />
}