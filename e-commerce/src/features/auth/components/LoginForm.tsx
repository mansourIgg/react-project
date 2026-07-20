// src/features/auth/components/LoginForm.tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FormTextField } from "@/components/common/FormTextField"
import { loginSchema, type LoginFormValues } from "../schemas/auth.schema"
import { authService } from "../services/auth.service"
import { useAuth } from "../context/AuthContext"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

export function LoginForm() {
  const navigate = useNavigate()
  const { setUser } = useAuth();
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  // inside LoginForm's onSubmit, after a successful API call
  //const { setUser } = useAuth()
  // ...
  //const response = await authService.login(values)
  //setUser(response.data.user) // { name, email, phone }

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await authService.login(values)
      setUser(response.data.user) 
      toast.success("Account created successfully")
      // TODO: store token, redirect to dashboard
      navigate("/dashboard")
    } catch (error) {
      toast.error("Invalid email or password") // TODO: surface error via toast
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormTextField control={control} name="email" label={t("auth.login.email")} type="email" autoComplete="email" placeholder="you@example.com" />
      <FormTextField control={control} name="password" label={t("auth.login.password")} type="password" autoComplete="current-password" placeholder="••••••••" />
      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? t("auth.login.signingIn") : t("auth.login.signIn")}
      </Button>
      <p className="text-sm text-muted-foreground text-center">
        {t("auth.login.noAccount")}{" "}
        <Link to="/register" className="text-primary underline underline-offset-4">
          {t("auth.login.signUp")}
        </Link>
      </p>
    </form>
  )
}