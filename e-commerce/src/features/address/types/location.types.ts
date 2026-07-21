// src/features/address/types/location.types.ts
export interface Region {
  id: string
  code: string
  name: string
}

export interface CountryRegionsResponse {
  id: string
  full_name_english: string
  available_regions: Region[]
}

export interface City {
  city_id: string
  region_id: string
  code: string
  default_name: string
}

export interface CityListResponse {
  city: City[]
}