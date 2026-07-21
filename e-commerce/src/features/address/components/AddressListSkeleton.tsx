// src/features/address/components/AddressListSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"

export function AddressListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-lg border p-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="mt-2 h-8 w-24 rounded-md" />
        </div>
      ))}
    </div>
  )
}