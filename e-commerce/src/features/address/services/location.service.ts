// src/features/address/services/location.service.ts
import { apiRequest , apiRequestRaw } from "@/lib/api-client"
import type { CountryRegionsResponse, CityListResponse } from "../types/location.types"

export const locationService = {
  getRegions: (countryCode: string) =>
    apiRequestRaw<CountryRegionsResponse>({
      method: "GET",
      url: `/V1/directory/countries/${countryCode}`,
    }),

  getCities: (regionId: string) =>
    apiRequest<CityListResponse>({
      method: "GET",
      url: `/V1/rcp/getcity/${regionId}`,
    }),
    
}