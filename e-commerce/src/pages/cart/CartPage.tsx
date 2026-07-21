// src/pages/cart/CartPage.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Loader2 } from "lucide-react"
import { CartSkeleton } from "@/features/cart/components/CartSkeleton"
import { toast } from "sonner"
import { Header } from "@/components/common/Header"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/context/AuthContext"
import { cartService } from "@/features/cart/services/cart.service"
import { guestCartIdStorage } from "@/features/cart/services/cart-id.storage"
import { SellerProductGroup } from "@/features/cart/components/SellerProductGroup"
import { ApiError } from "@/lib/api-response"
import type { CartData } from "@/features/cart/types/cart-api.types"

export default function CartPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [cart, setCart] = useState<CartData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const customerId = user ? Number(user.customer_id) : 0

      if (customerId === 0) {
        const guestCartId = await guestCartIdStorage.get()
        if (!guestCartId) {
          setCart(null)
          setIsLoading(false)
          return
        }
      }

      try {
        const response = await cartService.viewCart(customerId)
        setCart(response.cart)
      } catch (error) {
        toast.error(error instanceof ApiError ? error.message : "Failed to load cart")
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [user])

  const isEmpty = !cart || cart.products.length === 0 || cart.items_count === 0

  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-6">
        <h1 className="text-2xl font-semibold">{t("cart.title")}</h1>

        {isLoading ? (
          <CartSkeleton />
        ) : isEmpty ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-muted-foreground">{t("cart.empty")}</p>
            <Button asChild>
              <Link to="/dashboard">{t("cart.continueShopping")}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {cart.products.map((group) => (
                <SellerProductGroup key={group.seller_id} group={group} />
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-lg font-semibold">
               {t("cart.total")}: {cart.grandtotal ?? "0.00"} {cart.currency_code ?? ""}
              </p>
              <Button asChild size="lg">
                <Link to="/checkout">{t("cart.checkout")}</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}