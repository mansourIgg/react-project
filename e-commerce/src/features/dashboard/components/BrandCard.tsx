// src/features/dashboard/components/BrandCard.tsx
import type { Brand } from "../types/dashboard.types"

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="flex w-24 shrink-0 flex-col items-center gap-2">
      <img
        src={brand.imageUrl}
        alt={brand.name}
        className="h-20 w-20 rounded-full object-cover"
      />
      <p className="truncate text-sm text-center">{brand.name}</p>
    </div>
  )
}