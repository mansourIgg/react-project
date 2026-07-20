// src/features/auth/components/RegisterForm.tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FormTextField } from "@/components/common/FormTextField"
import { registerSchema, type RegisterFormValues } from "../schemas/auth.schema"
import { authService } from "../services/auth.service"

export function RegisterForm() {
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
      <FormTextField control={control} name="fullName" label="Full name" autoComplete="name" placeholder="John Doe" />
      <FormTextField control={control} name="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
      <FormTextField control={control} name="password" label="Password" type="password" autoComplete="new-password" placeholder="••••••••" />
      <FormTextField control={control} name="confirmPassword" label="Confirm password" type="password" autoComplete="new-password" placeholder="••••••••" />
      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
      <p className="text-sm text-muted-foreground text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-primary underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </form>
  )
}