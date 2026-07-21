// src/lib/axios.ts
import axios from "axios"
import { storage } from "./storage"
import type { SupportedLanguage } from "./i18n"

const ROOT_URL = import.meta.env.VITE_API_BASE_URL

export const api = axios.create({
  headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use(async (config) => {
  const language = (await storage.getItem<SupportedLanguage>("app_language")) ?? "en"
  config.baseURL = `${ROOT_URL}/${language}`

  const cachedUser = await storage.getItem<{ customer_token?: string }>("auth_user")
  if (cachedUser?.customer_token) {
    config.headers.Authorization = `Bearer ${cachedUser.customer_token}`
  }

  return config
})