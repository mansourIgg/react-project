// src/features/cart/components/QuantityStepper.tsx
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuantityStepperProps {
  quantity: number
  onChange: (quantity: number) => void
  disabled?: boolean
}

export function QuantityStepper({ quantity, onChange, disabled }: QuantityStepperProps) {
  return (
    <div className="flex w-fit items-center gap-2 rounded-md border">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        disabled={disabled || quantity <= 1}
        onClick={() => onChange(quantity - 1)}
        aria-label="Decrease quantity"
      >
        <Minus className="size-3.5" />
      </Button>
      <span className="w-6 text-center text-sm font-medium">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        disabled={disabled}
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
      >
        <Plus className="size-3.5" />
      </Button>
    </div>
  )
}