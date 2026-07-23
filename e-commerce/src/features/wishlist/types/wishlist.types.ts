// src/features/wishlist/types/wishlist.types.ts
export interface WishlistProduct {
  entity_id: string
  item_id: string
  is_favourite: boolean
  sku: string
  type_id: string
  name: string
  price: string
  small_image: string
  thumb_image: string
}

export interface WishlistAddResponse {
  message: string
  data: {
    product: WishlistProduct
  }
}

export interface WishlistMutationResponse {
  message: string
}

export interface WishlistListResponse {
  products: WishlistProduct[]
}