// src/features/address/types/save-address.types.ts
export interface SaveAddressPayload {
  customer_id: number
  firstname: string
  lastname: string
  street: string
  city: string
  city_id: number
  region_id: number
  region: string
  country_id: string
  postcode: string
  telephone: string
  short_adress: string
  latitude: string
  longitude: string
  building_number: string
  floor_apartment: string
  customer_type_address: string
  apartment_no: string
  address_location: string
  special_marque: string
  default_billing: number
  default_shipping: number
}