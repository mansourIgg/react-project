// src/features/cart/components/CartItemRow.tsx
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuantityStepper } from "./QuantityStepper"
import type { CartItem } from "../types/cart.types"

interface CartItemRowProps {
  item: CartItem
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-20 w-20 shrink-0 rounded-lg object-cover"
      />
      <div className="flex flex-1 flex-col gap-2">
        <p className="font-medium">{item.name}</p>
        <QuantityStepper
          quantity={item.quantity}
          onChange={(quantity) => onQuantityChange(item.id, quantity)}
        />
        <p className="text-sm text-muted-foreground">
          ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
      >
        <Trash2 className="size-4 text-destructive" />
      </Button>
    </div>
  )
}