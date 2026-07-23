// src/pages/category/CategoryPage.tsx
import { useEffect, useState } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { Header } from "@/components/common/Header"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { categoryService } from "@/features/dashboard/services/category.service"
import { useAuth } from "@/features/auth/context/AuthContext"
import { useCart } from "@/features/cart/context/CartContext"
import { handleAddToCartGuarded } from "@/features/cart/utils/handle-add-to-cart"
import type { CategoryApiProduct } from "@/features/dashboard/types/product-api.types"
import { useCurrency } from "@/lib/use-currency"
import { FavoriteButton } from "@/features/wishlist/components/FavoriteButton"

interface CategoryLocationState {
  title?: string
  categoryId?: string
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      ))}
    </div>
  )
}

export default function CategoryPage() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as CategoryLocationState | null
  const { user } = useAuth()
  const { addItem } = useCart()

  const categoryId = state?.categoryId ?? slug ?? ""
  const title = state?.title ?? slug?.replace(/-/g, " ") ?? "Products"

  const [products, setProducts] = useState<CategoryApiProduct[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const { format } = useCurrency()

  useEffect(() => {
    setIsLoading(true)
    categoryService
      .getCategoryProducts({
        categoryId,
        page,
        customerId: user ? Number(user.customer_id) : 0,
      })
      .then((data) => {
        setProducts(data.products)
        setTotalPages(data.total_page)
      })
      .catch(() => toast.error(t("common.somethingWentWrong")))
      .finally(() => setIsLoading(false))
  }, [categoryId, page, user, t])

  const onAddToCart = (product: CategoryApiProduct) => {
    handleAddToCartGuarded({
      entityId: product.entity_id,
      isConfigurable: product.is_configurable === "1",
      addItem,
      navigate,
      product: {
        id: product.entity_id,
        name: product.name,
        price: parseFloat(product.price),
        imageUrl: product.small_image,
      },
      configurableMessage: t("product.chooseOptionsFirst"),
      genericErrorMessage: t("common.somethingWentWrong"),
    })
  }

  return (
    <>
      <Header />
      <div className="flex flex-col gap-6 px-6 py-6">
        <h1 className="text-2xl font-semibold capitalize text-start">{title}</h1>

        {isLoading ? (
          <ProductGridSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.map((product) => (
                <div key={product.entity_id} className="flex flex-col gap-2">
                  <div className="relative">
                    <img
                      src={product.small_image}
                      alt={product.name}
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                    <FavoriteButton productId={product.entity_id} initialLiked={product.is_favourite} />
                  </div>
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{format(product.price)}</p>
                  <Button size="sm" onClick={() => onAddToCart(product)}>
                    {t("common.addToCart")}
                  </Button>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  {t("common.previous")}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  {t("common.next")}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}