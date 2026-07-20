// src/features/auth/services/auth.service.ts
import { api } from "@/lib/axios"
import type { LoginFormValues, RegisterFormValues } from "../schemas/auth.schema"

export const authService = {
  login: (data: LoginFormValues) => api.post("/auth/login", data),
  register: (data: RegisterFormValues) => api.post("/auth/register", data),
}