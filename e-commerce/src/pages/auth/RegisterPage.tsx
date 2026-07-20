// src/pages/auth/RegisterPage.tsx
import { RegisterForm } from "@/features/auth/components/RegisterForm"
import { useTranslation } from "react-i18next"

export default function RegisterPage() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">{t("auth.register.createAccount")}</h1>
          <p className="text-sm text-muted-foreground">{t("auth.register.signUpToStart")}</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}