// src/features/dashboard/components/CategoryCard.tsx
import { Link } from "react-router-dom"
import type { ApiCategory } from "../types/dashboard-api.types"

export function CategoryCard({ category }: { category: ApiCategory }) {
  return (
    <Link
      to={`/products/category-${category.id}`}
      state={{ title: category.title, categoryId: category.id }}
      className="flex w-20 shrink-0 flex-col items-center gap-2"
    >
      <img
        src={category.image || `https://picsum.photos/seed/cat-${category.id}/100/100`}
        alt={category.title}
        className="h-16 w-16 rounded-2xl object-cover"
      />
      <p className="line-clamp-2 text-center text-xs">{category.title}</p>
    </Link>
  )
}