// src/features/dashboard/utils/dashboard-mappers.ts
import type { Ad, ApiProduct, ApiBrand } from "../types/dashboard-api.types"
import type { Product, Brand, SliderImage } from "../types/dashboard.types"

export const mapAdToSlide = (ad: Ad): SliderImage => ({
  id: ad.id,
  imageUrl: ad.image,
  alt: ad.title,
})

export const mapApiProduct = (p: ApiProduct): Product => ({
  id: p.entity_id,
  name: p.name,
  price: parseFloat(p.price),
  imageUrl: p.small_image,
})

export const mapApiBrand = (b: ApiBrand): Brand => ({
  id: b.brand_id,
  name: b.brand_name,
  imageUrl: b.image,
})