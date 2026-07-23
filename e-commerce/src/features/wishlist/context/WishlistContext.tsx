// src/features/wishlist/context/WishlistContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react"
import { toast } from "sonner"
import { wishlistService } from "../services/wishlist.service"
import { useAuth } from "@/features/auth/context/AuthContext"
import { ApiError } from "@/lib/api-response"

interface WishlistContextValue {
  likedProductIds: Set<string>
  toggleLike: (productId: string) => Promise<void>
  markAsLiked: (productId: string) => void
  setWishlistData: (products: { entity_id: string; item_id: string }[]) => void
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [likedProductIds, setLikedProductIds] = useState<Set<string>>(new Set())
  const [productIdToItemId, setProductIdToItemId] = useState<Map<string, string>>(new Map())

  const markAsLiked = (productId: string) => {
    setLikedProductIds((prev) => (prev.has(productId) ? prev : new Set(prev).add(productId)))
  }

  // WishlistPage calls this after its own getWishlist fetch, to seed context state
  const setWishlistData = (products: { entity_id: string; item_id: string }[]) => {
    setLikedProductIds(new Set(products.map((p) => p.entity_id)))
    setProductIdToItemId(new Map(products.map((p) => [p.entity_id, p.item_id])))
  }

  const toggleLike = async (productId: string) => {
    if (!user) return
    const customerId = Number(user.customer_id)
    const isLiked = likedProductIds.has(productId)

    try {
      if (isLiked) {
        const itemId = productIdToItemId.get(productId)
        if (!itemId) {
          toast.error("Unable to find this item in your wishlist.")
          return
        }
        const response = await wishlistService.remove(customerId, Number(itemId))
        toast.success(response.message)
        setLikedProductIds((prev) => {
          const next = new Set(prev)
          next.delete(productId)
          return next
        })
        setProductIdToItemId((prev) => {
          const next = new Map(prev)
          next.delete(productId)
          return next
        })
      } else {
        const response = await wishlistService.add(customerId, Number(productId))
        toast.success(response.message)
        const addedProduct = response.data.product
        setLikedProductIds((prev) => new Set(prev).add(productId))
        setProductIdToItemId((prev) => new Map(prev).set(productId, addedProduct.item_id))
      }
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Something went wrong.")
    }
  }

  return (
    <WishlistContext.Provider value={{ likedProductIds, toggleLike, markAsLiked, setWishlistData }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider")
  return ctx
}