// src/pages/dashboard/DashboardPage.tsx
import { toast } from "sonner"
import { ImageSlider } from "@/features/dashboard/components/ImageSlider"
import { ProductRow } from "@/features/dashboard/components/ProductRow"
import { BrandRow } from "@/features/dashboard/components/BrandRow"
import { useCart } from "@/features/cart/context/CartContext"
import {
  mockSliderImages,
  mockFeaturedProducts,
  mockNewArrivals,
  mockBrands,
} from "@/features/dashboard/data/mock-dashboard"
import type { Product } from "@/features/dashboard/types/dashboard.types"
import { Header } from "@/components/common/Header"
import { useTranslation } from "react-i18next"

export default function DashboardPage() {
  const { t } = useTranslation()
  const { addItem } = useCart()
  const handleAddToCart = (product: Product) => {
    // TODO: wire to real cart logic/service
    addItem(product);
    toast.success(t("toast.addedToCart", { name: product.name }))
  }

  return (
    <>
      <Header />
      
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6">
        <ImageSlider images={mockSliderImages} />

        <ProductRow
          title={t("dashboard.featuredProducts")}
          products={mockFeaturedProducts}
          seeMoreHref="/products/featured"
          onAddToCart={handleAddToCart}
        />

        <ProductRow
          title={t("dashboard.newArrivals")}
          products={mockNewArrivals}
          seeMoreHref="/products/new-arrivals"
          onAddToCart={handleAddToCart}
        />

        <BrandRow title={t("dashboard.shopByBrand")} 
          brands={mockBrands} seeMoreHref="/brands" />
      </div>
    </>
  )
}