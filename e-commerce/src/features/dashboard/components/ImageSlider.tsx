// src/features/dashboard/components/ImageSlider.tsx
import { useEffect, useState } from "react"
import type { SliderImage } from "../types/dashboard.types"
import { cn } from "@/lib/utils"

interface ImageSliderProps {
  images: SliderImage[]
  autoPlayMs?: number
}

export function ImageSlider({ images, autoPlayMs = 4000 }: ImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, autoPlayMs)
    return () => clearInterval(timer)
  }, [images.length, autoPlayMs])

  if (images.length === 0) return null

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image) => (
          <img
            key={image.id}
            src={image.imageUrl}
            alt={image.alt}
            className="w-full shrink-0 aspect-[3/1] object-cover"
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                index === activeIndex ? "bg-white" : "bg-white/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}