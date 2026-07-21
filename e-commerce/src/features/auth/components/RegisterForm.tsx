// src/features/auth/components/RegisterForm.tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FormTextField } from "@/components/common/FormTextField"
import { PhoneField } from "@/components/common/PhoneField"
import { registerSchema, type RegisterFormValues } from "../schemas/auth.schema"
import { authService } from "../services/auth.service"
import { useAuth } from "../context/AuthContext"
import { ApiError } from "@/lib/api-response"

export function RegisterForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: { country: "SA", number: "" },
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const data = await authService.register(values)
      setUser(data.customer)
      toast.success(t("toast.accountCreated"))
      navigate("/dashboard", { replace: true })
    } catch (error) {
      const message = error instanceof ApiError ? error.message : t("common.somethingWentWrong")
      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormTextField control={control} name="firstName" label={t("auth.register.firstName")} autoComplete="given-name" placeholder="John" />
      <FormTextField control={control} name="lastName" label={t("auth.register.lastName")} autoComplete="family-name" placeholder="Doe" />
      <FormTextField control={control} name="email" label={t("auth.register.email")} type="email" autoComplete="email" placeholder="you@example.com" />
      <PhoneField control={control} countryName="phone.country" numberName="phone.number" label={t("auth.register.phoneNumber")} />
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