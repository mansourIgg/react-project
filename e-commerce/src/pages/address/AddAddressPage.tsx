// src/pages/address/AddAddressPage.tsx
import { useTranslation } from "react-i18next"
import { Header } from "@/components/common/Header"
import { AddAddressForm } from "@/features/address/components/AddAddressForm"

export default function AddAddressPage() {
  const { t } = useTranslation()
  return (
    <>
      <Header />
      <div className="mx-auto flex w-full max-w-lg flex-col gap-4 px-6 py-6">
        <h1 className="text-2xl font-semibold">{t("address.addNew")}</h1>
        <AddAddressForm />
      </div>
    </>
  )
}