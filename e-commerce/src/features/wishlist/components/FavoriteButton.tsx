// src/features/wishlist/components/FavoriteButton.tsx
import { useEffect } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlist } from "../context/WishlistContext"
import { useAuth } from "@/features/auth/context/AuthContext"

interface FavoriteButtonProps {
  productId: string
  initialLiked?: boolean
  onRequireLogin?: () => void
}

export function FavoriteButton({ productId, initialLiked = false, onRequireLogin }: FavoriteButtonProps) {
  const { user } = useAuth()
  const { likedProductIds, toggleLike, markAsLiked } = useWishlist()

  useEffect(() => {
    if (initialLiked) markAsLiked(productId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, initialLiked])

  const isLiked = likedProductIds.has(productId)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      onRequireLogin?.()
      return
    }
    toggleLike(productId)
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle favorite"
      className="absolute end-2 top-2 rounded-full bg-background/80 p-1.5 backdrop-blur-sm"
    >
      <Heart className={cn("size-4", isLiked ? "fill-destructive text-destructive" : "text-muted-foreground")} />
    </button>
  )
}