// src/features/cart/types/cart-api.types.ts
export interface AddToCartResponseData {
  items_count: number
  added_to_cart: number
}

export interface AddToCartResponse {
  message: string
  "cart_id": string
  data: AddToCartResponseData
}

export interface CartProductOptions {
  label: string[]
  options: (string | boolean)[] // some entries come back as `false` instead of a string
}

export interface CartProduct {
  entity_id: string
  item_id: string
  name: string
  product_image: string
  qty: number
  "sub-total": string
  product_type: string
  is_favourite: boolean
  available_qty: number
  is_in_stock: boolean
  options_selected: CartProductOptions | []
}

export interface CartSellerGroup {
  seller_id: string
  seller_name: string
  shipping_title: string
  product: CartProduct[]
}

export interface CartTotal {
  amounttopay: string
  discount_amount: string
  shipping_amount: string
  tax_amount: string
}

export interface CartData {
  grandtotal?: string
  subtotal?: string
  cart_id: number
  is_discount?: boolean
  items_count?: number
  currency_code?: string
  total?: CartTotal[]
  products: CartSellerGroup[]
}

export interface ViewCartResponse {
  cart: CartData
}