// src/lib/phone-validation.ts
import { z } from "zod"
import { phoneCountries } from "./phone-countries"

export const phoneFieldSchema = z
  .object({
    country: z.string().min(1),
    number: z.string().min(1, "Phone number is required"),
  })
  .refine(
    (data) => {
      const country = phoneCountries.find((c) => c.iso2 === data.country)
      return country ? data.number.length === country.nationalLength : false
    },
    { message: "Enter a valid phone number for the selected country", path: ["number"] }
  )