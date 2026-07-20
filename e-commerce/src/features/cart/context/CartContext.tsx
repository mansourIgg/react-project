// src/features/cart/context/CartContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { CartItem } from "../types/cart.types"
import { cartStorage } from "../services/cart.storage"

interface AddableProduct {
  id: string
  name: string
  price: number
  imageUrl: string
}

interface CartContextValue {
  items: CartItem[]
  isLoading: boolean
  totalItems: number
  totalPrice: number
  addItem: (product: AddableProduct, quantity?: number) => void
  setQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    cartStorage.get().then((cached) => {
      setItems(cached ?? [])
      setIsLoading(false)
    })
  }, [])

  const persist = (next: CartItem[]) => {
    setItems(next)
    cartStorage.set(next)
  }

  const addItem = (product: AddableProduct, quantity = 1) => {
    const existing = items.find((item) => item.id === product.id)
    if (existing) {
      persist(
        items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      )
    } else {
      persist([...items, { ...product, quantity }])
    }
  }

  const setQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      persist(items.filter((item) => item.id !== id))
      return
    }
    persist(items.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeItem = (id: string) => {
    persist(items.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    persist([])
    cartStorage.clear()
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <CartContext.Provider
      value={{ items, isLoading, totalItems, totalPrice, addItem, setQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}