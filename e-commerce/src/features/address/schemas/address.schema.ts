// src/features/address/schemas/address.schema.ts
import { z } from "zod"

export const addAddressSchema = z.object({
  countryId: z.string().min(1, "Select a country"),
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  street: z.string().min(2, "Street is required"),
  regionId: z.string().min(1, "Select a region"),
  cityId: z.string().min(1, "Select a city"),
  postcode: z.string().min(1, "Postcode is required"),
  telephone: z.string().min(8, "Enter a valid phone number"),
  shortAddress: z.string().min(1, "Short address is required"),
  floorNumber: z.string().optional(),
  apartmentNumber: z.string().optional(),
  specialMark: z.string().optional(),
})

export type AddAddressFormValues = z.infer<typeof addAddressSchema>