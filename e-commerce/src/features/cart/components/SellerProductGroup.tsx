// src/features/cart/components/SellerProductGroup.tsx
import { useState } from "react"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { QuantityStepper } from "./QuantityStepper"
import { DeleteItemConfirmDialog } from "./DeleteItemConfirmDialog"
import { cartService } from "../services/cart.service"
import { ApiError } from "@/lib/api-response"
import type { CartSellerGroup, CartProduct } from "../types/cart-api.types"

interface SellerProductGroupProps {
  group: CartSellerGroup
  customerId: number
  onItemDeleted: (itemId: string) => void
  onQtyChanged: (itemId: string, qty: number) => void
}

export function SellerProductGroup({ group, customerId, onItemDeleted, onQtyChanged }: SellerProductGroupProps) {
  const { t } = useTranslation()
  const [pendingDeleteItem, setPendingDeleteItem] = useState<CartProduct | null>(null)
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null)

  const handleConfirmDelete = async () => {
    if (!pendingDeleteItem) return
    try {
      const response = await cartService.deleteItem(customerId, Number(pendingDeleteItem.item_id))
      toast.success(response.message)
      onItemDeleted(pendingDeleteItem.item_id)
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : t("common.somethingWentWrong"))
    } finally {
      setPendingDeleteItem(null)
    }
  }

  const handleQtyChange = async (item: CartProduct, newQty: number) => {
    setUpdatingItemId(item.item_id)
    try {
      const response = await cartService.updateQty(customerId, Number(item.item_id), newQty)
      toast.success(response.message)
      onQtyChanged(item.item_id, newQty)
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : t("common.somethingWentWrong"))
    } finally {
      setUpdatingItemId(null)
    }
  }

  return (
    <div className="flex flex-col gap-3 border-b pb-4">
      <p className="text-sm font-semibold text-muted-foreground">{group.seller_name}</p>
      {group.product.map((item) => (
        <div key={item.item_id} className="flex items-center gap-4">
          <img
            src={item.product_image}
            alt={item.name}
            className="h-20 w-20 shrink-0 rounded-lg object-cover"
          />
          <div className="flex flex-1 flex-col gap-2">
            <p className="font-medium">{item.name}</p>
            {!Array.isArray(item.options_selected) && item.options_selected.options.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {item.options_selected.label.join(", ")}:{" "}
                {item.options_selected.options.filter(Boolean).join(", ")}
              </p>
            )}
            <QuantityStepper
              quantity={item.qty}
              disabled={updatingItemId === item.item_id}
              onChange={(newQty) => handleQtyChange(item, newQty)}
            />
            <p className="text-sm text-muted-foreground">${item["sub-total"]}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPendingDeleteItem(item)}
            aria-label={t("cart.deleteItem")}
          >
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      ))}

      <DeleteItemConfirmDialog
        open={pendingDeleteItem !== null}
        onOpenChange={(open) => !open && setPendingDeleteItem(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}