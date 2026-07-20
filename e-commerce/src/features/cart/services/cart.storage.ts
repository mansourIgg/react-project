// src/features/cart/services/cart.storage.ts
import { storage } from "@/lib/storage"
import type { CartItem } from "../types/cart.types"

const CART_KEY = "cart_items"

export const cartStorage = {
  get: () => storage.getItem<CartItem[]>(CART_KEY),
  set: (items: CartItem[]) => storage.setItem<CartItem[]>(CART_KEY, items),
  clear: () => storage.removeItem(CART_KEY),
}