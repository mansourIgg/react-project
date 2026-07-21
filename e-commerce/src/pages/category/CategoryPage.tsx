// src/pages/category/CategoryPage.tsx
import { useLocation, useParams } from "react-router-dom"
import { toast } from "sonner"
import { ProductCard } from "@/features/dashboard/components/ProductCard"
import { mockFeaturedProducts } from "@/features/dashboard/data/mock-dashboard"
import type { Product } from "@/features/dashboard/types/dashboard.types"
import { useCart } from "@/features/cart/context/CartContext"
import { Header } from "@/components/common/Header"
import { ApiError } from "@/lib/api-response"

interface CategoryLocationState {
  title?: string
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const state = location.state as CategoryLocationState | null

  // TODO: replace with a real API call keyed by `slug`
  const products: Product[] = mockFeaturedProducts

  const title = state?.title ?? slug?.replace(/-/g, " ") ?? "Products"
  const { addItem } = useCart()
  const handleAddToCart = async (product: Product) => {
    try {
      const message = await addItem(product)
      toast.success(message)
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Something went wrong.")
    }
  }

  return (
    <>
    <Header />
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
      <h1 className="text-2xl font-semibold capitalize">{title}</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="grid"
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
    </>
  )
}