// src/features/auth/types/customer.ts
export interface Customer {
  customer_id: string
  customer_token: string
  token: string
  cart_id: string
  items_count: number
  name: string
  last_name: string
  email: string
  customer_type: string
  specialist_profile: string
  phone_number: string
  invitation_code: string | null
  logo_pic: string
  cover_image: string
  track_record: string
  birthdate: string
}