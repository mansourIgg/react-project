// src/pages/profile/ProfilePage.tsx
import { useTranslation } from "react-i18next"
import { Header } from "@/components/common/Header"
import { useAuth } from "@/features/auth/context/AuthContext"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="mx-auto max-w-md px-4 py-6">
          <p className="text-muted-foreground">{t("profile.loading")}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-10">
        <img
          src={`https://picsum.photos/seed/${user?.email ?? "user"}/150/150`}
          alt={user?.name ?? "Profile"}
          className="h-28 w-28 rounded-full object-cover"
        />
        <div className="w-full space-y-3">
          <div className="flex flex-col gap-1 border-b pb-3">
            <span className="text-sm text-muted-foreground">{t("profile.name")}</span>
            <span className="font-medium">{user?.name}</span>
          </div>
          <div className="flex flex-col gap-1 border-b pb-3">
            <span className="text-sm text-muted-foreground">{t("profile.email")}</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex flex-col gap-1 pb-3">
            <span className="text-sm text-muted-foreground">{t("profile.phone")}</span>
            <span className="font-medium">{user?.phone}</span>
          </div>
        </div>
      </div>
    </>
  )
}