// src/pages/wishlist/WishlistPage.tsx
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { HeartOff, Loader2 } from "lucide-react"
import { Header } from "@/components/common/Header"
import { useAuth } from "@/features/auth/context/AuthContext"
import { wishlistService } from "@/features/wishlist/services/wishlist.service"
import { FavoriteButton } from "@/features/wishlist/components/FavoriteButton"
import { useCurrency } from "@/lib/use-currency"
import { ApiError } from "@/lib/api-response"
import type { WishlistProduct } from "@/features/wishlist/types/wishlist.types"
import { useWishlist } from "@/features/wishlist/context/WishlistContext"

export default function WishlistPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { format } = useCurrency()
  const [products, setProducts] = useState<WishlistProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { setWishlistData } = useWishlist()

  useEffect(() => {
  if (!user) return
  wishlistService
    .getWishlist(Number(user.customer_id))
    .then((data) => {
      setProducts(data.products)
      setWishlistData(data.products)
    })
    .catch((error) => toast.error(error instanceof ApiError ? error.message : t("common.somethingWentWrong")))
    .finally(() => setIsLoading(false))
}, [user, t, setWishlistData])

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 px-6 py-6">
        <h1 className="text-2xl font-semibold text-start">{t("wishlist.title")}</h1>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <HeartOff className="size-12 text-muted-foreground" />
            <p className="text-lg font-semibold">{t("wishlist.emptyTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("wishlist.emptyDescription")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((product) => (
              <div key={product.item_id} className="flex flex-col gap-2">
                <div className="relative">
                  <img
                    src={product.small_image}
                    alt={product.name}
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                  <FavoriteButton productId={product.entity_id} />
                </div>
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">{format(product.price)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}