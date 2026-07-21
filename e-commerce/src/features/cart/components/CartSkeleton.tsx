// src/features/cart/components/CartSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"

export function CartSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-3 border-b pb-4">
          <Skeleton className="h-4 w-24" />
          {Array.from({ length: 2 }).map((_, itemIndex) => (
            <div key={itemIndex} className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
    </div>
  )
}