// src/features/language/services/language.storage.ts
import { storage } from "@/lib/storage"
import type { SupportedLanguage } from "@/lib/i18n"

const LANGUAGE_KEY = "app_language"

export const languageStorage = {
  get: () => storage.getItem<SupportedLanguage>(LANGUAGE_KEY),
  set: (lang: SupportedLanguage) => storage.setItem<SupportedLanguage>(LANGUAGE_KEY, lang),
}