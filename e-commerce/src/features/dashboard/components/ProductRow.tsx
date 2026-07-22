// src/features/dashboard/components/ProductRow.tsx
import { Link } from "react-router-dom"
import { ProductCard } from "./ProductCard"
import type { Product } from "../types/dashboard.types"
import { useTranslation } from "react-i18next"

interface ProductRowProps {
  title: string
  categoryId: string
  products: Product[]
  seeMoreHref: string
  onAddToCart?: (product: Product) => void
}

export function ProductRow({ title,categoryId, products, seeMoreHref, onAddToCart }: ProductRowProps) {
  const { t } = useTranslation()
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link to={seeMoreHref} state={{ title, categoryId }} className="text-sm text-primary underline-offset-4 hover:underline">
          {t("common.seeMore")}
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}