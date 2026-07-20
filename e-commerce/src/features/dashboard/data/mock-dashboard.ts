// src/features/dashboard/data/mock-dashboard.ts
import type { SliderImage, Product, Brand } from "../types/dashboard.types"

export const mockSliderImages: SliderImage[] = [
  { id: "1", imageUrl: "https://picsum.photos/seed/banner1/1200/400", alt: "Banner 1" },
  { id: "2", imageUrl: "https://picsum.photos/seed/banner2/1200/400", alt: "Banner 2" },
  { id: "3", imageUrl: "https://picsum.photos/seed/banner3/1200/400", alt: "Banner 3" },
]

export const mockFeaturedProducts: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: `featured-${i + 1}`,
  name: `Product ${i + 1}`,
  price: 49.99 + i * 5,
  imageUrl: `https://picsum.photos/seed/featured-${i + 1}/300/300`,
}))

export const mockNewArrivals: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: `new-${i + 1}`,
  name: `New Item ${i + 1}`,
  price: 29.99 + i * 4,
  imageUrl: `https://picsum.photos/seed/new-${i + 1}/300/300`,
}))

export const mockBrands: Brand[] = Array.from({ length: 10 }, (_, i) => ({
  id: `brand-${i + 1}`,
  name: `Brand ${i + 1}`,
  imageUrl: `https://picsum.photos/seed/brand-${i + 1}/150/150`,
}))