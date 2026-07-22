// src/features/dashboard/types/dashboard.types.ts
export interface SliderImage {
  id: string
  imageUrl: string
  alt: string
}

export interface Product {
  id: string
  name: string
  price: number
  imageUrl: string,
  isConfigurable: boolean
}

export interface Brand {
  id: string
  name: string
  imageUrl: string
}