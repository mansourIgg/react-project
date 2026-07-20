// src/features/auth/components/RegisterForm.tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FormTextField } from "@/components/common/FormTextField"
import { registerSchema, type RegisterFormValues } from "../schemas/auth.schema"
import { authService } from "../services/auth.service"
import { useTranslation } from "react-i18next"

export function RegisterForm() {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await authService.register(values)
      // TODO: redirect to login or auto-login
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormTextField control={control} name="fullName" label={t("auth.register.fullName")} autoComplete="name" placeholder="John Doe" />
      <FormTextField control={control} name="email" label={t("auth.register.email")} type="email" autoComplete="email" placeholder="you@example.com" />
      <FormTextField control={control} name="password" label={t("auth.register.password")} type="password" autoComplete="new-password" placeholder="••••••••" />
      <FormTextField control={control} name="confirmPassword" label={t("auth.register.confirmPassword")} type="password" autoComplete="new-password" placeholder="••••••••" />
      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? t("auth.register.creatingAccount") : t("auth.register.createAccountButton")}
      </Button>
      <p className="text-sm text-muted-foreground text-center">
        {t("auth.register.haveAccount")}{" "}
        <Link to="/login" className="text-primary underline underline-offset-4">
          {t("auth.register.signIn")}
        </Link>
      </p>
    </form>
  )
}