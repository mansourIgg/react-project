// src/features/dashboard/components/BrandRow.tsx
import { Link } from "react-router-dom"
import { BrandCard } from "./BrandCard"
import type { Brand } from "../types/dashboard.types"
import { useTranslation } from "react-i18next"

interface BrandRowProps {
  title: string
  brands: Brand[]
  seeMoreHref: string
}

export function BrandRow({ title, brands, seeMoreHref }: BrandRowProps) {
  const { t } = useTranslation()
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link to={seeMoreHref} className="text-sm text-primary underline-offset-4 hover:underline">
          {t("common.seeMore")}
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </section>
  )
}