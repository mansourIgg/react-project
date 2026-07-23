// src/features/cart/context/CartContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { cartService } from "../services/cart.service"
import { useAuth } from "@/features/auth/context/AuthContext"
import { guestCartIdStorage } from "../services/cart-id.storage"

interface AddableProduct {
  id: string
  name: string
  price: number
  imageUrl: string
}

interface CartContextValue {
  totalItems: number
  isLoading: boolean
  addItem: (product: AddableProduct, qty?: number) => Promise<string>
  setTotalItems: (count: number) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isLoading: isAuthLoading } = useAuth()
  const [totalItems, setTotalItems] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isAuthLoading) return

    async function loadCount() {
      const customerId = user ? Number(user.customer_id) : 0

      if (customerId === 0) {
        const guestCartId = await guestCartIdStorage.get()
        if (!guestCartId) {
          setTotalItems(0)
          setIsLoading(false)
          return
        }
      }

      try {
        const response = await cartService.getCartCount(customerId)
        setTotalItems(response.item_count ?? 0)
      } catch {
        setTotalItems(0)
      } finally {
        setIsLoading(false)
      }
    }

    loadCount()
  }, [user, isAuthLoading])

  const addItem = async (product: AddableProduct, qty = 1) => {
    const customerId = user ? Number(user.customer_id) : 0
    const response = await cartService.addToCart({
      customerId,
      productId: Number(product.id),
      qty,
    })
    setTotalItems(response.data.items_count)
    return response.message
  }

  return (
    <CartContext.Provider value={{ totalItems, isLoading, addItem, setTotalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}