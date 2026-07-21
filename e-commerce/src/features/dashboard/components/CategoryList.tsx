// src/features/dashboard/components/CategoryList.tsx
import { CategoryCard } from "./CategoryCard"
import type { ApiCategory } from "../types/dashboard-api.types"

export function CategoryList({ categories }: { categories: ApiCategory[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}