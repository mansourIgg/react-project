import { storage } from "@/lib/storage"
import type { User } from "../types/user"

const USER_KEY = "auth_user"

export const userStorage = {
  get: () => storage.getItem<User>(USER_KEY),
  set: (user: User) => storage.setItem<User>(USER_KEY, user),
  clear: () => storage.removeItem(USER_KEY),
}