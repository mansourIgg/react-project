// src/features/cart/services/cart-id.storage.ts
import { storage } from "@/lib/storage"

const GUEST_CART_ID_KEY = "guest_cart_id"

export const guestCartIdStorage = {
  get: () => storage.getItem<string>(GUEST_CART_ID_KEY),
  set: (cartId: string) => storage.setItem<string>(GUEST_CART_ID_KEY, cartId),
  clear: () => storage.removeItem(GUEST_CART_ID_KEY),
}