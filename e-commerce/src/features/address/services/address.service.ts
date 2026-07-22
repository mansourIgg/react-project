// src/features/address/services/address.service.ts
import { apiRequest, apiRequestRaw } from "@/lib/api-client"
import type { Address } from "../types/address.types"
import type { SaveAddressPayload } from "../types/save-address.types"

interface AddressListResponse {
  customer_id: string
  address: Address[]
}

interface UpdateAddressResponse {
  message: string
}

interface DeleteAddressResponse {
  message: string
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

    deleteAddress: (customerId: number, addressId: number) =>
    apiRequestRaw<DeleteAddressResponse>({
      method: "POST",
      url: "/V1/mobiconnect/customer/deleteaddress",
      data: { customer_id: customerId, address_id: addressId },
    }),

    updateAddress: (customerId: string, addressId: string) =>
  apiRequestRaw<UpdateAddressResponse>({
    method: "POST",
    url: "/V1/mobiconnect/customer/updateaddress",
    data: {
      customer_id: customerId,
      address_id: addressId,
      default_billing: "1",
      default_shipping: "1",
    },
  }),
}