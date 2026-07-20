// src/features/auth/components/LoginForm.tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FormTextField } from "@/components/common/FormTextField"
import { loginSchema, type LoginFormValues } from "../schemas/auth.schema"
import { authService } from "../services/auth.service"

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await authService.login(values)
      // TODO: store token, redirect to dashboard
    } catch (error) {
      console.error(error) // TODO: surface error via toast
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormTextField control={control} name="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
      <FormTextField control={control} name="password" label="Password" type="password" autoComplete="current-password" placeholder="••••••••" />
      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
      <p className="text-sm text-muted-foreground text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </form>
  )
}