// src/features/dashboard/types/dashboard-api.types.ts
export interface Ad {
  id: string
  image: string
  title: string
  is_product: string
}

export interface ApiCategory {
  id: string
  title: string
  description: string
  image: string
  children_category_count: number
  product_count: number
  type_page: string
  sub: ApiCategory[]
}

export interface ApiProduct {
  entity_id: string
  is_favourite: boolean
  name: string
  price: string
  special_price: string
  small_image: string
  thumb_image: string
  type_id?: string | null
}

export interface ApiProductSection {
  name: string
  id: string
  products: ApiProduct[]
}

export interface ApiBrand {
  brand_id: string
  brand_name: string
  image: string
}

export interface HomePageApiData {
  ads: Ad[]
  category: ApiCategory[]
  recommended: ApiProductSection
  popular: ApiProductSection
  brand: ApiBrand[]
}