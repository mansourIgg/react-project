// src/pages/auth/LoginPage.tsx
import { useTranslation } from "react-i18next"
import { LoginForm } from "@/features/auth/components/LoginForm"

export default function LoginPage() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">{t("auth.login.welcomeBack")}</h1>
          <p className="text-sm text-muted-foreground">{t("auth.login.signInToAccount")}</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}