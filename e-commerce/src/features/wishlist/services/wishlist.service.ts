// src/features/wishlist/services/wishlist.service.ts
import { apiRequest, apiRequestRaw } from "@/lib/api-client"
import type { WishlistAddResponse, WishlistMutationResponse, WishlistListResponse } from "../types/wishlist.types"

export const wishlistService = {
  add: (customerId: number, productId: number) =>
    apiRequestRaw<WishlistAddResponse>({
      method: "POST",
      url: "/V1/mobiconnect/wishlist/add",
      data: { customer_id: customerId, product_id: productId },
    }),

  remove: (customerId: number, itemId: number) =>
    apiRequestRaw<WishlistMutationResponse>({
      method: "POST",
      url: "/V1/mobiconnect/wishlist/remove",
      data: { customer_id: customerId, item_id: itemId },
    }),

  getWishlist: (customerId: number) =>
    apiRequest<WishlistListResponse>({
      method: "GET",
      url: "/V1/mobiconnect/wishlist/getwishlist",
      params: { customer_id: customerId },
    }),
}