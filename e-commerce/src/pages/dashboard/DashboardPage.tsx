// src/pages/dashboard/DashboardPage.tsx
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Header } from "@/components/common/Header"
import { ImageSlider } from "@/features/dashboard/components/ImageSlider"
import { CategoryList } from "@/features/dashboard/components/CategoryList"
import { ProductRow } from "@/features/dashboard/components/ProductRow"
import { BrandRow } from "@/features/dashboard/components/BrandRow"
import { dashboardService } from "@/features/dashboard/services/dashboard.service"
import { mapAdToSlide, mapApiProduct, mapApiBrand } from "@/features/dashboard/utils/dashboard-mappers"
import { useCart } from "@/features/cart/context/CartContext"
import { ApiError } from "@/lib/api-response"
import type { HomePageApiData } from "@/features/dashboard/types/dashboard-api.types"
import type { Product } from "@/features/dashboard/types/dashboard.types"
import { useTranslation } from "react-i18next"
import { DashboardSkeleton } from "@/features/dashboard/components/DashboardSkeleton"
import { useNavigate } from "react-router-dom"
import { handleAddToCartGuarded } from "@/features/cart/utils/handle-add-to-cart"


export default function DashboardPage() {
  const { addItem } = useCart()
  const [homeData, setHomeData] = useState<HomePageApiData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation();
  const navigate = useNavigate()

  useEffect(() => {
    dashboardService
      .getHomePage()
      .then(setHomeData)
      .catch((error) => {
        const message = error instanceof ApiError ? error.message : "Failed to load homepage"
        toast.error(message)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleAddToCart = (product: Product) => {
  handleAddToCartGuarded({
    entityId: product.id,
    isConfigurable: product.isConfigurable,
    addItem,
    navigate,
    product: {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    },
    configurableMessage: t("product.chooseOptionsFirst"),
    genericErrorMessage: t("common.somethingWentWrong"),
  })
}

  if (isLoading) {
  return (
    <>
      <Header />
      <DashboardSkeleton />
    </>
  )
}

  if (!homeData) {
    return (
      <>
        <Header />
        <p className="py-20 text-center text-muted-foreground">Nothing to show right now.</p>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6">
        <ImageSlider images={homeData.ads.map(mapAdToSlide)} />

        <h2 className="text-center text-lg font-semibold">{t("dashboard.mainCategories")}</h2>
        <CategoryList categories={homeData.category} />

        <ProductRow
          title={homeData.recommended.name}
          categoryId={homeData.recommended.id}
          products={homeData.recommended.products.map(mapApiProduct)}
          seeMoreHref={`/products/section-${homeData.recommended.id}`}
          onAddToCart={handleAddToCart}
        />

        <ProductRow
          title={homeData.popular.name}
          categoryId={homeData.popular.id}
          products={homeData.popular.products.map(mapApiProduct)}
          seeMoreHref={`/products/section-${homeData.popular.id}`}
          onAddToCart={handleAddToCart}
        />

        <BrandRow
          title="Shop by Brand"
          brands={homeData.brand.map(mapApiBrand)}
          seeMoreHref="/brands"
        />
      </div>
    </>
  )
}