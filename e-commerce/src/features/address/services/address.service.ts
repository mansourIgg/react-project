// src/features/address/services/address.service.ts
import { apiRequest } from "@/lib/api-client"
import type { Address } from "../types/address.types"
import type { SaveAddressPayload } from "../types/save-address.types"

interface AddressListResponse {
  customer_id: string
  address: Address[]
}

export const addressService = {
  getAddresses: (customerId: number) =>
    apiRequest<AddressListResponse>({
      method: "POST",
      url: "/V1/mobiconnect/customer/address/",
      data: { customer_id: customerId },
    }),

    saveAddress: (payload: SaveAddressPayload) =>
    apiRequest<unknown>({
      method: "POST",
      url: "/V1/mobiconnect/customer/saveaddress",
      data: payload,
    }),
}