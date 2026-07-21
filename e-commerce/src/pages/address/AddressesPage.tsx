// src/pages/address/AddressesPage.tsx
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { Header } from "@/components/common/Header"
import { AddressCard } from "@/features/address/components/AddressCard"
import { AddressListSkeleton } from "@/features/address/components/AddressListSkeleton"
import { addressService } from "@/features/address/services/address.service"
import { useAuth } from "@/features/auth/context/AuthContext"
import { ApiError } from "@/lib/api-response"
import type { Address } from "@/features/address/types/address.types"
import { MapPinOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function AddressesPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    addressService
      .getAddresses(Number(user.customer_id))
      .then((data) => setAddresses(data.address))
      .catch((error) => {
        toast.error(error instanceof ApiError ? error.message : t("common.somethingWentWrong"))
      })
      .finally(() => setIsLoading(false))
  }, [user, t])

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 px-6 py-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">{t("address.title")}</h1>
            <Button size="sm" onClick={() => navigate("/addresses/new")}>
                {t("address.addNew")}
            </Button>
        </div>

        {isLoading ? (
          <AddressListSkeleton />
        ) : addresses.length === 0 ? (
  <div className="flex flex-col items-center gap-3 py-20 text-center">
    <MapPinOff className="size-12 text-muted-foreground" />
    <div className="space-y-1">
      <p className="text-lg font-semibold">{t("address.emptyTitle")}</p>
      <p className="text-sm text-muted-foreground">{t("address.emptyDescription")}</p>
    </div>
    <Button onClick={() => navigate("/addresses/new")} className="mt-2">
      {t("address.addNew")}
    </Button>
  </div>
)  : (
          <div className="flex flex-col gap-4">
            {addresses.map((address) => (
              <AddressCard key={address.address_id} address={address} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}