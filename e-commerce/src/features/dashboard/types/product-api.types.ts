// src/features/dashboard/types/product-api.types.ts
export interface CategoryApiProduct {
  entity_id: string
  is_configurable: string // "0" | "1"
  seller_id: string
  seller_name: string
  thumb_image: string
  small_image: string
  price: string
  qty: number
  sku: string
  name: string
  is_favourite: boolean
}

export interface CategoryProductsResponse {
  total_page: number
  products: CategoryApiProduct[]
}