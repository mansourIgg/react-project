// src/features/address/types/address.types.ts
export interface Address {
  firstname: string
  lastname: string
  street: string
  city: string
  city_id: string
  country_id: string
  country_name: string
  short_adress: string
  building_number: string | null
  floor_apartment: string | null
  apartment_no: string | null
  special_marque: string | null
  address_id: string
  default_shipping?: boolean
  default_billing?: boolean
}