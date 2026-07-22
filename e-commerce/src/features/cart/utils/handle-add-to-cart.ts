// src/features/cart/utils/handle-add-to-cart.ts
import { toast } from "sonner"
import type { NavigateFunction } from "react-router-dom"
import { ApiError } from "@/lib/api-response"

interface AddToCartGuardParams {
  entityId: string
  isConfigurable: boolean
  addItem: (product: { id: string; name: string; price: number; imageUrl: string }, qty?: number) => Promise<string>
  navigate: NavigateFunction
  product: { id: string; name: string; price: number; imageUrl: string }
  configurableMessage: string
  genericErrorMessage: string
}

export async function handleAddToCartGuarded({
  entityId,
  isConfigurable,
  addItem,
  navigate,
  product,
  configurableMessage,
  genericErrorMessage,
}: AddToCartGuardParams) {
  if (isConfigurable) {
    toast.info(configurableMessage)
    navigate(`/products/detail/${entityId}`)
    return
  }

  try {
    const message = await addItem(product)
    toast.success(message)
  } catch (error) {
    toast.error(error instanceof ApiError ? error.message : genericErrorMessage)
  }
}