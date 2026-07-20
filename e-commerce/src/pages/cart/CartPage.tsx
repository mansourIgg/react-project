// src/pages/cart/CartPage.tsx
import { Link } from "react-router-dom"
import { Header } from "@/components/common/Header"
import { Button } from "@/components/ui/button"
import { CartItemRow } from "@/features/cart/components/CartItemRow"
import { useCart } from "@/features/cart/context/CartContext"
import { useTranslation } from "react-i18next"

export default function CartPage() {
  const { t } = useTranslation()
  const { items, isLoading, totalPrice, setQuantity, removeItem } = useCart()

  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-6">
        <h1 className="text-2xl font-semibold">{t("cart.title")}</h1>

        {isLoading ? (
          <p className="text-muted-foreground">{t("common.loading")}</p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="text-muted-foreground">{t("cart.empty")}</p>
            <Button asChild>
              <Link to="/dashboard">{t("cart.continueShopping")}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onQuantityChange={setQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
              <p className="text-lg font-semibold">{t("cart.total")}: ${totalPrice.toFixed(2)}</p>
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