// src/features/address/components/AddressCard.tsx
import { Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Address } from "../types/address.types"

interface AddressCardProps {
   address: Address
  onDeleteClick: (address: Address) => void
  onMakeDefaultClick: (address: Address) => void
  isSettingDefault: boolean
}

export function AddressCard({ address, onDeleteClick, onMakeDefaultClick, isSettingDefault }: AddressCardProps) {
  const { t } = useTranslation()
  const isDefault = Boolean(address.default_shipping)

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <span className="text-muted-foreground">{t("address.city")}</span>
          <span>{address.city}</span>

          <span className="text-muted-foreground">{t("address.country")}</span>
          <span>{address.country_name}</span>

          <span className="text-muted-foreground">{t("address.shortAddress")}</span>
          <span>{address.short_adress || "—"}</span>

          <span className="text-muted-foreground">{t("address.buildingNumber")}</span>
          <span>{address.building_number ?? "—"}</span>

          <span className="text-muted-foreground">{t("address.floorNumber")}</span>
          <span>{address.floor_apartment ?? "—"}</span>

          <span className="text-muted-foreground">{t("address.apartmentNumber")}</span>
          <span>{address.apartment_no ?? "—"}</span>

          <span className="text-muted-foreground">{t("address.specialMark")}</span>
          <span>{address.special_marque ?? "—"}</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDeleteClick(address)}
          aria-label={t("address.deleteAddress")}
        >
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </div>

      <Button
        size="sm"
        variant={isDefault ? "default" : "outline"}
        className={cn("mt-2 w-fit", !isDefault && "text-muted-foreground")}
        disabled={isDefault || isSettingDefault}
        onClick={() => onMakeDefaultClick(address)}
      >
        {isDefault ? t("address.defaultAddress") : isSettingDefault ? t("address.settingDefault") : t("address.makeDefault")}
      </Button>
    </div>
  )
}