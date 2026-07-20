// src/features/dashboard/components/ProductCard.tsx
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Product } from "../types/dashboard.types"

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  variant?: "row" | "grid"
}

export function ProductCard({ product, onAddToCart, variant = "row" }: ProductCardProps) {
  const { t } = useTranslation()

  return (
    <div className={cn("flex flex-col gap-2", variant === "row" ? "w-40 shrink-0" : "w-full")}>
      <img src={product.imageUrl} alt={product.name} className="aspect-square w-full rounded-lg object-cover" />
      <p className="truncate text-sm font-medium">{product.name}</p>
      <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
      <Button size="sm" onClick={() => onAddToCart?.(product)}>
        {t("common.addToCart")}
      </Button>
    </div>
  )
}