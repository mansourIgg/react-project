// src/pages/checkout/CheckoutPage.tsx
import { useTranslation } from "react-i18next"
import { Header } from "@/components/common/Header"
import { useCart } from "@/features/cart/context/CartContext"
import { useCurrency } from "@/lib/use-currency"

export default function CheckoutPage() {
  const { items, totalPrice } = useCart()
  const { t } = useTranslation()
  const { format } = useCurrency()

  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-6">
        <h1 className="text-2xl font-semibold">{t("checkout.title")}</h1>
        <p className="text-muted-foreground">
          {t("checkout.itemsSummary", { count: items.length, total: format(totalPrice) })}
        </p>
      </div>
    </>
  )
}