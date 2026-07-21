// src/features/auth/services/auth.service.ts
import { apiRequest } from "@/lib/api-client"
import { phoneCountries } from "@/lib/phone-countries"
import type { LoginFormValues, RegisterFormValues } from "../schemas/auth.schema"
import type { Customer } from "../types/customer"

interface LoginResponseData {
  customer: Customer
}

interface RegisterResponseData {
  customer: Customer
}

function toE164(country: string, number: string): string {
  const dialCode = phoneCountries.find((c) => c.iso2 === country)?.dialCode ?? ""
  return `+${dialCode}${number}`
}

export const authService = {
  login: (values: LoginFormValues) =>
    apiRequest<LoginResponseData>({
      method: "POST",
      url: "/V1/mobiconnect/customer/login",
      data: {
        phone_number: values.email,
        password: values.password,
        firebase_token: "1234",
        type: 1,
      },
    }),

  register: (values: RegisterFormValues) =>
    apiRequest<RegisterResponseData>({
      method: "POST",
      url: "/V1/mobiconnect/customer/register",
      data: {
        username: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone_number: toE164(values.phone.country, values.phone.number),
        password: values.password,
        customer_type: 3,
        country_id: "SA",
        ref_code: "",
        token: "device_token",
        type: 2,
      },
    }),
}