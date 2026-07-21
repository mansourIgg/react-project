// src/features/auth/services/user.storage.ts — update the type import
import { storage } from "@/lib/storage"
import type { Customer } from "../types/customer"

const USER_KEY = "auth_user"

export const userStorage = {
  get: () => storage.getItem<Customer>(USER_KEY),
  set: (user: Customer) => storage.setItem<Customer>(USER_KEY, user),
  clear: () => storage.removeItem(USER_KEY),
}