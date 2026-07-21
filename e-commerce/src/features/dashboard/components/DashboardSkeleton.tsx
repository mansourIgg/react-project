// src/features/dashboard/components/DashboardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"

function ProductRowSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex gap-4 overflow-x-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex w-40 shrink-0 flex-col gap-2">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8 px-6 py-6">
      <Skeleton className="aspect-[3/1] w-full rounded-lg" />

      <div className="flex flex-col gap-3">
        <Skeleton className="mx-auto h-6 w-40" />
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex w-20 flex-col items-center gap-2">
              <Skeleton className="h-16 w-16 rounded-2xl" />
              <Skeleton className="h-3 w-14" />
            </div>
          ))}
        </div>
      </div>

      <ProductRowSkeleton />
      <ProductRowSkeleton />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-4 overflow-x-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex w-24 shrink-0 flex-col items-center gap-2">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}