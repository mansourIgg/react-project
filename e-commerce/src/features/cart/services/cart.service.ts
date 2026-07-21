// src/features/cart/services/cart.service.ts
import { apiRequest , apiRequestRaw} from "@/lib/api-client"
import type { AddToCartResponse, ViewCartResponse } from "../types/cart-api.types"
import { guestCartIdStorage } from "./cart-id.storage"

interface AddToCartParams {
  customerId: number
  productId: number
  qty?: number
}

export const cartService = {
  // src/features/cart/services/cart.service.ts
addToCart: async ({ customerId, productId, qty = 1 }: AddToCartParams) => {
  const payload: Record<string, unknown> = {
    customer_id: customerId,
    qty,
    product_id: productId,
  }

  if (customerId === 0) {
    const guestCartId = await guestCartIdStorage.get()
    if (guestCartId) payload.cart_id = guestCartId
  }

  const response = await apiRequestRaw<AddToCartResponse>({
    method: "POST",
    url: "/V1/mobiconnect/checkout/add/",
    data: payload,
  })

  const cartId = response["cart_id "] // trailing-space key from API
  if (customerId === 0 && cartId) {
    await guestCartIdStorage.set(cartId)
  }

  return response
},
  viewCart: async (customerId: number) => {
  const payload: Record<string, unknown> = { customer_id: customerId }

  if (customerId === 0) {
    const guestCartId = await guestCartIdStorage.get()
    payload.cart_id = guestCartId
  }

  return apiRequest<ViewCartResponse>({
    method: "POST",
    url: "/V1/mobiconnect/checkout/viewcart",
    data: payload,
  })
},
}