// src/features/cart/components/SellerProductGroup.tsx
import type { CartSellerGroup } from "../types/cart-api.types"

export function SellerProductGroup({ group }: { group: CartSellerGroup }) {
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
          <div className="flex flex-1 flex-col gap-1">
            <p className="font-medium">{item.name}</p>
            {!Array.isArray(item.options_selected) && item.options_selected.options.length > 0 && (
            <p className="text-xs text-muted-foreground">
                {item.options_selected.label.join(", ")}:{" "}
                {item.options_selected.options.filter(Boolean).join(", ")}
            </p>
            )}
            <p className="text-sm text-muted-foreground">
              Qty: {item.qty} — ${item["sub-total"]}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}